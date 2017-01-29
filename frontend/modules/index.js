import React from 'react'
import { render } from 'react-dom'
import { IntlProvider, addLocaleData } from 'react-intl'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// Load default locale data;
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import de from 'react-intl/locale-data/de';
addLocaleData([...en, ...es, ...de]);

const messages = require('./locale/'+process.env.LOCALE+'.json');

import App from './base/components/App'
import NotFound from './base/components/404'
import About from './about/components/About'
import Login from './account/components/Login'
import News from './news/components/News'
import Browse from './browse/components/Browse'
import { RecipeForm } from './recipe_form/components/RecipeForm'
import Recipe from './recipe/components/Recipe'
import AuthStore from './account/stores/AuthStore'

// Load in the base CSS
require("./base/css/footer.css");

const requireAuth = (nextState, replace) => {
  if (!AuthStore.isAuthenticated()) {
    replace('/browse');
  }
};

const routeConfig = [
  { path: '/',
    component: App,
    indexRoute: { component: News },
    childRoutes: [
      { path: 'news', component: News },
      { path: 'about', component: About },
      { path: 'login', component: Login },
      { path: 'browse', component: Browse },
      { path: 'recipe',
        childRoutes: [
          { path: 'create', component: RecipeForm, onEnter: requireAuth },
          { path: 'edit/:id', component: RecipeForm, onEnter: requireAuth },
          { path: ':recipe', component: Recipe }
        ]
      },
      { path: '*', component: NotFound }
    ]
  }
]

render((
    <IntlProvider locale={ process.env.LOCALE } messages={ messages }>
      <div>
        <Router
          history={ browserHistory }
          routes={ routeConfig }
        />
      </div>
    </IntlProvider>
  ),
  document.getElementById('content')
);
