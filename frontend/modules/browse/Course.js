import React from 'react'
import { Link } from 'react-router'
import request from 'superagent';

export default React.createClass({
  loadGroupFromServer: function() {
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
    var courses = this.state.data.map(function(course) {
      return (
        <li key={course.id}>
          <Link to={"/browse/course/" + course.id} activeStyle={{ color: 'red' }}>{course.title}</Link>
        </li>
      );
    });
    return (
      <ul className="course">
        {courses}
      </ul>
    );
  }
});
