$(document).ready(function(){

    // $(".tabs-list li label").click(function(e){
    //     e.preventDefault();
    // });
  
    $(".tabs-list li").click(function(){
      $(".tabs-list li,.tabs div.tab").removeClass("active");  // removing active class from tab

      $(this).addClass("active"); //  adding active class to clicked tab
  
      // 頁面切換
      switch ($("ul.tabs-list li.active").index()) {
        case 0:
          break;
        case 1:
          $.getScript( "./static/js/map_timeseries_heatmap.js")
          break;
        case 2:
          $.getScript( "./static/js/trips.js")
          break;
        case 3:
          $.getScript( "./static/js/community.js")
          break;
      }
    });
  
    // 初始
});