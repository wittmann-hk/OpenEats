import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

import {Input} from './FormComponents'
import {Auto} from './Auto'
import {measurements} from '../../common/config'

var Ingredient = injectIntl(React.createClass({
  getInitialState: function() {
    return {
      title: this.props.data ? this.props.data.title : '',
      quantity: this.props.data ? this.props.data.quantity : 0, 
      measurement: this.props.data ? this.props.data.measurement : ''
    };
  },

  update: function(name, value) {
    this.setState({ [name]: value });
    if(this.props.change) {
      this.props.change(name, value);
    }
  },

  render: function () {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      name_placeholder: {
        id: 'ingredients.name_placeholder',
        description: 'Ingredients name placeholder',
        defaultMessage: 'Name',
      },
      quantity_placeholder: {
        id: 'ingredients.quantity_placeholder',
        description: 'Ingredients quantity placeholder',
        defaultMessage: 'Quantity',
      },
      measurement_placeholder: {
        id: 'ingredients.measurement_placeholder',
        description: 'Ingredients measurement placeholder',
        defaultMessage: 'Measurement',
      }
    });

    return (
      <div className="ingredient" key={this.props.id}>
        <Input name="title" type="text" placeholder={ formatMessage(messages.name_placeholder) } size="col-sm-4 col-xs-12" change={ this.update } value={ this.state.title }/>
        <Input name="quantity" type="number" placeholder={ formatMessage(messages.quantity_placeholder) } size="col-sm-3 col-xs-12" change={ this.update } value={ this.state.quantity }/>
        <Auto name="measurement" data={measurements} type="text" placeholder={ formatMessage(messages.measurement_placeholder) } size="col-sm-4 col-xs-12" change={ this.update } value={ this.state.measurement }/>
        <div className="col-xs-1">
          <div className="form-group">
            <button onClick={ this.props.deleteIngredient } className="btn btn-danger glyphicon glyphicon-remove" />
          </div>
        </div>
      </div>
    )
  }
}));

export default injectIntl(React.createClass({
  getInitialState: function () {
    return { ingredients: []};
  },

  addIngredient: function (e) {
    e.preventDefault();
    var ingredients = this.state.ingredients;
    ingredients.push({
      title: '',
      quantity: 0,
      measurement: ''
    });
    this.setState({ ingredients: ingredients });
  },

  deleteIngredient: function (e, key) {
    e.preventDefault();

    let ingredients = this.state.ingredients;
    ingredients.splice(key, 1);

    this.setState({
      ingredients: ingredients
    });

    this.props.change(this.props.name, ingredients);
  },

  updateData: function (key, name, value) {
    if (value != this.state.ingredients[key][name]) {
      this.state.ingredients[key][name] = value;
      this.setState({
        ingredients: this.state.ingredients
      });

      if (this.props.change) {
        this.props.change(this.props.name, this.state.ingredients);
      }
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.ingredients === undefined && this.props.ingredients != nextProps.ingredients) {
      this.setState({
        ingredients: nextProps.ingredients
      });
    }
  },

  render: function () {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      add_ingredient: {
        id: 'ingredients.add_ingredient',
        description: 'Add ingredient button',
        defaultMessage: 'Add ingredient',
      }
    });

    const ingredientList = this.state.ingredients.map((ingredient, key) => {
      return (
        <Ingredient
          key={ key.toString() + '-' + this.state.ingredients.length.toString() }
          id={ key }
          data={ ingredient }
          change={(name, value) => { this.updateData(key, name, value); } }
          deleteIngredient={(e) => { this.deleteIngredient(e, key) }}/>
      )
    });

    return (
      <div className="row">
        {this.props.label ? <label className="col-xs-12">{this.props.label}</label> : null}
        <div className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-body">
              { ingredientList }
              <a href="#" onClick={this.addIngredient} className="btn btn-success add-ing">{ formatMessage(messages.add_ingredient) }</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}));
