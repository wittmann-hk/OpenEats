import request from 'superagent';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import NewRecipeConstants from '../constants/NewRecipeConstants';
import {serverURLs} from '../../common/config'

export default {
  submit: function(data) {
    url = serverURLs.recipe;
    let ajax = request.post(url);
    var item;
    for (item in data) {
      if (item == 'photo') {
        console.log(item, data[item]);
        ajax = ajax.attach(item, data[item])
      } else {
        console.log(item, data[item]);
        ajax = ajax.field(item, data[item])
      }
    }
    ajax.end((err, res) => {
      if (!err && res) {
        this.handleSubmit(res.body.id);
      } else {
        console.error(url, err.toString());
        this.error(true);
      }
    });
  },

  handleSubmit: (new_recipe_id) => {
    AppDispatcher.dispatch({
      actionType: NewRecipeConstants.SUBMIT,
      new_recipe_id: new_recipe_id
    });
  },

  error: (error) => {
    AppDispatcher.dispatch({
      actionType: NewRecipeConstants.ERROR,
      error: error
    });
  },

  update: (name, value) => {
    AppDispatcher.dispatch({
      actionType: NewRecipeConstants.UPDATE,
      name: name,
      value: value,
    });
  },
}
