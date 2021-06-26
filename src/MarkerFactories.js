import CustomPointMarker from './CustomPointMarker';
import SimplePointMarker from './SimplePointMarker';
import CustomSegmentMarker from './CustomSegmentMarker';

export function createPointMarker(options) {
  if (options.view === 'zoomview') {
    return new CustomPointMarker(options);
  }
  else {
    return new SimplePointMarker(options);
  }
}

export function createSegmentMarker(options) {
  if (options.view === 'zoomview') {
    return new CustomSegmentMarker(options);
  }

  return null;
}
