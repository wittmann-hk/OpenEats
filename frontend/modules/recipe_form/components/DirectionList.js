import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import { TextArea } from './FormComponents'

var Instruction = injectIntl(React.createClass({
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
        id: 'instructions.step_label',
        description: 'Step # label',
        defaultMessage: 'Step {step, number}',
      },
      textarea_placeholder: {
        id: 'instructions.textarea_placeholder',
        description: 'Step # label',
        defaultMessage: 'Instruction',
      }
    });

    return (
      <div className="instruction row">
        <label className="col-xs-1">{ formatMessage(messages.step_label, {step: this.state.step}) }:</label>
        <TextArea name="title" type="text" placeholder={ formatMessage(messages.textarea_placeholder) } size="col-xs-10" change={ this.update } value={ this.state.title }/>
        <div className="col-xs-1">
          <div className="form-group">
            <button onClick={ this.props.deleteInstruction } className="btn btn-danger glyphicon glyphicon-remove" />
          </div>
        </div>
      </div>
    )
  }
}));

export default injectIntl(React.createClass({
  getInitialState: function () {
    return { instructions: [] };
  },

  addInstruction: function (e) {
    e.preventDefault();
    let instructions = this.state.instructions;
    instructions.push({
      step: instructions.length === 0 ? 1 : (instructions[instructions.length - 1].step + 1),
      title: ''
    });
    this.setState({ instructions: instructions });
    this.props.change(this.props.name, this.state.instructions);
  },

  deleteInstruction: function (e, key) {
    e.preventDefault();

    let instructions = this.state.instructions;
    instructions.splice(key, 1);
    instructions = instructions.map((i, k) => { return {step: k + 1, title: i.title};});

    this.setState({
      instructions: instructions
    });

    this.props.change(this.props.name, instructions);
  },

  updateData: function (key, name, value) {
    if (value != this.state.instructions[key][name]) {
      this.state.instructions[key][name] = value;
      this.setState({
        instructions: this.state.instructions
      });

      if (this.props.change) {
        this.props.change(this.props.name, this.state.instructions);
      }
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.instructions === undefined && this.props.instructions != nextProps.instructions) {
      this.setState({
        instructions: nextProps.instructions
      });
    }
  },

  render: function () {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      next_instruction: {
        id: 'instructions.next_instruction',
        description: 'Next instruction button text',
        defaultMessage: 'Next instruction',
      }
    });

    const instructionsList = this.state.instructions.map((instruction, key) => {
      return (
        <Instruction 
          key={ key.toString() + '-' + this.state.instructions.length.toString() }
          id={ key }
          data={ instruction }
          change={(name, value) => { this.updateData(key, name, value); } }
          deleteInstruction={(e) => { this.deleteInstruction(e, key) }}/>
        )
    });

    return (
      <div className="row">
        { this.props.label ? <label className="col-xs-12">{ this.props.label }</label> : null }
        <div className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-body">
              { instructionsList }
              <a href="#" onClick={ this.addInstruction } className="btn btn-success add-ing">{ formatMessage(messages.next_instruction) }</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}));
