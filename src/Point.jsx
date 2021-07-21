import React, { Component } from 'react';

class Point extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.time}</td>
        <td>{this.props.labelText}</td>
      </tr>
    );
  }
}

export default Point;
