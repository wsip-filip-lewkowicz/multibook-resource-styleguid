<script setup lang="ts">
import DocsSection from '../DocsSection.vue'
import DocsSubsection from '../DocsSubsection.vue'
import DocsExample from '../DocsExample.vue'
import { Links } from '../../constants/links'

const emit = defineEmits<{
  copyHtml: []
}>()
</script>

<template>
  <DocsSection id="odtwarzacze" title="Odtwarzacze">
    <DocsSubsection id="audio-player" title="Odtwarzacz audio">
      <template #description>
        Aby odtwarzacz dzialal, podlacz skrypt
        <code>&lt;script type="module" src="{{ Links.AUDIO_PLAYER }}"&gt;&lt;/script&gt;</code>
        i wywolaj <code>initAudioPlayers()</code> po wyrenderowaniu elementow.
      </template>
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<div class='c-audio-player' data-audio-player>
  <audio src='/audio/audio.mp3' preload='metadata'></audio>
</div>`"
      >
        <div class="c-audio-player" data-audio-player>
          <audio src="/audio/audio.mp3" preload="metadata"></audio>
        </div>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="video-player" title="Odtwarzacz video (plik)">
      <template #description>
        Aby odtwarzacz dzialal, podlacz skrypt
        <code>&lt;script type="module" src="{{ Links.VIDEO_PLAYER }}"&gt;&lt;/script&gt;</code>
        i wywolaj <code>initVideoPlayers()</code> po wyrenderowaniu elementow.
      </template>
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<div class='c-video-player' data-video-player>
  <video poster='https://example.com/poster.jpg' preload='metadata'>
    <source src='https://example.com/video.mp4' type='video/mp4'>
  </video>
</div>`"
      >
        <div class="c-video-player" data-video-player>
          <video :poster="Links.VIDEO_POSTER" preload="metadata">
            <source :src="Links.VIDEO_SAMPLE" type="video/mp4" />
          </video>
        </div>
      </DocsExample>
    </DocsSubsection>

    <DocsSubsection id="video-player-title" title="Odtwarzacz video z tytulem">
      <template #description>
        Mozna dodac atrybut <code>data-title</code> aby wyswietlic tytul na gorze video. Tytul
        pojawia sie wraz z kontrolkami.
      </template>
      <DocsExample
        @copy="emit('copyHtml')"
        :code="`<div class='c-video-player' data-video-player data-title='Big Buck Bunny'>
  <video poster='...' preload='metadata'>
    <source src='...' type='video/mp4'>
  </video>
</div>`"
      >
        <div class="c-video-player" data-video-player data-title="Big Buck Bunny">
          <video :poster="Links.VIDEO_POSTER" preload="metadata">
            <source :src="Links.VIDEO_SAMPLE" type="video/mp4" />
          </video>
        </div>
      </DocsExample>
    </DocsSubsection>
  </DocsSection>
</template>
