# Getting Started

Welcome to the **Vue.js Guide**!

<!-- ## Installation
```bash
npm install vue

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Clicked {{ count }} times</button>
</template> -->

# 시작하기: 환경 셋업 · Vite · 폴더 구조 (Vue 2 기준, Vue 3 심화 포함)

> 본 장은 **Vue 2를 기본 흐름**으로 잡고, 동일 주제의 **Vue 3 심화/확장**을 각 절 끝에 정리합니다. 현업 온보딩에 필요한 명령어, 폴더 구조, 린트/포맷, 빌드·배포까지 최소 가이드라인을 제공합니다.


## 1. 사전 요구사항

* **Node.js**: LTS 권장 (예: 18.x 이상). `node -v`로 확인
* **패키지 매니저**: npm(동봉) 또는 pnpm/yarn 중 택1
* **에디터**: VS Code + 필수 확장(Volar/TypeScript Vue Plugin, ESLint, Prettier)
* **Git**: GitHub/GitLab 등 원격 저장소 연동


## 2. 프로젝트 생성 (Vue 2)

Vue 2는 전통적으로 **Vue CLI** 또는 **Vite + vue2 플러그인** 2가지 경로가 있습니다. 신규는 Vite 권장.

### 2.1 Vite (권장) — Vue 2

1. 프로젝트 생성

```bash
# pnpm 권장 (속도/디스크 이점) — 원하시는 매니저로 대체 가능
pnpm create vite vue2-starter --template vanilla
cd vue2-starter
pnpm add vue@2.7.16 vite-plugin-vue2 @vitejs/plugin-legacy
pnpm add -D @types/node @vue/compiler-sfc eslint eslint-plugin-vue prettier eslint-config-prettier
```

2. Vite 설정 추가

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue2 from 'vite-plugin-vue2'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    vue2(),
    legacy({ targets: ['defaults', 'not IE 11'] })
  ],
  resolve: { alias: { '@': '/src' } },
  server: { port: 5173, open: true },
  build: { sourcemap: true }
})
```

3. 엔트리 구성

```ts
// src/main.ts (또는 main.js)
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
```

4. HTML 템플릿

```html
<!-- index.html -->
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue2 + Vite Starter</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

5. 스크립트

```jsonc
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint --ext .js,.ts,.vue src",
    "format": "prettier --write ."
  }
}
```

> \[!note] 왜 Vite인가?
> 빠른 HMR, 단순한 설정, ESM 기반 번들링으로 유지보수/확장에 유리합니다. Vue 2도 `vite-plugin-vue2`로 안정적으로 동작합니다.

### 2.2 Vue CLI — Vue 2 (레거시)

```bash
npm i -g @vue/cli
vue create vue2-cli-app
# Manually select features: TypeScript, Router, Vuex, Linter/Formatter 등 선택
cd vue2-cli-app
npm run serve
```

> \[!warning] 신규 프로젝트에는 권장하지 않음
> Vue CLI는 유지보수상 Vite 대비 비추천. 기존 레거시 유지에는 유용.

---

## 3. 기본 폴더 구조 (Vue 2 with Vite)

```
project/
├─ index.html
├─ vite.config.ts
├─ tsconfig.json
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  └─ BaseButton.vue
│  ├─ pages/
│  ├─ router/
│  │  └─ index.ts
│  ├─ store/          # Vuex (또는 Pinia로 대체 가능)
│  ├─ styles/
│  │  ├─ _variables.scss
│  │  └─ main.scss
│  ├─ utils/
│  ├─ App.vue
│  └─ main.ts
└─ .eslintrc.cjs / .prettierrc / .editorconfig
```

### 3.1 네이밍/레이어링 가이드

* **컴포넌트**: `Base*`(원자) / `App*`(최상위) / 도메인별 폴더로 분리
* **라우팅**: `/pages` 기준 파일 기반 매핑(수동), 라우터 가드 별도 디렉터리 추천
* **상태관리**: Vue 2는 **Vuex**, 단 신규 코드는 **Pinia**(Vue 2 호환)로도 구성 가능

```ts
// src/router/index.ts
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{ path: '/', name: 'home', component: Home }]
})
```

---

## 4. ESLint · Prettier · 코드 스타일

1. 설치 (이미 상단 설치했다면 생략)

```bash
pnpm add -D eslint eslint-plugin-vue @vue/eslint-config-typescript prettier eslint-config-prettier eslint-plugin-import eslint-plugin-unused-imports
```

2. 설정 예시

```cjs
// .eslintrc.cjs
module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'plugin:vue/recommended',
    '@vue/eslint-config-typescript/recommended',
    'prettier'
  ],
  plugins: ['unused-imports'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'unused-imports/no-unused-imports': 'warn'
  }
}
```

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "none"
}
```

> \[!tip] 팀 규칙
> PR 템플릿에 “ESLint/Prettier 통과” 체크박스를 넣어 품질 게이트를 만듭니다.

---

## 5. 환경변수 · 경로 별칭 · 공통 유틸

* **환경변수**: Vite는 `import.meta.env` 사용. 파일명은 `.env`, `.env.development`, `.env.production`

```env
VITE_API_BASE_URL=https://api.example.com
```

```ts
// 예: axios 인스턴스
import axios from 'axios'
export const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })
```

* **경로 별칭**: `@` → `/src` (vite.config.ts의 `resolve.alias` 참고)
* **유틸/서비스 레이어**: `src/services`, `src/utils`로 분리, API 응답 타입은 `types/`에 명세

---

## 6. 스크립트/빌드/배포 체크리스트

* `pnpm dev` 로컬 개발 서버(HMR)
* `pnpm build` 산출물: `dist/`
* 정적 호스팅(GitHub Pages/S3/CloudFront) 또는 SPA 지원 서버로 서빙
* 소스맵 운영여부, 환경별 API URL, 캐시 정책 점검

> \[!warning] 라우팅 404 문제
> SPA를 정적 호스팅 시 히스토리 모드 라우팅은 404가 날 수 있습니다. **fallback** 설정(예: S3/CloudFront 또는 nginx `try_files`)을 추가하세요.

---

## 7. Vue 3 심화/확장 포인트 (미리보기)

> Vue 2와 동일 챕터를 Vue 3 기준으로 확장할 때의 핵심 차이만 요약합니다.

### 7.1 프로젝트 생성 (Vue 3)

```bash
pnpm create vite vue3-starter --template vue-ts
cd vue3-starter
pnpm i
pnpm dev
```

* **엔트리**: `createApp(App).use(router).mount('#app')`
* **SFC**: `<script setup>` 기본, TypeScript 우선

### 7.2 폴더 구조 차이

* `pinia` 기본 상태관리 권장 (Vuex → 유지보수 모드)
* 컴포저블(`src/composables/`) 폴더 추가 권장: 재사용 로직은 훅 형태로 분리

### 7.3 설정 차이

* ESLint 확장: `eslint-plugin-vue` + `@vue/eslint-config-typescript` (Vue 3용)
* 빌드/배포 프로세스는 Vite 동일하나, **코드 스플리팅/동적 임포트** 활용 범위 확대

---

## 8. 최종 점검 체크리스트

* [ ] Node/패키지 매니저 통일, `.nvmrc`/`.editorconfig` 배포
* [ ] Vite + Vue 2 템플릿 실행 확인(HMR/빌드 정상)
* [ ] ESLint/Prettier 통과 및 PR 품질게이트 설정
* [ ] `.env` 분리 및 `import.meta.env` 적용
* [ ] 라우팅 404 fallback 설정 문서화
* [ ] README에 로컬 실행/빌드/배포 가이드 기재
* [ ] (옵션) Vue 3 스타터도 병행 생성하여 비교 학습

---

## 부록 A. Vuex ↔ Pinia (Vue 2에서의 선택)

* 기존 레거시는 **Vuex** 유지가 자연스러움
* 신규 모듈/도메인은 **Pinia**로 도입해 Vue 3 전환 대비 가능

```bash
# Vue 2 + Pinia
pnpm add pinia
```

```ts
// main.ts (Vue 2에서의 Pinia 마운트 — @vue/composition-api 필요X, Vue2.7 기준)
import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({ pinia, render: h => h(App) }).$mount('#app')
```

> \[!tip] 점진 전환
> 새 기능은 Pinia로, 기존 기능은 Vuex로: **혼재 기간**을 허용하는 전략이 마이그레이션 리스크를 줄입니다.
