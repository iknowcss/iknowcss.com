(function (ik, moment, d3) {

  /// - Export -----------------------------------------------------------------

  ik.SkillChart = SkillChart;

  /// - Constants --------------------------------------------------------------

  var EPOCH = momentFromArray([2005, 01]);

  var BAR_HEIGHT = 20,
      BAR_SPACING = 5,
      GROUP_PADDING = 5,
      RESIZE_DURATION = 250,
      BAR_EXPAND_DURATION = 750;

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

    // Start with an empty scale for skills
    this.skillScale = d3.scale.ordinal().domain([]);

    // Axes
    this.timeAxis = d3.svg.axis()
      .orient('top');
    this.skillAxis = d3.svg.axis()
      .orient('left')
      .outerTickSize(0)
      .scale(this.skillScale);

    // Dimensions
    this.containerDimensions = { width: 600, height: 0 };

    // Init with the first skill group
    this.setSkillGroup(this.data.skills[0].groupName);
  }

  _.extend(SkillChart.prototype, {

    setSkillGroup: function (groupName) {
      if (groupName === this.currentSkillGroup) {
        return;
      }

      var self = this,
          skillIndex = _.findIndex(this.data.skills, 'groupName', groupName),
          skillGroup = this.data.skills[skillIndex];
      this.currentSkillGroup = groupName;
      this.currentSkillItems = skillGroup.items;
      this.currentBarData = barDataFromItems(skillGroup.items);
      this.resizeAndRender();
    },

    setContainerWidth: function (width) {
      this.containerDimensions.width = width;
      this.resizeAndRender();
    },

    resizeAndRender: function () {
      if (!this.currentSkillItems || !this.currentBarData) {
        return;
      }

      var groupItemCount = this.currentSkillItems.length;

      var SKILL_AXIS_WIDTH = 100,
          TIME_AXIS_HEIGHT = 30;

      this.svg.attr('width', this.containerDimensions.width);

      // Calculate the group dimensions
      this.skillBarDims = {
        x       : SKILL_AXIS_WIDTH + GROUP_PADDING * 2,
        y       : TIME_AXIS_HEIGHT + GROUP_PADDING * 2,
        width   : this.containerDimensions.width - SKILL_AXIS_WIDTH - GROUP_PADDING * 3,
        height  : groupItemCount * BAR_HEIGHT + (groupItemCount - 1) * BAR_SPACING
      };

      this.skillAxisDims = {
        x       : GROUP_PADDING,
        y       : TIME_AXIS_HEIGHT + GROUP_PADDING * 2 + BAR_HEIGHT / 2,
        width   : SKILL_AXIS_WIDTH,
        height  : this.skillBarDims.height - BAR_HEIGHT
      };

      this.timeAxisDims = {
        x       : SKILL_AXIS_WIDTH + GROUP_PADDING * 2,
        y       : GROUP_PADDING + TIME_AXIS_HEIGHT - GROUP_PADDING,
        width   : this.skillBarDims.width,
        height  : TIME_AXIS_HEIGHT
      };

      this.containerDimensions.height = this.skillBarDims.height + this.timeAxisDims.height + GROUP_PADDING * 3;

      this.svg.transition()
        .duration(RESIZE_DURATION)
        .attr('height', this.containerDimensions.height)

      // Set the time scale based on the new time axis dimensions
      this.timeScale.range([0, this.timeAxisDims.width]);
      this.skillScale.domain(_.pluck(this.currentBarData, 'name'));

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
      this.skillAxisGroup
        .transition()
        .call(this.skillAxis);
    },

    renderGroupBars: function () {
      this.skillBarGroup
        .attr('transform', translate(this.skillBarDims.x, this.skillBarDims.y));

      var self = this,
          data = this.currentBarData,
          skillBars = this.skillBarGroup.selectAll('rect').data(data),
          barYMap = {},
          barColorMap = {},
          i = 0;

      skillBars.exit().remove();

      skillBars.enter().append('rect');

      skillBars
          .attr('x', function (d) {
            return self.timeScale(d.start);
          })
          .attr('y', function (d) {
            return (BAR_HEIGHT + BAR_SPACING) * (barYMap.hasOwnProperty(d.name) ?
              barYMap[d.name] : (barYMap[d.name] = i++));
          })
          .attr('height', BAR_HEIGHT)
          .attr('fill', function (d) {
            return barColorMap.hasOwnProperty(d.name) ?
              barColorMap[d.name] : (barColorMap[d.name] = rgba(COLORS[barYMap[d.name] % COLORS.length]))
          })
          .attr('width', 0)
        .transition()
          .duration(BAR_EXPAND_DURATION)

          .attr('width', function (d) {
            return self.timeScale(d.end) - self.timeScale(d.start);
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