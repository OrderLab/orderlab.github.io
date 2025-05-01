$(function() {
  "use strict";

  var nav_offset_top = $('header').height() + 50;
    /*-------------------------------------------------------------------------------
	  Navbar
	-------------------------------------------------------------------------------*/
    function navbarFixed(){
        if ( $('.header_area').length ){
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                if (scroll >= nav_offset_top ) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        };
    };
    navbarFixed();

    /*----------------------------------------------------*/
    /*  Course Slider
      /*----------------------------------------------------*/
    function active_course() {
      if ($(".active_course").length) {
        $(".active_course").owlCarousel({
          loop: true,
          margin: 20,
          items: 3,
          nav: true,
          dots: false,
          responsiveClass: true,
          thumbs: true,
          thumbsPrerendered: true,
          navText: ["<img src='assets/img/prev.png'>", "<img src='assets/img/next.png'>"],
          responsive: {
            0: {
              items: 1,
              margin: 0
            },
            991: {
              items: 2,
              margin: 30
            },
            1200: {
              items: 3,
              margin: 30
            }
          }
        });
      }
    }
    active_course();

    /*----------------------------------------------------*/
    /*  Event Slider
      /*----------------------------------------------------*/
    function active_event() {
      if ($(".active_event").length) {
        $(".active_event").owlCarousel({
          loop: true,
          margin: 30,
          items: 2,
          nav: false,
          autoplay: 2500,
          smartSpeed: 1500,
          dots: false,
          responsiveClass: true,
          thumbs: true,
          thumbsPrerendered: true
        });
      }
    }
    active_event();

    /*----------------------------------------------------*/
    /*  News cards slider
      /*----------------------------------------------------*/
    function newscards_slider() {
      if ($(".newscard_slider").length) {
        $(".newscard_slider").owlCarousel({
          loop: true,
          margin: 10,
          items: 4,
          dots: true,
          responsiveClass: true,
          responsive: {
            0: {
              items: 2
            },
            991: {
              items: 3
            }
          }
        });
      }
    }
    newscards_slider();


    /*-------------------------------------------------------------------------------
	  testimonial slider
	-------------------------------------------------------------------------------*/
    if ($('.testimonial').length) {
      $('.testimonial').owlCarousel({
          loop: true,
          margin: 30,
          items: 5,
          nav: false,
          dots: true,
          responsiveClass: true,
          slideSpeed: 3000,
          paginationSpeed: 500,
          responsive: {
              0: {
                  items: 1
              }
          }
      })
    }

});
