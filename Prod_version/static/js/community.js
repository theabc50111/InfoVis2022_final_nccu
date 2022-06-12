// 地圖 ----------------------------------------
var map3 = L
  .map('map3')
  .setView([25.055218,121.536752], 12).addLayer(
    new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
)

// 使用者互動 --------------------------------------
// 選單
var date = ['2021-11-01','2021-11-02','2021-11-03','2021-11-04','2021-11-05','2021-11-06','2021-11-07','2021-11-08','2021-11-09','2021-11-10','2021-11-11','2021-11-12','2021-11-13','2021-11-14','2021-11-15','2021-11-16','2021-11-17','2021-11-18','2021-11-19','2021-11-20','2021-11-21','2021-11-22','2021-11-23','2021-11-24','2021-11-25','2021-11-26','2021-11-27','2021-11-28','2021-11-29','2021-11-30'];

var select = d3.select('#select_list')
  .append('select')
    .attr('class','select')
    .on('change', onchange)

var options = select
  .selectAll('option')
  .data(date).enter()
  .append('option')
  .text(function (d) { return d});

// 速度控制條
var update_freq = 1000;
d3.select("#mySlider").on("change", function(d){
  update_freq = this.value;
  document.getElementById('speed_freq').innerHTML = `(${roundNumber(update_freq/1000, 2)} 秒)`;
})

// 按鈕 
var restart_button = d3.select('#restart_button')
  .on("click", function() {
    onchange();
})

/*參考
https://d3-graph-gallery.com/graph/interactivity_button.html
https://d3-graph-gallery.com/graph/line_change_data.html
*/

// 社群圓圈圖 --------------------------------------
function community(myDate) {
  d3.json("./dataset/community.json", function(data){

    const myColor = ['red','blue','orange','green', 'purple','yellow','black']

    //https://gis.stackexchange.com/questions/240169/leaflet-onclick-add-remove-circles

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const loop = async () => {
      for (let k=0; k<24; k++){
        document.getElementById('myHour').innerHTML = k.toString() + ":00";

        let group1 = L.featureGroup();
        for (let j=0; j<7; j++){
          for (let i=0; i<data[myDate][k][j].length; i++ ){
            let circle = L.circle(
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
        map3.addLayer(group1);
        await wait(update_freq);
        map3.removeLayer(group1);       
      }
      $("#restart_button").prop("disabled", false);
    }
    loop(); 
  })
}

// 更新 --------------------------------------
function onchange(e) {
  $("#restart_button").prop("disabled", true);
  selectValue = d3.select('select').property('value')
  community(selectValue);  
};
onchange() // 初始化

// 其他功能 -----------------------------------------------
var popup = L.popup();
function onMapClick(e) {
  popup
  .setLatLng(e.latlng)
  .setContent("經緯度座標：" + e.latlng.toString())
  .openOn(map3);
}
  
map3.on('click', onMapClick);


function roundNumber(rnum, rlength) { 
  var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
  return newnumber;
}