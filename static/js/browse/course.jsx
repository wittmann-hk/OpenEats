
var CourseList = React.createClass({
  loadGroupFromServer: function() {
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
    var courses = this.state.data.map(function(course) {
      return (
        <li key={course.id}>
          <Link to={"/browse/course/" + course.id} activeStyle={{ color: 'red' }}>{course.title}</Link>
        </li>
      );
    });
    return (
      <ul className="course">
        {courses}
      </ul>
    );
  }
});
