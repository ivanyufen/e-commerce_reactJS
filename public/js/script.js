// NAVBAR SHRINK SAAT DI SCROLL

$(document).ready(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 20) {
      $(".navbar").addClass("compressed");
      $(".header-icons-noti").addClass("header-icons-noti2");
    } else {
      $(".navbar").removeClass("compressed");
      $(".header-icons-noti").removeClass("header-icons-noti2");
    }
  });
});


//UNTUK NAMPILIN INSTAGRAM FEED
var userFeed = new Instafeed({
  get: 'user',
  userId: '196131657',
  accessToken: '196131657.1677ed0.c076dfaa2eec4471a364ec6662595034',
  limit: 8,
  resolution: 'standard_resolution',
  sortBy: 'most-recent',
  template: '<div class="col-lg-3 ig-img"><a href="{{image}}" title="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}" class="img-fluid"/>{{caption}}</a></div>'
});

userFeed.run();