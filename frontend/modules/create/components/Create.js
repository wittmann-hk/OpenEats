import React from 'react'

import NewRecipeStore from '../stores/NewRecipeStore';
import NewRecipeActions from '../actions/NewRecipeActions';

import {RichEditor} from './RichText'
import {IngredientList} from './IngredientList'
import {Input, Checkbox, File, Alert} from './FormComponents'

require("./../css/create.scss");

function getStateFromStore() {
  return {
    data: NewRecipeStore.getForm(),
    errors: NewRecipeStore.getError()
  };
}

var Recipe = React.createClass({

  getInitialState: function() {
    return getStateFromStore();
  },

  componentDidMount: function() {
    NewRecipeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    NewRecipeStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    console.log(NewRecipeStore.getForm());
    this.setState(getStateFromStore());
  },

  CreateRecipe: function(e) {
    e.preventDefault();
    NewRecipeActions.submit('/api/v1/recipe/recipes/', this.state.data);
  },

  update: function(name, value) {
    NewRecipeActions.update(name, value);
  },

  render: function () {
    return (
      <form className="recipe-form">
        { this.state.errors ? ( <Alert/> ) : ''}
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
    return {data: ''};
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
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
