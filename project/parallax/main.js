(function () {

  var imgSrc = 'http://www.psdgraphics.com/file/colorful-triangles-background.jpg';

  var mirror = document.getElementById('mirror'),
      slider = document.getElementById('slider'),
      y = 0;

  var requested = false;
  function requestRender() {
    if (requested) {
      console.log('dump');
      return;
    }
    requested = true;
    window.requestAnimationFrame(function () {
      slider.style.top = -window.scrollY / 10 + 'px';
      requested = false;
    });
  }

  window.addEventListener('scroll', requestRender);

}());