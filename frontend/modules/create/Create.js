import React from 'react'
import request from 'superagent';
import { browserHistory } from 'react-router'

import {RichEditor} from './RichText'
import {IngredientList} from './IngredientList'
import {Input, Checkbox, File} from './FormComponent'

require("./css/create.scss");

var Recipe = React.createClass({
  getInitialState: function() {
    return {title: '',
            cook_time: '',
            servings: '',
            cuisine: '',
            tags: '',
            ingredients: '',
            directions: '',
            info: '',
            photo: '',
            public: '1'};
  },
  PostData: function(url, data) {
    let ajax = request.post(url);
    var item;
    for (item in data) {
      if (item == 'photo') {
        ajax = ajax.attach(item, data[item])
      } else {
        ajax = ajax.field(item, data[item])
      }
    }
    ajax.end((err, res) => {
        if (!err && res) {
          // TODO: redirect the user to the new recipe they just created
          // I will need to return the recipe ID in the post responce
          // browserHistory.push('/');
          console.log('good job');
        } else {
          console.error(url, err.toString());
        }
      });
  },
  CreateRecipe: function(e) {
    e.preventDefault();
    this.PostData('/api/v1/recipe/recipes/', this.state)
  },
  update: function(name, value) {
    this.setState({[name]: value});
  },
  render: function () {
    return (
      <form className="recipe-form">
        <Input name="title" type="text" label="Recipe Name" placeholder="Recipe" change={this.update}/>
        <div className="row">
          <Input name="cook_time" type="number" label="Cooking Time" placeholder="Recipe" size="col-xs-6" change={this.update}/>
          <Input name="servings" type="number" label="Servings" placeholder="Recipe" size="col-xs-6" change={this.update}/>
        </div>
        <div className="row">
          <Input name="cuisine" type="text" label="Cuisine" placeholder="Cuisine" size="col-xs-6" change={this.update}/>
          <Input name="tags" type="text" label="Tags" placeholder="Tags" size="col-xs-6" change={this.update}/>
        </div>
        <IngredientList name="ingredients" label="Ingredients" change={this.update}/>
        <RichEditor name="directions" label="Instructions" placeholder="Instructions" change={this.update}/>
        <RichEditor name="info" label="Recipe Information" placeholder="Recipe Information" change={this.update}/>
        <File name="photo" label="Photo" placeholder="Photo" change={this.update}/>
        <Checkbox name="shared" placeholder="Public" change={this.update}/>
        <button className="btn btn-primary" onClick={this.CreateRecipe}>Submit Recipe</button>
      </form>
    )
  }
});

export default React.createClass({
  getInitialState: function() {
    // TODO: Add ability to edit recipes
    return {data: []};
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="row">
              <div id="similar"></div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row">
              <div id="recipe" className="col-lg-push-1 col-lg-10">
                <Recipe data={this.state.data}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
