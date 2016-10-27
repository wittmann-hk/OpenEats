import React from 'react'
import { Link } from 'react-router'

import Ratings from '../../recipe/components/Ratings';

require("./../../recipe/css/list-recipes.scss");

export default React.createClass({
  render: function() {
    console.log('hi');
    var format = this.props.format;
    var recipes = this.props.data.map(function(recipe) {
      var link = 'recipe/' + recipe.id;
      return (
        <div className={format} key={recipe.id}>
          <div className="thumbnail recipe">
            <img src={recipe.photo_thumbnail} alt="Recipe Image"/>
            <div className="caption">
              <h4><Link to={link}>{recipe.title}</Link></h4>
              <p className="desc">This is a short description. Lorem ipsum dolor sit amet, short description. Lorem ipsum dolor sit amet, short description. Lorem ipsum dolor sit amet, short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="ratings">
              <p className="pull-right date">{recipe.pub_date}</p>
              <Ratings stars={recipe.rating}/>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="recipes">
        {recipes}
      </div>
    );
  }
});
