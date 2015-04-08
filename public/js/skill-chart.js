(function (ik, moment, d3) {

  /// - Export -----------------------------------------------------------------

  ik.SkillChart = SkillChart;

  /// - Constants --------------------------------------------------------------

  var EPOCH = momentFromArray([2005, 01]);

  var BAR_HEIGHT = 20,
      BAR_SPACING = 5,
      CHART_PADDING = 5;

  var COLORS = [
    [255, 0, 0, 0.5],
    [0, 255, 0, 0.5],
    [0, 0, 255, 0.5]
  ];

  /// - Constructor ------------------------------------------------------------

  function SkillChart(svgSelector, skillData) {
    if (!(this instanceof SkillChart)) {
      return new SkillChart(svgSelector, skillData);
    }

    this.chartWidth = 600;
    this.svg = d3.select(svgSelector);
    this.skillData = skillData;
    this.barHeight = BAR_HEIGHT;
    this.barSpacing = BAR_SPACING;
    this.chartPadding = CHART_PADDING;

    this.svg.attr('width', this.chartWidth + CHART_PADDING * 2);

    // Scale the number of months since the epoch to a percentage of total time
    this.monthScale = d3.time.scale()
      .domain([EPOCH.toDate(), momentFromArray(skillData.PRESENT).toDate()])
      .range([0, this.chartWidth]);

    this.skillBars = this.svg.append('g')
      .attr('transform', 'translate(' + this.chartPadding + ',' + this.chartPadding + ')');

    var axis = d3.svg.axis()
      .scale(this.monthScale)
      // .tickSize(20)
      .orient('bottom');
    this.xAxis = this.svg.append('g');
    this.xAxis
      .attr('class', 'axis')
      .call(axis);
  }

  _.extend(SkillChart.prototype, {

    displaySkillGroup: function (groupName) {
      var self = this,
          skillIndex = _.findIndex(this.skillData.skills, 'groupName', groupName),
          skillGroup = this.skillData.skills[skillIndex],
          data = barDataFromItems(skillGroup.items),
          skillBars = this.skillBars.selectAll('rect').data(data);

      var barYMap = {},
          barColorMap = {},
          i = 0;

      skillBars.exit().remove();

      skillBars.enter().append('rect');

      skillBars
          .attr('x', function (d) {
            return self.monthScale(d.start);
          })
          .attr('y', function (d) {
            return (self.barHeight + self.barSpacing) * (barYMap.hasOwnProperty(d.name) ?
              barYMap[d.name] : (barYMap[d.name] = i++));
          })
          .attr('width', 0)
          .attr('height', this.barHeight)
          .attr('fill', function (d) {
            return barColorMap.hasOwnProperty(d.name) ?
              barColorMap[d.name] : (barColorMap[d.name] = rgba(COLORS[barYMap[d.name] % COLORS.length]))
          })
        .call(function () {
          var chartHeight = i * (self.barHeight + self.barSpacing) - self.barSpacing;

          self.svg
            .transition()
            .attr('height', chartHeight + self.chartPadding * 2 + 25);

          var xAxisY = chartHeight + self.chartPadding * 2;
          self.xAxis
            .transition()
            .attr('transform', 'translate(' + self.chartPadding + ',' + xAxisY + ')');
        })
        .transition()
          .duration(750)
          .attr('width', function (d) {
            return self.monthScale(d.end) - self.monthScale(d.start);
          });

      // this.svg
      //   .attr('height', (self.barHeight + self.barSpacing))
    }

  });

  /// - Util -------------------------------------------------------------------

  function barDataFromItems(items) {
    var data = [];
    _.each(items, function (item) {
      _.each(_.map(item.periods, function (period) {
        var start = momentFromArray(period.from).toDate(),
            end = momentFromArray(period.to).toDate();
        return { name: item.itemName, start: start, end: end };
      }), function (d) {
        data.push(d);
      });
    });
    return data.sort(function (a, b) {
      return a.start.getTime() - b.start.getTime();
    });
  }

  function rgba(color) {
    return 'rgba(' + color.join(',') + ')';
  }

  function momentFromArray(a) {
    return moment({ year: a[0], month: a[1] - 1 });
  }

}(window.ik, window.moment, window.d3));