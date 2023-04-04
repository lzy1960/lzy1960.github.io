function initVideo() {
    var div = document.createElement('div');
    div.setAttribute('id', 'hero-video-wrapper');
    var video = document.createElement('video');
    video.setAttribute('id', 'hero-video');
    video.src = '/background.mp4';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    var blogHero = document.querySelector('.blog-hero');
    div.appendChild(video);
    blogHero === null || blogHero === void 0 ? void 0 : blogHero.appendChild(div);
}
initVideo();
