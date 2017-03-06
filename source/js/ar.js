//
// Homepage AR Javascript setting up scroll jacking and video playing.
// Wondering where semicolons are? This is linted with StandardJS.com
//
var $ = window.$
var _ = window._

$(function () {
  if (
    window.location.pathname !== '/' &&
    !window.location.pathname.match('/index.html')
  ) return

  // Open video
  $('.ar-slide-play-button, .ar-slide-play-mobile').click(function () {
    var $main = $(this).closest('.ar-slide').find('.ar-slide-video-main')
    $main.show()
    $main.find('.ar-slide-video').get(0).play()
  })

  // Video controls
  $('.ar-slide-video-controls-pause').click(function () {
    var $play = $(this).siblings('.ar-slide-video-controls-play')
    var $video = $(this).parent().siblings('.ar-slide-video')
    $(this).hide()
    $video.get(0).pause()
    $play.css({ display: 'inline-block' })
  })
  $('.ar-slide-video-controls-play').click(function () {
    var $pause = $(this).siblings('.ar-slide-video-controls-pause')
    var $video = $(this).parent().siblings('.ar-slide-video')
    $(this).hide()
    $video.get(0).play()
    $pause.css({ display: 'inline-block' })
  })
  $('.ar-slide-video-controls-mute').click(function () {
    var $sound = $(this).siblings('.ar-slide-video-controls-sound')
    var $video = $(this).parent().siblings('.ar-slide-video')
    $(this).hide()
    $video.prop('muted', false)
    $sound.css({ display: 'inline-block' })
  })
  $('.ar-slide-video-controls-sound').click(function () {
    var $mute = $(this).siblings('.ar-slide-video-controls-mute')
    var $video = $(this).parent().siblings('.ar-slide-video')
    $(this).hide()
    $video.prop('muted', true)
    $mute.css({ display: 'inline-block' })
  })
  $('.ar-slide-video-controls-close').click(function () {
    var $main = $(this).parent('.ar-slide-video-main')
    var vid = $main.find('.ar-slide-video').get(0)
    vid.pause()
    vid.currentTime = 0
    $main.hide()
  })

  // Scroll jacking
  var slideIndex = 0
  var sliding = false

  var scrollToSlide = function (i) {
    if (sliding) return
    sliding = true
    slideIndex = i
    $('.ar-slide > .ar-slide-video').each(function () { $(this).get(0).pause() })
    $('body, html').animate({
      scrollTop: ($(window).height() * i) - ($('.header').height() * i)
    }, 350, 'swing', function () {
      sliding = false
      $('.ar-slide > .ar-slide-video').each(function () { $(this).get(0).play() })
    })
    $('.ar-dot').removeClass('ar-dot-active')
    $('.ar-dot:nth-child(' + (i + 1) + ')').addClass('ar-dot-active')
  }

  var slideDir = function (dir) {
    if (sliding) return
    if (dir === 'up' && slideIndex !== 0) {
      scrollToSlide(slideIndex - 1)
    } else if (dir === 'down' && slideIndex < $('.ar-slide').length) {
      scrollToSlide(slideIndex + 1)
    }
  }

  // Lock the body, and scroll to top on load
  $('body').css({ overflow: 'hidden' })
  setTimeout(function () { scrollToSlide(0) })

  // On scroll event
  $(window).on('mousewheel', _.debounce(function (e) {
    var dir = e.originalEvent.wheelDelta > 0 ? 'up' : 'down'
    slideDir(dir)
  }, 50, true))

  // Up and down arrow slide
  $(document).keydown(_.debounce(function (e) {
    if (e.which === 38) slideDir('up')
    else if (e.which === 40) slideDir('down')
  }, 200))

  // On click dot
  $('.ar-dot').click(function () {
    scrollToSlide($(this).index())
  })

  // On resize window
  $(window).on('resize', _.debounce(function () {
    scrollToSlide(slideIndex)
  }, 300))
});
