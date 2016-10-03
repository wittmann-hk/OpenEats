
var App = React.createClass({
  render: function() {
    return (
      <div className="react">
        <Nav />
        {this.props.children}
      </div>
    );
  }
});