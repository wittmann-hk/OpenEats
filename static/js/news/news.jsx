
var CarouselButtons = React.createClass({
  render: function() {
    return (
      <div>
        <a className="left carousel-control" href="#news" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#news" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
});

var CarouselIndicators = React.createClass({
  render: function() {
    var indicatorNodes = this.props.data.map(function(entry) {
      return (
        <li data-target="#news" data-slide-to={entry.id-1} key={entry.id} />
      );
    });
    return (
      <ol className="carousel-indicators">
        {indicatorNodes}
      </ol>
    );
  }
});

var CarouselItems = React.createClass({
  render: function() {
    var entryNodes = this.props.data.map(function(entry) {
      return (
        <div className={'item '+((1===entry.id) ?'active':'')} key={entry.id}>
          <div className="container">
            <div className="carousel-caption">
              <h1>{entry.title}</h1>
              <p>{entry.content}</p>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="carousel-inner" role="listbox">
        {entryNodes}
      </div>
    );
  }
});

var NewsCarousel = React.createClass({
  loadNewsFromServer: function() {
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
    this.loadNewsFromServer();
  },
  render: function() {
    return (
      <div id="news" className="carousel slide" data-ride="carousel">
        <CarouselIndicators data={this.state.data} />
        <CarouselItems data={this.state.data} />
        <CarouselButtons />
      </div>
    );
  }
});

ReactDOM.render(
  <NewsCarousel url="/api/v1/news/entry/?format=json" />,
  document.getElementById('news')
);
