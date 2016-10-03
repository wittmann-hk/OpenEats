var ReactRouter = window.ReactRouter;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var Redirect = ReactRouter.Redirect;
var NavLink = ReactRouter.NavLink;
var browserHistory = ReactRouter.browserHistory;

ReactDOM.render(
  (
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute url="/api/v1/news/entry/?format=json" component={NewsCarousel}/>
          <Route path="/recipe/:recipe_id" url="/api/v1/recipe/recipes/?format=json" component={Recipe}/>
          <Route path="/browse" url="/api/v1/recipe/recipes/?format=json" component={Browse}>
            <Route path="/browse/course/:course" url="/api/v1/recipe/recipes/?format=json" component={Browse}/>
            <Route path="/browse/cuisine/:cuisine" url="/api/v1/recipe/recipes/?format=json" component={Browse}/>
          </Route>
        </Route>
      </Router>
    </div>
  ),
  document.getElementById('content')
);
