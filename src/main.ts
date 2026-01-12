import { createApp, nextTick } from 'vue'
import App from './App.vue'

// Importuj style plyr
import 'plyr/dist/plyr.css'

// Importuj eksportowalne style (CSS framework)
import './styles/index.css'

// Importuj style dokumentacji
import './styles/app.css'

import { initAudioPlayers } from './scripts/audio-player'
import { initVideoPlayers } from './scripts/video-player'

const app = createApp(App)
app.mount('#app')

// Initialize players after Vue has rendered the DOM
nextTick(() => {
  initAudioPlayers()
  initVideoPlayers()
})
