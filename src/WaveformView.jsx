import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Peaks from 'peaks.js';

import { createPointMarker, createSegmentMarker } from './MarkerFactories';
import { createSegmentLabel } from './SegmentLabelFactory';

import './WaveformView.css';

class WaveformView extends Component {
  constructor(props) {
    super(props);

    this.zoomviewWaveformRef = React.createRef();
    this.overviewWaveformRef = React.createRef();
    this.audioElementRef = React.createRef();
    this.peaks = null;
  }

  render() {
    console.log("WaveformView.render, audioUrl:", this.props.audioUrl, 'waveformDataUrl:', this.props.waveformDataUrl);

    return (
      <div>
        <div className="zoomview-container" ref={this.zoomviewWaveformRef}></div>
        <div className="overview-container" ref={this.overviewWaveformRef}></div>

        <audio ref={this.audioElementRef} controls="controls">
          <source src={this.props.audioUrl} type={this.props.audioContentType}/>
          Your browser does not support the audio element.
        </audio>

        {this.renderButtons()}
      </div>
    );
  }

  renderButtons() {
    return (
      <ButtonToolbar>
        <Button onClick={this.zoomIn}>Zoom in</Button>&nbsp;
        <Button onClick={this.zoomOut}>Zoom out</Button>&nbsp;
        <Button onClick={this.addSegment}>Add Segment</Button>&nbsp;
        <Button onClick={this.addPoint}>Add Point</Button>&nbsp;
        <Button onClick={this.logMarkers}>Log segments/points</Button>
      </ButtonToolbar>
    );
  }

  componentDidMount() {
    console.log("WaveformComponent.componentDidMount");

    this.initPeaks();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('WaveformComponent.componentDidUpdate');

    if (this.props.audioUrl === prevProps.audioUrl) {
      return;
    }

    console.log('props', this.props);
    console.log('prevProps', prevProps);

    this.initPeaks();
  }

  initPeaks() {
    const options = {
      containers: {
        overview: this.overviewWaveformRef.current,
        zoomview: this.zoomviewWaveformRef.current
      },
      mediaElement: this.audioElementRef.current,
      keyboard: true,
      logger: console.error.bind(console),
      createSegmentMarker: createSegmentMarker,
      createSegmentLabel: createSegmentLabel,
      createPointMarker: createPointMarker
    };

    if (this.props.waveformDataUrl) {
      options.dataUri = {
        arraybuffer: this.props.waveformDataUrl
      };
    }
    else if (this.props.audioContext) {
      options.webAudio = {
        audioContext: this.props.audioContext
      };
    }

    this.audioElementRef.current.src = this.props.audioUrl;

    if (this.peaks) {
      this.peaks.destroy();
      this.peaks = null;
    }

    Peaks.init(options, (err, peaks) => {
      this.peaks = peaks;
      this.onPeaksReady();
    });
  }

  componentWillUnmount() {
    console.log('WaveformView.componentWillUnmount');

    if (this.peaks) {
      this.peaks.destroy();
    }
  }

  zoomIn = () => {
    if (this.peaks) {
      this.peaks.zoom.zoomIn();
    }
  };

  zoomOut = () => {
    if (this.peaks) {
      this.peaks.zoom.zoomOut();
    }
  };

  addSegment = () => {
    if (this.peaks) {
      const time = this.peaks.player.getCurrentTime();

      this.peaks.segments.add({
        startTime: time,
        endTime: time + 10,
        labelText: 'Test Segment',
        editable: true
      });
    }
  };

  addPoint = () => {
    if (this.peaks) {
      const time = this.peaks.player.getCurrentTime();

      this.peaks.points.add({
        time: time,
        labelText: 'Test Point',
        editable: true
      });
    }
  };

  logMarkers = () => {
    if (this.peaks) {
      this.props.setSegments(this.peaks.segments.getSegments());
      this.props.setPoints(this.peaks.points.getPoints());
    }
  }

  onPeaksReady = () => {
    // Do something when the Peaks instance is ready for use
    console.log("Peaks.js is ready");
  }
}

WaveformView.propTypes = {
  audioUrl:         PropTypes.string,
  audioContentType: PropTypes.string,
  waveformDataUrl:  PropTypes.string,
  audioContext:     PropTypes.object,
  setSegments:      PropTypes.func,
  setPoints:        PropTypes.func
};

export default WaveformView;
