$(document).ready(function () {

	App.QuickMenu.init();
	App.MainBannerDots.init();

	// 상단팝업
	if ($(document).find('.top-pop-box').length > 0) {
		var topPop = new App.CarouselModule();
		topPop.init({
			name: '.top-pop-box .carousel-wrap',
			carouselOption: {
				nav: false,
				dots: true,
				dotsEach: true,
				autoplay: true,
				autoplayTimeout: 8000,
				ctrlVer:"pos",
				ctrlPoint:"first",
				responsive: {
					0: {
						loop: true,
						items: 1,
						margin: 0
					},
					769: {
						loop: true,
						items: 2,
						margin: 50
					}
				}
			}
		});
	}

	// 메인비주얼 영역
	if ($(document).find('.main-visual-box').length > 0) {
		var mainVisual = new App.CarouselModule();
		mainVisual.init({
			name: '.main-visual-box',
			carouselOption: {
				loop: true,
				nav: false,
				dots: true,
				items: 1,
				autoplay: true,
				mouseDrag: false,
				autoplayTimeout: 8000,
				ctrlVer:"offset",
				ctrlPoint:"last"
			}
		});

		// control button hover effect
		$('.main-visual-box .vi-control-wrap a').on('mouseenter', function() {
			$(this).siblings().css({'opacity': 0.6});
		});
		$('.main-visual-box .vi-control-wrap a').on('mouseleave', function() {
			$(this).siblings().css({'opacity': 1});
		});

	}

	// 메인 입시용 팝업
	if ($(document).find('.main-popup-box').length > 0) {
		var topPop = new App.CarouselModule();
		topPop.init({
			name: '.main-popup-box',
			carouselOption: {
				nav: false,
				dots: true,
				dotsEach: true,
				autoplay: true,
				autoplayTimeout: 8000,
				ctrlVer:"pos",
				ctrlPoint:"last",
				responsive: {
					0: {
						loop: false,
						items: 1,
						margin: 20,
						stagePadding: 40
					},
					321: {
						loop: false,
						items: 1,
						margin: 20,
						stagePadding: 60
					},
					461: {
						loop: false,
						items: 1,
						margin: 40,
						stagePadding: 120
					},
					641: {
						loop: false,
						items: 2,
						margin: 40,
						stagePadding: 80
					},
					769: {
						loop: false,
						items: 2,
						margin: 60,
						stagePadding: 120
					},
					1025: {
						loop: false,
						items: 3,
						margin: 80
					}
				}
			}
		});

		$('.main-popup-box .btn-close').click(function() {
			$('.main-popup-wrap').fadeOut();
		});
		

	}

	// 메인컨텐츠02
	if ($(document).find('.main-content-box02').length > 0) {
		var mainCon02 = new App.CarouselModule();
		mainCon02.init({
			name: '.main-content-box02 .carousel-wrap',
			carouselOption: {
				loop: true,
				nav: false,
				dots: true,
				items: 1,
				autoplay: true,
				autoplayTimeout: 8000,
				ctrlVer:"offset",
				ctrlPoint:"last"
			}
		});

		// 첫번째 캐러셀 자동 dots 삭제 (ctrlPos가 두번 째 캐러셀의 dots 기준으로 안 잡히기 때문)
		$('.main-content-box02 .owl-carousel').eq(0).find('.owl-dots').remove();


		$('.main-content-box02 .owl-dots .owl-dot').click(function() {
			var activeIdx = $(this).parent().find('.owl-dot.active').index('.main-content-box02 .owl-dots .owl-dot');
			var clickIdx = $(this).index('.main-content-box02 .owl-dots .owl-dot');

			if($(this).hasClass('.active')) {
				return false;
			} else if(activeIdx > clickIdx) {
				$('.main-content-box02 .owl-carousel').trigger('prev.owl.carousel');
			} else if(activeIdx < clickIdx) {
				$('.main-content-box02 .owl-carousel').trigger('next.owl.carousel');
			}
		});
	}

	// 메인컨텐츠03
	if ($(document).find('.main-event').length > 0) {
		var mainEvent = new App.CarouselModule();
		mainEvent.init({
			name: '.main-event',
			carouselOption: {
				loop: true,
				nav: false,
				dots: false,
				autoplay: true,
				autoplayTimeout: 8000,
				responsive: {
					0: {
						loop: true,
						items: 2,
						stagePadding: 30
					},
					481: {
						loop: true,
						items: 2,
						stagePadding: 100
					},
					769: {
						loop: true,
						items: 4
					},
					1025: {
						loop: true,
						items: 6
					}
				}
			}
		});

		// 개발 후 상단 컨트롤버튼 삭제 요청으로 임시 버튼 숨김 소스
		$('.main-event .control-wrap').hide();

	}

	// 메인컨텐츠05 : 메인 sns facebook
	if ($(document).find('.main-sns-facebook').length > 0) {
		var mainSnsFacebook = new App.CarouselModule();
		mainSnsFacebook.init({
			name: '.main-sns-facebook',
			carouselOption: {
				nav: false,
				dots: true,
				autoplay: false,
				responsive: {
					0: {
						loop: true,
						items: 1,
						margin: 10,
						stagePadding: 40
					},
					461: {
						loop: true,
						items: 1,
						margin: 10,
						stagePadding: 40
					},
					600: {
						loop: true,
						items: 1,
						margin: 10,
						stagePadding: 200
					},
					769: {
						loop: true,
						items: 3,
						margin: 65
					}
				}
			}
		});
	}
	// 메인컨텐츠06
	if($(document).find('.main-shortcut').length > 0){
		var owlBox = $('.main-shortcut').find('.owl-carousel');

		if ($(window).width() < 769) {
			startCarousel();					

		} else {
			owlBox.addClass('off');
			if($('.main-shortcut').find('.item').length <= 8){
				$('.pc-control-wrap').hide();
			}

		}

		$(window).resize(function() {
			if ($(window).width() < 769) {
				if(owlBox.hasClass('off') == true){
					startCarousel();	
				}
			} else {
				if(owlBox.hasClass('off') == false){
					stopCarousel();

					if($('.main-shortcut').find('.item').length <= 10){
						$('.pc-control-wrap').hide();
					}
				}
			}
		});
		$('.btn-quick-close').on('click', function(){
			$(this).parent('.shortcut-box').toggleClass('active');
			if($('.shortcut-box').hasClass('active')){
				$(this).addClass('btn-quick-close');
			}else{
				$(this).removeClass('btn-quick-close');
			}
		});
		
		function startCarousel(){	
			owlBox.removeClass('off');
			var mainShortcut = new App.CarouselModule();
			mainShortcut.init({
				name: '.main-shortcut',
				carouselOption: {
					nav: false,
					dots: true,
					autoplay: true,
					autoplayTimeout: 8000,
					responsive: {
						0: {
							loop: true,
							items: 2,
							margin: 0,
							stagePadding: 20
						},
						360: {
							loop: true,
							items: 3,
							margin: 0,
							stagePadding: 25
						},
						461: {
							loop: true,
							items: 4,
							margin: 5,
							stagePadding: 40
						},
						769: {
							loop: true,
							items: 7,
							margin: 15
						}
					}
				}
			});
		}

		function stopCarousel(){
			owlBox.trigger('destroy.owl.carousel');
			owlBox.addClass('off');
		}

	}

	// 메인컨텐츠07
	if ($(document).find('.main-banner').length > 0) {
		var mainBanner = new App.CarouselModule();
		mainBanner.init({
			name: '.main-banner',
			carouselOption: {
				nav: false,
				dots: true,
				dotsEach: true,
				autoplay: true,
				autoplayTimeout: 8000,
				responsive: {
					0: {
						loop: true,
						items: 1,
						margin: 10,
						stagePadding: 30
					},
					461: {
						loop: true,
						items: 2,
						margin: 10,
						stagePadding: 60
					},
					769: {
						loop: true,
						items: 4,
						margin: 33
					},
					1367: {
						loop: true,
						items: 6,
						margin: 33
					}
				}
			}
		});
	}


	// 메인컨텐츠07
	if ($(document).find('.main-banner').length > 0) {
		var mainBanner = new App.CarouselModule();
		mainBanner.init({
			name: '.main-banner',
			carouselOption: {
				nav: false,
				dots: true,
				dotsEach: true,
				autoplay: true,
				autoplayTimeout: 8000,
				responsive: {
					0: {
						loop: true,
						items: 1,
						margin: 10,
						stagePadding: 30
					},
					461: {
						loop: true,
						items: 2,
						margin: 10,
						stagePadding: 60
					},
					769: {
						loop: true,
						items: 4,
						margin: 33
					},
					1367: {
						loop: true,
						items: 6,
						margin: 33
					}
				}
			}
		});
	}


	App.VisualCommon.init();

	//메인비주얼 이미지 object-fit : IE대응
	if ($(document).find('.main-visual-img-box').length > 0) {
		var mainVisualImg = new App.ObjectFit();
		mainVisualImg.init('.main-visual-img-box');
	}

	//메인컨텐츠01 object-fit - IE대응
	if ($(document).find('.main-content-box01 .mini-img-box a').length > 0) {
		var mainNewsImg = new App.ObjectFit();
		mainNewsImg.init('.main-content-box01 .mini-img-box a');
	}

	//메인컨텐츠02 object-fit - IE대응
	if ($(document).find('.main-content-box02 .img-box').length > 0) {
		var mainDnaImg = new App.ObjectFit();
		mainDnaImg.init('.main-content-box02 .img-box');
	}

	//메인컨텐츠04 : 메인 탭 object-fit - IE대응
	if ($(document).find('.main-content-box04 .mini-tab-box > ul > li .mini-board-content .mini-img-box').length > 0) {
		var mainTabImg = new App.ObjectFit();
		mainTabImg.init('.main-content-box04 .mini-tab-box > ul > li .mini-board-content .mini-img-box');
	}

	//메인컨텐츠06 : 메인 SNS object-fit - IE대응
	if ($(document).find('.main-sns').length > 0) {
		var mainSnsImg = new App.ObjectFit();
		mainSnsImg.init('.main-sns .mini-img-box');
	}

	//메인컨텐츠07 : 메인 배너 object-fit - IE대응
	if ($(document).find('.main-banner').length > 0) {
		var mainBannerImg = new App.ObjectFit();
		mainBannerImg.init('.main-banner .mini-img-box');
	}

});

//------------------------------------------------------
//Common
//------------------------------------------------------  
App.VisualCommon = function(){
	var self;
	var scrollTop, docHeight, windowHeight, scrollMax, widthBar;
	return{
		init: function(){
			self = this;

			//메인 탭
			$('.mini-board-tab').on('click', function () {
				$(this).parent().siblings().removeClass('active');
				$(this).parent().addClass('active');
			});

			//메인컨텐츠03 : 마우스오버시 나머지 오버 off
			$(document).on('mouseenter', '.main-content-box03 div.type02 .owl-carousel .item > div', function() {
				if($(this).hasClass('today')) return false;
				$(this).addClass('active');
				$('.main-content-box03 .today').removeClass('active');
			}).on('mouseleave', '.main-content-box03 div.type02 .owl-carousel .item > div', function() {
				$(this).removeClass('active');
				$('.main-content-box03 .today').addClass('active');
			});

			//메인컨텐츠05 : 마우스오버시 나머지 오버 off
			$(document).on('mouseenter', '.main-content-box05 .owl-item .item', function() {
				$(this).parent().siblings().find('.item').css({'box-shadow': 'none'});
			}).on('mouseleave', '.main-content-box05 .owl-item .item', function() {
				$(this).parent().siblings().find('.item').css({'box-shadow': '2px 4px 10px rgba(0,0,0,0.3)'});
			});

			//carousel slide시 image animation 실행 - main visual : 시작 시 한 번만 실행
			var $mainViBox = $('.main-visual-box');

			$mainViBox.find('.item').append('<p class="main-visual-bg"><span class="hide">main visual</span></p>')

			$mainViBox.find('.main-visual-img-box img').stop(true).delay(700).animate({'opacity': 1}, 500);
			$mainViBox.find('.main-visual-bg').stop(true).delay(700).animate({'opacity': 0}, 500);
			$mainViBox.find('.owl-dots, .mini-board-ctrl, .control-wrap, .vi-control-wrap').stop(true).delay(700).animate({'opacity': 1}, 500);
			$mainViBox.find('.main-visual-img-box .greenbox-inner').stop(true).animate({'margin-left': 100 + '%'}, 1500, function() {
				$('.greenbox, .main-visual-bg').hide()
			});

			//carousel slide시 image animation 실행 - 입시용 팝업 : 시작 시 한 번만 실행 
			var $mainPopBox = $('.main-popup-wrap');

			$mainPopBox.find('.main-popup-bg').stop(true).delay(700).animate({'opacity': 0}, 500);
			$mainPopBox.find('.greenbox-inner').stop(true).animate({'margin-left': 100 + '%'}, 1500, function() {
				$('.main-popup-bg').hide();
			});

			// gnb fixed 상태에서 스크롤 양에 따라 초록색 바 채워지는 효과
			$(window).on('scroll resize', function() {
				scrollTop = $(document).scrollTop(); // 현재 스크롤 된 양. 스크롤 되어서 올라간 도큐먼트의 양.
				docHeight = $(document).height();
				windowHeight = $(window).height();
				scrollMax = docHeight - windowHeight;
				widthBar = (scrollTop / scrollMax) * 100;

				$('.bottom-header-box.fixed span.nav-bar-fix').css({'width': widthBar + '%'})
			});

			// 메인 SNS 영역 모바일에서 SNS 제목에 active 표시
			var $snsOwl = $('.main-sns');

			$snsOwl.on('changed.owl.carousel resized.owl.carousel', function (e) {
				var cIdx = e.page.index;

				$('.main-content-box05 .mini-board-tab').removeClass('active');
				$('.main-content-box05 .mini-board-tab').eq(cIdx).addClass('active');
			});
			
			// 메인 비주얼 컨트롤 랩 오류 해결을 위해 별도의 클래스로 control-wrap 관리
			$(document).on('click', '.vi-control-wrap a', function(e){
				e.preventDefault();
				if ($(this).hasClass('vi-prev')) {
					$(this).parents('.carousel-wrap').find('.main-visual-carousel').trigger('prev.owl.carousel');
				} else if ($(this).hasClass('vi-next')) {
					$(this).parents('.carousel-wrap').find('.main-visual-carousel').trigger('next.owl.carousel');
				}
			});

		}
	}
}();

//------------------------------------------------------
// quick menu
//------------------------------------------------------  
App.QuickMenu = function(){
	var self;
	return{
		init: function(){
			self = this;

			// 모바일에서 퀵 버튼 hover 효과 없애기
			if($(window).width() > 1024) {
				$('.quick-btn').addClass('pc');
			} else {
				$('.quick-btn').removeClass('pc');
			}
			
			$(window).resize(function() {
				if($(window).width() > 1024) {
				$('.quick-btn').addClass('pc');
			} else {
				$('.quick-btn').removeClass('pc');
			}
			});
			
			// quick menu click
			$(document).on('click', '.main-quick-wrap:not(.active) .main-quick-menu .quick-btn', function(e){ // open
				e.stopPropagation();
				$('.main-quick-wrap').addClass('active');
				$('.quick-bg').fadeIn();
				$('.main-quick-menu > ul').fadeIn();
				$('body').addClass('all-fixed');

				/* disable scroll */
				$('.main-quick-wrap').on('scroll touchmove mousewheel', function(e){
					e.preventDefault();
					e.stopPropagation();
					return false;
				});
			});

			$(document).on('click', '.main-quick-wrap.active .main-quick-menu .quick-btn', function(e){ // close
				$('.main-quick-wrap').removeClass('active');
				$('.main-quick-menu > ul').fadeOut();
				$('.quick-bg').fadeOut();
				$('body').removeClass('all-fixed');

				/* enable scroll */
				$('.main-quick-wrap').off('scroll touchmove mousewheel');
			});
			/*
			$(document).on('click', '.main-quick-menu > ul', function() { // 메뉴 클랙시 버블링 닫힘 막기
				e.stopPropagation();
			});
			*/
			$(document).on('click', function() { // 퀵 메뉴 배경 클릭시 팝업 닫기
				$('.main-quick-wrap').removeClass('active');
				$('.main-quick-menu > ul').fadeOut();
				$('.quick-bg').fadeOut();
				$('body').removeClass('all-fixed');
			});

			// quick menu start animation
			var btn = $('.quick-btn');
			var scrollTop = 0;

			checkScroll();
			$(window).on('scroll', function() {
				checkScroll();
			}); // end of scroll

			function checkScroll() {
				var scrollTop = $(window).scrollTop();
				var windowHeight = $(window).height();
				var offsetTop = $('.main-content-box01 .main-sub-title').offset().top;
				var startShow = offsetTop - windowHeight;

				if (scrollTop > startShow) {
					btn.addClass('show');
				} else {
					btn.removeClass('show');
				}

				if (scrollTop === 0 && !$('.main-quick-wrap').hasClass('active')) btn.removeClass('show');
			} // end of checkScroll

		}
	}
}();

//------------------------------------------------------
//main banner dots
//------------------------------------------------------  
App.MainBannerDots = function(){
	var self;
	var dotsNum, dotsWid;
	return{
		init: function(){
			self = this;

			// main content07 dots로 bar 생성
			setTimeout(function(){
				$('.main-content-box07 .owl-dots').wrap('<div class="owl-dots-wrap"></div>');
			}, 500);

			$('.main-content-box07 .main-banner').on('initialized.owl.carousel', function (event) {
				dotsNum = event.item.count;
				dotsWid = (100 / dotsNum) + '%';
				$('.main-content-box07 .owl-dots .owl-dot').css({'width': dotsWid});
			});
		}
	}
}();