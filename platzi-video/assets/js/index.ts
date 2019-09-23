import MediaPlayer from '@aomine-/mediaplayer/lib/src/MediaPlayer'
import AutoPlay from '@aomine-/mediaplayer/lib/src/plugins/AutoPlay'
import AutoPause from '@aomine-/mediaplayer/lib/src/plugins/AutoPause'
import Ads from '@aomine-/mediaplayer/lib/src/plugins/Ads'

const video: HTMLMediaElement = document.querySelector('video')
const togglePlay: HTMLElement = document.getElementById('togglePlay')
const toggleMuted: HTMLElement = document.getElementById('toggleMuted')

const player = new MediaPlayer({
  el: video,
  plugins: [
    new AutoPlay(),
    new AutoPause(),
    new Ads()
  ]
})

togglePlay.addEventListener('click', () => player.togglePlay())
toggleMuted.addEventListener('click', () => player.toggleMuted())

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .catch(error => {
      console.log(error)
    })
}
