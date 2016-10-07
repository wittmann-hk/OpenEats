import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './base/App'
import About from './about/About'
import News from './news/News'
import Browse from './browse/Browse'
import Recipe from './recipe/Recipe'

// Load in the base CSS
require("./base/css/footer.css");

// Load in config file
var config = require('config');

render((
    <div>
      <Router history={browserHistory} config={config}>
        <Route path="/" component={App}>
          <IndexRoute component={News}/>
          <Route path="/recipe/:recipe" component={Recipe}/>
          <Route path="/about" component={About}/>
          <Route path="/browse" component={Browse}>
            <Route path="/browse/search" component={Browse}/>
            <Route path="/browse/course/:course" component={Browse}/>
            <Route path="/browse/cuisine/:cuisine" component={Browse}/>
          </Route>
        </Route>
      </Router>
    </div>
  ),
  document.getElementById('content')
);
