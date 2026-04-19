<script setup lang="ts">
import { useConfig } from '@/helpers/config'

const config = useConfig()
const version = config.version
</script>

<template>
  <header id="nav">
    <h1>Junior Composer Friend</h1>
  </header>
  <router-view />
  <footer>
    <font-aw icon="magic" /> Invoked from the magic kingdom by
    <a href="https://github.com/mp3000mp/junior-composer-friend">
      mp3000
      <font-aw icon="hand-sparkles" />
    </a>
    <div>v{{ version }}</div>
  </footer>
</template>
