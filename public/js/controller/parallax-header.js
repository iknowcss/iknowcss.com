(function (ik, ko, $) {

  ik.controller.register('parallax-header', function (element) {

    var $body = $('body'),
        $element = $(element),
        slider = $element.find('.slider'),
        title = $element.find('.title');

    function applyParallax() {
      var offset = ik.util.pageYOffset(),
          sliderOffset = (offset < 0 ? -offset : -offset / 2),
          titleOffset = (offset < 0 ? -offset : -offset / 1.5);
      slider.css('top', sliderOffset + 'px');
      title.css('top', titleOffset + 'px');
    }

    ik.util.pageYOffset.subscribe(applyParallax);
    slider.on('load', applyParallax);

    function repositionBodyForSlider() {
      var height = slider.height();
      $body.css('margin-top', height);
      ko.postbox.publish('parallax-slider-height', height);
    }

    $(window).on('resize', repositionBodyForSlider);
    slider.on('load', repositionBodyForSlider);

    return {
      sliderSrc: 'public/img/sydney-xs.jpg'
    };
  });

  

}(window.ik, window.ko, window.jQuery));