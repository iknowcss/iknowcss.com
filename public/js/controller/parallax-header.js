(function (ik, ko, $) {

  ik.controller.register('parallax-header', function (element, paramsAccessor) {

    var $window = $(window),
        $body = $('body'),
        $element = $(element),
        params = ko.unwrap(paramsAccessor),
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
    $(applyParallax);

    function repositionBodyForSlider() {
      var height = $window.width() * params.imgHeight / params.imgWidth,
          fontSize = height * 0.25;
      $body.css('margin-top', height);
      title.css('font-size', fontSize + 'px')
      ko.postbox.publish('parallax-slider-height', height);
    }

    $(window).on('resize', repositionBodyForSlider);
    $(repositionBodyForSlider);

    return {
      sliderSrc: 'public/img/sydney-full.jpg'
    };
  });

  

}(window.ik, window.ko, window.jQuery));