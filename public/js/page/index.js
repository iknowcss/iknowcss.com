(function () {

  var chart = ik.SkillChart({
    container : '#skill-svg',
    data      : ik.skillData
  });

  var groups = [
    'Web',
    'Server Platforms',
    'Languages',
    'Source control',
    'Management tools',
    'IDEs',
    'OS',
    'Database',
    'Testing'
  ];

  var skillButtons = document.getElementById('skill-buttons');

  // Create a button for each skill group
  _.each(groups, function (groupName) {
    var element = document.createElement('button');
    element.innerText = groupName;
    skillButtons.appendChild(element);
    element.addEventListener('click', function () {
      chart.setSkillGroup(groupName);
    });
  });

}());