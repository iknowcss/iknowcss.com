(function (ik, ko) {

  ik.controller.register('main-nav', function (element) {
    var $element = $(element),
        sliderHeight = ko.observable().subscribeTo('parallax-slider-height', true);
    var isNavFixed = ko.pureComputed(function () {
      return sliderHeight() - ik.util.pageYOffset() - $element.height() <= 0;
    });

    function affixNav(fixed) {
      if (fixed) {
        $element.css({
          'position': 'fixed',
          'margin-top': 0,
          'top': 0,
          'background-color': opaqueColor($element.css('background-color'))
        });
        console.log()
      } else {
        $element.removeAttr('style');
      }
    }

    isNavFixed.subscribe(affixNav);
    affixNav();
  });

  function opaqueColor(rgbaColorString) {
    return rgbaColorString.replace(/((?:\d+, *){3})[\d\.]+/, '$1 1');
  }

}(window.ik, window.ko));