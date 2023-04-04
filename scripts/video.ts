function initVideo () {
  const div = document.createElement('div')
  div.setAttribute('id', 'hero-video-wrapper')

  const video = document.createElement('video')
  video.setAttribute('id', 'hero-video')
  video.poster = '/background.jpg'
  video.src = '/background.mp4'
  video.autoplay = true
  video.loop = true
  video.muted = true

  const blogHero = document.querySelector('.blog-hero')
  div.appendChild(video)
  blogHero?.appendChild(div)
}
initVideo()
