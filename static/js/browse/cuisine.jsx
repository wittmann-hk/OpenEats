
var CuisineList = React.createClass({
  loadGroupFromServer: function(url) {
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
    this.loadGroupFromServer();
  },
  render: function() {
    var cuisines = this.state.data.map(function(cuisine) {
      return (
        <li key={cuisine.id}>
          <Link to={"/browse/cuisine/" + cuisine.id} activeStyle={{ color: 'red' }}>{cuisine.title}</Link>
        </li>
      );
    });
    return (
      <ul className="cuisine">
        {cuisines}
      </ul>
    );
  }
});
