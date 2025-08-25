# Vue 2 기본 필수 문법 가이드

> 이 문서는 Vue 2.x 프로젝트를 처음 시작하는 개발자를 위한 **핵심 문법 요약 가이드**입니다. Vue 3와 차이가 큰 부분은 마지막에 비교 참고를 붙였습니다.


## 1. 인스턴스 생성

Vue 2는 **Vue 생성자**를 사용해 인스턴스를 만듭니다.

```html
<div id="app">{{ message }}</div>
```

```js
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```



## 2. 데이터 바인딩 (Interpolation)

* **Mustache 문법** (`{{ }}`) 사용
* HTML 속성 바인딩은 `v-bind`

```html
<p>{{ message }}</p>
<a v-bind:href="link">Go to site</a>

<!-- 속성 바인딩 -->
<img v-bind:src="imageSrc" />

<!-- 동적 속성명 -->
<button v-bind:[key]="value"></button>

<!-- 축약형 -->
<img :src="imageSrc" />

<!-- 동일 이름 축약형 (3.4+), :src="src"로 확장됨 -->
<img :src />

<!-- 축약형 동적 속성명 -->
<button :[key]="value"></button>

<!-- 인라인 문자열 연결 -->
<img :src="'/path/to/images/' + fileName" />

<!-- 클래스 바인딩 -->
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]"></div>

<!-- 스타일 바인딩 -->
<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<!-- 속성 객체 바인딩 -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- prop 바인딩. "prop"은 자식 컴포넌트에서 선언되어야 함 -->
<MyComponent :prop="someThing" />

<!-- 부모와 자식 컴포넌트에서 공통된 prop 전달 -->
<MyComponent v-bind="$props" />

<!-- XLink -->
<svg><a :xlink:special="foo"></a></svg>
```

약어:

```html
<a :href="link">단축 표현</a>
```


## 3. 이벤트 처리

* `v-on` 디렉티브 사용
* 단축 표현: `@`

```html
<button v-on:click="count++">+</button>
<button @click="increase">Increase</button>
```

```js
data: { count: 0 },
methods: {
  increase() { this.count++ }
}
```


## 4. 양방향 데이터 바인딩

* `v-model` 디렉티브 사용

```html
<input v-model="username" placeholder="Enter name" />
<p>Hello, {{ username }}</p>
```

```js
data: { username: '' }
```

## 5. 조건부 렌더링

* `v-if`, `v-else-if`, `v-else`
* `v-show` (DOM은 남아 있고 CSS display만 제어)

```html
<p v-if="isLogin">Welcome back!</p>
<p v-else>Please login</p>
<p v-show="debug">디버그 모드</p>
```


## 6. 리스트 렌더링

* `v-for` 디렉티브 사용
* `:key` 속성 필수!

```html
<ul>
  <li v-for="(item, index) in items" :key="index">
    {{ index }}: {{ item }}
  </li>
</ul>
```

```js
data: { items: ['Apple', 'Banana', 'Orange'] }
```


## 7. 계산된 속성 (Computed)

* 데이터 기반으로 자동 캐싱된 속성

```html
<p>원래 메시지: {{ message }}</p>
<p>대문자: {{ upperMessage }}</p>
```

```js
data: { message: 'hello' },
computed: {
  upperMessage() {
    return this.message.toUpperCase()
  }
}
```


## 8. 감시자 (Watch)

* 특정 데이터 변경 시 실행되는 로직

```js
data: { count: 0 },
watch: {
  count(newVal, oldVal) {
    console.log(`count: ${oldVal} → ${newVal}`)
  }
}
```


## 9. 클래스 & 스타일 바인딩

### 9.1 클래스

```html
<p :class="{ active: isActive, error: hasError }">텍스트</p>
```

### 9.2 인라인 스타일

```html
<p :style="{ color: textColor, fontSize: size + 'px' }">스타일 적용</p>
```


## 10. 컴포넌트 기초

### 10.1 전역 컴포넌트 등록

```js
Vue.component('hello-component', {
  props: ['name'],
  template: '<p>Hello {{ name }}</p>'
})
```

```html
<hello-component name="Vue"></hello-component>
```

### 10.2 지역 컴포넌트 등록

```js
var Child = { template: '<p>Child!</p>' }

new Vue({
  el: '#app',
  components: { Child }
})
```


## 11. Props & Emit

* **Props**: 부모 → 자식 데이터 전달
* **Emit**: 자식 → 부모 이벤트 전달

```js
// Child.vue
props: ['value'],
methods: {
  notify() { this.$emit('update', this.value) }
}
```

```html
<!-- Parent.vue -->
<Child :value="msg" @update="handleUpdate"></Child>
```

## 12. 라이프사이클 훅

대표 훅:

* `created` : 데이터 초기화 로직
* `mounted` : DOM 접근 가능
* `updated` : 데이터 업데이트 후
* `destroyed` : 해제 직전

```js
new Vue({
  created() { console.log('인스턴스 생성됨') },
  mounted() { console.log('DOM 연결됨') }
})
```


## 13. 필터 (Filters)

Vue 2에서는 템플릿에 `|` 파이프 문법으로 간단한 변환 가능

```html
<p>{{ price | currency }}</p>
```

```js
filters: {
  currency(val) { return `$${val}` }
}
```

> Vue 3에서는 제거됨 → computed/methods 사용


## 14. 디렉티브 요약

* `v-bind` (`:`) → 속성 바인딩
* `v-on` (`@`) → 이벤트
* `v-model` → 양방향 바인딩
* `v-if / v-else / v-show` → 조건
* `v-for` → 반복
* `v-html` → HTML 삽입 (주의: XSS 위험)



## 📌 Vue 2 ↔ Vue 3 차이 요약

* 인스턴스 생성: `new Vue()` → `createApp()`
* 컴포넌트 옵션: Options API → Composition API (`setup`)
* 필터 제거 (Vue 3 없음)
* Vuex 대신 Pinia 권장 (Vue 2도 호환)



✅ 여기까지 배우면 Vue 2 프로젝트의 필수 문법은 대부분 커버됩니다.
