<script setup lang="ts">
import { computed } from 'vue'
import DocsSection from '../DocsSection.vue'
import DocsSubsection from '../DocsSubsection.vue'
import DocsExample from '../DocsExample.vue'
import DocsCode from '../DocsCode.vue'
import { Links } from '../../constants/links'

const emit = defineEmits<{
  copyHtml: []
}>()

const setupCode = computed(
  () => `<!-- 1. Plyr CSS (CDN) -->
<link rel="stylesheet" href="${Links.PLYR_CSS}" />

<!-- 2. Style playerow -->
<link rel="stylesheet" href="${Links.PLAYERS_CSS}" />

<!-- 3. Plyr JS (CDN, przed skryptami playerow) -->
<script src="${Links.PLYR_JS}"><\/script>

<!-- 4. Skrypty playerow -->
<script src="${Links.AUDIO_PLAYER}"><\/script>
<script src="${Links.VIDEO_PLAYER}"><\/script>

<!-- 5. Inicjalizacja -->
<script>
  audioPlayer.initAudioPlayers();
  videoPlayer.initVideoPlayers();
<\/script>`,
)

const videoPlayerMarkupApiCode = computed(
  () => `<!-- HTML -->
<div
  class='c-video-player'
  data-video-player
  data-player-id='hero'
  data-plyr-config='{"autoplay":true,"muted":true,"clickToPlay":false}'
>
  <video poster='${Links.VIDEO_POSTER}' preload='metadata'>
    <source src='${Links.VIDEO_SAMPLE}' type='video/mp4'>
  </video>
</div>`,
)

const videoPlayerJsApiCode = `// JS
videoPlayer.initVideoPlayers(document, {
  getOptions: (container) => {
    if (container.dataset.playerId === 'hero') {
      return {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      }
    }

    return {}
  },
  onInit: ({ player, container }) => {
    if (container.dataset.playerId !== 'hero') {
      return
    }

    player.on('play', () => {
      console.log('Video wystartowalo')
    })

    player.on('ended', () => {
      console.log('Video zakonczone')
    })
  },
})

const heroPlayer = videoPlayer.getVideoPlayer('[data-player-id="hero"]')

if (heroPlayer) {
  heroPlayer.currentTime = 15
  heroPlayer.play()
}`
</script>

<template>
  <DocsSection id="odtwarzacze" title="Odtwarzacze">
    <template #description>
      <p>
        Odtwarzacze audio i video wymagaja biblioteki
        <a href="https://plyr.io/" target="_blank" rel="noopener">Plyr</a> oraz dedykowanych stylow
        i skryptow.
      </p>
      <DocsCode :code="setupCode" />
    </template>

    <DocsSubsection id="audio-player" title="Odtwarzacz audio">
      <template #description>
        Kontener musi miec atrybut <code>data-audio-player</code> oraz zawierac element
        <code>&lt;audio&gt;</code>. Wywolaj <code>audioPlayer.initAudioPlayers()</code> po
        wyrenderowaniu elementow.
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
        Kontener musi miec atrybut <code>data-video-player</code> oraz zawierac element
        <code>&lt;video&gt;</code>. Wywolaj <code>videoPlayer.initVideoPlayers()</code> po
        wyrenderowaniu elementow.
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

    <DocsSubsection id="video-player-api" title="API Plyr per player">
      <template #description>
        <p>
          Kazdy kontener moze miec wlasny config Plyr przez atrybut
          <code>data-plyr-config</code> z JSON-em. Konfiguracja jest mergowana z domyslnym configiem
          playera oraz z opcjami przekazanymi do <code>videoPlayer.initVideoPlayers()</code>.
        </p>
        <p>
          Do pelnego API Plyr uzyj <code>onInit</code> oraz
          <code>videoPlayer.getVideoPlayer()</code>. W <code>onInit</code> dostajesz instancje
          konkretnego playera, wiec mozesz podpinac eventy Plyr przez
          <code>player.on('ended')</code>, <code>player.on('play')</code> itd. oraz wywolywac metody
          typu <code>play()</code>, <code>pause()</code> czy ustawiac <code>currentTime</code>,
          <code>autoplay</code> i pozostale opcje / wlasciwosci Plyr.
        </p>
        <p>
          Jesli potrzebujesz hooka inicjalizacyjnego, uzyj <code>onInit</code>. To najpewniejsze
          miejsce na logike startowa dla konkretnego playera.
        </p>
        <DocsCode :code="videoPlayerMarkupApiCode" />
        <DocsCode :code="videoPlayerJsApiCode" language="javascript" />
      </template>
    </DocsSubsection>
  </DocsSection>
</template>
