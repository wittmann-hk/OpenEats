import SuperAgent from 'superagent';
import {Auth} from '../account/Auth'

export default {
  fire(method, url) {
    if (Auth.loggedIn()) {
      return SuperAgent[method](url)
              .set('Authorization', 'Token ' + localStorage.token);
    } else {
      return SuperAgent[method](url);
    }
  }
};
