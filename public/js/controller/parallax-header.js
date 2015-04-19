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

    $(window).on('mousewheel', applyParallax);
    $(applyParallax);

    function publishSliderHeight() {
      ko.postbox.publish('parallax-slider-height', slider.height());
    }

    $(window).on('resize', publishSliderHeight);
    publishSliderHeight();

  });

}(window.ik, window.ko, window.jQuery));