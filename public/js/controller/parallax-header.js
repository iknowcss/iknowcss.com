(function (ik, ko, $) {

  ik.controller.register('parallax-header', function (element) {

    var $element = $(element),
        slider = $element.find('.slider'),
        title = $element.find('.title'),
        scroll = window.pageYOffset;

    function applyParallax() {
      slider.css('top', -window.pageYOffset / 2 + 'px');
      title.css('top', window.pageYOffset / 3 + 'px');
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