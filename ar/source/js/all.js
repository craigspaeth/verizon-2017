$(document).ready(function() {
  var $body = $("body");

  $.fn.headerSection = function() {
    var $elem = this;
    $body.on("click", ".nav_button", function(e) {
      e.preventDefault();
      $($elem).toggleClass("open");
    });
    $body.on("click", ".hamburger", function(e) {
      e.preventDefault();
      $elem.toggleClass("open");
    });

    return $elem;
  };

  $("header").headerSection();

  $('#fullpage').fullpage({
    scrollOverflow: true,
    navigation: true,
    anchors: [
      'a-better-future-for-everyone',
      'serving-the-digital-customer',
      'network-superiority',
      'areas-of-growth',
      'solving-social-problems',
      'the-evolution-of-verizon',
      'more'
    ]
  });

  function formatPrice(price) {
    return price.reverse().replace(/((?:\d{2})\d)/g, '$1 ').reverse();
  }
  String.prototype.reverse = function() {
    return this.split('').reverse().join('');
  };
  $.fn.counter = function(opt) {
    var $elem = this;
    var newNum = $elem.data() ? $elem.data().counter : 0;
    var oldNum = parseInt($elem.text());
    if (oldNum !== newNum) {
      $({
        countNum: oldNum
      }).animate({
        countNum: newNum
      }, {
        duration: 2000,
        easing: 'swing',
        step: function() {
          $elem.text(formatPrice(Math.round(this.countNum).toString()));
        },
        complete: function() {
          $elem.text(formatPrice(newNum.toString()));
          $elem.addClass("counter_done");
          setTimeout(function() {
            $elem.removeClass("counter_done");
          }, 500);
        }
      });
    }
    return $elem;
  };
  $.fn.chart = function() {
    var $elem = this;
    var bars = $(this).children();
    var max = 0;
    var min = 0;
    $elem.addClass("active");
    bars.each(function() {
      var value = $(this).data().value;
      value = parseInt(value.toString().replace(/\D/g, ''));
      if (value > max) max = value;
      if (min == 0) min = value;
      if (value < min) min = value;
    });
    bars.each(function() {
      var value = $(this).data().value;
      value = parseInt(value.toString().replace(/\D/g, ''));
      var fill = value / max * 100;
      $(".chart-items-bar-fill", $(this)).css({
        "width": fill + "%"
      });
    });
    return $elem;
  };

});