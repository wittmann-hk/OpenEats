import React from 'react'

export default React.createClass({
  getInitialState: function() {
    return {
      tags: this.props.tags || [],
      input: this.unarrayify(this.props.tags || [])
    };
  },

  unarrayify(value) {
    return value.map((tag, key) => {
      return tag.title
    }).join(', ');
  },

  arrayify(value) {
    var dict = [];
    if (value) {
      var tags = value.split(',');
      for (let title in tags) {
        dict.push({'title': tags[title].trim()})
      }
    }
    return dict
  },

  handleChange(event) {
    this.setState({
      tags: this.arrayify(event.target.value),
      input: event.target.value
    });

    if(this.props.change) {
      this.props.change(event.target.name, this.arrayify(event.target.value));
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.tags === undefined && this.props.tags != nextProps.tags) {
      this.setState({
        tags: nextProps.tags,
        input: this.unarrayify(nextProps.tags)
      });
    }
  },

  render: function () {
    return (
      <div className={this.props.size} key={this.props.id}>
        <div className="form-group">
          {this.props.label ? <label>{this.props.label}</label> : null}
          <input type={this.props.type}
                 name={this.props.name}
                 className="form-control"
                 placeholder={this.props.placeholder}
                 value={this.state.input}
                 onChange={this.handleChange}/>
        </div>
      </div>
    )
  }
});
