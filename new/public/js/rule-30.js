(function (ik) {

  var WORD = 31;

  /// - WolframRow -------------------------------------------------------------

  ik.WolframRow = WolframRow;

  function WolframRow(cols) {
    this.length = _.isNumber(cols) ? cols : cols.length;

    // How many Number blocks do we need at WORD bits each?
    this.blockCount = Math.ceil(this.length / WORD);

    // Create array of bit blocks and zero them out
    if (cols instanceof WolframRow) {
      this.blocks = _.clone(cols.blocks);
    } else {
      this.blocks = new Array(this.blockCount);
      _.each(this.blocks, function (b, i) {
        this.blocks[i] = 0;
      }, this);

      // Init
      if (!_.isNumber(cols)) {
        this.setRange(cols);
      }
    }
  }

  _.extend(WolframRow.prototype, {

    print: function () {
      var output = '';
      for (var i = 0; i < this.length; i++) {
        output += this.get(i) ? '1' : '0';
      }
      return output;
    },

    get: function (_i) {
      var i = (_i < 0 ? this.length + _i % this.length : _i % this.length),
          block = Math.floor(i / WORD),
          blockValue = this.blocks[block],
          bit = i % WORD;
      return (blockValue & (1 << bit)) > 0;
    },

    set: function (i, d) {
      var block = Math.floor(i / WORD),
          blockValue = this.blocks[block],
          bit = i % WORD;
      this.blocks[block] ^= (-(d ? 1 : 0) ^ blockValue) & (1 << bit);
      return this;
    },

    toggle: function (i) {
      this.set(i, !this.get(i));
    },

    setRange: function (_input, _offset) {
      var input = _input,
          offset = _offset ? _offset : 0;
      if (_.isString(input)) {
        input = _.map(input.split(''), function (d) {
          return d === '1';
        });
      }
      _.each(input, function (d, i) {
        this.set(i + offset, !!d);
      }, this);
      return this;
    },

    each: function (fn, ctx) {
      for (var i = 0; i < this.length; i++) {
        fn.call(ctx, this.get(i), i);
      }
    },

    slide: function (fn, ctx) {
      for (var i = 0; i < this.length; i++) {
        fn.call(ctx, this.get(i - 1), this.get(i), this.get(i + 1), i);
      }
    },

    clone: function () {
      var clone = new WolframRow(this.length)
      clone.blocks = _.clone(this.blocks);
      return clone;
    }

  });

  /// - WolframRunner ----------------------------------------------------------

  ik.WolframRunner = WolframRunner;

  function WolframRunner(rule, seed) {
    if (!(this instanceof WolframRunner)) {
      return new WolframRunner(seed);
    }

    this.rule = rule;
    this.initial = this.current = new WolframRow(seed);
    this.reset();
  }

  _.extend(WolframRunner.prototype, {

    step: function () {
      var len = this.current.length;
      this.previous = this.current;
      this.current = new WolframRow(len);
      this.previous.slide(function (p, q, r, i) {
        var a = (!p << 2) + (!q << 1) + !r,
            value = (1 << (7 - a) & this.rule) > 0;
        this.current.set(i, value);
      }, this);
      return this.current;
    },

    getCurrentAndStep: function () {
      var cur = this.current;
      this.step();
      return cur;
    },

    reset: function () {
      this.current = this.initial;
      delete this.previous;
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
    this.painted = [];

    this.pxScale = function (blocks) {
      return blocks * blockSize;
    };
    this.unit = this.pxScale(1);

    this.reset();
  }

  _.extend(WolframPainter.prototype, {

    paintSquare: function (x, y, c) {
      var self = this,
          paintX = this.pxScale(x),
          paintY = this.pxScale(y);
      // setTimeout(function () {
        self.context.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
        self.context.fillRect(paintX, paintY, self.unit, self.unit);
      // }, Math.random() * 100);
    },

    paintRow: function (row, _color) {
      row.each(function (d, i) {
        // Skip painting pixels that were already painted as "on"
        var paintedRow = this.painted[this.scanLine];
        if (d && paintedRow && paintedRow.get(i)) {
          return;
        }

        var color = d ? (_color || [0, 0, 0]) : [255, 255, 255];
        this.paintSquare(i, this.scanLine, color);
      }, this);
      this.painted[this.scanLine] = row.clone();
      this.scanLine++;
    },

    paintWithRunner: function (runner, rows, color) {
      for (var i = 0; i < rows; i++) {
        this.paintRow(runner.getCurrentAndStep(), color);
      }
    },

    paintWithRunnerInterval: function (runner, rows, color, interval) {
      var self = this,
          i = 0;
      var h = setInterval(function () {
        if (i++ < rows) {
          self.paintRow(runner.getCurrentAndStep(), color);
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