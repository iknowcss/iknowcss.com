(function (ik, ko, $) {

  ik.controller.register('parallax-header', function (element) {

    var $element = $(element),
        slider = $element.find('.slider'),
        title = $element.find('.title'),
        scroll = window.pageYOffset;

    function applyParallax() {
      var offset = window.pageYOffset,
          sliderOffset = (offset < 0 ? -offset : -offset / 2),
          titleOffset = (offset < 0 ? -offset : -offset / (1.5));
      slider.css('top', sliderOffset + 'px');
      title.css('top', titleOffset + 'px');
    }

    $(window).on(isMousewheelAvailable() ? 'mousewheel' : 'scroll', applyParallax);
    $(applyParallax);

    function publishSliderHeight() {
      ko.postbox.publish('parallax-slider-height', slider.height());
    }

    $(window).on('resize', publishSliderHeight);
    publishSliderHeight();

  });

  function isMousewheelAvailable() {
    return !/(iPad|iPhone|iPod)/g.test(navigator.userAgent);
  }

}(window.ik, window.ko, window.jQuery));