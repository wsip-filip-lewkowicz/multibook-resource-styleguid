<script setup lang="ts">
import { navItems } from '../constants/navigation'

defineProps<{
  activeSection: string
}>()
</script>

<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <a
        v-for="item in navItems"
        :key="item.id"
        :href="`#${item.id}`"
        class="sidebar-link"
        :class="{ active: activeSection === item.id }"
      >
        {{ item.label }}
      </a>
    </nav>
  </aside>
</template>
