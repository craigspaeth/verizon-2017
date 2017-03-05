$(function() {
  var controller = new ScrollMagic.Controller();

  if ($("div.ar_letter").length > 0) {

    var aside1 = $("#aside1");
    var aside1parent = aside1.parent();
    var aside2parent = $("#aside2").parent();
    var aside3 = $("#aside3");
    var aside3parent = aside3.parent();
    var aside4parent = $("#aside4").parent();
    var aside5parent = $("#aside5").parent();
    var photo = $(".photo");
    new ScrollMagic.Scene({
        triggerElement: aside1parent,
        triggerHook: 0,
        offset: -150
      })
      .setClassToggle(aside1, "fixed")
      .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: aside2parent,
        triggerHook: 0,
        offset: -200
      })
      .removeClassToggle(true)

      .setClassToggle(aside1, "section2")
      .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: aside3parent,
        triggerHook: 0,
        offset: -150
      })
      .setClassToggle(aside3, "fixed")
      .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: aside4parent,
        triggerHook: 0,
        offset: -200
      })
      .setClassToggle(aside3, "section4")
      .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: aside5parent,
        triggerHook: .5,
        offset: -150
      })
      .setClassToggle(aside3, "section5")
      .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: photo,
        triggerHook: 0,
        offset: -700
      })
      .setClassToggle(aside1, "hide")
      // .addIndicators()
      .addTo(controller);
  }
  if ($(".chart-items").length > 0) {
    var fadeEl = $(".intro");
    var tweenShow0 = new TweenMax.from(fadeEl, .5, {
      css: {
        opacity: 0
      }
    });

    $(".chart-items").each(function() {
      var el = $(this);
      var flag = 0;
      var sceneShow = new ScrollMagic.Scene({
          triggerElement: $(el),
          duration: "100%",
          triggerHook: 1,
          offset: 400
        })
        .addTo(controller)
        // .addIndicators()
        .on("enter", function() {
          if (!flag) {
            var tweenShow = new TimelineMax().to(el, 1, {
              css: {
                x: "0",
                opacity: 1
              }
            });
            $(el).chart();
            flag++;
            // $("[data-counter]", el).each(function () {
            // 	$(this).counter();
            // });
          }
        });
    });

    $(".numbers-line").each(function() {
      var el = this;
      var tweenShow2 = new TweenMax.from(el, 1, {
        css: {
          opacity: 0,
          y: 40
        }
      });
      var sceneShow2 = new ScrollMagic.Scene({
          triggerElement: this,
          duration: 200,
          triggerHook: .8
        })
        .setTween(tweenShow2)
        .addTo(controller)
        .on("enter", function() {
          $("[data-counter]", el).counter();
        });
    });
  }

  var switchAnimations = function() {
    controller.scrollPos(function() {
      if (window.innerWidth >= 768) {
        return window.pageYOffset;
      } else {
        return $(".footer").offset().top + $(".footer").outerHeight();
      }
    });
  };
  switchAnimations();
  $(window).on('resize', switchAnimations);
});
