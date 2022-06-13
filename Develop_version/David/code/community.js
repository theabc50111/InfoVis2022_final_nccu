//var map = L.map('map').setView([25.0381045,121.5776644], 13);
var map = L.map('map').setView([25.044218,121.536752], 13);
// 設定圖資來源
var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 16});
//map.addLayer(osm);    
                                
map.addLayer(osm);
let myDate = '2021-11-01';
d3.json("./dataset/community.json")
  .then(function(data){

  svg = d3.select("#map").select("svg")
  const myColor = ['red','blue','orange','green', 'purple','yellow','black']

  //https://gis.stackexchange.com/questions/240169/leaflet-onclick-add-remove-circles
  var group1 = L.featureGroup();
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  const loop = async () => {
    for (var k=0; k<24; k++){ 
      //console.log(myLoopCheck);
      //console.log(myLoopBreak);
      if(myLoopBreak == 1){
        myLoopBreak = 0;
        break;
      }

      if(myLoopCheck <= 22){
        myLoopCheck += 1;
      }
      else{
        myLoopCheck = 0;
      }

      document.getElementById('myHour').innerHTML = k.toString() + ":00";
      //var myHour = d3.select('#myHour')
      //  .text(k.toString() + ":00");

      var group1 = L.featureGroup();
      for (var j=0; j<7; j++){
        for (var i=0; i<data[myDate][k][j].length; i++ ){
          var circle = L.circle(
            [data[myDate][k][j][i].lat,data[myDate][k][j][i].lng],   // 圓心座標
            //data['2021-11-02'][k][j][i].pagerank * 30000,                // 半徑（公尺）
            data[myDate][k][j][i].count*5,    //radius
              {
                color: myColor[j],      // 線條顏色
                fillColor: myColor[j], // 填充顏色
                fillOpacity: 0.5   // 透明度
              }
          ).addTo(group1);                    
        }         
      }
      map.addLayer(group1);
      await wait(1500);
      map.removeLayer(group1);            
    }
  }
  loop()    
})
  
// Add a svg layer to the map
L.svg().addTo(map);        
    
var popup = L.popup();
function onMapClick(e) {
  popup
  .setLatLng(e.latlng)
  .setContent("經緯度座標：" + e.latlng.toString())
  .openOn(map);
}
  
map.on('click', onMapClick);

var data = ['2021-11-01','2021-11-02','2021-11-03','2021-11-04','2021-11-05','2021-11-06','2021-11-07','2021-11-08','2021-11-09','2021-11-10','2021-11-11','2021-11-12','2021-11-13','2021-11-14','2021-11-15','2021-11-16','2021-11-17','2021-11-18','2021-11-19','2021-11-20','2021-11-21','2021-11-22','2021-11-23','2021-11-24','2021-11-25','2021-11-26','2021-11-27','2021-11-28','2021-11-29','2021-11-30'];

var select = d3.select('#select_list')
  .append('select')
    .attr('class','select')
    .on('change',onchange)

var options = select
  .selectAll('option')
  .data(data).enter()
  .append('option')
  .text(function (d) { return d});

function community(myDate) {
  d3.json("./dataset/community.json")
    .then(function(data){

    svg = d3.select("#map").select("svg")
    const myColor = ['red','blue','orange','green', 'purple','yellow','black']

    //https://gis.stackexchange.com/questions/240169/leaflet-onclick-add-remove-circles
    var group1 = L.featureGroup();
    var myCheck;
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const loop = async () => {
      for (var k=0; k<24; k++){
        //console.log(myLoopCheck);
        //console.log(myLoopBreak);
        if(myLoopBreak == 1){
          myLoopBreak = 0;
          break;
        }

        if(myLoopCheck <= 22){
          myLoopCheck += 1;
        }
        else{
          myLoopCheck = 0;
        }
        
        document.getElementById('myHour').innerHTML = k.toString() + ":00";
        //var myHour = d3.select('#myHour')
        //  .text(k.toString() + ":00"); 
        var group1 = L.featureGroup();
        for (var j=0; j<7; j++){
          for (var i=0; i<data[myDate][k][j].length; i++ ){
            var circle = L.circle(
              [data[myDate][k][j][i].lat,data[myDate][k][j][i].lng],   // 圓心座標
              //data['2021-11-02'][k][j][i].pagerank * 30000,                // 半徑（公尺）
              data[myDate][k][j][i].count*5,    //radius
                {
                  color: myColor[j],      // 線條顏色
                  fillColor: myColor[j], // 填充顏色
                  fillOpacity: 0.5   // 透明度
                }
            ).addTo(group1);                    
          }         
        }
        map.addLayer(group1);
        await wait(1500);
        map.removeLayer(group1);            
      }
    }
    loop()    
  })
}

var myLoopCheck = 0;
var myLoopBreak = 0;
var delayInMilliseconds = 1000; //1 second

function onchange(e) {
  //console.log(e);
  selectValue = d3.select('select').property('value')

  if(myLoopCheck != 0){
    myLoopBreak = 1;
    myLoopCheck = 0;
  }
  
  setTimeout(function() {
    community(selectValue); 
  }, delayInMilliseconds);
  
};