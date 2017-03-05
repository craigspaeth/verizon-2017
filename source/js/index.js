//
// Main app javascript that uses jQuery to hook up functionality.
// Wondering where semicolons are? This is linted with StandardJS.com
//
(function () {
  var $ = window.$

  // Toggle hamburger menu
  $('.header-content-burger').click(function () {
    $('.header').toggleClass('open')
  })

  // Open video
  $('.ar-slide-play-button').click(function () {
    var $main = $(this).siblings('.ar-slide-video-main')
    $main.show()
    $main.find('.ar-slide-video').get(0).play()
  })

  // Video controls
  $('.ar-slide-video-controls-pause').click(function () {
    var $play = $(this).siblings('.ar-slide-video-controls-play')
    var $video = $(this).parent().siblings('.ar-slide-video')
    $(this).hide()
    $video.get(0).pause()
    $play.show()
  })
  $('.ar-slide-video-controls-play').click(function () {
    var $pause = $(this).siblings('.ar-slide-video-controls-pause')
    var $video = $(this).parent().siblings('.ar-slide-video')
    $(this).hide()
    $video.get(0).play()
    $pause.show()
  })
  $('.ar-slide-video-controls-mute').click(function () {
    var $sound = $(this).siblings('.ar-slide-video-controls-sound')
    var $video = $(this).parent().siblings('.ar-slide-video')
    $(this).hide()
    $video.prop('muted', false)
    $sound.show()
  })
  $('.ar-slide-video-controls-sound').click(function () {
    var $mute = $(this).siblings('.ar-slide-video-controls-mute')
    var $video = $(this).parent().siblings('.ar-slide-video')
    $(this).hide()
    $video.prop('muted', true)
    $mute.show()
  })
})()
