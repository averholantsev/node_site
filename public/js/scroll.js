function windowSize(){
    if ($(this).scrollTop() >= 50  &&  $(window).width() > '599') {        // If page is scrolled more than 50px
      $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
      $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
  }
  $(window).on('load resize',windowSize);
  $(window).scroll(windowSize);
  // ===== Scroll to Top ====
  
  $('#return-to-top').click(function() {      // When arrow is clicked
      $('body,html').animate({
          scrollTop : 0                       // Scroll to top of body
      }, 500);
  });