import React from 'react'
import { Link } from 'react-router'
import request from 'superagent';
import {serverURLs} from '../../common/config'

export default React.createClass({
  loadGroupFromServer: function() {
    var url = serverURLs.cuisine;
    request
      .get(url)
      .type('json')
      .end((err, res) => {
        if (!err && res) {
          this.setState({ data: res.body.results });
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
        <Link className="list-group-item"
              activeClassName="active"
              to={"/browse/cuisine/" + cuisine.id}
              key={cuisine.id}>
          {cuisine.title}
        </Link>
      );
    });
    return (
      <div className="list-group">
         <p className="list-group-item disabled">
           <b>Filter Cuisine</b>
         </p>
        {cuisines}
      </div>
    );
  }
});
