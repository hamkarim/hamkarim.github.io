if(!window.App) {
	App = {};
}
if(!App.content){
	App.content = {};
}




$(function() {
	
	var app = new App.content.Common();
	
	app.init();

});


App.content.Common = function() {
	
	var self;
	
	return {
		init: function() {
			
			self = this;
			
			// 메인비쥬얼
			self.mainVisMoveUrl();
			
		},
		mainVisMoveUrl : function(){
			
			$('.url').click(function(e){
				
				e.preventDefault();
				
				var $this = $(this), target = $this.attr('data-target'), height = $this.attr('data-h'), width = $this.attr('data-w'), url = $this.attr('data-url');
				
				if( '_self' == target ){
					
					if( url.startsWith("tel") ) {
						if( device == 'mobile' ){
							location.href = url;
						}
					} else {
						location.href = url;
					}
					
				} else if( '_blank' == target ){
					
					window.open(url);
					
				//} else if( typeof(target) == 'undefined' && $this.attr('id') == 'link-popup') { 
				} else if( 'popup' == target ){
					jwxe_popupWindow(url, width, height, 'popup', false, false);
				}
				
			});
		},
		
	}
}