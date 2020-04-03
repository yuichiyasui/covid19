$(function() {
  // Load the Visualization API and the corechart package.
  google.charts.load("current", { packages: ["bar", "corechart"] });

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawRegionsMap);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Topping");
    data.addColumn("number", "Slices");
    data.addRows([
      ["Mushrooms", 3],
      ["Onions", 1],
      ["Olives", 1],
      ["Zucchini", 1],
      ["Pepperoni", 2]
    ]);

    // Set chart options
    var options = {
      title: "How Much Pizza I Ate Last Night",
      width: 400,
      height: 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(
      document.getElementById("chart_div")
    );
    chart.draw(data, options);
  }

  google.load("visualization", "1", { packages: ["geochart"] });
  google.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
      ["Region", "Data"],
      ["北海道", 54],
      ["青森", 32],
      ["岩手", 2],
      ["宮城", 5],
      ["秋田", 7],
      ["山形", 8],
      ["福島", 8],
      ["茨城", 9],
      ["栃木", 24],
      ["群馬", 66],
      ["埼玉", 5],
      ["千葉", 6],
      ["東京", 4],
      ["神奈川", 74],
      ["新潟", 4],
      ["富山", 7],
      ["石川", 37],
      ["福井", 34],
      ["山梨", 100],
      ["長野", 6],
      ["岐阜", 8],
      ["静岡", 7],
      ["愛知", 5],
      ["三重", 54],
      ["滋賀", 56],
      ["京都", 23],
      ["大阪", 45],
      ["兵庫", 7],
      ["奈良", 9],
      ["和歌山", 2],
      ["鳥取", 65],
      ["島根", 9],
      ["岡山", 3],
      ["広島", 9],
      ["山口", 6],
      ["徳島", 6],
      ["香川", 34],
      ["愛媛", 99],
      ["高知", 53],
      ["福岡", 91],
      ["佐賀", 34],
      ["長崎", 6],
      ["熊本", 3],
      ["大分", 5],
      ["宮崎", 43],
      ["鹿児島", 36],
      ["沖縄", 35]
    ]);

    var options = {
      region: "JP",
      resolution: "provinces"
    };

    var chart = new google.visualization.GeoChart(
      document.getElementById("regions_map_div")
    );

    chart.draw(data, options);
  }

  $.ajax({
    url: "https://dl.dropboxusercontent.com/s/6mztoeb6xf78g5w/COVID-19.csv",
    success: function(data) {
      $("#read_text").text(data);
    }
  });
});
