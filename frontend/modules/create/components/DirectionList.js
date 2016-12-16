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
    return { instruction: ''};
  },
  update: function(name, value) {
    this.setState({ [name]: value });
  },
  componentWillUpdate: function(nextProps, nextState) {
    if (nextProps.change) {
      nextProps.change(nextProps.id, nextState.instruction);
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
      <div className="instruction" key={this.props.id}>
        <label className="col-xs-1">{ formatMessage(messages.step_label, {step: parseInt(this.props.id) + 1}) }:</label>
        <TextArea name="instruction" type="text" placeholder={ formatMessage(messages.textarea_placeholder) } size="col-xs-11" change={this.update}/>
      </div>
    )
  }
}));

export default injectIntl(React.createClass({
  getInitialState: function () {
    return { instructions: [<Instruction key="0" id="0" change={this.updateData}/>], data: [] };
  },
  addInstruction: function (e) {
    e.preventDefault();
    var instructions = this.state.instructions;
    instructions.push(<Instruction key={instructions.length} id={instructions.length} change={this.updateData} />);
    this.setState({ instructions: instructions });
  },
  updateData: function (id, data) {
    var instructions = this.state.data;
    instructions[id] = {
      title: data,
      step: id 
    };
    this.setState({data: instructions});
    if (this.props.change) {
      this.props.change(this.props.name, instructions);
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

    return (
      <div className="row">
        {this.props.label ? <label className="col-xs-12">{this.props.label}</label> : null}
        <div className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-body">
              {this.state.instructions}
              <a href="#" onClick={this.addInstruction} className="btn btn-success add-ing">{ formatMessage(messages.next_instruction) }</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}));
