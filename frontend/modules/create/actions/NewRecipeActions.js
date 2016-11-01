import request from 'superagent';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AuthStore from '../../account/stores/AuthStore';
import NewRecipeConstants from '../constants/NewRecipeConstants';
import {serverURLs} from '../../common/config'

export default {
  submit: function(data) {
    let ajax = request.post(serverURLs.recipe);
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
    ajax.set('Authorization', 'Token ' + AuthStore.getToken());
    ajax.end((err, res) => {
      if (!err && res) {
        this.handleSubmit(res.body.id);
      } else {
        console.error(serverURLs.recipe, err.toString());
        console.error(res.body);
        this.error(res.body);
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

  init: () => {
    var course = [];
    var cuisine = [];
    var tags = [];
    request.get(serverURLs.course).type('json')
      .end((err, res) => {
        if (!err && res) {
          course = res.body.results;
          request.get(serverURLs.cuisine).type('json')
            .end((err, res) => {
              if (!err && res) {
                cuisine = res.body.results;
                request.get(serverURLs.tag).type('json')
                  .end((err, res) => {
                    if (!err && res) {
                      tags = res.body.results;
                      AppDispatcher.dispatch({
                        actionType: NewRecipeConstants.INIT,
                        cuisine: cuisine,
                        course: course,
                        tags: tags,
                      });
                    } else {
                      console.error(serverURLs.tags, err.toString());
                    }
                  });
              } else {
                console.error(serverURLs.cuisine, err.toString());
              }
            });
        } else {
          console.error(serverURLs.course, err.toString());
        }
      });
  },
}
