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

  var lastSnapSize;
  window.addEventListener('resize', function () {
    var width = window.innerWidth,
        newSnapSize = 'xs';
    if (width >= 1200) newSnapSize = 'lg';
    else if (width >= 992) newSnapSize = 'md';
    else if (width >= 768) newSnapSize = 'sm';

    if (newSnapSize === 'xs' || lastSnapSize !== newSnapSize) {
      chart.resizeAndRender({ transition: false });
      lastSnapSize = newSnapSize;
    }
  });

}());