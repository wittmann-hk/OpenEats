import React from 'react'
import classNames from 'classnames'

import { injectIntl, defineMessages } from 'react-intl';

import { 
  ALL_ITEMS, 
  ACTIVE_ITEMS, 
  COMPLETED_ITEMS 
} from '../constants/ListStatus'

export default injectIntl(React.createClass({
  render: function () {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      item: {
        id: 'list.footer.item',
        description: 'Number of items left (1 item)',
        defaultMessage: 'item left',
      },
      items: {
        id: 'list.footer.items',
        description: 'Number of items left (2 items)',
        defaultMessage: 'items left',
      },
      all: {
        id: 'list.footer.all',
        description: 'Show all items',
        defaultMessage: 'All',
      },
      completed: {
        id: 'list.footer.completed',
        description: 'Show only completed items',
        defaultMessage: 'Completed',
      },
      active: {
        id: 'list.footer.active',
        description: 'Show active items',
        defaultMessage: 'Active',
      },
      clear_completed: {
        id: 'list.footer.clear_completed',
        description: 'Clear all completed list items',
        defaultMessage: 'Clear completed',
      }
    });

    var clearButton = null;
    var nowShowing = this.props.nowShowing;
    var activeItemWord = '';

    if (this.props.count == 1) {
      activeItemWord = formatMessage(messages.item)
    } else {
      activeItemWord = formatMessage(messages.items)
    }

    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed clear-button"
          onClick={this.props.onClearCompleted}>
          { formatMessage(messages.clear_completed) }
        </button>
      );
    }

    return (
      <div className="list-footer">
        <span className="list-count">
          <strong>{ this.props.count }</strong> { activeItemWord }
        </span>
        <ul className="filters">
          <li>
            <a
              href="#"
              className={ classNames({ selected: nowShowing === ALL_ITEMS })}
              onClick={ () => { this.props.filter_status(ALL_ITEMS) }}>
                { formatMessage(messages.all) }
            </a>
          </li>
          { ' ' }
          <li>
            <a
              href="#"
              className={ classNames({ selected: nowShowing === ACTIVE_ITEMS })}
              onClick={ () => { this.props.filter_status(ACTIVE_ITEMS) }}>
                { formatMessage(messages.active) }
            </a>
          </li>
          { ' ' }
          <li>
            <a
              href="#"
              className={ classNames({ selected: nowShowing === COMPLETED_ITEMS })}
              onClick={ () => { this.props.filter_status(COMPLETED_ITEMS) }}>
                { formatMessage(messages.completed) }
            </a>
          </li>
        </ul>
        { clearButton }
      </div>
    );
  }
}));
