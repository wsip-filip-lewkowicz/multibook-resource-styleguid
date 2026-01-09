<script setup lang="ts">
import DocsSection from '../DocsSection.vue'
import DocsSubsection from '../DocsSubsection.vue'
import DocsExample from '../DocsExample.vue'

const emit = defineEmits<{
  copyHtml: []
}>()

const featuredIconSizes = [
  { name: 'XS', class: 'c-featured-icon--xs' },
  { name: 'S', class: 'c-featured-icon--s' },
  { name: 'M', class: 'c-featured-icon--m' },
  { name: 'L', class: 'c-featured-icon--l' },
  { name: 'XL', class: 'c-featured-icon--xl' },
]

const featuredIconColors = [
  { name: 'Brand', class: 'c-featured-icon--brand', icon: 'ph-lightning' },
  { name: 'Gray', class: 'c-featured-icon--gray', icon: 'ph-arrow-square-in' },
  { name: 'Error', class: 'c-featured-icon--error', icon: 'ph-warning-circle' },
  { name: 'Warning', class: 'c-featured-icon--warning', icon: 'ph-warning' },
  { name: 'Success', class: 'c-featured-icon--success', icon: 'ph-check' },
]
</script>

<template>
  <DocsSection id="featured-icons" title="Ikony wyroznione">
    <DocsSubsection id="featured-icons-light-circle" title="Light circle">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<div class='c-featured-icon-group'>
  <div class='c-featured-icon-row'>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--brand c-featured-icon--xs'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--brand c-featured-icon--s'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--brand c-featured-icon--m'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--brand c-featured-icon--l'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--brand c-featured-icon--xl'><i class='ph ph-lightning'></i></div>
  </div>
  <div class='c-featured-icon-row'>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--brand c-featured-icon--m'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--gray c-featured-icon--m'><i class='ph ph-arrow-square-in'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--error c-featured-icon--m'><i class='ph ph-warning-circle'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--warning c-featured-icon--m'><i class='ph ph-warning'></i></div>
    <div class='c-featured-icon c-featured-icon--light-circle c-featured-icon--success c-featured-icon--m'><i class='ph ph-check'></i></div>
  </div>
</div>`"
      >
        <div class="c-featured-icon-group">
          <div class="c-featured-icon-row">
            <div
              v-for="size in featuredIconSizes"
              :key="`light-circle-brand-${size.name}`"
              class="c-featured-icon c-featured-icon--light-circle c-featured-icon--brand"
              :class="size.class"
            >
              <i class="ph ph-lightning"></i>
            </div>
          </div>
          <div class="c-featured-icon-row">
            <div
              v-for="color in featuredIconColors"
              :key="`light-circle-color-${color.name}`"
              class="c-featured-icon c-featured-icon--light-circle c-featured-icon--m"
              :class="color.class"
            >
              <i class="ph" :class="color.icon"></i>
            </div>
          </div>
        </div>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="featured-icons-circle-outline" title="Circle outline">
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<div class='c-featured-icon-group'>
  <div class='c-featured-icon-row'>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--brand c-featured-icon--xs'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--brand c-featured-icon--s'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--brand c-featured-icon--m'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--brand c-featured-icon--l'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--brand c-featured-icon--xl'><i class='ph ph-lightning'></i></div>
  </div>
  <div class='c-featured-icon-row'>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--brand c-featured-icon--m'><i class='ph ph-lightning'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--gray c-featured-icon--m'><i class='ph ph-arrow-square-in'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--error c-featured-icon--m'><i class='ph ph-warning-circle'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--warning c-featured-icon--m'><i class='ph ph-warning'></i></div>
    <div class='c-featured-icon c-featured-icon--circle-outline c-featured-icon--success c-featured-icon--m'><i class='ph ph-check'></i></div>
  </div>
</div>`"
      >
        <div class="c-featured-icon-group">
          <div class="c-featured-icon-row">
            <div
              v-for="size in featuredIconSizes"
              :key="`circle-outline-brand-${size.name}`"
              class="c-featured-icon c-featured-icon--circle-outline c-featured-icon--brand"
              :class="size.class"
            >
              <i class="ph ph-lightning"></i>
            </div>
          </div>
          <div class="c-featured-icon-row">
            <div
              v-for="color in featuredIconColors"
              :key="`circle-outline-color-${color.name}`"
              class="c-featured-icon c-featured-icon--circle-outline c-featured-icon--m"
              :class="color.class"
            >
              <i class="ph" :class="color.icon"></i>
            </div>
          </div>
        </div>
      </DocsExample>
    </DocsSubsection>
  </DocsSection>
</template>
