import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import { TextArea } from './FormComponents'

var Direction = injectIntl(React.createClass({
  getInitialState: function() {
    return {
      step: this.props.data ? this.props.data.step : 0,
      title: this.props.data ? this.props.data.title : ''
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
      step_label: {
        id: 'directions.step_label',
        description: 'Step # label',
        defaultMessage: 'Step {step, number}',
      },
      textarea_placeholder: {
        id: 'directions.textarea_placeholder',
        description: 'Step # label',
        defaultMessage: 'Direction',
      }
    });

    return (
      <div className="direction row">
        <label className="col-xs-1">{ formatMessage(messages.step_label, {step: this.state.step}) }:</label>
        <TextArea name="title" type="text" placeholder={ formatMessage(messages.textarea_placeholder) } size="col-xs-10" change={ this.update } value={ this.state.title }/>
        <div className="col-xs-1">
          <div className="form-group">
            <button onClick={ this.props.deleteDirection } className="btn btn-danger glyphicon glyphicon-remove" />
          </div>
        </div>
      </div>
    )
  }
}));

export default injectIntl(React.createClass({
  getInitialState: function () {
    return {
      directions: [],
      errors: this.props.errors || false
    };
  },

  addDirection: function (e) {
    e.preventDefault();
    let directions = this.state.directions;
    directions.push({
      step: directions.length === 0 ? 1 : (directions[directions.length - 1].step + 1),
      title: ''
    });
    this.setState({ directions: directions });
    this.props.change(this.props.name, this.state.directions);
  },

  deleteDirection: function (e, key) {
    e.preventDefault();

    let directions = this.state.directions;
    directions.splice(key, 1);
    directions = directions.map((i, k) => { return {step: k + 1, title: i.title};});

    this.setState({
      directions: directions
    });

    this.props.change(this.props.name, directions);
  },

  updateData: function (key, name, value) {
    if (value != this.state.directions[key][name]) {
      this.state.directions[key][name] = value;
      this.setState({
        directions: this.state.directions
      });

      if (this.props.change) {
        this.props.change(this.props.name, this.state.directions);
      }
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.directions === undefined && this.props.directions != nextProps.directions) {
      this.setState({
        directions: nextProps.directions
      });
    }

    if('errors' in nextProps) {
      this.setState({errors: nextProps.errors});
    }
  },

  render: function () {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      next_direction: {
        id: 'directions.next_direction',
        description: 'Next direction button text',
        defaultMessage: 'Next direction',
      }
    });

    const directionsList = this.state.directions.map((direction, key) => {
      return (
        <Direction 
          key={ key.toString() + '-' + this.state.directions.length.toString() }
          id={ key }
          data={ direction }
          change={(name, value) => { this.updateData(key, name, value); } }
          deleteDirection={(e) => { this.deleteDirection(e, key) }}/>
        )
    });

    let panelClass = "panel panel-default";
    let errorMessage = false;
    if (this.state.errors !== false) {
      panelClass = "panel panel-danger";
      errorMessage = (
        <div className="panel-footer">
          { this.state.errors[0] }
        </div>
      )
    }

    return (
      <div className="row">
        { this.props.label ? <label className="col-xs-12">{ this.props.label }</label> : null }
        <div className="col-xs-12">
          <div className={ panelClass }>
            <div className="panel-body">
              { directionsList }
              <a href="#" onClick={ this.addDirection } className="btn btn-success add-ing">{ formatMessage(messages.next_direction) }</a>
            </div>
            { errorMessage }
          </div>
        </div>
      </div>
    )
  }
}));
