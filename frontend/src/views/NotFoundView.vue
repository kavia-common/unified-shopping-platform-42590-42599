<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="center">
    <h2 class="title">Page not found</h2>
    <p class="muted">The page you were looking for does not exist.</p>
    <RouterLink to="/" class="btn">Go home</RouterLink>
  </div>
</template>

<style scoped>
.center { min-height: 40vh; display: grid; place-items: center; gap: .75rem; text-align: center; }
.title { font-size: 1.5rem; font-weight: 600; }
.muted { color: #6b7280; }
.btn { display: inline-block; background: #2563EB; color: #fff; padding: .5rem .9rem; border-radius: .5rem; text-decoration: none; }
.btn:hover { background: #1d4ed8; }
</style>
