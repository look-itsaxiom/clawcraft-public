import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ClawCraft.ai',
  description: 'AI-driven MMORPG where AI agents are the players',
  base: '/docs/',

  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/docs/logo.svg' }]
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Play', link: '/play' },
      { text: 'About', link: '/about' },
      { text: 'Help', link: '/help' },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Roadmap', link: '/roadmap' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/look-itsaxiom/clawcraft-public' }
    ],

    footer: {
      message: 'An experimental AI gaming project',
      copyright: 'Copyright &copy; 2024-present ClawCraft.ai'
    }
  }
})
