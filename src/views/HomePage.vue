<script setup lang="ts">
import { ref } from 'vue'
import ScaleDegreeForm from '@/views/ScaleDegreeForm.vue'
import CustomChordForm from '@/views/CustomChordForm.vue'

type Tab = 'degree' | 'notation'
const activeTab = ref<Tab>('notation')
</script>

<template>
  <main class="py-3">
    <div class="container">
      <ul class="nav nav-tabs nav-fill mb-0">
        <li class="nav-item">
          <button
            class="nav-link w-100"
            :class="{ active: activeTab === 'degree' }"
            @click="activeTab = 'degree'"
          >
            By scale degree
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link w-100"
            :class="{ active: activeTab === 'notation' }"
            @click="activeTab = 'notation'"
          >
            By notation
          </button>
        </li>
      </ul>
    </div>

    <div class="tab-content app-block">
      <div class="tab-pane" :class="{ 'show active': activeTab === 'degree' }">
        <scale-degree-form />
      </div>
      <div class="tab-pane" :class="{ 'show active': activeTab === 'notation' }">
        <custom-chord-form />
      </div>
    </div>
  </main>
</template>
