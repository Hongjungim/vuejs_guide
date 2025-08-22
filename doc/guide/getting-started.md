# Getting Started

Welcome to the **Vue.js Guide**!

## Installation
```bash
npm install vue

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Clicked {{ count }} times</button>
</template>