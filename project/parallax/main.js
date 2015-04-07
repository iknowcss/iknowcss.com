(function () {

  var imgSrc = 'http://www.psdgraphics.com/file/colorful-triangles-background.jpg';

  var mirror = document.getElementById('mirror'),
      slider = document.getElementById('slider');

  var prevScroll;
  function requestRender() {
    window.requestAnimationFrame(requestRender);

    if (window.pageYOffset !== prevScroll) {
      prevScroll = window.pageYOffset;
      slider.style.top = -prevScroll / 10 + 'px';
    }
  }
  requestRender();

}());