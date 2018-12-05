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


// SAAT REGIS CHECKBOX DI CHECK, MUNCULIN FORM REGIS
function showRegisForm() {
  var regisCheck = document.getElementById("registerCheck");
  if (regisCheck.checked == true) {
    document.getElementById("regis").classList.add("d-block");
  }
  else if (regisCheck.checked == false) {
    document.getElementById("regis").classList.remove("d-block");
  }
}