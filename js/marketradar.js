$(function() {
  var itemPos = $(".app-header.scroll").offset();
  var headHeight = $(".app-header").css("height");

  if( itemPos && headHeight){
    $(document).scroll(function(){
        var scrollPos = $(document).scrollTop(); 
        if (scrollPos > itemPos.top) {
            $(".app-header").css({
                "position": "fixed",
                "top": "0",
                "z-index" : "5"
            });
            $(".app-subheader").css({
                "position" : "fixed",
                "top" : headHeight,
                "z-index" : "5",
                "box-shadow" : "0 1px 5px rgba(0, 0, 0, 0.5)"
            });
        } else {
            console.log("top");
            $(".app-header").css({
                "position" : "static",
                "z-index" : "1"
            });
            $(".app-subheader").css({
                "position" : "static",
                "z-index" : "1",
                "box-shadow" : "none"
            });
        }
        //console.log(scrollPos);
    });
  }
});
