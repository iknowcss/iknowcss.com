(function (d3) {

  var width = 1000,
      height = 800,
      blocks = 200;

  var pxScale = d3.scale.linear()
    .domain([0, blocks])
    .range([0, width]);

  var svg = d3.select('#main-svg');
  
  svg
    .attr('width', width)
    .attr('height', height);

  var rows = [];
  function update() {
    var rowGroup = svg.selectAll('g.row')
      .data(rows);

    rowGroup.enter()
      .append('g')
      .attr('class', 'row')
      .attr('transform', function (d, i) {
        return 'translate(0,' + pxScale(i) + ')';
      });

    var square = rowGroup.selectAll('circle')
      .data(function (d) { return d; });

    square.enter()
      .append('circle')
      .attr('cx', function (d, i) { return pxScale(i + 0.5); })
      .attr('cy', pxScale(0.5))
      .attr('r', pxScale(0.5));

    square
      .attr('fill', function (d) { return d ? '#ccc' : '#fff'; });
  }

  // First row
  var midpoint = Math.floor(blocks / 2),
      data = [],
      i;
  for (i = 0; i < blocks; i++) {
    // data[i] = i === midpoint ? true : false;
    data[i] = Math.random() < 0.5 ? true : false;
  }

  rows.push(data);
  update();

  // 2nd row
  function appendNextRow() {
    var prev = rows[rows.length - 1],
        data = [];
    for (i = 0; i < blocks; i++) {
      var p = prev[i === 0 ? blocks - 1 : i - 1],
          q = prev[i],
          r = prev[i === blocks - 1 ? 0 : i + 1];
      data.push((p + q + r + q * r) % 2 === 1);
    }
    rows.push(data);
  }

  var qqq = 0;
  function asdf() {
    requestAnimationFrame(function () {
      appendNextRow();
      update();
      if (qqq++ < 100) asdf();
    });
  }

  asdf();

}(window.d3));