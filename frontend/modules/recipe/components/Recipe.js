import React from 'react'
import { Link, browserHistory } from 'react-router'
import request from 'superagent'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl'

import AuthStore from '../../account/stores/AuthStore'
import MiniBrowse from '../../browse/components/MiniBrowse'
import { serverURLs } from '../../common/config'
import Ingredients from './Ingredients'
import Directions from './Directions'
import Ratings from './Ratings'

require("./../css/recipe.scss");

export default React.createClass({
  loadRecipeFromServer: function(id) {
    var url = serverURLs.recipe + id + "/?format=json";
    request
      .get(url)
      .type('json')
      .end((err, res) => {
        if (!err && res) {
          this.setState({ data: res.body });
        } else {
          if (res.statusCode == 404) {
            browserHistory.replace('/notfound');
          } else {
            console.error(url, err.toString());
          }
        }
      })
  },

  getInitialState: function() {
    return {
      data: [],
      user: this.getAuthUser()
    };
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
    this.loadRecipeFromServer(this.props.params.recipe);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  componentWillReceiveProps(nextProps) {
    this.loadRecipeFromServer(nextProps.params.recipe);
  },

  _onChange: function() {
    this.setState({user: this.getAuthUser()});
  },

  getAuthUser() {
    return AuthStore.getUser();
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <RecipeScheme data={ this.state.data } user={ this.state.user } recipe_id={ this.props.params.recipe }/>
          </div>
          <div className="col-md-3">
            <MiniBrowse format="col-md-12 col-sm-6 col-xs-12" qs="&limit=4" />
          </div>
        </div>
      </div>
    );
  }
});

var RecipeScheme = injectIntl(React.createClass({
  render: function() {

    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      cooking_time: {
        id: 'recipe.cooking_time',
        description: 'Cooking time',
        defaultMessage: 'Cooking time',
      },
      prep_time: {
        id: 'recipe.prep_time',
        description: 'Preparation time',
        defaultMessage: 'Prep time',
      },
      servings: {
        id: 'recipe.servings',
        description: 'Servings',
        defaultMessage: 'Servings',
      },
      ingredients: {
        id: 'recipe.ingredients',
        description: 'Ingredients',
        defaultMessage: 'Ingredients',
      },
      directions: {
        id: 'recipe.directions',
        description: 'Directions',
        defaultMessage: 'Directions',
      },
      source: {
        id: 'recipe.source',
        description: 'Source of the recipe',
        defaultMessage: 'Source'
      },
      created_by: {
        id: 'recipe.created_by',
        description: 'Created by',
        defaultMessage: 'Created by'
      },
      last_updated: {
        id: 'recipe.last_updated',
        description: 'Last Updated',
        defaultMessage: 'Last Updated'
      },
      minutes: {
        id: 'recipe.minutes',
        description: 'minutes',
        defaultMessage: 'minutes'
      },
    });

    return (
      <div className="recipe-details">

        { this.showRecipeImageHeader() }

        <div className="panel panel-success">
          <div className="panel-heading">
            <div className="row">
              <div className="col-lg-8">
                <h3>{this.props.data.title}</h3>
              </div>
              <div className="col-lg-4">
                {/*
                TODO: add linkage to edit recipe and delete recipe
                <button className="btn btn-danger pull-right edit"><span className="glyphicon glyphicon-trash"/></button>
                <button className="btn btn-warning pull-right edit"><span className="glyphicon glyphicon-edit"/></button>
                */}
              </div>
            </div>
          </div>
          <div className="recipe-schema" itemType="http://schema.org/Recipe">
            <div className="row">
              <div className="col-sm-4 col-xs-12 col-sm-push-8">
                <div className="ratings">
                  { this.showRecipeImageThumb() }
                  <Ratings stars={ this.props.data.rating }/>
                </div>
              </div>

              <div className="col-sm-8 col-sm-pull-4 col-xs-12">
                <div className="description">{ this.props.data.info }</div>

                <div className="row misc">
                  <div className="col-xs-4 item">
                    <p className="header">{ formatMessage(messages.cooking_time) }</p>
                    <p className="body">{ this.props.data.cook_time } { formatMessage(messages.minutes) }</p>
                  </div>
                  <div className="col-xs-4 item middle">
                    <p className="header">{ formatMessage(messages.prep_time) }</p>
                    <p className="body">{ this.props.data.prep_time } { formatMessage(messages.minutes) }</p>
                  </div>
                  <div className="col-xs-4 item">
                    <p className="header">{ formatMessage(messages.servings) }</p>
                    <p className="body">{ this.props.data.servings }</p>
                  </div>
                </div>

                <div className="desc">
                  <h4>{ formatMessage(messages.ingredients) }</h4>
                  <Ingredients data={ this.props.data.ingredients }/>
                </div>
              </div>
            </div>

            <div className="desc">
              <h4>{ formatMessage(messages.directions) }</h4>
              <Directions data={ this.props.data.directions }/>
            </div>
          </div>
          <div className="panel-footer">
            <div className="row">
              <div className="col-lg-10 col-md-6 col-xs-8">
                { (this.props.data.source) ?
                    <div>{ formatMessage(messages.source) }: <a href={ this.props.data.source }>{ this.getDomain(this.props.data.source) }</a></div>
                  : null
                }
                <div>{ formatMessage(messages.created_by) }: { this.props.data.username }</div>
                <div className="hidden-sm hidden-xs">
                  { formatMessage(messages.last_updated) }: { this.props.data.update_date }
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-xs-4 pull-right text-right">
                { this.showEditLink() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  showRecipeImageHeader: function() {
    if (this.props.data.photo) {
      return (
        <div>
          <h1 className="title hidden-xs">{ this.props.data.title }</h1>
          <img className="banner-img img-responsive hidden-xs" src={ this.props.data.photo } />
        </div>
      );
    }
  },

  showRecipeImageThumb: function() {
    if (this.props.data.photo_thumbnail) {
      return (
        <img className="img-responsive" src={ this.props.data.photo_thumbnail } />
      );
    } else {
      return (
        <img className="img-responsive" src="/images/default_recipe_image.png" />
      );
    }
  },

  showEditLink: function() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      edit_recipe: {
        id: 'recipe.edit_recipe',
        description: 'Edit recipe button text',
        defaultMessage: 'Edit recipe'
      }
    });

    if (this.props.user !== null && (this.props.user.id === this.props.data.author)) {
      return (
        <Link to={ "/recipe/edit/" + this.props.data.id }><button className="btn btn-primary btn-sm">{ formatMessage(messages.edit_recipe) }</button></Link>
      )
    }
  },

  // Hack-a-licious!
  getDomain: function(url) {
    let a = document.createElement('a');
    a.href = url;
    return a.hostname;
  }
}));
