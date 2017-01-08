import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

require("./../css/filter.scss");

export default injectIntl(React.createClass({

  _onClick: function (event) {
    event.preventDefault();
    if(this.props.filter) {
      this.props.filter(this.props.title, event.target.name);
    }
  },

  render: function() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      filter_x: {
        id: 'filter.filter_x',
        description: 'Filter field',
        defaultMessage: 'Filter {title}',
      },
      clear_filter: {
        id: 'filter.clear_filter',
        description: 'Clear filter button',
        defaultMessage: 'Clear filter',
      }
    });

    var _onClick = this._onClick;
    var active = this.props.active;
    var items = this.props.data.map(function(item) {
      var classNames = "list-group-item";
      if (item.title == active) {
        classNames += " active";
      }
      return (
        <a className={ classNames }
           href="#"
           key={ item.id }
           name={ item.title }
           onClick={ _onClick }>
          { item.title }
        </a>
      );
    });
    return (
      <div className="list-group filter">
         <p className="list-group-item disabled">
           <b>{ formatMessage(messages.filter_x, {title: this.props.title }) }</b>
         </p>
        { items }
        { active ?
          <a className="list-group-item"
             href="#"
             name={ '' }
             key={ 9999999999999999 }
             onClick={ _onClick }>
            { formatMessage(messages.clear_filter) }
          </a>
          : ''
        }
      </div>
    );
  }
}));
