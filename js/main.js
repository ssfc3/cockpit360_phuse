$(document).ready(function(){

    $("#mc-embedded-subscribe").click(function(e){
        e.preventDefault();
        $(this).parent("form").submit();
    });

    // set placeholder fallbacks for IE

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
            input.addCldass('placeholder');
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

    // Selectboxes
    
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

    // Hidden stuff

    $("#prox-zip-code, #graph, #metrics-widget, .other-option, .conditional-field, #category-select ul ul, .more, #basic-measures").hide();

    
    // Conditions for location-switcher dropdown 

    $("#location-type").change(function(){
        if ($(this).val() === "nearby") {
            $("#neighborhood-trigger").hide();
            $(".nearby").fadeIn();
        } else if ($(this).val() === "neighborhood") {
            $("#neighborhood-trigger").fadeIn();
            $(".nearby").hide();
        } else {
            $(".nearby").fadeOut();
            $("#neighborhood-trigger").fadeOut();
        }
    });

    $(".has-other").change(function(){
        if ($(this).val() === "other") {
            $(".other-option").fadeIn();
        } else {
            $(".other-option").fadeOut();
        }
    });


    // Range Sliders
    var proxRange = $('#prox-range');
    var currentMin = proxRange.data('minimum-proximity');
    var currentMax = proxRange.data('maximum-proximity');

    proxRange.slider({
        range: true,
        min: 0,
        max: 25,
        values: [ currentMin, currentMax ],
        step: 5,
        slide: function( event, ui ) {
          $( "#prox-input" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] ); 
          $('input[name="minimum_proximity"]').val(ui.values[0]);
          $('input[name="maximum_proximity"]').val(ui.values[1]);
        },
        stop: function(){ $('#filter_form').submit() }
    });
    $( "#prox-input" ).val( $( "#prox-range" ).slider( "values", 0 ).toString() + ' - ' + $( "#prox-range" ).slider( "values", 1 ) );

    $("#revenue-range").slider({
    	range: true,
    	min: 10000,
    	max: 100000,
    	values: [10000, 60000],
    	step: 1000,
    	slide: function(event, ui) {$("#revenue-input").val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] ); }
    });
    $("#revenue-input").val( "$" + $("#revenue-range").slider("values", 0) + " - $" + $( "#revenue-range" ).slider( "values", 1 ) );

    $("#empl-range").slider({
    	range: true,
    	min: 0,
    	max: 500,
    	values: [0, 150],
    	step: 5,
    	slide: function(event, ui) {$("#empl-input").val( ui.values[ 0 ] + " - " + ui.values[ 1 ] ); }
    });
    $("#empl-input").val( $("#empl-range").slider("values", 0) + $( "#empl-range" ).slider( "values", 1 ) );


    // Tooltips

    $(document).tooltip({
    	 position: {
            my: "center top+10",
            at: "center bottom",
            using: function( position, feedback ) {
                $( this ).css( position );
            }
        }
    });


    // Tabs 

    $(".tabs a").click(function(e){
    	$(this).parent().siblings().children().removeClass("active");
    	$(this).addClass("active");
    	var tab = $(this).attr("href");
    	$(tab).siblings(".tab").hide();
    	$(tab).show();
    	e.preventDefault();
        if ($("#graph").css("display") === "block") {
            $("#basic-measures").fadeIn('slow');
        } else {
            $("#basic-measures").fadeOut();
        }
    });


    // Login dropdown form

    $("#login-trigger").click(function(e){
    	e.preventDefault();
    	$(this).next("#prelaunch-login").toggle();
    	$("#overlay").fadeToggle();
    });

  	$("#overlay").click(function(){
  		$(this).fadeOut();
  		$("#prelaunch-login").hide();
        $(".modal").remove();
  	});

  	$(".page-header").click(function(){
  		$("#overlay").fadeOut();
  		$("#prelaunch-login").hide();
  	});

  	$(".login").click(function(event){
  		event.stopPropagation();
  	});


    $(".add-note").click(function(e){
        e.preventDefault();
        modal("note_form.html");
    });

    function modal(load) {
        $("#overlay").fadeToggle();
        $("body").append("<div class='modal'></div>");
        $(".modal").load(load, function(){
            $(".dismiss").on("click", function(){
                $(".modal").remove();
                $("#overlay").fadeOut();
            });
        });
    }

    $("#invite-button").click(function(e){
        e.preventDefault();
        modal("invite_form.html");
    })

   

    // Home page slider

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
        });
        setInterval(function(){
            var cur = $('.slide-nav .active-nav').parent("li").next("li").children("a");
            var target = $(cur).attr("href");
            $('.slide-nav a').removeClass('active-nav');
            if (target === undefined) {
                nextSlide = $("#slide1");
                $(".slide-nav li:first-child a").addClass("active-nav");
            } else {
                nextSlide = $(target);
                cur.addClass('active-nav');
            }
            slides.removeClass('active');
            nextSlide.addClass('active');
        }, 13000);
    });


    // Conditional form fields
   
    $("input[name=delegate]").click(function(){
        var value = $(this).filter(':checked').val();
        if (value === "yes") {
            $("#delegate-conditional").fadeIn();
        } else {
            $("#delegate-conditional").fadeOut();
        }
    });


    $("#append-delegate").click(function(e){
        var items = ('<li class="field left"><input type="text" placeholder="First Name"/></li><li class="field right"><input type="text" placeholder="Last Name"/><span class="field-text error"><a href="#" class="remove-field">Remove</a></span></li>');
        e.preventDefault();
        $(this).before(items);
    });

    $('.app').on('click', '.remove-field', function(e){
        e.preventDefault();
        var liParents = $(this).parent().parent("li");
        liParents.prev().fadeOut();
        liParents.fadeOut();
        if ($("#delegate-conditional li").length === 0) {
            $("input[name=delegate]").prop('checked', false);
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

    $("#category-select input[type=checkbox]").each(function(){
        $(this).bind("click", function() {
            var listId = $(this).data("cat");
            if ($(this).is(':checked')) {
                $("#" + listId).fadeIn();
            } else {
                $("#" + listId).fadeOut();
            }
        });
    });

    // Show-more functionality

    $("a.show-more").click(function(e){
        e.preventDefault();
        $(this).toggleClass("open");
        var target = $(this).attr("href");
        $(target).slideToggle();
        if ($(this).hasClass("open")) {
            $(this).text("Show Fewer");
        } else {
            $(this).text("Show More");
        }
    });

    $(".datepicker").datepicker({
        changeMonth: true,
        changeYear: true
    });

    // I'm thinking this could go in a partial or be loaded in via ajax? Cause this'll be a form right?
    var assign_user = "<div class ='assign-user popover-content'><label>Assign to:</label><select><option>Unassigned</option><option>John Doe</option></select></div>";

    $(".assignment").click(function(e){
        if ($(".assign-user").length === 0) {
            $(this).after(assign_user);
        }
        e.preventDefault();
    });

    $("#neighborhood-trigger").click(function(e) {
        $("#neighborhood-select").show();
        e.preventDefault();
    })

    $("html").click(function(e){
         if ( !($(e.target).parents(".popover").length > 0)) {
            $(".assign-user").remove();
         } 
         if ( !($(e.target).parents(".popover-wrapper").length > 0)){
            $("#neighborhood-select").hide();
         }
    });

    $(".popover").on("change", "select", function(){
        $(".assign-user").remove();
    });

    

  

});
