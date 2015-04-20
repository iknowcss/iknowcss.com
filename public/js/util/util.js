(function (ik, ko, $) {

  var isMousewheelAvailable = !/(iPad|iPhone|iPod)/g.test(navigator.userAgent);

  ik.util.pageYOffset = ko.observable(0);
  $(window)
    .on(isMousewheelAvailable ? 'mousewheel' : 'scroll', updatePageYOffset)
    .on('load', updatePageYOffset);
  function updatePageYOffset() {
    ik.util.pageYOffset(window.pageYOffset);
  }

}(window.ik, window.ko, window.jQuery));