(function (ik, ko) {

  ko.bindingHandlers.controller = {

    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      var controllerName = ko.unwrap(valueAccessor()),
          params = allBindings().controllerParams,
          viewModelFactory = controllers[controllerName],
          viewModel;
      if (_.isFunction(viewModelFactory)) {
        ko.applyBindingsToDescendants(viewModelFactory(element, params), element);
      } else {
        throw new Error('Unknown controller name: ' + controllerName);
      }
      return { controlsDescendantBindings: true };
    }

  };


  var controllers = {};
  ik.controller = {

    register: function (name, viewModelFactory) {
      controllers[name] = viewModelFactory;
    }

  };

}(window.ik, window.ko));