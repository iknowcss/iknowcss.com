(function (ik) {

  var Util = {};
  
  ik.util = Util;

  /// - Bootstrap resize listener ----------------------------------------------

  var snapListeners = [];

  Util.addBootstrapSizeListener = function (fn) {
    snapListeners.push(fn);
  };

  Util.getBootstrapSize = function () {
    var width = window.innerWidth;
    if (width >= 1200) return 'lg';
    if (width >= 992) return 'md';
    if (width >= 768) return 'sm';
    return 'xs';
  };

  (function () {
    // When the window resizes, check to see if bootstrap responded
    var bootstrapSize;
    var SIZE_MAP = {
      '480'  :'xs',
      '768'  :'sm',
      '992'  :'md',
      '1200' :'lg'
    };

    function handleResize() {
      var newSize = Util.getBootstrapSize();
      if (bootstrapSize !== newSize) {
        bootstrapSize = newSize;
        _.each(snapListeners, function (fn) {
          fn.call(window, newSize);
        });
      }
    }

    // Init
    window.addEventListener('resize', handleResize);
  }());

}(window.ik))