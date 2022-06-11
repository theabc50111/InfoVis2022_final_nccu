$(document).ready(function(){

  $(".tabs-list li a").click(function(e){
    e.preventDefault();
  });

  $(".tabs-list li").click(function(){
    var tabid = $(this).find("a").attr("href");
    $(".tabs-list li,.tabs div.tab").removeClass("active");   // removing active class from tab

    $(".tab").hide();   // hiding open tab
    $(tabid).show();    // show tab
    $(this).addClass("active"); //  adding active class to clicked tab

    // 頁面切換
    switch ($("ul.tabs-list li.active").index()) {
      case 0:
        console.log('tab1');
        $.getScript( "js/dataset_map1.js", function() {
          this.update()
        })
        break;
      case 1:
        console.log('tab2');
        $.getScript( "js/dataset_map2.js", function() {
          this.update()
        })
        break;
      case 2:
        console.log('tab3');
        $.getScript( "js/dataset_map3.js", function() {
          this.update()
        })
        break;
    }
  });

  // $.getScript( "js/dataset_map1.js")
});