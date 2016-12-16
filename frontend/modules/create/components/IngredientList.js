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
    return {title: '', quantity: '', measurement: ''};
  },
  update: function(name, value) {
    this.setState({[name]: value});
  },
  componentWillUpdate: function(nextProps, nextState) {
    if (nextProps.change) {
      nextProps.change(nextProps.id, nextState);
    }
  },
  render: function () {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      name_label: {
        id: 'ingredients.name_label',
        description: 'Ingredients name label',
        defaultMessage: 'Name',
      },
      name_placeholder: {
        id: 'ingredients.name_placeholder',
        description: 'Ingredients name placeholder',
        defaultMessage: 'Name',
      },
      quantity_label: {
        id: 'ingredients.quantity_label',
        description: 'Ingredients quantity label',
        defaultMessage: 'Quantity',
      },
      quantity_placeholder: {
        id: 'ingredients.quantity_placeholder',
        description: 'Ingredients quantity placeholder',
        defaultMessage: 'Quantity',
      },
      measurement_label: {
        id: 'ingredients.measurement_label',
        description: 'Ingredients measurement label',
        defaultMessage: 'Measurement',
      },
      measurement_placeholder: {
        id: 'ingredients.measurement_placeholder',
        description: 'Ingredients measurement placeholder',
        defaultMessage: 'Measurement',
      }
    });

    return (
      <div className="ingredient" key={this.props.id}>
        <Input name="title" type="text" label={ formatMessage(messages.name_label) } placeholder={ formatMessage(messages.name_placeholder) } size="col-xs-4" change={this.update}/>
        <Input name="quantity" type="number" label={ formatMessage(messages.quantity_label) } placeholder={ formatMessage(messages.quantity_placeholder) } size="col-xs-4" change={this.update}/>
        <Auto name="measurement" data={measurements} type="text" label={ formatMessage(messages.measurement_label) } placeholder={ formatMessage(messages.measurement_placeholder) } size="col-xs-4" change={this.update}/>
      </div>
    )
  }
}));

export default injectIntl(React.createClass({
  getInitialState: function () {
    return { ingredients: [<Ingredient key="0" id="0" change={this.updateData}/>], data: [] };
  },
  addIngredient: function (e) {
    e.preventDefault();
    var ingredients = this.state.ingredients;
    ingredients.push(<Ingredient key={ingredients.length} id={ingredients.length} change={this.updateData} />);
    this.setState({ ingredients: ingredients });
  },
  updateData: function (id, data) {
    var ingredients = this.state.data;
    ingredients[id] = data;
    this.setState({data: ingredients});
    if (this.props.change) {
      this.props.change(this.props.name, ingredients);
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

    return (
      <div className="row">
        {this.props.label ? <label className="col-xs-12">{this.props.label}</label> : null}
        <div className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-body">
              {this.state.ingredients}
              <a href="#" onClick={this.addIngredient} className="btn btn-success add-ing">{ formatMessage(messages.add_ingredient) }</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}));
