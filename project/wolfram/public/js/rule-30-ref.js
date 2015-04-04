(function (d3) {

  var width = 1000,
      height = 800,
      blocks = 1000,
      maxRows = 500;

  var canvas = document.getElementById('main-canvas'),
      context = canvas.getContext('2d');

  // Grid to pixel scale function
  function pxScale(input) {
    return input * width / blocks;
  }

  // Convenience draw function
  var unit = pxScale(1);
  function drawSquare(x, y, c) {
    context.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
    context.fillRect(pxScale(x), pxScale(y), unit, unit);
  }

  // Previous and current rows 
  var prev, cur;

  // Render the current row and step the rows
  var rowIndex = 0,
      on = [0, 0, 0],
      off = [255, 255, 255];
  function renderAndStep() {
    cur.forEach(function (d, i) {
      drawSquare(i, rowIndex, d ? on : off);
    });

    // Step
    prev = cur;
    rowIndex++;
  }

  // Prepare the first row
  (function () {
    var midpoint = Math.floor(blocks / 2),
        i;
    cur = [];
    for (i = 0; i < blocks; i++) {
      cur[i] = i === midpoint ? true : false;
      // cur[i] = Math.random() < 0.5 ? true : false;
    }
  }());

  renderAndStep();

  var rowCount = 1;
  function appendNextRow() {
    cur = [];
    prev.forEach(function (d, i) {
      var p = prev[i === 0 ? blocks - 1 : i - 1],
          q = prev[i],
          r = prev[i === blocks - 1 ? 0 : i + 1];
      cur[i] = (p + q + r + q * r) % 2 === 1;
    });
    renderAndStep();
    rowCount++;
  }

  var h = setInterval(function () {
    appendNextRow();
    if (rowCount >= maxRows) clearInterval(h);
  }, 10);

  // for (var j = 0; j < maxRows; j++) appendNextRow();

}(window.d3));