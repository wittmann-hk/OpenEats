
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
    return (
      <RecipeScheme data={this.state.data} url={this.props.ing_url}/>
    );
  }
});

let url_parameter = {};
const currLocation = window.location.href,
    parArr = currLocation.split("?")[1].split("&");
for (let i = 0; i < parArr.length; i++) {
    const parr = parArr[i].split("=");
    url_parameter[parr[0]] = parr[1];
}
recipe = "/api/v1/recipe/recipes/"+ url_parameter['q'] + "/?format=json";
ing = "/api/v1/ingredient/ingredient/?format=json&recipe="+ url_parameter['q'];
console.log(ing);

ReactDOM.render(
  <Recipe url={recipe} ing_url={ing}/>,
  document.getElementById('recipe')
);
