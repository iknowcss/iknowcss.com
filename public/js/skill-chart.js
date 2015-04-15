(function (ik, moment, d3) {

  /// - Export -----------------------------------------------------------------

  ik.SkillChart = SkillChart;

  /// - Constants --------------------------------------------------------------

  var EPOCH = momentFromArray([2005, 01]);

  var BAR_HEIGHT = 20,
      BAR_SPACING = 5,
      GROUP_PADDING = 5;

  var COLORS = [
    [255, 0, 0, 0.5],
    [0, 255, 0, 0.5],
    [0, 0, 255, 0.5]
  ];

  /// - Constructor ------------------------------------------------------------

  function SkillChart(options) {
    if (!(this instanceof SkillChart)) {
      return new SkillChart(options);
    }

    this.data = options.data;

    // Init SVG groups
    this.svg = d3.select(options.container);
    this.skillBarGroup = this.svg.append('g');
    this.skillAxisGroup = this.svg.append('g').attr('class', 'y-axis');
    this.timeAxisGroup = this.svg.append('g').attr('class', 't-axis');

    // Scale the number of months since the epoch to a percentage of total time
    var now = momentFromArray(this.data.PRESENT);
    this.timeScale = d3.time.scale()
      .domain([EPOCH.toDate(), now.toDate()]);

    this.skillScale = d3.scale.ordinal().domain([]);

    // Axes
    this.timeAxis = d3.svg.axis()
      .orient('bottom');
    this.skillAxis = d3.svg.axis()
      .orient('left')
      .outerTickSize(0)
      .scale(this.skillScale);

    // Init
    this.setContainerDimensions({ width: 600, height: 400 });
  }

  _.extend(SkillChart.prototype, {

    setContainerDimensions: function (dimensions) {
      var SKILL_AXIS_WIDTH = 150,
          TIME_AXIS_HEIGHT = 30;

      // Set the root container dimensions
      this.containerDimensions = dimensions;
      this.svg
        .attr('width', this.containerDimensions.width)
        .attr('height', this.containerDimensions.height);

      // Calculate the group dimensions
      this.skillAxisDims = {
        x       : GROUP_PADDING,
        y       : GROUP_PADDING,
        width   : SKILL_AXIS_WIDTH,
        height  : this.containerDimensions.height - TIME_AXIS_HEIGHT - GROUP_PADDING * 3
      };
      this.timeAxisDims = {
        x       : SKILL_AXIS_WIDTH + GROUP_PADDING * 2,
        y       : this.containerDimensions.height - TIME_AXIS_HEIGHT - GROUP_PADDING,
        width   : this.containerDimensions.width - SKILL_AXIS_WIDTH - GROUP_PADDING * 3,
        height  : TIME_AXIS_HEIGHT
      };
      this.skillBarDims = {
        x       : SKILL_AXIS_WIDTH + GROUP_PADDING * 2,
        y       : GROUP_PADDING,
        width   : this.timeAxisDims.width,
        height  : this.skillAxisDims.height
      };

      // Set the time scale based on the new time axis dimensions
      this.timeScale.range([0, this.timeAxisDims.width]);

      // Re-render
      this.render();
    },

    render: function () {
      this.renderTimeAxis();
      this.renderSkillAxis();
      this.renderGroupBars();
    },

    renderTimeAxis: function () {
      this.timeAxisGroup
        .attr('transform', translate(this.timeAxisDims.x, this.timeAxisDims.y));
      this.timeAxis.scale(this.timeScale);
      this.timeAxisGroup.call(this.timeAxis);
    },

    renderSkillAxis: function () {
      this.skillAxisGroup
        .attr('transform', translate(this.skillAxisDims.x + this.skillAxisDims.width, this.skillAxisDims.y));
      this.skillScale
        .rangePoints([0, this.skillAxisDims.height]);
      this.skillAxisGroup.call(this.skillAxis);
    },

    renderGroupBars: function () {
      this.skillBarGroup
        .attr('transform', translate(this.skillBarDims.x, this.skillBarDims.y));
    },

    setSkillGroup: function (groupName) {
      var self = this,
          skillIndex = _.findIndex(this.data.skills, 'groupName', groupName),
          skillGroup = this.data.skills[skillIndex]/*,
          data = barDataFromItems(skillGroup.items),
          skillBars = this.skillBars.selectAll('rect').data(data)*/;

      this.skillScale.domain(_.pluck(skillGroup.items, 'itemName'));

      this.render();

      return;

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

  function translate() {
    return 'translate(' + [].slice.call(arguments, 0, 2).join(',') + ')';
  }

}(window.ik, window.moment, window.d3));