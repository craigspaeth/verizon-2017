//
// Main app javascript that uses jQuery to hook up functionality.
// Wondering where semicolons are? This is linted with StandardJS.com
//
var $ = window.$

$(function () {
  // Toggle hamburger menu
  $('.header-content-burger').click(function () {
    $('.header').toggleClass('open')
  })

  // Open video
  $('.ar-slide-play-button, .ar-slide-play-mobile').click(function () {
    var $main = $(this).closest('.ar-slide').find('.ar-slide-video-main')
    $main.show()
    $main.find('.ar-slide-video').get(0).play()
  })

  // Close modals
  $('.modal-close, .modal-container').click(function () {
    $(this).closest('.modal-container').fadeOut(150)
  })
})
