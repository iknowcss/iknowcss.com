(function (ik, ko) {

  ik.controller.register('main', function (element) {
    var $element = $(element),
        sliderHeight = ko.observable().subscribeTo('parallax-slider-height', true);

    function repositionMain() {
      $element.css('margin-top', sliderHeight() + 'px');
    }

    sliderHeight.subscribe(repositionMain);
    repositionMain();
  });

}(window.ik, window.ko));