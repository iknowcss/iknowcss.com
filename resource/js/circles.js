(function (d3) {

  var svg = d3.select('#main-svg');

  var circleScale = d3.scale.linear()
    .domain([1, 3])
    .range([10, 30]);

  var data = [];
  function update() {
    var circles = svg.selectAll('circle').data(data);

    circles.enter()
      .append('circle')
      .attr('r', 0);

    circles
      .transition()
      .duration(500)
      .ease('elastic', 1, 0.2)
      .attr('cx', function (d, i) { return 100 * (1 + i); })
      .attr('cy', 100)
      .attr('r', circleScale);

    circles.exit().remove();
  }

  var i = 1;
  var h = setInterval(function () {
    data.push(i++);
    update();
    if (i >= 6) clearInterval(h);
  }, 500);
  

}(window.d3));