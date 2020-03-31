$(function() {
  $.ajax({
    url: "https://dl.dropboxusercontent.com/s/6mztoeb6xf78g5w/COVID-19.csv",
    success: function(data) {
      $("#read_text").text(data);
    }
  });
});
