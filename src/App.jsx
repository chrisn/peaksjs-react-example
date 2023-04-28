import React, { Component } from 'react';
import {
  ButtonToolbar,
  Container,
  Table,
  ToggleButton,
  ToggleButtonGroup
} from 'react-bootstrap';

import Point from './Point';
import Segment from './Segment';
import WaveformView from './WaveformView';
import './App.css';

const urls = {
  1: {
    audioUrl: '07030039.mp3',
    audioContentType: 'audio/mpeg',
    waveformDataUrl: '07030039.dat'
  },

  2: {
    audioUrl: '07023003.mp3',
    audioContentType: 'audio/mpeg',
    waveformDataUrl: '07023003-2channel.dat'
  }
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      ...urls[1]
    };
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <h1>
            Peaks.js React Example
          </h1>

          <p>
            This is a simple example of how to use <a href="https://github.com/bbc/peaks.js">Peaks.js</a> in a React application.
          </p>

          <p>
            Audio content is copyright BBC, from the <a href="https://sound-effects.bbcrewind.co.uk">BBC Sound Effects</a> library,
            used under the terms of the <a href="https://sound-effects.bbcrewind.co.uk/licensing">RemArc Licence</a>.
          </p>

          <h3>Select audio</h3>

          <ButtonToolbar>
            <ToggleButtonGroup
              type="radio"
              name="options"
              defaultValue={1}
              onChange={this.handleSelectedAudioChange}>
              <ToggleButton id={1} value={1}>Bird song</ToggleButton>&nbsp;
              <ToggleButton id={2} value={2}>Car passing</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>

          <WaveformView
            audioUrl={this.state.audioUrl}
            audioContentType={this.state.audioContentType}
            waveformDataUrl={this.state.waveformDataUrl}
            setSegments={this.setSegments}
            setPoints={this.setPoints}
          />

          {this.renderSegments()}
          {this.renderPoints()}
        </Container>
      </React.Fragment>
    );
  }

  handleSelectedAudioChange = (e) => {
    this.setState({
      audioUrl: urls[e].audioUrl,
      audioContentType: urls[e].audioContentType,
      waveformDataUrl: urls[e].waveformDataUrl
    });
  };

  setSegments = (segments) => {
    this.setState({ segments });
  };

  renderSegments() {
    const segments = this.state.segments;

    if (!segments) {
      return null;
    }

    if (segments.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <h2>Segments</h2>
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Label text</th>
            </tr>
          </thead>
          <tbody>
            {this.renderSegmentRows(segments)}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }

  renderSegmentRows(segments) {
    return segments.map((segment) =>
      <Segment
        id={segment.id}
        key={segment.id}
        startTime={segment.startTime}
        endTime={segment.endTime}
        labelText={segment.labelText}
      />
    );
  }

  setPoints = (points) => {
    this.setState({ points });
  };

  renderPoints() {
    const points = this.state.points;

    if (!points) {
      return null;
    }

    if (points.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <h2>Points</h2>,
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Time</th>
              <th>Label text</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPointRows(points)}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }

  renderPointRows(points) {
    return points.map((point) =>
      <Point
        id={point.id}
        key={point.id}
        time={point.time}
        labelText={point.labelText}
      />
    );
  }
}

export default App;
