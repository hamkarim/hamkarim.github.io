$(function () {

	$(".btn-menu").click(function(e) {
		if($('.btn-sch-open').hasClass('active')) $('.btn-sch-open').trigger('click');

		$(".slideMenu").animate({right: "0"}, 300);
		$(".slideMenu").show();
		$(".slide-close").show();
		$("html, body").addClass('all-fixed');
	});

	$(".slide-close").click(function () {
		$(".slideMenu").animate({
			right: "-100%"
		});
		$(".slideMenu").hide(10);
		$("html, body").removeClass('all-fixed');	
	});

	$(window).resize(function(){

		if($(window).width() > 1024){
			$(".slideMenu").css({right: "-100%"});
			$(".slideMenu").hide();
			$(".slide-close").hide();
			$("html, body").removeClass('all-fixed');
			$('.bottom-header-wrap').css({'z-index': '40'});
		}
	});

	$('.dep1 > li').each(function () {
		if($(this).find('.dep2').length <= 0) {
			$(this).find('> a').addClass('no-menu');
		}
	});

	$(".dep1 > li > a").click(function () {
		if ($(this).next().is(':hidden')) {
			$(this).addClass("selected");
			$(this).parent().siblings().find('a.active').next('.dep2').hide();
			$(this).parent().siblings().find('a.active').removeClass('active')
			$(this).parent().siblings().find('.dep2').hide();
			$(this).next('.dep2').show();
			$(this).parent().siblings().find(".selected").removeClass("selected");
			$(this).parent().siblings().find(".selected").find('.dep3').slideUp();
		}
		if ($(this).parent().find('.dep2').length > 0) return false;
	});

	setTimeout(function(){
		if($('body').hasClass('main') || $('body').hasClass('search')) $('.dep1 > li:eq(0) > a').trigger('click');	
	}, 200);

	$(".dep2 > li > a").click(function () {
		if ($(this).next().is(':hidden')) {
			$(this).parent().find(".dep3").slideUp().siblings(".dep3").slideDown();
			$(this).parent().find(".dep3").slideUp().slideDown();
			$(this).addClass("selected");
			$(this).next(".dep3").slideDown();
			$(this).parent().siblings().find(".dep3").slideUp();
			$(this).parent().siblings().find(".selected").removeClass("selected");
		} else {
			$(this).next(".dep3").slideUp();
			$(this).removeClass("selected");
		}
	});

	$(function () {
		var hasDep = $(".dep3").parents(".dep2 > li").find("a:first");

		hasDep.addClass("has-dep03-open");
		hasDep.attr('href', '#a');
		$(".dep3").parents(".dep2 > li").each(function () {
			$(this).click(function () {
				//$(this).find("a:first").toggleClass("has-dep03-open", "has-dep03-close");
				$(".dep3").parents(".dep2 > li").find("a:first").not("a.selected").removeClass("has-dep03-close").removeClass("depth02-active").addClass("has-dep03-open");
				//$(".dep3 > li > a.active").parents(".dep2 > li").find("a:first").addClass("depth02-active");
				$(this).find("a:first.selected").addClass("depth02-active");

				//$(".dep1 > li > a.active").parents(".dep1 > li").find(".dep2").show();
				//$(".dep3 > li > a.active").parents(".dep2 > li").find(".dep3").show();
				$(".dep2 > li").find("a:first").removeClass("depth02-active");
				//$(".dep3 > li > a.active").parents(".dep2 > li").find("a:first").addClass("depth02-active");
			});
		});

		$(".dep1 > li > a.active").parents(".dep1 > li").find(".dep2").show();
		$(".dep3 > li > a.active").parents(".dep2 > li").find(".dep3").show();
		$(".dep2 > li").find("a:first").removeClass("depth02-active");
		$(".dep3 > li > a.active").parents(".dep2 > li").find("a:first").addClass("depth02-active");

	});



});