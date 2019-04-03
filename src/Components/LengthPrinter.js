import React, { Component } from 'react';

export default class LengthPrinter extends Component {
  constructor(props) {
    super(props)
    this.state = { routeLength: null };
  }

  componentDidMount() {
    this._isMounted = true;

    this.props.ymaps.route(this.props.route).then(route => {
      const routeLength = route.getHumanLength().replace('&#160;', ' ');
      if (this._isMounted === true) {
        this.setState({ routeLength });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return this.state.routeLength == null ? (
      <p>Loading route...</p>
    ) : (
        <p>This route is {this.state.routeLength} long</p>
      );
  }
}