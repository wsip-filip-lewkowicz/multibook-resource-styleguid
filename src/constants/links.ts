const PUBLIC_FILES_BASE = '%VITE_PROXY_URL%/api/public-files/'

const withPublicBase = (path: string) => `${PUBLIC_FILES_BASE}${path.replace(/^\/+/, '')}`

export const Links = {
  // Plyr CDN
  PLYR_CSS: 'https://cdn.plyr.io/3.7.8/plyr.css',
  PLYR_JS: 'https://cdn.plyr.io/3.7.8/plyr.js',

  // Player assets
  PLAYERS_CSS: withPublicBase('players.css'),
  AUDIO_PLAYER: withPublicBase('audio-player.js'),
  VIDEO_PLAYER: withPublicBase('video-player.js'),

  // Sample media
  AUDIO_SAMPLE: withPublicBase('audio/audio.mp3'),
  VIDEO_SAMPLE:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  VIDEO_POSTER: 'https://peach.blender.org/wp-content/uploads/bbb-splash.png',
} as const
