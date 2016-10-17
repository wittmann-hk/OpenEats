import React from 'react'
import {Input} from './FormComponent'

var Ingredient = React.createClass({
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
    return (
      <div className="ingredient" key={this.props.id}>
        <Input name="title" type="text" placeholder="Name" size="col-xs-4" change={this.update}/>
        <Input name="quantity" type="number" placeholder="Quantity" size="col-xs-4" change={this.update}/>
        <Input name="measurement" type="text" placeholder="Measurement" size="col-xs-4" change={this.update}/>
      </div>
    )
  }
});

export var IngredientList = React.createClass({
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
    return (
      <div className="row">
        {this.props.label ? <label className="col-xs-12">{this.props.label}</label> : null}
        {this.state.ingredients}
        <a href="#" onClick={this.addIngredient} className="btn btn-success add-ing">Add Ingredient</a>
      </div>
    )
  }
});
