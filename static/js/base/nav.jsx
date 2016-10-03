
var Nav = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <Link className="navbar-brand" to="/">Open Eats</Link>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><Link activeClassName="active" to="/">News</Link></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account <span className="caret"/></a>
                <ul className="dropdown-menu">
                  <li className="dropdown-header">Recipes</li>
                  <li><a href="#">New Recipe</a></li>
                  <li><a href="#">My Recipes</a></li>
                  <li role="separator" className="divider"/>
                  <li className="dropdown-header">My Account</li>
                  <li><a href="#">Settings</a></li>
                  <li><a href="#">Logout</a></li>
                </ul>
              </li>
              <li><Link activeClassName="active" to="/browse">Recipes</Link></li>
              <li><Link activeClassName="active" to="/about">About</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <form className="navbar-form">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search"/>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});