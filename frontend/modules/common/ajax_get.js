
var ajax_get = function (url) {
  $.ajax({
    url: url,
    dataType: 'json',
    cache: false,
    success: function(data) {
      this.setState({data: data});
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
  });
};