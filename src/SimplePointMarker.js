import { Line } from 'konva/lib/shapes/Line';

function SimplePointMarker(options) {
  this._options = options;
}

SimplePointMarker.prototype.init = function(group) {
  this._group = group;

  // Vertical Line - create with default y and points, the real values
  // are set in fitToView().
  this._line = new Line({
    x:           0,
    y:           0,
    stroke:      this._options.color,
    strokeWidth: 1
  });

  group.add(this._line);

  this.fitToView();
};

SimplePointMarker.prototype.fitToView = function() {
  const height = this._options.layer.getHeight();

  this._line.points([0.5, 0, 0.5, height]);
};

export default SimplePointMarker;
