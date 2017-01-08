import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

export var Input = React.createClass({
  getInitialState: function() {
    return { value: this.props.value || '' };
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
    if(this.props.change) {
      this.props.change(event.target.name, event.target.value);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.value === undefined && this.props.value != nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  },

  render: function() {
    return (
      <div className={this.props.size} key={this.props.id}>
        <div className="form-group">
          {this.props.label ? <label>{this.props.label}</label> : null}
          <input type={this.props.type}
                 name={this.props.name}
                 className="form-control"
                 placeholder={this.props.placeholder}
                 value={this.state.value}
                 onChange={this.handleChange}/>
        </div>
      </div>
    )
  }
});

export var TextArea = React.createClass({
  getInitialState: function() {
    return { value: this.props.value || '' };
  },

  handleChange(event) {
    this.setState({value: event.target.value});
    if(this.props.change) {
      this.props.change(event.target.name, event.target.value);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.value === undefined && this.props.value != nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  },

  render: function () {
    return (
      <div className={this.props.size} key={this.props.id}>
        <div className="form-group">
          {this.props.label ? <label>{this.props.label}</label> : null}
          <textarea type={this.props.type}
                    name={this.props.name}
                    rows={this.props.rows}
                    className="form-control"
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.handleChange}/>
        </div>
      </div>
    )
  }
});

export var File = injectIntl(React.createClass({
  getInitialState: function() {
    return {value: this.props.value || ''};
  },

  handleChange(event) {
    this.setState({value: event.target.files[0]});
    if(this.props.change) {
      this.props.change(event.target.name, event.target.files[0]);
    }
  },

  render: function () {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      help_block: {
        id: 'file_widget.help_block',
        description: 'File upload widget help message',
        defaultMessage: 'Please upload a picture of the finished recipe!',
      }
    });

    return (
      <div className={this.props.size} key={this.props.id}>
        <div className="form-group">
          {this.props.label ? <label>{this.props.label}</label> : null}
          <input type="file"
                 name={this.props.name}
                 onChange={this.handleChange}/>
          <p className="help-block">{ formatMessage(messages.help_block) }</p>
        </div>
      </div>
    )
  }
}));

export var Checkbox = React.createClass({
  getInitialState: function() {
    return {checked: this.props.checked || true};
  },

  handleChange(event) {
    var new_value = !this.state.checked === true ? 1 : 0;
    this.setState({checked: new_value});
    if(this.props.change) {
      this.props.change(event.target.name, new_value);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.checked != nextProps.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  },

  render: function () {
    return (
      <div className={this.props.size} key={this.props.id}>
        <div className="checkbox">
          <label>
            <input type="checkbox"
                   name={this.props.name}
                   checked={this.state.checked}
                   onChange={this.handleChange}/>
            {this.props.placeholder}
          </label>
        </div>
      </div>
    )
  }
});

export var Select = injectIntl(React.createClass({
  getInitialState: function() {
    return { value: this.props.value || '' };
  },

  handleChange(event) {
    this.setState({value: event.target.value});
    if(this.props.change) {
      this.props.change(event.target.name, event.target.value);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.value === undefined && this.props.value != nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  },

  render: function () {
    var options = this.props.data.map(function(option) {
      return (
        <option key={option.id} value={option.id}>{option.title}</option>
      );
    });

    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      header: {
        id: 'select_widget.header',
        description: 'Select widget default message',
        defaultMessage: 'Please select a {label}',
      }
    });

    return (
      <div className={this.props.size} key={this.props.id}>
        <div className="form-group">
          {this.props.label ? <label>{this.props.label}</label> : null}
          <select name={this.props.name}
                  className="form-control"
                  value={this.state.value}
                  onChange={this.handleChange}>
            <option key={0} value="">{ formatMessage(messages.header, {label: this.props.label}) }</option>
            { options }
          </select>
        </div>
      </div>
    )
  }
}));

export var Alert = injectIntl(React.createClass({
  render: function() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      title: {
        id: 'widget_error.title',
        description: 'Form error title',
        defaultMessage: 'Form error!',
      },
      message: {
        id: 'widget_error.message',
        description: 'Form error message',
        defaultMessage: 'Please confirm that all the data is there.',
      }
    });

    return (
      <div className="alert alert-danger">
        <strong>{ formatMessage(messages.title) }</strong> { formatMessage(messages.message) }
      </div>
    )
  }
}));
