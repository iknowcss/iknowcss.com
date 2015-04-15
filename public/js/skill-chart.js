(function (ik, moment, d3) {

  /// - Export -----------------------------------------------------------------

  ik.SkillChart = SkillChart;

  /// - Constants --------------------------------------------------------------

  var EPOCH = momentFromArray([2005, 01]);

  var BAR_HEIGHT = 20,
      BAR_SPACING = 5,
      GROUP_PADDING = 5,
      RESIZE_DURATION = 250,
      BAR_EXPAND_DURATION = 500;

  var COLORS = [
    // [255, 0, 0, 0.5],
    // [0, 255, 0, 0.5],
    // [0, 0, 255, 0.5]
    [0, 0, 255, 0.5]
  ];

  /// - Constructor ------------------------------------------------------------

  var DEFAULTS = {};

  function SkillChart(options) {
    if (!(this instanceof SkillChart)) {
      return new SkillChart(options);
    }

    this.options = _.extend({}, DEFAULTS, options);
    this.data = this.options.data;

    this.container = document.querySelector(this.options.container);

    // Init SVG groups
    this.svg = d3.select(this.options.container);
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
    this.containerDimensions = { width : 0, height : 0 };

    // Init with the first skill group
    this.setSkillGroup(this.data.skills[0].groupName);

    this.listenForBootstrapResize();
  }

  /// - Resizing and rending functions -----------------------------------------

  _.extend(SkillChart.prototype, {
    resizeAndRender: function (_options) {
      if (!this.currentSkillItems || !this.currentBarData) {
        return;
      }

      var groupItemCount = this.currentSkillItems.length;

      var SKILL_AXIS_WIDTH = 100,
          TIME_AXIS_HEIGHT = 30;

      // Get the current SVG area width
      this.containerDimensions.width = this.container.clientWidth;

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
      this.render(_options);
    },

    render: function (_options) {
      this.renderTimeAxis(_options);
      this.renderSkillAxis(_options);
      this.renderGroupBars(_options);
    },

    renderTimeAxis: function (_options) {
      this.timeAxisGroup
        .attr('transform', translate(this.timeAxisDims.x, this.timeAxisDims.y));
      this.timeAxis.scale(this.timeScale);

      if (this.timeAxisDims.width < 345) {
        this.timeAxis.tickFormat(function (d) {
          var year = d.getYear() % 100;
          return '\'' + (year < 10 ? '0' : '') + year;
        });
      } else {
        this.timeAxis.tickFormat(undefined);
      }

      this.timeAxisGroup.call(this.timeAxis);
    },

    renderSkillAxis: function (_options) {
      this.skillAxisGroup
        .attr('transform', translate(this.skillAxisDims.x + this.skillAxisDims.width, this.skillAxisDims.y));
      this.skillScale
        .rangePoints([0, this.skillAxisDims.height]);

      var options = _.extend({}, _options),
          chain = this.skillAxisGroup;
      if (options.transition !== false) {
        chain = chain.transition();
      }
      chain.call(this.skillAxis);
    },

    renderGroupBars: function (_options) {
      this.skillBarGroup
        .attr('transform', translate(this.skillBarDims.x, this.skillBarDims.y));

      var self = this,
          options = _.extend({}, _options),
          data = this.currentBarData,
          skillBars = this.skillBarGroup.selectAll('rect').data(data),
          barYMap = {},
          barColorMap = {},
          i = 0;

      skillBars.exit().remove();

      skillBars.enter().append('rect');

      var chain = skillBars
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
        .attr('width', 0);

      if (options.transition !== false) {
        chain = chain.transition()
          .duration(BAR_EXPAND_DURATION);
      }

      chain
        .attr('width', function (d) {
          return self.timeScale(d.end) - self.timeScale(d.start);
        });
    }

  });

  /// - Other functions --------------------------------------------------------

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

    listenForBootstrapResize: function () {
      var self = this,
          lastSnapSize,
          throttledResizeAndRender;
      if (!this.resizeListener) {
        throttledResizeAndRender = _.throttle(function () {
          self.resizeAndRender({ transition: false });
        }, 250);
        this.resizeListener = window.addEventListener('resize', function () {
          var width = window.innerWidth,
              newSnapSize = 'xs';
          if (width >= 1200) newSnapSize = 'lg';
          else if (width >= 992) newSnapSize = 'md';
          else if (width >= 768) newSnapSize = 'sm';

          if (newSnapSize === 'xs' || lastSnapSize !== newSnapSize) {
            throttledResizeAndRender();
            lastSnapSize = newSnapSize;
          }
        });
      }
    }

  });

  /// - Util -------------------------------------------------------------------

  function barDataFromItems(items) {
    var data = [];
    _.each(items, function (item) {
      // Convert period date arrays to Date objects
      _.each(item.periods, function (period) {
        var start = momentFromArray(period.from).toDate(),
            end = momentFromArray(period.to).toDate();
        data.push({ name: item.itemName, start: start, end: end });
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