const PUBLIC_FILES_BASE = '%VITE_PROXY_URL%/api/public-files/'

const withPublicBase = (path: string) => `${PUBLIC_FILES_BASE}${path.replace(/^\/+/, '')}`

export const Links = {
  AUDIO_PLAYER: withPublicBase('audio-player.js'),
  AUDIO_SAMPLE: withPublicBase('audio/audio.mp3'),
  VIDEO_PLAYER: withPublicBase('video-player.js'),
  VIDEO_SAMPLE:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  VIDEO_POSTER: 'https://peach.blender.org/wp-content/uploads/bbb-splash.png',
} as const
