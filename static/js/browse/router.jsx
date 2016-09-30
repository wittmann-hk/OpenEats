var ReactRouter = window.ReactRouter;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var Redirect = ReactRouter.Redirect;
var browserHistory = ReactRouter.browserHistory;

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/browse" url="/api/v1/recipe/recipes/?format=json" component={Browse}/>
      <Route path="/browse/course/:course" url="/api/v1/recipe/recipes/?format=json" component={Browse}/>
      <Route path="/browse/cuisine/:cuisine" url="/api/v1/recipe/recipes/?format=json" component={Browse}/>
    </Router>
  ),
  document.getElementById('browse')
);
