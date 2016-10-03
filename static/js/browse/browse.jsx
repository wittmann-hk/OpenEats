
var Recipes = React.createClass({
  render: function() {
    var recipes = this.props.data.map(function(recipe) {
      return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 recipe" key={recipe.id}>
          <a className="image" href="#">
            <img className="img-circle" src={recipe.photo} alt="Recipe Image"/>
          </a>
          <a className="title" href="#">{recipe.title}</a>
          <p className="date">Posted {recipe.pub_date}</p>
        </div>
      );
    });
    return (
      <div className="recipes">
        {recipes}
      </div>
    );
  }
});

var Browse = React.createClass({
  loadNewsFromServer: function(url) {
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
    if(this.props.params.course) {
      this.loadNewsFromServer(this.props.route.url + '&course=' + this.props.params.course);
    }
    else if (this.props.params.cuisine) {
      this.loadNewsFromServer(this.props.route.url + '&cuisine=' + this.props.params.cuisine);
    }
    else {
      this.loadNewsFromServer(this.props.route.url);
    }
  },
  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      if(nextProps.params.course) {
        this.loadNewsFromServer(nextProps.route.url + '&course=' + nextProps.params.course);
      }
      else if (nextProps.params.cuisine) {
        this.loadNewsFromServer(nextProps.route.url + '&cuisine=' + nextProps.params.cuisine);
      }
      else {
        this.loadNewsFromServer(nextProps.route.url);
      }
    }
  },
  filter: function (filter) {
    url = this.props.url + filter;
    this.setState({url: url});
    this.loadNewsFromServer(url);
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-2 sidebar">
            <div className="row">
              <h3 className="course">By Course</h3>
              <CourseList url="/api/v1/groups/course/?format=json" />
              <h3 className="cuisine">By Cuisine</h3>
              <CuisineList url="/api/v1/groups/cuisine/?format=json" />
            </div>
          </div>
          <div className="col-xs-10">
            <div id="browse" className="row">
              <Recipes data={this.state.data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});
