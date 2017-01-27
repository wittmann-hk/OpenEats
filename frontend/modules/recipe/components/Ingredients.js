import React from 'react'
import request from 'superagent';

import { serverURLs } from '../../common/config'

// configure the default type of numbers as Fractions
var math = require('mathjs');
math.config({
  number: 'Fraction'   // Default type of number:
});

export default React.createClass({
  loadRecipeFromServer: function() {
    var url = serverURLs.ingredient + "&recipe="+ this.props.recipe_id;
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
    return { data: [] };
  },
  componentDidMount: function() {
    this.loadRecipeFromServer();
  },
  printRatio: function(value) {
    // Format the value then print it as a fraction.
    value = math.fraction(value);
    console.log(value);
    if (value.d == 1) {
      return value.n;
    } else if (value.n > value.d) {
      return math.floor(value.n/value.d).toString() +
        " " + (value.n%value.d).toString() + "/" + value.d
    }
    return math.format(value, {fraction: 'ratio'});
  },
  render: function() {
    var printRatio = this.printRatio;
    var ingredients = this.state.data.map(function(ingredient) {
      return (
        <li className="ingredient" key={ ingredient.id }>
          { printRatio(ingredient.quantity) }&nbsp;
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
