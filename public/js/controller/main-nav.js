(function (ik, ko) {

  ik.controller.register('main-nav', function (element) {
    var $element = $(element),
        sliderHeight = ko.observable().subscribeTo('parallax-slider-height', true);
    var isNavFixed = ko.pureComputed(function () {
      return sliderHeight() - ik.util.pageYOffset() <= 0;
    });

    function affixNav(fixed) {
      if (fixed) {
        $element.css({
          'opacity': 1,
          'position': 'fixed',
          'top': 0
        });
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