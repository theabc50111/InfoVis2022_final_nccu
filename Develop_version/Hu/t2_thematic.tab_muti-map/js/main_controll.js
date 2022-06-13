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
          console.log('tab1');
          break;
        case 1:
          console.log('tab2');
          $.getScript( "js/dataset_map1.js")
          break;
        case 2:
          console.log('tab3');
          $.getScript( "js/dataset_map2.js")
          break;
        case 3:
          console.log('tab4');
          $.getScript( "js/dataset_map3.js")
          break;
      }
    });
  
    // 初始
  });