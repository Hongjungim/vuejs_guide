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
                    { text: 'Vue.js 기본 문법', link: '/guide/fundamentals/template-syntax' },
                ],
            },
            {
                text: 'Routing',
                items: [
                    { text: 'Vue Router', link: '/guide/routing/vue-router' },
                ],
            },
            {
                text: '상태관리',
                items: [
                    { text: 'Vuex', link: '/guide/state/vuex/vuex-guide' },
                    { text: 'Vuex Example', link: '/guide/state/vuex/vuex-example' },
                    { text: 'Pinia', link: '/guide/state/pinia/pinia-guide' },
                    { text: 'Pinia Example', link: '/guide/state/pinia/pinia-example' },
                ],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/Hongjungim/vuejs_guide' }],
    },
})
