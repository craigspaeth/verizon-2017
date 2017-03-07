//
// Annual Meeting JS
// Sets up charts, ticking clock, and more.
// Wondering where semicolons are? This is linted with StandardJS.com
//
var $ = window.$

$(function () {
  if (!window.location.pathname.match('am.html')) return
  setupClock()
  setupCharts()

  // Close modal
  $('.am-modal-continue, .am-modal-close, .am-modal-container').click(function () {
    $('.am-modal-container').fadeOut(150)
  })
})

//
// Adds Countdown.js to bring the clock to life
// Copied and linted + beautified from:
// https://github.com/AddisonDesign/verizonAM16
//
var setupClock = function () {
  var coutdown = $('.am-info-countdown')
  coutdown.countdown(coutdown.data().date, function (event) {
    $('.am-info-countdown-days-content', this).text(event.strftime('%D'))
    $('.am-info-countdown-hours-content', this).text(event.strftime('%H'))
    $('.am-info-countdown-minutes-content', this).text(event.strftime('%M'))
    $('.am-info-countdown-seconds-content', this).text(event.strftime('%S'))
    if (event.strftime('%D').charAt(1) === '1') { $('.am-info-countdown-days-header', this).addClass('fadeit') } else { $('.am-info-countdown-days-header', this).removeClass('fadeit') }
    if (event.strftime('%H').charAt(1) === '1') { $('.am-info-countdown-hours-header', this).addClass('fadeit') } else { $('.am-info-countdown-hours-header', this).removeClass('fadeit') }
    if (event.strftime('%D') === '00') {
      $('.am-info-countdown-days', this).hide()
      $($('.am-info-countdown-colon')[0]).hide()
      if (event.strftime('%H') === '00') {
        $('.am-info-countdown-hours', this).hide()
        $($('.am-info-countdown-colon')[1]).hide()
        if (event.strftime('%M') === '00') {
          $('.am-info-countdown-minutes', this).hide()
          $($('.am-info-countdown-colon')[2]).hide()
          if (event.strftime('%S') === '00') {
            $(this).hide()
          }
        }
      }
    }
  })
}

//
// Sets up charts that animate on scroll using ChartJS and ScrollMagic
// Copied and linted + beautified from:
// https://github.com/AddisonDesign/verizonAM16
//
var setupCharts = function () {
  var Chart = window.Chart
  var ScrollMagic = window.ScrollMagic
  var controller = new ScrollMagic.Controller()

  var buildChart = function (el) {
    var ctx
    if (el) ctx = el
    else ctx = $(this)
    var colors = ctx.data().chartcolors.split(',')
    var values = ctx.data().chart
    values = values.split(',').map(function (item) {
      return parseInt(item, 10)
    })
    var data = {
      datasets: [{
        data: values,
        borderWidth: 0,
        backgroundColor: colors
      }]
    }
    var options = {
      legend: {
        display: 0
      },
      tooltips: {
        enabled: 0
      }
    }
    return new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options
    })
  }

  $('.chart').each(function (i) {
    var el = $(this)
    var trigger = el.closest('.am-stats-chart')
    new ScrollMagic.Scene({
      triggerElement: $(trigger),
      duration: '100%',
      triggerHook: 0.8,
      offset: 200
    })
      .addTo(controller)
      .on('enter', function () {
        $('.chartjs-hidden-iframe').remove()
        setTimeout(function () { buildChart(el) }, i * 100)
      })
  })
}
