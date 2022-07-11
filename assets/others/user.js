function logOutCheck(){
	return confirm("Would you like to logout?");
}

$(document).ready(function () {
	
	//20200513
	$("form[name=totalSearch]").submit(function() {
		var $this = $(this);
		var qt = $this.find("input[name=qt]").val();
		
		var msg = "검색어를 2자 이상 입력해주세요.";
		if( locale == 'en' ) msg = "Please enter your keyword more than 2 characters.";
		
		if( 1 == qt.length ) {
			alert( msg )
			return false;
		}
		else return true;
	});

	setTimeout(function () {
		$("html").removeClass("no-js");
	}, 10);

	// popup
	$('.b-pop-close-btn').click(function(){
		window.close();
	});


	if($(document).find('.gnb-ul').length > 0){
		App.MainGnb.init();
	}
	App.TopPop.init();
	App.Common.init();
	App.SelectBoxPath.init();
	App.SelectBox2.init();
	App.SelectBoxMenu.init();
	App.MenuScroll.init();
	App.CateScroll.init();
	App.Lnb.init();
	if($(document).find('.scrollbox').length > 0){
		App.TableScroll.init();
	};

	//대학생활 > 학생활동 > 서포터즈
	if ($(document).find('.supporters-box').length > 0) {
		var supporters = new App.CarouselModule();
		supporters.init({
			name: '.supporters-box',
			carouselOption: {
				nav: false,
				dots: false,
				autoplay: true,
				autoplayTimeout: 8000,
				responsive: {
					0: {
						loop: false,
						items: 1
					},
					321: {
						loop: false,
						items: 2,
						margin: 10
					},
					461: {
						loop: false,
						items: 3,
						margin: 10
					},
					769: {
						loop: false,
						items: 4,
						margin: 10
					},
					1367: {
						loop: false,
						items: 5,
						margin: 48
					}
				}
			}
		});
	}
	//서포터즈 object-fit : IE대응
	if($(document).find('.suppo-img-box').length > 0){
		var supportersImg = new App.ObjectFit();
		supportersImg.init('.suppo-img-box');
	}
	/* 대학생활 > 생활지원 > 수련관*/
	if ($(document).find('.pop-box').length > 0) {
		var training = new App.CarouselModule();
		training.init({
			name: '.pop-box',
			carouselOption: {
				nav: false,
				dots: false,
				autoplay: true,
				autoplayTimeout: 8000,
				responsive: {
					0: {
						loop: true,
						items: 1
					},
					321: {
						loop: true,
						items: 2,
						margin: 10
					},
					461: {
						loop: true,
						items: 3,
						margin: 10
					},
					769: {
						loop: true,
						items: 4,
						margin: 10
					},
					1367: {
						loop: true,
						items: 4,
						margin: 48
					}
				}
			}
		});
	}

	//수련관 object-fit : IE대응
	if($(document).find('.pop-img-box').length > 0){
		var trainingImg = new App.ObjectFit();
		trainingImg.init('.pop-img-box');
	}
	// footer-quick
	if ($(document).find('.footer-quick').length > 0) {
		var owlBox = $('.footer-quick').find('.owl-carousel');

		if ($(window).width() < 769) {
			startCarousel();

		} else {
			owlBox.addClass('off');
			if ($('.footer-quick').find('.item').length <= 8) {
				$('.pc-control-wrap').hide();
			}

		}

		$(window).resize(function () {
			if ($(window).width() < 769) {
				if (owlBox.hasClass('off') == true) {
					startCarousel();
				}
			} else {
				if (owlBox.hasClass('off') == false) {
					stopCarousel();

					if ($('.footer-quick').find('.item').length <= 10) {
						$('.pc-control-wrap').hide();
					}
				}
			}
		});
		$('.footer-quick-box .btn-quick-close').on('click', function () {
			$(this).parent('.quick-box').toggleClass('active');
			if ($('.quick-box').hasClass('active')) {
				$(this).addClass('btn-quick-close');
			} else {
				$(this).removeClass('btn-quick-close');
			}
		});

		function startCarousel() {
			owlBox.removeClass('off');
			var footerQuick = new App.CarouselModule();
			footerQuick.init({
				name: '.footer-quick',
				carouselOption: {
					nav: false,
					dots: true,
					autoplay: true,
					autoplayTimeout: 8000,
					responsive: {
						0: {
							loop: true,
							items: 4,
							margin: 10
						},
						769: {
							loop: true,
							items: 8,
							margin: 10
						}
					}
				}
			});
		}

		function stopCarousel() {
			owlBox.trigger('destroy.owl.carousel');
			owlBox.addClass('off');
		}

	}

	// top footer
	if($(document).find('.etc-lnk-box').length > 0){
		var timer = null;
		var delta = 30;

		autoListOpt();

		function autoListOpt(){
			var autoListObj = new App.autoList();

			autoListObj.init({
				list: ".etc-lnk-box ul",
				endWidth: "end"
			});
		}

		$( window ).on( 'resize', function( ) {
			clearTimeout( timer );
			timer = setTimeout( autoListOpt, delta );
		});
	} 

	/*	//통합검색 object-fit : IE대응
	if($('.b-sch-ul-type03 .b-img-box a').length > 0){
		var personList = App.BoardObjectFit();
		personList.init('.b-sch-ul-type03 .b-img-box a');
	}

	//통합검색 object-fit : IE대응
	if($('.b-sch-ul-type04 .b-img-box a').length > 0){
		var personList = App.BoardObjectFit();
		personList.init('.b-sch-ul-type03 .b-img-box a');
	}*/

});

//======================================================================
//Common
//======================================================================
App.Common = function(){
	var self;
	var relatedHref;
	var flag;
	var windowHeight, headerHeight, popHeight, sumHeight;
	var playNow;

	return {
		init: function(){
			self = this;
			/*
			// 언어 선택
			$('.btn-lang').on('click', function() {
				$(this).toggleClass('active');
				$('.lang-box').slideToggle();
			});
			$('header').on('mouseleave', self.closeLangbox);
			$('.lang-box li a').on('click', self.closeLangbox);
			*/
			//scroll top button
			$('.btn-scroll-top').click(function(){
				$('html, body').stop().animate({scrollTop: 0}, 500);
			});

			//footer 관련사이트 바로가기 selectbox
			$('.footer-related-box .related-site li a').click(function(e){
				e.preventDefault();
				relatedHref = $(this).attr('href');
				$(this).parents('.related-site-wrap').find('.related-site-title').text($(this).text()).removeClass('active');
				$(this).parents('.related-site-wrap').find('.related-go').attr({href: relatedHref, target: '_blank'});
			});

			// gnb 현재페이지 표시
			if ($('.gnb').find('a.active').length > 0) {
				$('.gnb').find('a.active').each(function() {
					$('.gnb-ul > li > a').removeClass();
					$(this).parents('.gnb-ul > li').find(' > a').addClass('current');
				});
			}

			// header search
			flag = 1;

			$('.search-wrap-fix .sch-btn').on('click', function(){
				$('.search-wrap-fix .sch-btn').addClass('on');
				setTimeout(function(){
					$('.search-wrap-fix .sch-btn').stop().attr({type: 'submit'});
				}, 100);
				$('.search-wrap-fix input').show();
				$('.search-wrap-fix input').on('click', function(){
					flag = 2;
				});
			});
			$('.search-wrap-fix').on('mouseleave', function(){
				if(flag == 1){
					$('.search-wrap-fix .sch-btn').stop().attr({type: 'button'}).removeClass('on');
					$('.search-wrap-fix input').hide().val('');
				}else{
					$('.search-wrap-fix input').blur(function(){
						setTimeout(function(){
							$('.search-wrap-fix .sch-btn').stop().attr({type: 'button'}).removeClass('on');
							$('.search-wrap-fix input').hide().val('');
						}, 100);
						flag = 1;
					});
				}
			});

			// header search (Mobile)
			$('.btn-sch-open').on('click', function() {

				if($('.btn-menu').hasClass('active')) $('.btn-menu').trigger('click');

				if(!$('.btn-sch-open').hasClass('active')) {
					$('.btn-sch-open').addClass('active');
					$('.search-wrap').css({'display': 'block'}).animate({'left': '0'}, 300);
				}
				else {
					$('.btn-sch-open').removeClass('active');
					$('.search-wrap').animate({'left': '-100%'}, 300, function() {
						$(this).hide();
					});
				}
			});

			//메뉴 연동 select box - selected 처리
			$(document).find(".tab-sel option[value='" + window.location.pathname + "']").prop("selected", true);

			//이화소개 > 총장실 > 역대총장
			if($(document).find('.dean-wrap').length > 0){
				var wrapPos = null;
				var conPos = null;
				var $thisBox = null;
				var leftVal = null;
				var headerH = 0;
				var topPos = 0;

				$('.dean-click-box').click(function(){

					$this = $(this);

					$('.dean-box').not($this.parents('.dean-box')).removeClass('active');	

					if(!$('.dean-box.active').length > 0) {
						if($(window).width() > 1024) {
							headerH = $('.bottom-header-box').outerHeight();
						} else {
							headerH = $('.middle-header-box').outerHeight();
						}

						if ($('.bottom-header-box').hasClass('fixed') && $(window).width() > 1024) {
							topPos = $this.position().top;
						} else if (!$('.bottom-header-box').hasClass('fixed') && $(window).width() > 1024) {
							topPos = $this.position().top - headerH;
						} else {
							topPos = $this.position().top;
						}
					}		

					deanOpen();

					$('html').animate({'scrollTop': topPos - headerH}, 300);

					function deanOpen() {
						$('.dean-box').find('.dean-con-box').css({left: 0});

						$this.parents('.dean-box').toggleClass('active');
						wrapPos = $('.dean-wrap').offset().left;
						conPos = $this.parents('.dean-box').find('.dean-con-box').offset().left;
						leftVal = - conPos + wrapPos;
						$this.parents('.dean-box.active').find('.dean-con-box').css({left: leftVal});
						$thisBox = $this.parents('.dean-box').find('.dean-con-box');
					}
				});

				$(window).resize(function(){
					$('.dean-box').find('.dean-con-box').css({left: 0});
					wrapPos = $('.dean-wrap').offset().left;
					conPos = $thisBox.offset().left;
					leftVal = - conPos + wrapPos;
					$thisBox.css({left: leftVal});
				});
			}

			//이화소개 > 학교현황 > 등록금심의위원회
			$('.viewer-btn').click(function(e){
				$('.viewer-wrap').addClass('active');
				var viewerYear = $(this).parents('.viewer-box').find('h5 span').text();
				var viewerNum = $(this).parents('li').find('div:eq(0) p').text();
				$('.viewer-tit span:eq(0)').text(viewerYear);
				$('.viewer-tit span:eq(2)').text(viewerNum);

				if(!$(window).innerWidth() < 768){
					e.preventDefault();
					var url = $(this).attr('href');
					$('.viewer-con-box').find('iframe').attr('src', url);
				} 

			});

			$('.viewer-list-btn').click(function(){
				$(this).parents('.viewer-fold').toggleClass('active');
			});

			function viewerBtnAttr(e){
				if($(document).find('.viewer-wrap').length > 0){
					if($(window).innerWidth() <= 768){
						$('.viewer-btn').attr('target', '_blank');
						$('.viewer-btn').unbind();
					}else{
						$('.viewer-btn').attr('target', 'viewer-iframe');
						$('.viewer-btn').click(function(e) {
							e.preventDefault();

							$('.viewer-wrap').addClass('active');
							var viewerYear = $(this).parents('.viewer-box').find('h5 span').text();
							var viewerNum = $(this).parents('li').find('div:eq(0) p').text();
							$('.viewer-tit span:eq(0)').text(viewerYear);
							$('.viewer-tit span:eq(2)').text(viewerNum);

							var url = $(this).attr('href');
							$('.viewer-con-box').find('iframe').attr('src', url);
						});
					}
				}
			}

			viewerBtnAttr();

			$(window).resize(function(){
				viewerBtnAttr();
			});

			// 이화소개 > 교가/노래 : 교가 재생/일시정지
			playNow = false;
			$('.audio-box button').click(function() {
				if(!playNow) { // 재생
					playNow = true;
					$(this).removeClass();
					$(this).addClass('btn-pause');
					$(this).parent().prev().find('audio').trigger('play');
				} else if(playNow) { // 일시정지
					playNow = false;
					$(this).removeClass();
					$(this).addClass('btn-play');
					$(this).parent().prev().find('audio').trigger('pause');
				}
			});

			// 이화소개 > 교가/노래 : 교가 설명 or 가사 탭
			$('.song-box .tit-box li').each(function() {
				$(this).find('h5 a').click(function() {
					var idx = $(this).parents('li').index();

					$(this).parents('li').siblings().removeClass('active');
					$(this).parents('li').addClass('active');
					$(this).parents('ul').next().find('li').removeClass('active');
					$(this).parents('ul').next().find('li').eq(idx).addClass('active');
				});
			});

			$('.song-box02 .track-list > li').each(function() {
				$(this).find('.btn-music').click(function() {
					var idx = $(this).parents('li').index();

					$(this).parents('.left-box').next().find('li').removeClass('active');
					$(this).parents('.left-box').next().find('li').eq(idx).addClass('active');

					if($(window).width() <= 768) {
						var pos = $('.song-box02 .right-box').offset().top;
						$('html, body').animate({scrollTop: pos - 102}, 500);
					}
				});
			});

			//window popup
			$(document).on('click', '.open-pop', function(e){
				e.preventDefault();
				var popUrl = $(this).attr('href');
				window.open(popUrl, 'popup', 'width=1000,height=780,scrollbars=yes');
			});

			//window popup (예결산공고 ebook)
			$(document).on('click', '.open-pop-ebook', function(e){
				e.preventDefault();
				var popUrl = $(this).attr('href');
				window.open(popUrl, 'popup', 'width=1280,height=780,scrollbars=yes');
			});

			$('.pop-close-btn').click(function(){
				window.close();
			});

			// 규칙집 모바일 포커스 이동
			if($('.rulebook').length > 0 && $(window).width() <= 768) {
				if($('.lnb-depth03').find(' > li.active').length > 0) {
					var pos = $('.rulebook').offset().top;
					setTimeout(function(){
						$('html, body').animate({scrollTop: pos - 102}, 800);	
					}, 500);
				}
			}
			// div 테이블 b-row-box 하위 컨텐츠 높이 설정
			if($('.b-table-wrap').length > 0) {
				self.setRowH();

				$(window).resize(function() {
					if($(window).width() > 768) {
						self.setRowH();
					} else {
						$('.b-table-wrap .b-title-box, .b-table-wrap .b-content-box').css({height: 'auto'});
					}
				});
			}

			// 통합검색
			if($('.b-ewha-search-wrap').length > 0) {

				// 통합검색 : 정렬 기준 셀렉박스
				$('.b-ewha-search-wrap .bottom-box > div > a').on('click', function() {
					if(!$(this).parent().hasClass('active')) { // 열기
						$('.b-ewha-search-wrap .bottom-box > div').removeClass('active');
						$(this).parent('div').addClass('active');
					} else { // 닫기
						$('.b-ewha-search-wrap .bottom-box > div').removeClass('active');
					}
				});

				$('.b-ewha-search-wrap .bottom-box > div').each(function () {
					var $thisBox = $(this);
					$(document).mouseup(function (e) {
						if ($thisBox.has(e.target).length === 0) {
							$thisBox.removeClass("active");
						}
					});
				});

				// 통합검색 우측 영역 탭박스
				$('.b-keyword-tab-box > li').each(function() {
					$(this).find('a').on('click', function() {
						var idx = $(this).parent().index();

						if($(this).parents('.b-keyword-tab-box').hasClass('type01')) {
							$(this).parents('.b-box').find('.b-topic-box').hide();
							$(this).parents('.b-box').find('.b-topic-box').eq(idx).show();
						} else if($(this).parents('.b-keyword-tab-box').hasClass('type02')) {
							$(this).parents('.b-box').find('.b-word-box').hide();
							$(this).parents('.b-box').find('.b-word-box').eq(idx).show();
						}
						$(this).parent().siblings().removeClass('active');
						$(this).parent('li').addClass('active');
					});
				});

				// 통합검색 모바일 메뉴 2depth 표시하기 위한 클래스 추가
				if($('.b-ewha-search-wrap').length > 0) {
					$('body').addClass('search');
				}
				/*
				// 통합검색 이메일 아이콘 클릭시 이메일 주소 클립보드 복사 : textarea 임시 생성하여 해당 영역 value 값을 복사해오는 방식
				$('.b-copy-email').click(function(e) {
					e.preventDefault();
					var t = document.createElement("textarea");
					$(this).parent().append(t);
					t.value = $(this).text();
					t.select();
					document.execCommand('copy');
					$(this).parent().find('textarea').remove();
					alert('Copied!');
				});
*/


			}


		},
		closeLangbox: function() {
			setTimeout(function() {
				$('.btn-lang').removeClass('active');
				$('.lang-box').slideUp();
			}, 100);
		},
		setRowH: function() {

			var rowHArr = [];

			$('.b-table-wrap .b-row-box').each(function(){
				// 리사이즈 시 높이 초기화
				$(this).find('.b-title-box, .b-content-box').css({height: 'auto'});

				rowHArr = [];

				rowHArr.push($(this).find('.b-title-box').innerHeight());	
				rowHArr.push($(this).find('.b-content-box').innerHeight());	

				var max;
				var maxLength = rowHArr.reduce(function (previous, current) {
					return previous > current ? max = previous : max = current;
				});

				var indexNum = jQuery.inArray(max, rowHArr);

				var maxHeight = $(this).find('> div:eq(' + indexNum + ')').height();

				$(this).find('.b-title-box, .b-content-box').css({height: maxHeight + 'px'});

			});


		}
	}
}();

//======================================================================
//Top Pop
//======================================================================
App.TopPop = function () {
	var self;
	var popH, headerH;
	var windowHeight, headerHeight, popHeight, sumHeight;
	return {
		init: function () {
			self = this;

			// mobile main visual padding top 조정
			self.setVisualPadding();

			// popup close
			$('.btn-pop-close').on('click', function() {
				if($('#do-not-open').is(':checked')) {
					self.setCookie('todayCookie', 'done', 1);
				}
				$('.top-pop-wrap').slideUp();
				headerH = $('.middle-header-box').outerHeight();

				if($(window).width() <= 1024) {
					$('.middle-header-box').css({'top': '0'});
					$('.main-visual-wrap').css({'padding-top': headerH + 'px'});
					$('.main-popup-wrap').css({'padding-top': headerH + 'px'});

				}
			});

			// 오늘하루 그만보기 체크박스 클릭시 바로 닫힘 (모바일에서는 마우스 오버 기능이 없기 때문에 시간차를 주고 닫기 구현)
			$('#do-not-open').on('click', function() {
				if($(window).width() > 1024) {
					$('.btn-pop-close').trigger('click');
				} else {
					setTimeout(function() {
						$('.btn-pop-close').trigger('click');
					}, 500);
				}
			});

			// 오늘 하루 열지 않기
			self.getCookie();
			
			// popup close
			$('.main-popup-box .btn-close').on('click', function() {
				if($('#do-not-open-pop').is(':checked')) {
					self.setCookie('todayCookie', 'done', 1);
				}
			});
			
			// 입시용 팝업 - 오늘하루 그만보기 체크박스 클릭시 바로 닫힘 (모바일에서는 마우스 오버 기능이 없기 때문에 시간차를 주고 닫기 구현)
			$('#do-not-open-pop').on('click', function() {
				if($(window).width() > 1024) {
					$('.main-popup-box .btn-close').trigger('click');
				} else {
					setTimeout(function() {
						$('.main-popup-box .btn-close').trigger('click');
					}, 500);
				}
			});

			// 오늘 하루 열지 않기
			self.getCookiePopup();

		},
		setCookie: function(name, value, expiredays) {
			var todayDate = new Date();
			todayDate.setDate(todayDate.getDate() + expiredays);
			document.cookie = name + '=' + escape(value) + '; path=/; expires=' + todayDate.toGMTString() + ';'
		},
		getCookie: function() {
			var cookiedata = document.cookie;
			if (cookiedata.indexOf('todayCookie=done') < 0 ){
				$('.middle-header-box, .main-visual-box').addClass('transition');
				$('.top-pop-wrap').show();
			} else {
				$('.middle-header-box, .main-visual-box').removeClass('transition');
				$('.top-pop-wrap').hide();
				if($(window).width() <= 1024) {
					$('.middle-header-box').css({'top': '0'});
					$('.main-visual-wrap').css({'padding-top': headerH + 'px'});	
					$('.main-popup-wrap').css({'padding-top': headerH + 'px'});
				}
			}
		},
		getCookiePopup: function() {
			var cookiedata = document.cookie;
			if (cookiedata.indexOf('todayCookie=done') < 0 ){
				$('.main-popup-wrap').show();
			} else {
				$('.main-popup-wrap').hide();
			}
		},
		setVisualPadding: function() {
			popH = $('.top-pop-box').outerHeight();
			headerH = $('.middle-header-box').outerHeight();
			$('.middle-header-box, .main-visual-box').addClass('transition');

			if($(window).width() <= 1024 && $('.top-header-wrap').is(':hidden')) {
				if($('.top-pop-wrap').is(':hidden') || $('.top-pop-wrap').innerHeight() == 0){
					$('.middle-header-box').css({'top': '0'});
					$('.main-visual-wrap').css({'padding-top': headerH + 'px'});	
					$('.main-popup-wrap').css({'padding-top': headerH + 'px'});
				} else {
					$('.main-visual-wrap').css({'padding-top': popH + headerH + 'px'});	
					$('.main-popup-wrap').css({'padding-top': popH + headerH + 'px'});
				}
			} else {
				$('.main-visual-wrap').css({'padding-top': 0});	
				$('.main-popup-wrap').css({'padding-top': 0});
			};

			var mobileTimer02 = null;
			var mobileDelta02 = 30;

			$( window ).on( 'resize', function( ) {
				clearTimeout( mobileTimer02 );
				mobileTimer02 = setTimeout( self.setVisualPadding, mobileDelta02 );
			});
		},
		setMobileMenuHeight: function() {
			// 모바일에서 .m-slide-menu의 height값을 브라우저 높이 - (헤더 + 팝업 높이)로 설정
			// 렌더링 순서때문에 m-mn에 넣을 수 없어 user.js에 작업
			windowHeight = $(window).height();
			popH = $('.top-pop-box').outerHeight();
			headerH = $('.middle-header-box').outerHeight();
			sumHeight = popH + headerH;

			$('.slideMenu').css({'height': windowHeight - sumHeight + 'px'});
			$('.m-gnb > ul').css({'min-height': windowHeight - sumHeight + 'px'});
		}

	}
}();

//======================================================================
//MainGNB
//======================================================================
App.MainGnb = function () {
	var self, depth02Arr, maxLength, max, indexNum, maxHeight;
	var boxWidth, subMenuWidth, subMenuLeng, subMenuIdx, subMenuTitle;
	var subMenuCol2, subMenuCol2Leng, subMenuLeftNew, findLeng;
	var gnbH, gnbOffset, fixedH;
	return {
		init: function () {
			self = this;
			depth02Arr = new Array();

			self.setCol($('.gnb-ul > li > a'));

			$('.gnb-ul > li > a').on('click', function(e){ // 열기
				if (!$(this).parent().hasClass('active')) {
					$('.gnb-ul > li').find('.sub-mn-box').hide();
					$('.gnb-bg').css({height: 0});

					$('.gnb-ul > li').removeClass('active');
					$(this).parent('li').addClass('active');
					self.setPos($(this));
					self.onMouseOver($(this));
					var gnbThis = $(this);
					setTimeout(function(){
						self.setHeight(gnbThis);
					}, 250);
				} else { // 닫기
					self.onMouseLeave();
				}
			});

			$('.bottom-header-wrap').on('mouseleave', self.onMouseLeave);

			$('.gnb-ul > li:last-of-type .sub-mn-box .sub-mn > li:last-of-type > .sub-mn02 > li:last-of-type > a').on('focusout', self.onMouseLeave);

			// 스크롤시 GNB fixed

			gnbOffset = $('.bottom-header-wrap').offset().top;
			gnbH = $('.bottom-header-wrap').outerHeight();
			fixedH = $(window).height() + 200; 

			$(window).on('scroll', function(){
				if($(document).height() >= fixedH) {
					if ($(window).scrollTop() >= gnbOffset + gnbH - 100) {
						$('.bottom-header-wrap, .bottom-header-box').addClass('fixed');
					}
					else {
						$('.bottom-header-wrap, .bottom-header-box').removeClass('fixed');
					}
				}
				if ($(window).scrollTop() === 0) $('.bottom-header-wrap, .bottom-header-box').removeClass('fixed');
			});


		},
		onMouseOver: function (param) {
			$('.gnb-bg').hide();
			param.parent('li').find('.sub-mn-box').stop(true, true).delay(100).slideDown(500);
			$('.gnb-bg').stop(true, true).slideDown(200);
		},
		onMouseLeave: function () {
			$('.gnb-ul > li').removeClass('active');
			$('.sub-mn-box, .gnb-bg').stop(true, true).delay(100).slideUp(200);
		},
		setCol: function (param) {
			// 3depth가 14개 이상인 메뉴 두 줄 처리 (대학/대학원 > 대학)
			param.parent('li').find('.sub-mn > li').each(function(){
				if($(this).find('.sub-mn02 > li').length >= 14) $(this).addClass('col02'); 
				if($(this).hasClass('col02')) {
					findLeng = Math.floor($(this).find('.sub-mn02 > li').length / 2);
					$(this).find('.sub-mn02').each(function() {
						$(this).parent().append('<ul class="sub-mn02"></ul>');
						for(var i = 0; i < findLeng; i++) {
							$(this).next().prepend($(this).find('> li').last(i));
						}
					});
				}
			});
		},
		setPos: function(param){
			boxWidth = $('.bottom-header-box .gnb-wrap').width();
			subMenuLeng = param.parent('li').find('.sub-mn > li').length;
			subMenuWidth = boxWidth / subMenuLeng;

			// 2depth 메뉴 위치값 조정
			param.parent('li').find('.sub-mn > li').each(function(){
				subMenuCol2 = $(this).parent().find('.col02').length;
				subMenuCol2Leng = param.parent('li').find('.sub-mn > li').length + subMenuCol2;
				subMenuWidth = 100 / subMenuCol2Leng;

				// width 설정
				if($(this).hasClass('col02')) { // col 2줄짜리 포함 : 2줄
					$(this).css({'width': subMenuWidth * 2 + '%'});	
				} else if ($(this).siblings().hasClass('col02') && !$(this).hasClass('col02')) { // col 2줄짜리 포함 : 1줄
					$(this).not('.col02').css({'width': subMenuWidth + '%'}); 
				} else if(!$(this).hasClass('col02') && !$(this).siblings().hasClass('col02')){ // col 2줄짜리가 포함되지 않을 경우
					$(this).css({'width': subMenuWidth + '%'});
				}

				// left 설정
				if($(this).prev().length > 0) {
					subMenuLeftNew = parseFloat($(this).prev().css('left')) + parseFloat($(this).prev().css('width'));
				} else {
					subMenuLeftNew = 0
				}
				$(this).css({'left': subMenuLeftNew + '%'});
			});	

			$(window).resize(function(){
				self.setPos(param);
			});
		},
		setHeight: function(param){
			depth02Arr = [];

			// 3depth 메뉴의 개수에 따라 gnb-bg 높이 변경
			param.parent('li').find('.sub-mn > li').each(function () {
				depth02Arr.push($(this).outerHeight());
			});

			maxLength = depth02Arr.reduce(function (previous, current) {
				return previous > current ? max = previous : max = current;
			});

			indexNum = jQuery.inArray(max, depth02Arr);

			maxHeight = param.parent('li').find('.sub-mn > li:eq(' + indexNum + ')').outerHeight();
			if(depth02Arr.length > 0){
				$('.gnb-bg').css({height: (maxHeight + 90) + 'px'});
			}else{
				$('.gnb-bg').css({height: 0});
			}
		}
	}
}();

//------------------------------------------------------
//List 자동화
//------------------------------------------------------  
App.autoList = function () {
	var self, ulWidth, liArr, liSum, liNum, space, liOneSpace, autoOpt, remainder;
	return {
		init: function (opt) {
			autoOpt = opt;

			ulWidth = $(autoOpt.list).innerWidth();
			liArr = [];
			liSum = 0;
			liNum = $(autoOpt.list).children("li").length;

			$(autoOpt.list).children("li").each(function () {
				liArr.push($(this).find("a").innerWidth());
			});

			liArr.reduce(function (a, b) {
				result = a + b;
				return result;
			});

			liSum = result;

			if ((ulWidth - liSum) >= 0) {
				space = ulWidth - liSum;
			} else {
				space = 0;
				remainder = ulWidth - liSum;
				ulWidth = ulWidth + (-remainder);
			}

			if ((space / liNum) >= 0) {
				liOneSpace = space / liNum;
			} else {
				liOneSpace = 0;
			}

			if (autoOpt.endWidth == "center") {
				$(autoOpt.list).children("li").each(function () {
					$(this).css({
						width: (($(this).children("a").innerWidth() + liOneSpace) / ulWidth) * 100 + "%"
					});
				});
			} else if (autoOpt.endWidth == "end") {
				$(autoOpt.list).children("li").each(function () {
					$(this).not(":first-of-type, :last-of-type").css({
						width: (($(this).children("a").innerWidth() + liOneSpace + (liOneSpace / (liNum - 1))) / ulWidth) * 100 + "%"
					});
				});
				$(autoOpt.list).children("li:first-of-type").css({
					width: (($(autoOpt.list).children("li:first-of-type").children("a").innerWidth() + (liOneSpace / 2) + ((liOneSpace / (liNum - 1))) / 2) / ulWidth) * 100 + "%"
				});
				$(autoOpt.list).children("li:last-of-type").css({
					width: (($(autoOpt.list).children("li:last-of-type").children("a").innerWidth() + (liOneSpace / 2) + ((liOneSpace / (liNum - 1))) / 2) / ulWidth) * 100 + "%"
				});
			}

		}
	}
};

//======================================================================
//Lnb
//======================================================================
App.Lnb = function(){
	var self;

	return {
		init: function(){
			self = this;

			// 규칙집 LNB
			if($('.lnb-box').length > 0) $('.lnb-box .lnb-menu > li > a.active').addClass('on');

			$('.lnb-box .lnb-menu > li').each(function() {
				if($(this).find('> ul').length > 0) {
					$(this).find('> a').click(function(e) {
						e.preventDefault();
						$(this).toggleClass('on');
						$(this).next().slideToggle();
					});
				}
			});

		}
	}
}();

//-----------------------------------------------------------------------------------------
//select box(path)
//-----------------------------------------------------------------------------------------
App.SelectBoxPath = function () {
	var self;
	var $path;
	return {
		init: function () {
			self = this;

			$(".path-depth").slideUp(200);

			$path = $(".path-depth-wrap > ul > li");
			$path.each(function () {
				var $thisBox = $(this);
				$thisBox.find(".path-selected").click(self.onClick);

				$(document).click(function(e){
					if($thisBox.has(e.target).length === 0){
						$(".path-selected").removeClass("active");
						$(".path-depth").slideUp(200);
					}
				});
			});

		},
		onClick: function () {
			$(this).parents("li").find(".path-depth").slideToggle();
			$(this).parents("li").find(".path-selected").toggleClass("active");

			return false;
		}
	}
}();

//======================================================================
//CarouselModule(ver.05.01)
//======================================================================
App.CarouselModule = function () {
	var self, opt;
	var offset, pos; //[정지/재생] 버튼 위치 설정(절대값/상대값)
	var $controlBtn; //[이전/다음] 컨트롤 버튼
	var $carouselWrap, $carouselBox; //owl carousel 선택자
	var resOptKey, resOptVal, resArr, resWinWidth, resResult, resMatch; //반응형 옵션
	var result;
	return {
		init: function (param) { //모듈 옵션을 parameter로 받는다.
			self = this;
			opt = param;

			//owl carousel 선택자
			$carouselWrap = $(opt.name); //.carousel-wrap
			$carouselBox = $(opt.name).find('.owl-carousel'); //.owl-carousel
			$controlBtn = $(opt.name).find('.control-wrap > a'); //[이전/다음] 버튼

			//각각의 owl-carousel 실행
			$(opt.name).find('.owl-carousel').owlCarousel(opt.carouselOption);

			//정지/재생 컨트롤버튼
			$controlBtn.off(); //owl destroy후 rebuild했을 경우 trigger이벤트가 중복 발생되면서 rebuild된 횟수만큼 실행됨(슬라이드가 한꺼번에 2개 이상씩 넘어감) 따라서, 컨트롤버튼(이전/다음) 이벤트 초기화로 이벤트 중복발생 방지.
			$controlBtn.on('click', self.onClick);
			$(document).on('click', '.carousel-stop', self.onClickStop); //정지
			$(document).on('click', '.carousel-play', self.onClickPlay); //재생

			//owl-carousel에 dot가 없는경우 클래스 추가하여 [정지/재생] hide처리
			if ($carouselWrap.find('.owl-dots.disabled').length > 0) {
				$carouselWrap.find('.mini-board-ctrl').addClass('no-dots');
			}

			//[정지/재생] 컨트롤버튼 위치 설정
			self.insertCtrl();

			//화면 resize 후에 다시 autoplay되는 bug 해결	
			$carouselBox.on('resized.owl.carousel', function () {
				if ($(opt.name).find('.mini-board-ctrl').hasClass('carousel-play') === true) {
					$(this).trigger('stop.owl.autoplay');
				}
				self.noLoop();
				self.direction();
			});

			//owl carousel이 loop인 경우 화면에 노출될 아이템 개수보다 실제 등록된 아이템의 개수가 작을때 loop 해제
			self.noLoop();

			//direction
			self.direction();

			//autoplay false 설정시 한번 롤링되는오류 수정
			if (opt.carouselOption.customautoplay === false) {
				$(opt.name).find('.owl-carousel').trigger('stop.owl.autoplay');
				$(opt.name).find('.mini-board-ctrl').removeClass('carousel-stop').addClass('carousel-play');
				$(opt.name).find('.mini-board-ctrl').attr('title', '재생');
			}

			$('.carousel-wrap').each(function () {
				//cms적용된 홈페이지에서 carousel이 멈춘상태에서 owl-dot클릭시 자동으로 autoplay되는 오류해결
				$(this).find('.owl-dot').click(function () {
					var dotCarousel = $(this).parents('.owl-carousel');
					if ($(this).parents('.carousel-wrap').find('.mini-board-ctrl').hasClass('carousel-play') === true) {
						setTimeout(function () {
							dotCarousel.trigger('play.owl.autoplay');
							dotCarousel.trigger('stop.owl.autoplay');
						}, 10);
					}
				});

				//carousel이 멈춘상태에서 mouseDrag시 자동으로 autoplay되는 오류해결
				$(this).find('.owl-carousel').on('translated.owl.carousel', function () {
					var dragCarousel = $(this);
					if ($(this).parents('.carousel-wrap').find('.mini-board-ctrl').hasClass('carousel-play') === true) {
						setTimeout(function () {
							dragCarousel.trigger('play.owl.autoplay');
							dragCarousel.trigger('stop.owl.autoplay');
						}, 10);
					}
				});

				//carousel이 멈춘상태에서 prev, next 버튼 클릭시 자동으로 autoplay되는 오류해결		
				$(this).find('.control-wrap').on('click', function () {
					var conCarousel = $(this).parents('.owl-carousel');
					if ($(this).parents('.carousel-wrap').find('.mini-board-ctrl').hasClass('carousel-play') === true) {
						setTimeout(function () {
							conCarousel.trigger('play.owl.autoplay');
							conCarousel.trigger('stop.owl.autoplay');
						}, 10);
					}
				});
			});

		},
		onClick: function () { //[이전/다음] 컨트롤 버튼
			if ($(this).hasClass('prev')) {
				$(this).parents('.carousel-wrap').find('.owl-carousel').trigger('prev.owl.carousel');
			} else if ($(this).hasClass('next')) {
				$(this).parents('.carousel-wrap').find('.owl-carousel').trigger('next.owl.carousel');
			}

			return false;

		},
		onClickStop: function () { //정지
			$(this).parents('.carousel-wrap').find('.owl-carousel').trigger('stop.owl.autoplay');
			$(this).removeClass('carousel-stop').addClass('carousel-play');
			$(this).attr('title', '재생');
		},
		onClickPlay: function () { //재생
			$(this).parents('.carousel-wrap').find('.owl-carousel').trigger('play.owl.autoplay');
			$(this).removeClass('carousel-play').addClass('carousel-stop');
			$(this).attr('title', '정지');
		},
		ctrlOffset: function () { //[정지/재생] 컨트롤 버튼 절대값 위치계산
			if (opt.carouselOption.ctrlPoint === 'first') {
				offset = $carouselBox.find('.owl-dots .owl-dot:' + opt.carouselOption.ctrlPoint + '-of-type').offset().left;
				$carouselWrap.find('.mini-board-ctrl').css({left: offset - $carouselWrap.find('.mini-board-ctrl').width() + 'px'});
			} else if (opt.carouselOption.ctrlPoint === 'last') {
				offset = $carouselBox.find('.owl-dots .owl-dot:' + opt.carouselOption.ctrlPoint + '-of-type').offset().left + $carouselBox.find('.owl-dots .owl-dot:' + opt.carouselOption.ctrlPoint + '-of-type').outerWidth();
				$carouselWrap.find('.mini-board-ctrl').css({left: offset - $carouselWrap.find('.mini-board-ctrl').width() + 'px'});
			}
		},
		ctrlPos: function () { //[정지/재생] 컨트롤 버튼 상대값 위치계산
			if (opt.carouselOption.ctrlPoint === 'first') {
				pos = $carouselBox.find('.owl-dots .owl-dot:' + opt.carouselOption.ctrlPoint + '-of-type').position().left;
				$carouselWrap.find('.mini-board-ctrl').css({left: pos - $carouselWrap.find('.mini-board-ctrl').width() + 'px'});
			} else if (opt.carouselOption.ctrlPoint === 'last') {
				pos = $carouselBox.find('.owl-dots .owl-dot:' + opt.carouselOption.ctrlPoint + '-of-type').position().left + $carouselBox.find('.owl-dots .owl-dot:' + opt.carouselOption.ctrlPoint + '-of-type').outerWidth();
				$carouselWrap.find('.mini-board-ctrl').css({left: pos - $carouselWrap.find('.mini-board-ctrl').width() + 'px'});
			}
		},
		insertCtrl: function () { //[정지/재생] 컨트롤 버튼 위치 설정
			setTimeout(function () { //렌더링시 owl 로딩이 느려 위치를 제대로 계산하지 못하는 경우가 있기 때문에 setTimeout으로 일정시간 이후 위치를 지정하도록 한다.
				if (opt.carouselOption.ctrlVer === 'offset') {
					self.ctrlOffset();
					$(window).resize(function () {
						self.ctrlOffset();
					});
				} else if (opt.carouselOption.ctrlVer === 'pos') {
					self.ctrlPos();
					$(window).resize(function () {
						self.ctrlPos();
					});
				}
			}, 200);
		},
		noLoop: function () { //화면에 노출될 아이템 개수보다 실제 등록된 아이템의 개수가 작을때 loop 해제
			// 200317 no-loop-f 관련 소스 추가 - loop옵션을 false로 설정했을 경우에도 no-loop 관련 클래스가 필요하여(no-loop시 가운데 정렬 요청 때문) no-loop-f 클래스를 추가하는 소스를 임의 추가하여 사용.
			if ('responsive' in opt.carouselOption) { //owl carousel 옵션 중 responsive 옵션이 있는경우
				resArr = [];
				resOptKey = Object.keys(opt.carouselOption.responsive);

				for (var i = 0; i < resOptKey.length; i++) {
					resOptVal = (opt.carouselOption.responsive[resOptKey[i]]);
					resArr.push(resOptVal);
				}

				resWinWidth = $(window).innerWidth();
				resOptKey.reduce(function (current, next) {
					return resResult = resWinWidth > next ? next : current;
				});

				resMatch = resOptKey.indexOf(resResult);

				if (resArr[resMatch].loop === true && $carouselBox.find('.owl-item:not(.cloned)').length <= resArr[resMatch].items) {
					$carouselBox.find('.owl-item.cloned').remove();
					$carouselWrap.addClass('no-loop'); //css에서 .no-loop .owl-stage{transform:none !important;} / .no-loop .mini-board-ctrl{display:none;} / .no-loop .owl-dots{display:none;} 처리 필요
				} else if (resArr[resMatch].loop === false && $carouselBox.find('.owl-item:not(.cloned)').length <= resArr[resMatch].items) {
					$carouselWrap.addClass('no-loop-f');
				} else {
					$carouselWrap.removeClass('no-loop no-loop-f');
					self.insertCtrl();
					if ($carouselWrap.find('.carousel-stop').length > 0) {
						$carouselBox.trigger('play.owl.autoplay');
					}
				}
			} else { //owl carousel 옵션 중 responsive 옵션이 없는 일반적인 경우
				if (opt.carouselOption.loop === true && $carouselBox.find('.owl-item:not(.cloned)').length <= opt.carouselOption.items) {
					$carouselBox.find('.owl-item.cloned').remove();
					$carouselWrap.addClass('no-loop');
				} else if (opt.carouselOption.loop === false && $carouselBox.find('.owl-item:not(.cloned)').length <= opt.carouselOption.items) {
					$carouselWrap.addClass('no-loop-f');
				} else {
					$carouselWrap.removeClass('no-loop no-loop-f');
					self.insertCtrl();
					if ($carouselWrap.find('.carousel-stop').length > 0) {
						$carouselBox.trigger('play.owl.autoplay');
					}
				}
			}
		},
		direction: function () {
			var loopFlag = null;
			var itemsVal = null;
			if ('responsive' in opt.carouselOption) {
				loopFlag = resArr[resMatch].loop;
				itemsVal = resArr[resMatch].items;
			} else {
				loopFlag = opt.carouselOption.loop;
				itemsVal = opt.carouselOption.items;
			}

			//owl-stage 초기화
			if (loopFlag === false) {
				setTimeout(function () {
					$carouselWrap.find('.owl-carousel .owl-stage').css({transform: 'translate3d(0,0,0)'});
				}, 20);
			}

			if ('responsive' in opt.carouselOption) { //owl carousel 옵션 중 responsive 옵션이 있는경우
				if (resArr[resMatch].direction === 'vertical') {
					self.directionModule(loopFlag, itemsVal);
				} else {
					$carouselWrap.removeClass('owl-vertical');
					$carouselWrap.find('.owl-item').removeClass('active');
					if (opt.carouselOption.items) {
						setTimeout(function () {
							$carouselWrap.find('.owl-item:not(.cloned)').slice(0, opt.carouselOption.items).addClass('active');
						}, 200);
					} else if (resArr[resMatch].items) {
						$carouselWrap.find('.owl-item:not(.cloned)').slice(0, resArr[resMatch].items).addClass('active');
					}
					$carouselWrap.find('.owl-carousel').trigger('to.owl.carousel', 0);
				}
			} else if (opt.carouselOption.direction === 'vertical') {
				self.directionModule(loopFlag, itemsVal);
			}
		},
		directionModule: function (loopFlag, itemsVal) {
			$carouselWrap.addClass('owl-vertical');
			var itemHeight = $carouselWrap.find('.owl-item').innerHeight();
			var clickNum = 0;
			var limitNum = 0;
			var prevFlag = 'off';
			var nextFlag = 'off';
			var posArr = null;
			var curPos = 0;
			var resetStage = 0;
			var autoBox = null;

			if (loopFlag === false && $carouselWrap.hasClass('owl-vertical') === true) {
				$carouselWrap.find('.owl-carousel').on('resized.owl.carousel', function () {
					calcStage(clickNum * itemHeight);
					itemHeight = $carouselWrap.find('.owl-item').innerHeight();
				});
			} else if (loopFlag === true && $carouselWrap.hasClass('owl-vertical') === true) {
				resetStage = $carouselWrap.find('.owl-item.active:eq(0)').prevAll().length * itemHeight;
				calcStage(-resetStage);
				curPos = resetStage;
			}

			function calcStage(resetVal) {
				$carouselWrap.find('.owl-carousel .owl-stage').css('transform', 'translate3d(0px,' + resetVal + 'px' + ', 0px)');
			}

			if (opt.carouselOption.autoplay === true && $carouselWrap.hasClass('owl-vertical') === true) {
				autoLoop();
				function autoLoop() {
					$carouselWrap.find('.owl-carousel').trigger('play.owl.autoplay');
					$carouselWrap.find('.owl-carousel').trigger('stop.owl.autoplay');
					if ('autoplayTimeout' in opt.carouselOption) {
						autoBox = setInterval(function () {
							$carouselWrap.find('.control-wrap .next').trigger('click');
						}, opt.carouselOption.autoplayTimeout);
					} else {
						autoBox = setInterval(function () {
							$carouselWrap.find('.control-wrap .next').trigger('click');
						}, 5000);
					}
				}

				$carouselWrap.find('.mini-board-ctrl').click(function () {
					if ($(this).hasClass('carousel-stop')) {
						clearTimeout(autoBox);
					} else if ($(this).hasClass('carousel-play')) {
						autoLoop();
					}
					$carouselWrap.find('.owl-carousel').trigger('play.owl.autoplay');
					$carouselWrap.find('.owl-carousel').trigger('stop.owl.autoplay');
					setTimeout(function () {
						$carouselWrap.find('.owl-carousel').trigger('stop.owl.autoplay');
					}, 100);
				});
			}

			$carouselWrap.find('.control-wrap a').click(function () {
				var $stageArea = $(this).parents('.carousel-wrap').find('.owl-carousel .owl-stage');
				var itemNum = $stageArea.find('.owl-item').length;
				$carouselWrap.find('.owl-carousel').on('translated.owl.carousel', function () {
					posArr = $carouselWrap.find('.owl-stage').css('transform').replace(/[^0-9^,^-^.]/g, "").split(',');
					curPos = posArr[5];
				});

				if ($(this).attr('class') === 'next') {
					clickNum = --clickNum;
				} else if ($(this).attr('class') === 'prev') {
					clickNum = ++clickNum;
				}

				if (loopFlag === false && $carouselWrap.hasClass('owl-vertical') === true) {
					if (1 <= clickNum) {
						clickNum = 0;
						$stageArea.css('transform', 'none');
					} else if (itemNum <= -(clickNum - itemsVal)) {
						limitNum = -(itemNum - itemsVal);
						clickNum = limitNum;
						calcStage(limitNum * itemHeight);
					} else {
						calcStage(clickNum * itemHeight);
					}

				} else if (loopFlag === true && $carouselWrap.hasClass('owl-vertical') === true) {
					if ($(this).attr('class') === 'next') {
						if ($carouselWrap.find('.owl-item:not(.cloned).active').length <= 1) {
							nextFlag = 'on';
						}

						if (nextFlag === 'off') {
							calcStage(-itemHeight - curPos);
						} else if (nextFlag === 'on') {
							$carouselWrap.addClass('no-transition');
							calcStage(itemHeight - resetStage);
							setTimeout(function () {
								$carouselWrap.removeClass('no-transition');
								calcStage(-resetStage);
							}, 100);
							nextFlag = 'off';
							clickNum = 0;
						}
					} else if ($(this).attr('class') === 'prev') {
						if ($carouselWrap.find('.owl-item:not(.cloned):first').prev('.owl-item.cloned').hasClass('active')) {
							prevFlag = 'on';
							nextFlag = 'on';
						}

						if (prevFlag === 'off') {
							calcStage(itemHeight - curPos);
						} else if (prevFlag === 'on') {
							$carouselWrap.addClass('no-transition');
							calcStage(-(itemHeight * $carouselWrap.find('.owl-item:not(.cloned)').length) - resetStage);
							setTimeout(function () {
								$carouselWrap.removeClass('no-transition');
								calcStage(-(itemHeight * ($carouselWrap.find('.owl-item:not(.cloned)').length - 1)) - resetStage);
							}, 100);
							prevFlag = 'off';
							clickNum = 0;
						}
					}
				}
			});
		}
	}
};

//-----------------------------------------------------------------------------------------
//select box(related site box)
//-----------------------------------------------------------------------------------------
App.SelectBox2 = function(){
	var self;
	var $relatedTitle, $relatedList;
	return {
		init: function(){
			self = this;
			$relatedTitle = $(".related-site-title");
			$relatedList = $(".related-site");
			$relatedTitle.click(self.onClick);

			$(".related-site-wrap").each(function(){
				var $thisBox = $(this);

				$(document).mouseup(function(e){
					if($thisBox.has(e.target).length === 0){
						$thisBox.find(".related-site-title").removeClass("active");
					}
				});

			});

		},
		onClick: function(){
			$(this).toggleClass("active", "");
		}
	}
}();

//------------------------------------------------------
//object-fit(IE)
//------------------------------------------------------  
App.ObjectFit = function () {
	var self;
	return {
		init: function (param) {
			if ('objectFit' in document.documentElement.style === false) {
				var container = document.querySelectorAll(param);
				for (var i = 0; i < container.length; i++) {
					var imageSource = container[i].querySelector('img').src;
					container[i].querySelector('img').style.display = 'none';
					container[i].style.backgroundSize = 'cover';
					container[i].style.backgroundImage = 'url(' + imageSource + ')';
					container[i].style.backgroundPosition = '50% 0';
				}
			}
		}
	}
};

//------------------------------------------------------
//table scroll
//------------------------------------------------------  
App.TableScroll = function(){
	return {
		init: function(){
			$(".scrollbox").each(function() {
				$(this).scroll(function() {
					$(this).find(".msg-touch-help").fadeOut();
				});
			});
		}
	}
}();

//------------------------------------------------------
//메뉴 연동 select box
//------------------------------------------------------
App.SelectBoxMenu = function () {
	var self;
	var $tabSel, $mTab;
	return {
		init: function () {
			self = this;
			$tabSel = $('.tab-sel');
			$mTab = $(".m-tab-box");

			var select_name = $tabSel.children('option:selected').text();
			$tabSel.siblings('label').text(select_name);

			$tabSel.on('change', function () {
				var url = $(this).val();
				if (url) {
					window.location = url; // redirect
				}

				return false;
			});

			$mTab.click(self.onClick);
		},
		onClick: function(){
			$mTab.toggleClass("active");
			$tabSel.blur(function(){
				$mTab.removeClass("active");
			});
		}
	}
}();


//------------------------------------------------------
//메뉴 스크롤 - 입학안내 > 대학입학 & 대학/대학원 > 일반대학원
//------------------------------------------------------
App.MenuScroll = function (e) {
	var self;
	return {
		init: function (e) {
			self = this;


			// GNB or navi에서 해시 클릭 시 header가 fixed가 아닐 때 hash의 위치를 제대로 잡지 못하는 현상 수정
			$('.sub-mn > li > a, .sub-mn02 > li > a, .path-depth > li > a').on('click', function() {
				if($(window).width() > 1024 && $('.has-hash').length > 0 && !$('.bottom-header-box').hasClass('fixed')) {
					$('.has-hash').addClass('no-fixed');
					setTimeout(function() {
						$('.has-hash').removeClass('no-fixed');
					}, 300);
				}
			});

			// 모바일에서 해시 이동 메뉴 클릭시 모바일 메뉴 닫기
			$('.dep2 > li > a, .dep3 > li > a').on('click', function() {
				if($(this).attr('href').indexOf('#') > 0) {
					if($('.slideMenu').is(':visible')) {
						$(".slideMenu").animate({
							right: "-100%"
						});
						$(".slideMenu").hide(10);
						$("html, body").removeClass('all-fixed');	
					}
				}
			});

			// 일반대학원 계열 클릭시 GNB, Navi에 active 클래스 변경
			if(_cur_menu_cd === '1798') {

				$(window).on('load hashchange', function() {

					setTimeout(function() {

						var target = window.location.hash;

						$('.path-depth > li').each(function() {
							var aHash01 = $(this).find('> a').attr('href').split('#');
							var aHashR01 = '#' + aHash01[1];

							if(target === aHashR01) {
								$(this).siblings().removeClass('active');
								$(this).addClass('active');
								$(this).siblings().find(' > a').removeClass('active');
								$(this).find(' > a').addClass('active');

								var text = $(this).find(' > a').text();
								$(this).parent().prev().text(text)

							}
						});

						$('.dep3 > li').each(function() {
							var aHash02 = $(this).find('> a').attr('href').split('#');
							var aHashR02 = '#' + aHash02[1];

							if(target === aHashR02) {
								$(this).siblings().removeClass('active');
								$(this).addClass('active');
								$(this).siblings().find(' > a').removeClass('active');
								$(this).find(' > a').addClass('active');
							}
						});

						$('.sub-mn02 > li').each(function() {
							var aHash03 = $(this).find('> a').attr('href').split('#');
							var aHashR03 = '#' + aHash03[1];

							if(target === aHashR03) {
								$(this).siblings().removeClass('active');
								$(this).addClass('active');
								$(this).siblings().find(' > a').removeClass('active');
								$(this).find(' > a').addClass('active');
							}
						});

					}, 300);
				});			
			} // end of if

		}
	}
}();

//------------------------------------------------------
//메뉴 스크롤 - 이화소개 > 직부속시관
//------------------------------------------------------

App.CateScroll = function () {
	var target, header_height, offset_top
	return {
		init: function () {
			if ($(document).find('.insti-detail').length > 0) {
				target = $('.bn-view-organ01').offset().top;
				header_height = $('.bottom-header-wrap').height(); //헤더 높이값
				offset_top = target - header_height;
				if($(window).width() > 768) {
					setTimeout(function () {
						$('html, body').animate({
							scrollTop: offset_top - 110
						}, 1000);
					}, 300);
				}

			}
		}
	}
}();



//window popup
$(document).on('click', '.b-open-pop', function(e){
	e.preventDefault();
	var popUrl = $(this).attr('href');
	window.open(popUrl, 'popup', 'width=1200,height=780,scrollbars=yes');
});

// ------------------------
// 사이트 언어선택 
// ------------------------
$(document).on( 'click' , 'a.mv-lng' , function(e){ //즁문 숨김처리 때문에 변경 '.lang-box a.mv-lng'


	var curSiteId = "/" + _siteId  + "/" ;
	var mvSiteId = "/" +  $(this).data("lng") +  "/";
	var curPage =  window.location.pathname;
	var fullPath = window.location.href;
	var param  = '';
	if ( fullPath.indexOf('?') > 0 ){
		param = fullPath.substr( fullPath.indexOf('?') );	
	}

	var mvPage =  window.location.protocol   + "//" + window.location.host   + curPage.replace(  curSiteId , mvSiteId ) + param ;

	// 권한 시작
	var articleNo = "";
	var searchVal = "mode=";
	var result = "";
	var lang = mvSiteId.substr(-3, 2);
	if(lang !== "en" && lang!== "cn") {
		lang = "ko";
	}

	// 조작 시작
	if(lang !== "cn") {
		var startIdx = param.lastIndexOf(searchVal) + searchVal.length;
		var editParam = param.substr(startIdx);	// 잘라냄
		var endIdx = editParam.indexOf("&");

		// &를 찾을 수 없을 때
		if(endIdx === -1) {
			result = editParam;	
		} else {
			result = editParam.substr(0, endIdx);
		}

		// result가 view라 게시판이 된다면 articleNo를 알아낸다.
		if(result === "view") {
			searchVal = "articleNo=";
			startIdx = param.lastIndexOf(searchVal) + searchVal.length;
			editParam = param.substr(startIdx);
			endIdx = editParam.indexOf("&");

			// &를 찾을 수 없을 때
			if(endIdx === -1) {
				articleNo = editParam;
				var trashIdx = articleNo.indexOf("#");

				if(trashIdx != -1) {
					articleNo = articleNo.substring(0, trashIdx);
				}
			} else {
				articleNo = editParam.substr(0, endIdx);

				var trashIdx = articleNo.indexOf("#");

				if(trashIdx != -1) {
					articleNo = articleNo.substring(0, trashIdx);
				}
			}
		}
	}
	// 권한 끝

	$.ajax({
		url: mvPage ,
		type: 'HEAD',
		success: function (data) {
			var paramObj = getParam("pId");	// 파라미터 담고있다.

			if(result === "view" && lang !== "cn" && paramObj.isPresence === false) {

				// 각 언어에 해당하는 게시글이 있는지 확인
				$.ajax({
					url : "/util/getArticleTitle.do",
					data : {"articleNo" : articleNo, "lang" : lang},
					success : function(data) {

						// 해당 언어의 게시글이 없을 경우 list로 이동
						if(!data.isPresence) {
							// param 조작, mode 제거
							editParam = param.replace("mode=view&", "");
							editParam = editParam.replace("mode=view", "");

							mvPage = window.location.protocol   + "//" + window.location.host   + curPage.replace(  curSiteId , mvSiteId ) + editParam ;
						}

						location.href = mvPage;
					},
					error : function(data) {
						location.href = mvPage;
					}
				})

			}
			// search.do(통합검색)일 경우에 파라미터는 버리고 사이트아이디만 변경한다.
			else if (location.pathname.contains("search.do")) {
				mvPage =  window.location.protocol   + "//" + window.location.host   + curPage.replace(  curSiteId , mvSiteId );
				location.href = mvPage;
			}
			else {
				location.href = mvPage;
			}
		},
		error: function (data) {

			var indexPage = window.location.protocol   + "//" + window.location.host  + mvSiteId ;
			location.href = indexPage;
		}
	});

});

// 사이트 언어 변경할 때 파라미터 정보를 얻기 위해 만든 함수
function getParam(name) {
	var params = location.search.substr(location.search.indexOf("?") + 1);
	var paramVal = "";
	var isPresence = false;

	params = params.split("&");

	for(var i = 0; i < params.length; i++) {
		var temp = params[i].split("=");

		if ([temp[0]] == name) {
			paramVal = temp[1];
			isPresence = true;
		}
	}

	var paramResult = {"paramVal" : paramVal, "isPresence" : isPresence};

	return paramResult;
}

$(function() {
	$("li.1514").before("<li><a href='/ewhaen/academics/college.do'>Undergraduate</a></li>");
})