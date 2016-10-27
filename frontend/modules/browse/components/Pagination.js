import React from 'react'
import { Link } from 'react-router'

export default React.createClass ({
  getInitialState: function() {
    return {
      next: '',
      previous: '',
    };
  },

  componentWillReceiveProps: function(thisprops) {
    console.log(thisprops);
    console.log(thisprops.next);
    this.setState({
      next: this.getNext(thisprops.next, thisprops.path),
      previous: this.getNext(thisprops.previous, thisprops.path),
    });
  },

  getNext: function(url, path) {
    var offset = 0;
    var limit = 0;
    console.log(url);
    offset = this.getParameterByName('offset', url);
    limit = this.getParameterByName('limit', url);
    return path + "?offset=" + offset + "&limit=" + limit
  },

  getParameterByName: function(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },

  render: function() {
    return (
      <ul className="pager">
        <li className="previous">
          { this.props.previous ?
            <Link to={this.state.previous}>
              <span>&larr;</span> Older
            </Link>
            : ''
          }
        </li>
        <li className="next">
          { this.props.next ?
            <Link to={this.state.next}>
              Newer <span>&rarr;</span>
            </Link>
            : ''
          }
        </li>
      </ul>
    );
  }
})