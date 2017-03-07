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

    const active = this.props.active;
    const items = this.props.data.map((item) => {
      let classNames = ["list-group-item"];
      if (item.slug == active) {
        classNames += [" active"];
      }

      if (item.total == 0) {
        return null;
      }

      return (
        <a className={ classNames }
           href="#"
           key={ item.id }
           name={ item.slug }
           onClick={ this._onClick }>
          { item.title }
          <div className="clear"/>
          <span className="badge">{ item.total }</span>
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
             onClick={ this._onClick }>
            { formatMessage(messages.clear_filter) }
          </a>
          : ''
        }
      </div>
    );
  }
}));
