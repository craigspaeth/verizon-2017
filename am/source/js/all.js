$(document).ready(function() {
	var $body = $("body");

	$.fn.headerSection = function (){
		var $elem = this;
		$body.on("click",".nav_button", function(e){
			e.preventDefault();
			$($elem).toggleClass("open");
		});
		$body.on("click",".hamburger", function(e){
			e.preventDefault();
			$elem.toggleClass("open");
		});

		return $elem;
	};

	$(".headroom").headroom({offset : 100});
	$("header").headerSection();
	$body.on("click", ".iagree", noMoreNotice);
	$body.on("keypress", function(e){
		if ( e.ctrlKey &&  e.shiftKey && ( e.which === 3 ) ) {
			localStorage.removeItem('verizonAM16');
		}
	});

	initModal();

	var coutdown = $(".am-info-countdown");
	coutdown.countdown(coutdown.data().date, function(event) {
		$(".am-info-countdown-days-content", this).text(event.strftime('%D'));
		$(".am-info-countdown-hours-content", this).text(event.strftime('%H'));
		$(".am-info-countdown-minutes-content", this).text(event.strftime('%M'));
		$(".am-info-countdown-seconds-content", this).text(event.strftime('%S'));
		if(event.strftime('%D').charAt(1) == "1")
			$(".am-info-countdown-days-header", this).addClass("fadeit");
		else
			$(".am-info-countdown-days-header", this).removeClass("fadeit");
		if(event.strftime('%H').charAt(1) == "1")
			$(".am-info-countdown-hours-header", this).addClass("fadeit");
		else
			$(".am-info-countdown-hours-header", this).removeClass("fadeit");
		if(event.strftime('%D') == "00"){
			$(".am-info-countdown-days", this).hide();
			$($(".am-info-countdown-colon")[0]).hide();
			if(event.strftime('%H') == "00"){
				$(".am-info-countdown-hours", this).hide();
				$($(".am-info-countdown-colon")[1]).hide();
				if(event.strftime('%M') == "00"){
					$(".am-info-countdown-minutes", this).hide();
					$($(".am-info-countdown-colon")[2]).hide();
					if(event.strftime('%S') == "00"){
						$(this).hide();
					}
				}
			}
		}
	});
});




function initModal(){
	var $body = $("body");
	$body.prepend($("<div id='modal-container'></div>"));
	var modal = $('#modal-container');
	buildModal();
	$body.on("click","#modal-container .modal-close, #modal-container .modal-close_button", closeModal);

	$('[data-modal]').click(function(e){
		e.preventDefault();
		var el = $(this);
		var header = el.data().modal;
		var text = el.data().modal_text;
		var fullscreen = el.data().modal_fullscreen;
		openModal(header, text, fullscreen)
	});

	function buildModal(){
		var modalLayout = $("<div class='modal-background'><div class='modal'><div class='modal-content'><div class='modal-close'></div><h2 class='modal-content-header'></h2><div class='modal-content-text'></div></div><div class='modal-close'><i aria-hidden='true' class='fa fa-close'></i></div><svg class='modal-svg' height='100%' preserveaspectratio='none' width='100%' xmlns='http://www.w3.org/2000/svg'><rect fill='none' height='162' rx='3' ry='3' width='226' x='0' y='0'></rect></svg></div></div>");
		modal.html(modalLayout);
	}
	function openModal(header, text, fullscreen){
		buildModal();
		$(".modal", modal).css("max-height", $body.innerHeight());
		if(fullscreen){
			$(".modal", modal).addClass("fullscreen");
		}
		if(header.charAt(0) == "#"){
			$(".modal-content", modal).html($(header).html());
		}else{
			$(".modal-content-header", modal).html(header);
			$(".modal-content-text", modal).html(text);
		}
		modal.removeAttr('class').addClass("one");
		$("iframe", modal).each(function(){
			$(this).css("max-height",$(this).outerWidth()/1.77)
		});
		$body.addClass('modal-active');
	}
	function closeModal(){
		$('#modal-container').addClass('out');
		$('body').removeClass('modal-active');
		$('#modal-container iframe').remove();
	}

	if(!localStorage.getItem('verizonAM16')) openModal("#modal_hello");
}
function noMoreNotice(){
	localStorage.setItem('verizonAM16', 1);
}
function buildChart(el){
	var ctx;
	if(el) ctx = el;
	else ctx = $(this);
	var colors = ctx.data().chartcolors.split(',');
	var values = ctx.data().chart;
	values = values.split(',').map(function(item) {
		return parseInt(item, 10);
	});
	var data = {
		datasets: [
			{
				data: values,
				borderWidth: 0,
				backgroundColor: colors
			}]
	};
	var options = {
		legend: {
			display: 0
		},
		tooltips: {
			enabled:0
		}
	};
	var myChart = new Chart(ctx, {
		type: 'doughnut',
		data: data,
		options: options
	});
}
