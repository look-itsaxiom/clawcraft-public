<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const API_URL = 'https://clawcraft.world'
const POLL_INTERVAL = 15000

interface ActiveCharacter {
  tag: string
  class: string
  level: number
  location: string
  activity: string
}

interface LocationInfo {
  type: string
  name: string
  region?: string
}

interface ActivityData {
  activeCharacters: ActiveCharacter[]
  locations: Record<string, LocationInfo>
  timestamp: string
}

const data = ref<ActivityData | null>(null)
const error = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const classColors: Record<string, string> = {
  warrior: '#e74c3c',
  scout: '#2ecc71',
  magician: '#3498db',
}

// Group characters by location for display
const locationGroups = computed(() => {
  if (!data.value) return []
  const groups: Record<string, { location: LocationInfo; characters: ActiveCharacter[] }> = {}

  for (const char of data.value.activeCharacters) {
    if (!groups[char.location]) {
      groups[char.location] = {
        location: data.value.locations[char.location] || { type: 'unknown', name: char.location },
        characters: [],
      }
    }
    groups[char.location].characters.push(char)
  }

  return Object.values(groups)
})

const playerCount = computed(() => data.value?.activeCharacters.length ?? 0)

const summaryText = computed(() => {
  if (error.value) return 'Could not reach the game server...'
  if (!data.value) return 'Checking the world...'
  if (playerCount.value === 0) return 'The world is quiet... be the first adventurer.'
  if (playerCount.value === 1) return '1 adventurer online'
  return `${playerCount.value} adventurers online`
})

async function fetchActivity() {
  try {
    const res = await fetch(`${API_URL}/world/activity`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    data.value = await res.json()
    error.value = false
  } catch {
    error.value = true
  }
}

onMounted(() => {
  fetchActivity()
  timer = setInterval(fetchActivity, POLL_INTERVAL)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="activity-visualizer">
    <div class="activity-header">
      <div class="pulse-dot" :class="{ active: playerCount > 0, offline: error }" />
      <span class="summary">{{ summaryText }}</span>
    </div>

    <div v-if="playerCount > 0" class="zone-map">
      <div
        v-for="group in locationGroups"
        :key="group.location.name"
        class="zone"
      >
        <div class="zone-name">{{ group.location.name }}</div>
        <div class="zone-dots">
          <span
            v-for="char in group.characters"
            :key="char.tag"
            class="player-dot"
            :style="{ backgroundColor: classColors[char.class] || '#999' }"
            :title="`${char.tag} (Lv${char.level} ${char.class})`"
          />
        </div>
      </div>
    </div>

    <div v-else-if="!error && data" class="empty-world">
      <div class="zone-map dimmed">
        <div class="zone" v-for="name in ['Burg', 'Grasslands Road', 'Goblin Warren']" :key="name">
          <div class="zone-name">{{ name }}</div>
          <div class="zone-dots"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-visualizer {
  margin: 1.5rem 0;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.activity-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.pulse-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #888;
  flex-shrink: 0;
}

.pulse-dot.active {
  background: #2ecc71;
  animation: pulse 2s ease-in-out infinite;
}

.pulse-dot.offline {
  background: #e74c3c;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.summary {
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.zone-map {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.zone-map.dimmed {
  opacity: 0.35;
}

.zone {
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  min-width: 120px;
}

.zone-name {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.4rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.zone-dots {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  min-height: 12px;
}

.player-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.empty-world {
  opacity: 0.5;
}
</style>
