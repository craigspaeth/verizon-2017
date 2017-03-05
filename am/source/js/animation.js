$(function() {

	var controller = new ScrollMagic.Controller();

	$(".chart").each(function(){
		var flag = 0;
		var el = $(this);
		var trigger = el.closest(".am-stats-chart");
		var sceneShow = new ScrollMagic.Scene({
			triggerElement: $(trigger),
			duration: "100%",
			triggerHook: .8,
			offset: 200
		})
			.addTo(controller)
			// .addIndicators()
			.on("enter", function () {
				if(!flag){
					buildChart(el);
					flag++;
				}
			});
	});

	var switchAnimations = function() {
		controller.scrollPos(function () {
			if(window.innerWidth >= 1062){
				return window.pageYOffset;
			} else {
				return $(".footer").offset().top + $(".footer").outerHeight();
			}
		});
	};
	switchAnimations();
	$(window).on('resize', switchAnimations);

});
