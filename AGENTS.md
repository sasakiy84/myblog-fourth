# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds the Astro site source: `pages/` for routes, `layouts/` for page shells, `components/` for UI, `styles/` for CSS/UnoCSS, `content/` for articles and collections, `utils/` and `plugins/` for helpers.
- `public/` contains static assets served as-is (including `public/vendors/`).
- `assets/` stores documentation images and theme collateral.
- `scripts/` includes maintenance tasks (new post creation, LQIP generation, theme updates).
- `dist/` is the build output.

## Build, Test, and Development Commands
このリポジトリは `npm` を前提にしています。主要コマンド:
- `npm run dev` は `astro check` の後に開発サーバーを起動します。
- `npm run build` は型チェック・ビルド・LQIP生成/適用まで実行します。
- `npm run preview` は本番ビルドをローカルで確認します。
- `npm run lint` / `npm run lint:fix` は ESLint を実行します（自動修正あり）。
- `npm run new-post` / `npm run format-posts` は `src/content/` の記事管理を行います。
- `npm run update-theme` はテーマ更新スクリプトを実行します。

## Coding Style & Naming Conventions
- TypeScript + Astro（`astro/tsconfigs/strict` を使用）。
- ESLint は `@antfu/eslint-config` を利用（Astro/TypeScript/UnoCSS 有効）。
- `@/` は `src/*` のエイリアスとして使用（例: `@/utils/date`）。
- 既存の命名に合わせる（コンテンツは kebab-case、コンポーネントは PascalCase）。

## Testing Guidelines
- 自動テスト基盤は未設定です。追加する場合はランナーを明記し、`package.json` にスクリプトを追加してください。

## Commit & Pull Request Guidelines
- コミットは短く直接的な内容が多いので、それに合わせて簡潔に（例: “update theme config”）。
- PR には要約、UI変更ならスクリーンショット、新規ページ/記事のリンクを含めてください。

## Configuration & Content Tips
- コンテンツは `src/content/` にあり、Astro の content collections で管理します。
- `public/vendors/` は lint 対象外のため、必要がない限り手編集は避けてください。
