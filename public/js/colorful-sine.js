(function (d3) {

  var svg = d3.select('#main-svg'),
      data = [],
      colorF = 10,
      colorPhi = 0;

  for (var i = 0; i <= 2 * Math.PI; i += Math.PI / 128) {
    data.push(Math.sin(i));
  }

  var scale = d3.scale.linear()
    .domain([-1, 1])
    .range([-100, 100]);

  var axis = d3.svg.axis()
    .scale(scale)
    .orient('right')
    .ticks(10);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('fill', rainbowFill)
    .attr('x', function (d, i) { return i * 2; })
    .attr('y', function (d) {
      if (d > 0) return 100 - scale(d);
      else return 100;
    })
    .attr('width', 2)
    .attr('height', function (d) { return Math.abs(scale(d)); });

  svg.append('g')
    .call(axis)
    .attr('transform', 'translate(0, 100)');

  var mouseXScale = d3.scale.linear()
    .domain([10, 520])
    .range([2 * Math.PI, 0])
    .clamp(true);

  var mouseYScale = d3.scale.linear()
    .domain([10, 210])
    .range([1, 20])
    .clamp(true);

  window.addEventListener('mousemove', function (e) {
    colorF = mouseYScale(e.y);
    colorPhi = mouseXScale(e.x) * colorF;
    svg.selectAll('rect').transition()
      .duration(0)
      .attr('fill', rainbowFill)
  });

  function rainbowFill(d, i) {
    var theta = colorF * (2 * Math.PI * i / 256),
        r = Math.ceil(255 * (Math.sin(colorPhi + theta) + 1) / 2),
        g = Math.ceil(255 * (Math.sin(colorPhi + theta + 2 * Math.PI / 3) + 1) / 2),
        b = Math.ceil(255 * (Math.sin(colorPhi + theta - 2 * Math.PI / 3) + 1) / 2);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

}(window.d3));