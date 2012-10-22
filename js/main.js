$(document).ready(function(){

	$("select").each(function(){
	  $(this).wrap('<div class="selectbox"/>');
		$(this).after("<span class='selecttext'></span><span class='select-arrow'></span>");
		var val = $(this).children("option:selected").text();
		$(this).next(".selecttext").text(val);
		$(this).change(function(){
			var val = $(this).children("option:selected").text();
			$(this).next(".selecttext").text(val);
		});
	});

    $( "#prox-range" ).slider({
        range: true,
        min: 0,
        max: 100,
        values: [ 0, 50 ],
        step: 10,
        slide: function( event, ui ) {
            $( "#prox-input" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        }
    });
    $( "#prox-input" ).val( $( "#prox-range" ).slider( "values", 0 ) +
        $( "#prox-range" ).slider( "values", 1 ) );

    $("#performance-rank").tooltip({
    	 position: {
            my: "center top+10",
            at: "center bottom",
            using: function( position, feedback ) {
                $( this ).css( position );
            }
        }
    });

    $("#graph").hide();

    $(".tabs a").click(function(e){
    	$(this).parent().siblings().children().removeClass("active");
    	$(this).addClass("active");
    	var tab = $(this).attr("href");
    	$(tab).siblings(".tab").hide();
    	$(tab).show();
    	e.preventDefault();
    })

});
