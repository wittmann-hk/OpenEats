import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import NewRecipeStore from '../stores/NewRecipeStore';
import NewRecipeActions from '../actions/NewRecipeActions';

import DirectionList from './DirectionList'
import IngredientList from './IngredientList'
import TagList from './TagList'
import { Input, File, Alert, Select, TextArea } from './FormComponents'
import { Auto } from './Auto'

require("./../css/create.scss");

function getStateFromStore() {
  return {
    data: NewRecipeStore.getForm(),
    errors: NewRecipeStore.getError(),
    course: NewRecipeStore.getCourse(),
    cuisine: NewRecipeStore.getCuisine(),
    tags: NewRecipeStore.getTags(),
  };
}

var Recipe = injectIntl(React.createClass({
  getInitialState: function() {
    return getStateFromStore();
  },

  componentDidMount: function() {
    NewRecipeActions.init();
    NewRecipeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    NewRecipeStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState( getStateFromStore() );
  },

  CreateRecipe: function(e) {
    e.preventDefault();
    NewRecipeActions.submit(this.state.data);
  },

  update: function(name, value) {
    NewRecipeActions.update(name, value);
  },

  render: function () {

    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      name_label: {
        id: 'recipe.create.name_label',
        description: 'Recipe name label',
        defaultMessage: 'Recipe name',
      },
      name_placeholder: {
        id: 'recipe.create.name_placeholder',
        description: 'Recipe name placeholder',
        defaultMessage: 'Recipe',
      },
      course_label: {
        id: 'recipe.create.course_label',
        description: 'Course label',
        defaultMessage: 'Course',
      },
      cuisine_label: {
        id: 'recipe.create.cuisine_label',
        description: 'Cuisine label',
        defaultMessage: 'Cuisine',
      },
      tags_label: {
        id: 'recipe.create.tags_label',
        description: 'Tags label',
        defaultMessage: 'Tags',
      },
      prep_time_label: {
        id: 'recipe.create.prep_time_label',
        description: 'Prep time label',
        defaultMessage: 'Prep time',
      },
      prep_time_placeholder: {
        id: 'recipe.create.prep_time_placeholder',
        description: 'Prep time placeholder',
        defaultMessage: 'Prep time in minutes',
      },
      cooking_time_label: {
        id: 'recipe.create.cooking_time_label',
        description: 'Cooking time label',
        defaultMessage: 'Cooking time',
      },
      cooking_time_placeholder: {
        id: 'recipe.create.cooking_time_placeholder',
        description: 'Cooking time placeholder',
        defaultMessage: 'Cooking time in minutes',
      },
      servings_label: {
        id: 'recipe.create.servings_label',
        description: 'Servings label',
        defaultMessage: 'Servings',
      },
      servings_placeholder: {
        id: 'recipe.create.servings_placeholder',
        description: 'Servings placeholder',
        defaultMessage: 'Servings',
      },
      rating_label: {
        id: 'recipe.create.rating_label',
        description: 'Rating label',
        defaultMessage: 'Rating',
      },
      rating_placeholder: {
        id: 'recipe.create.rating_placeholder',
        description: 'Rating placeholder',
        defaultMessage: 'Rate this recipe from 0 to 5',
      },
      ingredients_label: {
        id: 'recipe.create.ingredients_label',
        description: 'Recipe ingredients label',
        defaultMessage: 'Ingredients',
      },
      instructions_label: {
        id: 'recipe.create.instructions_label',
        description: 'Rating label',
        defaultMessage: 'Instructions',
      },
      information_label: {
        id: 'recipe.create.information_label',
        description: 'Recipe information label',
        defaultMessage: 'Recipe information',
      },
      information_placeholder: {
        id: 'recipe.create.information_placeholder',
        description: 'Recipe information placeholder',
        defaultMessage: 'A quick description of the recipe',
      },
      source_label: {
        id: 'recipe.create.source_label',
        description: 'Rating source label',
        defaultMessage: 'Source',
      },
      source_placeholder: {
        id: 'recipe.create.source_placeholder',
        description: 'Rating source placeholder',
        defaultMessage: 'URL source of the recipe (if any)',
      },
      photo_label: {
        id: 'recipe.create.photo_label',
        description: 'Photo label',
        defaultMessage: 'Photo',
      },
      photo_placeholder: {
        id: 'recipe.create.photo_placeholder',
        description: 'Photo placeholder',
        defaultMessage: 'Photo',
      },
      submit: {
        id: 'recipe.create.submit',
        description: 'Submit recipe button',
        defaultMessage: 'Submit recipe',
      }
    });

    return (
      <form className="recipe-form">
        { this.state.errors ? ( <Alert/> ) : ''}
        <Input name="title" type="text" label={ formatMessage(messages.name_label) } placeholder={ formatMessage(messages.name_placeholder) } change={this.update}/>
        <div className="row">
          <Select name="course" data={this.state.course} label={ formatMessage(messages.course_label) } size="col-xs-4" change={this.update}/>
          <Select name="cuisine" data={this.state.cuisine} label={ formatMessage(messages.cuisine_label) } size="col-xs-4" change={this.update}/>
          <TagList name="tags" data={this.state.tags} label={ formatMessage(messages.tags_label) } size="col-xs-4" change={this.update}/>
        </div>
        <div className="row">
          <Input name="cook_time" type="number" label={ formatMessage(messages.prep_time_label) } placeholder={ formatMessage(messages.prep_time_placeholder) } size="col-xs-3" change={this.update}/>
          <Input name="prep_time" type="number" label={ formatMessage(messages.cooking_time_label) } placeholder={ formatMessage(messages.cooking_time_placeholder) } size="col-xs-3" change={this.update}/>
          <Input name="servings" type="number" label={ formatMessage(messages.servings_label) } placeholder={ formatMessage(messages.servings_placeholder) } size="col-xs-3" change={this.update}/>
          <Input name="rating" type="number" label={ formatMessage(messages.rating_label) } placeholder={ formatMessage(messages.rating_placeholder) } size="col-xs-3" change={this.update}/>
        </div>
        <IngredientList name="ingredients" label={ formatMessage(messages.ingredients_label) } change={this.update}/>
        <DirectionList name="directions" label={ formatMessage(messages.instructions_label) } change={this.update}/>
        <TextArea name="info" rows="4" label={ formatMessage(messages.information_label) } placeholder={ formatMessage(messages.information_placeholder) } change={this.update}/>
        <Input name="source" type="text" label={ formatMessage(messages.source_label) } placeholder={ formatMessage(messages.source_placeholder) } change={this.update}/>
        <File name="photo" label={ formatMessage(messages.photo_label) } placeholder={ formatMessage(messages.photo_placeholder) } change={this.update}/>
        <button className="btn btn-primary" onClick={this.CreateRecipe}>{ formatMessage(messages.submit) }</button>
      </form>
    )
  }
}));


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
