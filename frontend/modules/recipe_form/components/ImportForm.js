import React from 'react'
import { browserHistory } from 'react-router'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import RecipeActions from '../actions/RecipeActions';

import { Input } from '../../common/form/FormComponents'

require("./../css/create.scss");

class ImportForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source:  this.props.source || '',
    };

    this.update = this.update.bind(this);
    this.ImportRecipe = this.ImportRecipe.bind(this);
  }

  update (name, value) {
    this.setState({
      source: value,
    });
  }

  ImportRecipe(e) {
    e.preventDefault();
    RecipeActions.importRecipe(this.state.source);
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      source_label: {
        id: 'recipe.create.source_label',
        description: 'Rating source label',
        defaultMessage: 'Import From Source',
      },
      source_placeholder: {
        id: 'recipe.create.source_placeholder',
        description: 'Rating source placeholder',
        defaultMessage: 'Import a recipe from another website.',
      },
      import: {
        id: 'recipe.create.import',
        description: 'Import',
        defaultMessage: 'Import',
      },
    });

    return (
      <div className="container">
        <div className="row">
          <div id="recipe" className="col-lg-push-1 col-lg-10">
            <form className="recipe-form">

              <div className="row">
                <Input
                  name="source"
                  type="text"
                  size="col-sm-10 col-xs-12"
                  label={ formatMessage(messages.source_label) }
                  placeholder={ formatMessage(messages.source_placeholder) }
                  change={ this.update }
                  value={ this.state.source } />
                <button
                  className="btn btn-primary col-sm-2 col-xs-12"
                  onClick={ this.ImportRecipe }>
                    { formatMessage(messages.import) }
                </button>
                <div className="col-xs-12">
                   import message
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    )
  }
};

module.exports.ImportForm = injectIntl(ImportForm);