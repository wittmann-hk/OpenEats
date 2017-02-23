import React from 'react'
import { Link } from 'react-router'

import Ratings from '../../recipe/components/Ratings';

require("./../css/list-recipes.scss");

class ListRecipes extends React.Component {
  render() {
    const recipes = this.props.data.map((recipe) => {
      const link = '/recipe/' + recipe.id;
      return (
        <div className={ this.props.format } key={ recipe.id }>
          <div className="thumbnail recipe">
            <Link to={ link }>
              <img src={ this.getRecipeImage(recipe) } alt={ recipe.title }/>
            </Link>
            <div className="caption">
              <h4><Link to={ link }>{ recipe.title }</Link></h4>
              <p className="desc">{ recipe.info }</p>
            </div>
            <div className="ratings">
              <p className="pull-right date">{ recipe.pub_date }</p>
              <Ratings stars={ recipe.rating }/>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="recipes">
        { recipes }
      </div>
    );
  }

  getRecipeImage(recipe) {
    if (recipe.photo_thumbnail) {
      return recipe.photo_thumbnail;
    } else {
      const images = ['fish', 'fried-eggs', 'pizza', 'soup', 'steak'];
      return '/images/' + images[Math.floor(Math.random(0) * images.length)] + '.png';
    }
  }
}

ListRecipes.propTypes = {
  format: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired
}

module.exports = ListRecipes;