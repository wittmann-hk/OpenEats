import React from 'react'
import request from 'superagent';

import { serverURLs } from '../../common/config'

export default React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  },

  render: function() {
    var directions = this.state.data.map(function(direction) {
      return (
        <li className="direction" key={ direction.step }>
          { direction.title }
        </li>
      );
    });
    return (
      <ol className="directions" >
        { directions }
      </ol>
    );
  }
});
