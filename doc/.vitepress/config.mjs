// 사이트 기본 설정 파일

import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Vue.js',
  description: 'A comprehensive practical guide to Vue.js, covering environment setup, components, state management, and routing.',
    base: '/vuejs_guide/',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/markdown-examples' },
        ],

        sidebar: [
            // {
            //     text: 'Examples',
            //     items: [
            //         { text: 'Markdown Examples', link: '/markdown-examples' },
            //         { text: 'Runtime API Examples', link: '/api-examples' },
            //     ],
            // },
            {
                text: 'Getting Started',
                items: [
                    { text: '시작하기-환경설정', link: '/guide/getting-started' },
                    { text: 'Runtime API Examples2', link: '/api-examples11' },
                ],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/Hongjungim/vuejs_guide' }],
    },
})
