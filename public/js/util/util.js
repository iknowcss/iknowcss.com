(function (ik, ko, $) {

  var isMousewheelAvailable = !/(iPad|iPhone|iPod)/g.test(navigator.userAgent);

  ik.util.pageYOffset = ko.observable(0);
  $(window).on('load DOMMouseScroll keyup keydown mousewheel scroll', function () {
    ik.util.pageYOffset(window.pageYOffset);
  });
  

}(window.ik, window.ko, window.jQuery));