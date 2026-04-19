<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ScaleDegreeForm from '@/views/ScaleDegreeForm.vue'
import CustomChordForm from '@/views/CustomChordForm.vue'

type Tab = 'degree' | 'notation'

const route = useRoute()
const router = useRouter()

const activeTab = computed<Tab>(() => (route.name === 'degree' ? 'degree' : 'notation'))

function setTab(tab: Tab) {
  router.push({ name: tab })
}
</script>

<template>
  <main>
    <div class="container d-flex justify-content-center my-2">
      <ul class="nav nav-underline tab-switcher">
        <li class="nav-item">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'degree' }"
            @click="setTab('degree')"
          >
            <font-aw icon="music" class="me-2" />By scale degree
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'notation' }"
            @click="setTab('notation')"
          >
            <font-aw icon="pen" class="me-2" />By notation
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

<style scoped>
.tab-switcher .nav-link {
  color: var(--bs-body-color);
  font-weight: 500;
  opacity: 0.5;
}

.tab-switcher .nav-link.active,
.tab-switcher .nav-link:hover {
  opacity: 1;
}
</style>
