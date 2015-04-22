(function (ik, $) {

  ik.controller.register('skill-chart', function (element) {

    var chart = ik.SkillChart({
      svg   : $(element).find('#skill-svg')[0],
      data  : ik.skillData
    });

    // Define the groups
    var groups = _.pluck(ik.skillData.skills, 'groupName');

    // Create the view model
    var vm = {
      activeGroup : ko.observable(),
      groups      : groups,
      selectGroup : function (newGroup, el) {
        vm.activeGroup(newGroup);
        // console.log(el.target.blur());
      }
    };

    // Update the chart when the active group changes
    // vm.activeGroup.subscribe(function (newGroup) {
    //   chart.setSkillGroup(newGroup);
    // });

    // Start with the first group
    // vm.activeGroup(groups[0]);

    return vm;
  });

}(window.ik, window.jQuery));