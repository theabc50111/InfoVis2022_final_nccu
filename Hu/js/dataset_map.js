let tab_id = 0;
$('a[data-toggle="tab"]').on('click', function () {
  if($(this).closest('li').hasClass('tabs')){
    tab_id = $("ul.tabs-list li.active").index();
    console.log(tab_id);
  }
tabs
  
  // switch ($("ul.tabs-list li.active").index()) {
  //   case 0:
  //     console.log('tab1');
  //     break;
  //   case 1:
  //     console.log('tab2');
  //     break;
  //   case 2:
  //     console.log('tab3');
  //     break;
  // }
});


var map = L
  .map('map1')
  .setView([25.0531, 121.555252], 11).addLayer(
    new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
  )
  
// Add a svg layer to the map
L.svg().addTo(map);


d3.csv("data/spot_info.csv", function(error, data) {
    
  svg = d3.select("#map1").select("svg")
  // Select the svg area and add circles:
  svg.selectAll("myCircles")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d){ return map.latLngToLayerPoint([d.lat, d.lng]).x })
      .attr("cy", function(d){ return map.latLngToLayerPoint([d.lat, d.lng]).y })
      .attr("r", 1)
      .attr("class" , "circle")
      .style("fill", "#884EA0")//"69b3a2"
      .attr("stroke", "#884EA0")//"#402D54", "#D18975", "#8FD175", "#69b3a2"
      .attr("stroke-width", 6)
      .attr("fill-opacity", .4)
      .attr("pointer-events","visible")
    .on('mouseover', function(d){ console.log(d.sna) });

  // If the user change the map (zoom or drag), I update circle position:
  map.on("moveend", update)

  // When a button change, I run the update function
  d3.selectAll(".checkbox").on("change",update);

  // And I initialize it at the beginning
  update()
});

function mark_click(e) {
  console.log(e);
  console.log(`${e.target.options.sno}, ${e.target.options.sna} has been click`);
}

// Function that update circle position if something change
function update() {
  d3.selectAll("circle")
    .attr("cx", function(d){ return map.latLngToLayerPoint([d.lat, d.lng]).x })
    .attr("cy", function(d){ return map.latLngToLayerPoint([d.lat, d.lng]).y })
}