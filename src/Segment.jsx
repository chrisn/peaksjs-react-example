import React, { Component } from 'react';

class Segment extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.startTime}</td>
        <td>{this.props.endTime}</td>
        <td>{this.props.labelText}</td>
      </tr>
    );
  }
}

export default Segment;
