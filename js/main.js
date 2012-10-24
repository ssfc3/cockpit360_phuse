$(document).ready(function(){

	if(!Modernizr.input.placeholder){

		$('[placeholder]').focus(function() {
		  var input = $(this);
		  if (input.val() == input.attr('placeholder')) {
			input.val('');
			input.removeClass('placeholder');
		  }
		}).blur(function() {
		  var input = $(this);
		  if (input.val() == '' || input.val() == input.attr('placeholder')) {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		  }
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  $(this).find('[placeholder]').each(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
			  input.val('');
			}
		  })
		});
	}
	
	$(".app-subheader select").each(function(){
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

    $("#revenue-range").slider({
    	range: true,
    	min: 10000,
    	max: 100000,
    	values: [10000, 60000],
    	step: 1000,
    	slide: function(event, ui) {
    		$("#revenue-input").val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    	}
    });

    $("#revenue-input").val( "$" + $("#revenue-range").slider("values", 0) + " - $" + $( "#revenue-range" ).slider( "values", 1 ) );


    $("#empl-range").slider({
    	range: true,
    	min: 0,
    	max: 500,
    	values: [0, 150],
    	step: 1,
    	slide: function(event, ui) {
    		$("#empl-input").val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
    	}
    });

    $("#empl-input").val( $("#empl-range").slider("values", 0) + $( "#empl-range" ).slider( "values", 1 ) );

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
    });

    $("#login-trigger").click(function(e){
    	e.preventDefault();
    	$(this).next("#prelaunch-login").toggle();
    	$("#overlay").fadeToggle();
    });

  	$("#overlay").click(function(){
  		$(this).fadeOut();
  		$("#prelaunch-login").hide();
  	});

  	$(".page-header").click(function(){
  		$("#overlay").fadeOut();
  		$("#prelaunch-login").hide();
  	});

  	$(".login").click(function(event){
  		event.stopPropagation();
  	});

    /*$(".slider").hide();

    $("#metrics input[type='radio']").click(function() {
    	$(".slider").slideUp();
    	if($(this).is(":checked")) {
    		$(this).next(".slider").slideDown();
    	}
    });*/

  $('.slider').each(function(){
        var slider = $(this),
            slides = slider.find('.slide'),
            currentSlide = 0;
            
        $(slides[currentSlide]).addClass('active');

        $('.slide-nav a').on('click', function(){
        	slides.removeClass('active');
        	$('.slide-nav a').removeClass('active-nav');
        	$(this).addClass('active-nav');
        	theSlide = $(this).attr("href");
        	$(theSlide).addClass('active');
        	return false;
        })
    
    });

    $(".conditional-field").hide();

    $("input[name=delegate]").click(function(){
        var value = $(this).filter(':checked').val();
        if (value === "yes") {
            $("#delegate-conditional").fadeIn();
        } else {
            $("#delegate-conditional").fadeOut();
        }
    });

    $("input[name=collect-data]").click(function(){
        var value = $(this).filter(':checked').val();
        if (value === "auto") {
            $("#software-conditional").fadeIn();
        } else {
            $("#software-conditional").fadeOut();
        }
    });

    $("#category-select ul ul").hide();

    $("#category-select input[type=checkbox]").each(function(){
        $(this).bind("click", function() {
            var listId = $(this).attr("name");
        if ($(this).is(':checked')) {
            $("#" + listId).fadeIn();
        } else {
            $("#" + listId).fadeOut();
        }
    });
    });

});
