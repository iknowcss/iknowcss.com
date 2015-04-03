(function (ik) {

  /// - WolframRunner ----------------------------------------------------------

  ik.WolframRunner = WolframRunner;

  WolframRunner.Midpoint = function (blocks) {
    var midpoint = Math.floor(blocks / 2);
    return new WolframRunner(_.map(new Array(blocks), function (d, i) {
      return i === midpoint ? 1 : 0;
    }));
  };

  function WolframRunner(seed) {
    if (_.isArray(seed)){
      this.seed = seed;
    } else if (_.isString(seed)) {
      this.seed = seed.split('').map(function (d) {
        return d === '1';
      });
    }
    this.current = this.seed;
  }

  _.extend(WolframRunner.prototype, {

    step: function () {
      var len = this.current.length,
          data = new Array(len);
      this.previous = this.current;
      this.current = [];
      this.previous.forEach(function (d, i) {
        var p = this.previous[i === 0 ? len - 1 : i - 1],
            q = this.previous[i],
            r = this.previous[i === len - 1 ? 0 : i + 1];
        this.current[i] = (p + q + r + q * r) % 2 === 1;
      }, this);
      return this.current;
    },

    getCurrentAndStep: function () {
      var cur = this.current;
      this.step();
      return cur;
    }

  });

  /// - WolframPainter ---------------------------------------------------------

  ik.WolframPainter = WolframPainter;

  function WolframPainter(canvas, blockSize) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.cols = Math.ceil(this.width / blockSize);
    this.rows = Math.ceil(this.height / blockSize);

    this.pxScale = function (blocks) {
      return blocks * blockSize;
    };

    this.reset();
  }

  _.extend(WolframPainter.prototype, {

    paintSquare: function (x, y, c) {
      var unit = this.pxScale(1);
      this.context.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
      this.context.fillRect(this.pxScale(x), this.pxScale(y), unit, unit);
    },

    paintRow: function (row) {
      _.each(row, function (d, i) {
        var color = d ? [0, 0, 0] : [255, 255, 255];
        this.paintSquare(i, this.scanLine, color);
      }, this);
      this.scanLine++;
    },

    paintWithRunner: function (runner, rows, interval) {
      if (interval > 0) {
        return this.paintWithRunnerInterval(runner, rows, interval);
      }

      for (var i = 0; i < rows; i++) {
        this.paintRow(runner.getCurrentAndStep());
      }
    },

    paintWithRunnerInterval: function (runner, rows, interval) {
      var self = this,
          i = 0;
      var h = setInterval(function () {
        if (i++ < rows) {
          self.paintRow(runner.getCurrentAndStep());
        } else {
          clearInterval(h);
        }
      }, interval);
    },

    reset: function () {
      this.scanLine = 0;
    }

  });

}(window.ik));