import React from 'react'
import { render } from 'react-dom'
import { IntlProvider, addLocaleData } from 'react-intl'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// Load default locale data;
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
addLocaleData([...en, ...es]);

const messages = require('./locale/'+process.env.LOCALE+'.json');

import App from './base/components/App'
import NotFound from './base/components/404'
import About from './about/components/About'
import Login from './account/components/Login'
import News from './news/components/News'
import Browse from './browse/components/Browse'
import { RecipeForm } from './recipe_form/components/RecipeForm'
import Recipe from './recipe/components/Recipe'

// Load in the base CSS
require("./base/css/footer.css");

render((
    <IntlProvider locale={process.env.LOCALE} messages={messages}>
      <div>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={News}/>
            <Route path="/news" component={News}/>
            <Route path="/recipe/create" component={RecipeForm} /*onEnter={requireAuth}*//>
            <Route path="/recipe/edit/:recipe" component={RecipeForm} /*onEnter={requireAuth}*//>
            <Route path="/recipe/:recipe" component={Recipe} />
            <Route path="/about" component={About}/>
            <Route path="/login" component={Login}/>
            <Route path="/browse" component={Browse}/>
            <Route path="*" component={NotFound} />
          </Route>
        </Router>
      </div>
    </IntlProvider>
  ),
  document.getElementById('content')
);
