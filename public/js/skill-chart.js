(function (ik, d3) {

  var BAR_HEIGHT = 20,
      BAR_SPACING = 5;

  var COLORS = [
    [255, 0, 0, 0.5],
    [0, 255, 0, 0.5],
    [0, 0, 255, 0.5]
  ];

  ik.SkillChart = SkillChart;

  function SkillChart(svgSelector, skillData) {
    if (!(this instanceof SkillChart)) {
      return new SkillChart(svgSelector, skillData);
    }

    this.svg = d3.select(svgSelector);
    this.skillData = skillData;
    this.barHeight = BAR_HEIGHT;
    this.barSpacing = BAR_SPACING;

    // Scale the number of months since the epoch to a percentage of total time
    this.monthScale = d3.scale.linear()
      .domain([0, monthsFromEpoch(skillData.PRESENT)])
      .range([0, 100]);
    
    // this.displaySkillGroup('Web');
    // this.displaySkillGroup('Server Platforms');
    // this.displaySkillGroup('Languages');
    // this.displaySkillGroup('Source control');
    this.displaySkillGroup('Project management');
    // this.displaySkillGroup('IDEs');
    // this.displaySkillGroup('OS');
    // this.displaySkillGroup('Database');
    // this.displaySkillGroup('Testing');
  }

  _.extend(SkillChart.prototype, {

    displaySkillGroup: function (groupName) {
      var self = this,
          skillIndex = _.findIndex(this.skillData.skills, 'groupName', groupName),
          skillGroup = this.skillData.skills[skillIndex],
          data = barDataFromItems(skillGroup.items),
          skillBars = this.svg.selectAll('rect').data(data);

      var barYMap = {},
          barColorMap = {},
          i = 0;

      skillBars.enter()
        .append('rect')
        .attr('x', function (d) {
          return self.monthScale(d.start) + '%';
        })
        .attr('y', function (d) {
          return (self.barHeight + self.barSpacing) * (barYMap.hasOwnProperty(d.name) ?
            barYMap[d.name] : (barYMap[d.name] = i++));
        })
        .attr('height', this.barHeight)
        .attr('width', 0)
        .attr('fill', function (d) {
          return barColorMap.hasOwnProperty(d.name) ?
            barColorMap[d.name] : (barColorMap[d.name] = rgba(COLORS[barYMap[d.name] % COLORS.length]))
        });

      skillBars.transition()
        .duration(750)
        .attr('width', function (d) {
          return self.monthScale(d.end - d.start) + '%';
        });
    }

  });

  /// - Util -------------------------------------------------------------------

  var EPOCH_YEAR = 2005;

  function monthsFromEpoch(date) {
    return 12 * (date[0] - EPOCH_YEAR) + (date[1] - 1);
  }

  function barDataFromItems(items) {
    var data = [];
    _.each(items, function (item) {
      _.each(_.map(item.periods, function (period) {
        var start = monthsFromEpoch(period.from),
            end = monthsFromEpoch(period.to); 
        return { name: item.itemName, start: start, end: end };
      }), function (d) {
        console.log(d)
        data.push(d);
      });
    });
    return data;
  }

  function rgba(color) {
    return 'rgba(' + color.join(',') + ')';
  }

}(window.ik, window.d3));