import React from 'react'

export default React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data || []
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  },

  render: function() {
    var ingredients = this.state.data.map(function(ingredient) {
      return (
        <li className="ingredient" key={ ingredient.id }>
          { ingredient.quantity }&nbsp;
          { ingredient.measurement }&nbsp;
          { ingredient.title }
        </li>
      );
    });
    return (
      <ul className="ingredients" >
        { ingredients }
      </ul>
    );
  }
});
