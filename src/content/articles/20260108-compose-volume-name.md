---
title: compose.yaml ではボリューム名をきちんと指定したほうがいい
description: compose.yaml でボリューム名を明示的に指定しないと、直感的ではない名前でボリュームのファイルシステムが作成されることがあるので、注意が必要である。
published: 2026-01-08
---


アプリケーションのフォルダ名を変更して、
`docker compose up` を実行したら、
データが消えた（ような挙動をした）。
実際にはデータは古いボリュームに残っているが、
新しいボリュームがマウントされるため、
アクセスできなくなってしまっていた。


ボリューム名は明示しなくても動く。
しかし、動作がフォルダ名に依存してしまい、
依存関係にフォルダ名が暗黙的に組み込まれてしまうため、
明示的に名前を指定したほうがよさそう。


## 背景
たとえば、Gemini 3.0 Pro で

> 名前付き volume を使ったコンテナの compose.yaml を書いて。ファイルだけでいい

と指示すると、以下のような `compose.yaml` を生成する。

```yaml
services:
  db:
    image: postgres:16
    restart: always
    environment:
      POSTGRES_PASSWORD: mysecretpassword
    ports:
      - "5432:5432"
    volumes:
      # ホスト側の名前付きボリューム:コンテナ内のパス
      - db_data:/var/lib/postgresql/data

# トップレベルでボリュームを定義
volumes:
  db_data:
```

しかし、このままだとホスト側のボリューム名が `projectname_db_data` のように、プロジェクト名がプレフィックスとして付与された名前になる。
プロジェクト名は、[明示的に指定しない場合](https://docs.docker.com/compose/how-tos/project-name/)、`compose.yaml` のあるディレクトリ名が使われる。

たとえば、以下の`docker-compose-test/compose.yaml`に対して

```yaml
services:
  test-app:
    image: alpine:latest
    command: ["sh", "-c", "echo 'Hello, World!' > /mnt/my-data/hello.txt"]
    volumes:
      - compose-test-volume:/mnt/my-data
volumes:
  compose-test-volume:
```

`docker compose up` を実行すると、以下のようなボリュームが作成される。

```
$ sudo ls /var/lib/docker/volumes/

docker-compose-test_compose-test-volume
```

たとえば、この状態で `docker compose down` を実行してサービスを停止し、フォルダ名を変更し、`docker compose up` を実行すると、別のボリュームが作成されてしまう。

```
$ mv docker-compose-test docker-compose-test-2
$ docker compose up
$ sudo ls /var/lib/docker/volumes/

docker-compose-test-2_compose-test-volume
```

## つまり？


```yaml
volumes:
  compose-test-volume:
```

でも動きはするが、以下のように明示的に名前を指定したほうがよい。
ただし、グローバルで同じ名前のボリュームが存在しないように注意する必要がある。

```yaml
volumes:
  compose-test-volume:
     name: compose-test-volume
```

あるいは、プロジェクト名を明示的に指定する方法もある。
どちらかといえば、こちらのほうがスマートかもしれない。

```yaml
# name でプロジェクト名を指定
name: my-project

volumes:
  compose-test-volume:
```

