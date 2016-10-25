import React from 'react'
import request from 'superagent';

require("./../css/list-recipes.scss");

export default React.createClass({
  loadRecipesFromServer: function(url) {
    var base_url = "/api/v1/recipe/recipes/?format=json&fields=id,title,pub_date,photo";
    console.log(base_url + url);
    request
      .get(base_url + url)
      .type('json')
      .end((err, res) => {
        if (!err && res) {
          this.setState({ data: res.body.results });
        } else {
          console.error(url, err.toString());
        }
      })
  },
  componentWillReceiveProps(nextProps) {
    this.loadRecipesFromServer(nextProps.url);
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    var format = this.props.format;
    var recipes = this.state.data.map(function(recipe) {
      var link = '/recipe/' + recipe.id;
      return (
        <div className={format} key={recipe.id}>
          <div className="thumbnail recipe">
            <img src={recipe.photo} alt="Recipe Image"/>
            <div className="caption">
              <h4><a href={link}>{recipe.title}</a>
              </h4>
              <p>This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="ratings">
              <p className="pull-right date">{recipe.pub_date}</p>
              <p>
                <span className="glyphicon glyphicon-star"/>
                <span className="glyphicon glyphicon-star"/>
                <span className="glyphicon glyphicon-star"/>
                <span className="glyphicon glyphicon-star"/>
                <span className="glyphicon glyphicon-star-empty"/>
              </p>
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
