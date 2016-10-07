import React from 'react'
import { Link } from 'react-router'
import request from 'superagent';

export default React.createClass({
  loadGroupFromServer: function(url) {
    request
      .get(this.props.url)
      .type('json')
      .end((err, res) => {
        if (!err && res) {
          this.setState({ data: res.body });
        } else {
          console.error(url, err.toString());
        }
      })
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadGroupFromServer();
  },
  render: function() {
    var cuisines = this.state.data.map(function(cuisine) {
      return (
        <li key={cuisine.id}>
          <Link to={"/browse/cuisine/" + cuisine.id} activeStyle={{ color: 'red' }}>{cuisine.title}</Link>
        </li>
      );
    });
    return (
      <ul className="cuisine">
        {cuisines}
      </ul>
    );
  }
});
