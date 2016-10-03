
var Ingredients = React.createClass({
  loadRecipeFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadRecipeFromServer();
    console.log(this.props.params);
  },
  render: function() {
    var ingredients = this.state.data.map(function(ingredient) {
      return (
        <li className="ingredient" key={ingredient.id}>
          {ingredient.quantity} -
          {ingredient.measurement} -
          {ingredient.title}
        </li>
      );
    });
    return (
      <ul className="ingredients" >
        {ingredients}
      </ul>
    );
  }
});

var RecipeScheme = React.createClass({
  render: function() {
    return (
      <div className="recipe-details">
        <div className="image">
          <img className="img" src={this.props.data.photo} />
        </div>
        <div className="recipe-schema" itemType="http://schema.org/Recipe">
          <h2>{this.props.data.title}</h2>
          <div className="misc">
            <div className="item">
              <p className="header">Cooking Time</p>
              <p className="body">{this.props.data.cook_time}</p>
            </div>
            <div className="item">
              <p className="header">Servings</p>
              <p className="body">{this.props.data.servings}</p>
            </div>
            <div className="item">
              <p className="header">Rating</p>
              <p className="body">{this.props.data.rating}</p>
            </div>
          </div>
          <div className="clear">&nbsp;</div>
          <div className="desc">
            <h3>Ingredients</h3>
            <Ingredients url={this.props.url}/>
          </div>
          <div className="desc">
            <h3>Instructions</h3>
            <p>{this.props.data.directions}</p>
          </div>
        </div>
        <div className="info">
          <h1>Infomation</h1>
          <p>{this.props.data.info}</p>
        </div>
      </div>
    );
  }
});

var Recipe = React.createClass({
  loadRecipeFromServer: function() {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    url = "/api/v1/recipe/recipes/"+ this.props.params.recipe_id + "/?format=json";
    this.loadRecipeFromServer(url);
    console.log(this.props.params);
  },
  render: function() {
    ing_url = "/api/v1/ingredient/ingredient/?format=json&recipe="+ this.props.params.recipe_id;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="row">
              <div id="similar"></div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row">
              <div id="recipe" className="col-lg-push-1 col-lg-10">
                <RecipeScheme data={this.state.data} url={ing_url}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
