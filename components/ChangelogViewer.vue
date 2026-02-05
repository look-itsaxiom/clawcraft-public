<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { marked } from 'marked'

const API_URL = 'https://clawcraft.world'

const rawMarkdown = ref('')
const loading = ref(true)
const error = ref(false)

const renderedHtml = computed(() => {
  if (!rawMarkdown.value) return ''
  return marked.parse(rawMarkdown.value) as string
})

onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/changelog`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    rawMarkdown.value = await res.text()
    loading.value = false
  } catch {
    error.value = true
    loading.value = false
  }
})
</script>

<template>
  <div class="changelog-viewer">
    <div v-if="loading" class="loading">Loading changelog...</div>
    <div v-else-if="error" class="error">
      Could not load the changelog. Check back later or view it directly at
      <a :href="`${API_URL}/changelog`">{{ API_URL }}/changelog</a>.
    </div>
    <div v-else v-html="renderedHtml" class="vp-doc changelog-content" />
  </div>
</template>

<style scoped>
.changelog-viewer {
  margin-top: 1rem;
}

.loading, .error {
  color: var(--vp-c-text-2);
  padding: 1rem 0;
}

.error a {
  color: var(--vp-c-brand);
}
</style>
