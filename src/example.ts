import Prism from 'prismjs'
import 'prism-themes/themes/prism-atom-dark.css'
import 'plyr/dist/plyr.css'

import './styles/index.css'
import './styles/app.css'
import './styles/example.css'

import { initAudioPlayers } from './scripts/audio-player'

const examplePlayerConfig = {
  autoplay: true,
  muted: true,
  controls: ['play', 'progress', 'current-time', 'mute', 'volume'],
}

const exampleCode = `<div
  class="c-audio-player"
  data-audio-player
  data-plyr-config='${JSON.stringify(examplePlayerConfig)}'
>
  <audio src="/audio/audio.mp3" preload="auto" autoplay muted></audio>
</div>

<script>
  audioPlayer.initAudioPlayers(document, {
    onInit: ({ player }) => {
      player.once('ready', () => {
        player.muted = true
        void Promise.resolve(player.play()).catch(() => {})
      })
    },
  })
</script>`

const exampleAudioPlayer = document.getElementById('example-audio-player')
if (exampleAudioPlayer) {
  exampleAudioPlayer.setAttribute('data-plyr-config', JSON.stringify(examplePlayerConfig))
}

const exampleCodeElement = document.getElementById('example-code')
if (exampleCodeElement) {
  const markupGrammar = Prism.languages.markup
  exampleCodeElement.innerHTML = markupGrammar
    ? Prism.highlight(exampleCode, markupGrammar, 'markup')
    : exampleCode
}

const copyExampleCodeButton = document.getElementById(
  'copy-example-code',
) as HTMLButtonElement | null
if (copyExampleCodeButton) {
  copyExampleCodeButton.addEventListener('click', async () => {
    await navigator.clipboard.writeText(exampleCode)

    const defaultLabel = 'Kopiuj kod'
    copyExampleCodeButton.textContent = 'Skopiowano'

    window.setTimeout(() => {
      copyExampleCodeButton.textContent = defaultLabel
    }, 2000)
  })
}

initAudioPlayers(document, {
  onInit: ({ player }) => {
    player.once('ready', () => {
      player.muted = true
      void Promise.resolve(player.play()).catch(() => {})
    })
  },
})
