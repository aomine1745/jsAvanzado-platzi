class MediaPlayer {
  media: HTMLMediaElement
  plugins: Array<any>
  container!: HTMLElement

  constructor ({ el, plugins }) {
    this.media = el
    this.plugins = plugins || []
    this.initPlayer()
    this.initPlugins()
  }

  private initPlayer () {
    this.container = document.createElement('div')
    this.container.style.position = 'relative'
    this.media.parentNode!.insertBefore(this.container, this.media)
    this.container.appendChild(this.media)
  }

  private initPlugins () {
    // const player = {
    //   play: () => this.play(),
    //   pause: () => this.pause(),
    //   media: this.media,
    //   get muted () {
    //     return this.media.muted
    //   },
    //   set muted (value) {
    //     this.media.muted = value
    //   }
    // }

    this.plugins.forEach(plugin => {
      // plugin.run(player)
      plugin.run(this)
    })
  }

  play () {
    this.media.play()
  }

  pause () {
    this.media.pause()
  }

  togglePlay () {
    this.media.paused ? this.play() : this.pause()
  }

  mute () {
    this.media.muted = true
  }

  unmute () {
    this.media.muted = false
  }

  toggleMuted () {
    this.media.muted ? this.unmute() : this.mute()
  }
}

export default MediaPlayer
