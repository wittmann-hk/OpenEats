import { EventEmitter } from 'events';
import { browserHistory } from 'react-router'

import AppDispatcher from '../../dispatcher/AppDispatcher';
import NewRecipeConstants from '../constants/NewRecipeConstants';

const CHANGE_EVENT = 'change';

var _formData = [];
var _errors = false;

function setData(name, value) {
  _formData[name] = value;
}

class FormStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getError() {
    return _errors;
  }

  getForm() {
    return _formData;
  }

  getFormData(name) {
    return _formData[name];
  }
}

const FormStore = new FormStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
FormStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case NewRecipeConstants.UPDATE:
      setData(action.name, action.value);
      FormStore.emitChange();
      break;

    case NewRecipeConstants.ERROR:
      _errors = action.error;
      FormStore.emitChange();
      break;

    case NewRecipeConstants.SUBMIT:
      browserHistory.push('/recipe/' + action.new_recipe_id);
      FormStore.emitChange();
      break;

    default:
  }


});

export default FormStore;
