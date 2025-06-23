import type { CollectionEntry } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'
import { getCollection } from 'astro:content'
import { generateDescription } from '@/utils/description'

// eslint-disable-next-line antfu/no-top-level-await
const posts = await getCollection('posts')

// Convert blog entries into a lookup object with slug as key and title/description as value
const pages = Object.fromEntries(
  posts.map((post: CollectionEntry<'posts'>) => [
    post.id,
    {
      title: post.data.title,
      description: post.data.description || generateDescription(post, 'og'),
    },
  ]),
)

// Configure Open Graph image generation route
export const { getStaticPaths, GET } = OGImageRoute({
  param: 'image',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title.length > 30 ? `${page.title.slice(0, 30)} ...` : page.title,
    description: page.description.length > 100 ? `${page.description.slice(0, 100)} ...` : page.description,
    logo: {
      path: './public/icons/og-logo.png', // Required local path and PNG format
      size: [80],
    },
    border: {
      color: [242, 241, 245],
      width: 20,
    },
    font: {
      title: {
        families: ['Noto Sans JP'], // or Noto Serif SC
        weight: 'Bold',
        color: [34, 33, 36],
        lineHeight: 1.3,
      },
      description: {
        families: ['Noto Sans JP'], // or Noto Serif SC
        color: [72, 71, 74],
        lineHeight: 1.2,
      },
    },
    fonts: [
      'https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Sans/SubsetOTF/JP/NotoSansJP-Bold.otf',
      'https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Sans/SubsetOTF/JP/NotoSansJP-Regular.otf',
      // 'https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Sans/SubsetOTF/SC/NotoSansSC-Bold.otf',
      // 'https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Sans/SubsetOTF/SC/NotoSansSC-Regular.otf',
      // 'https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Serif/SubsetOTF/SC/NotoSerifSC-Bold.otf',
      // 'https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Serif/SubsetOTF/SC/NotoSerifSC-Regular.otf',
    ],
    bgGradient: [[242, 241, 245]],
  }),
})
