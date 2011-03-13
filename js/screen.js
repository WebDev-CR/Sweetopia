$(function(){
	var touchSupported = (function(){
	  try {
	    return !!(document.createEvent("TouchEvent").initTouchEvent)
	  } catch(e) {
	    return false;
	  };
	})();
	
	var tap = touchSupported ? 'touchstart' : 'click', 
		$hud = $('.hud');
	
	var enter = function(event){
		$('.hover').css('opacity', 0.05);
		var $candy = $(this),
			$hover = $candy.find('.hover').css('opacity', 0),
			offset = $candy.offset();
			
		if (!$candy.data('html')){
			$hud.find('.extras-expanded').html($candy.find('.extras').html());
			$hud.find('.flavor').html($candy.find('input[name=flavor]').val() + ' ' + $candy.find('input[name=presentation]').val());
			$hud.find('.price').html('¢' + $candy.find('input[name=price]').val() + '/kg');
			$candy.data('html', $hud.html());
		}
		
		offset.left += 180;
		$hud.data('candy', this).css(offset).html($candy.data('html')).show();				
	}
	
	var leave = function(event){
		if ($hud.is(':visible')){
			var offset = $hud.offset(), 
				width = $hud.width(), 
				height = $hud.height(),
				isOver = (event.pageX > offset.left && event.pageX < offset.left + width && event.pageY > offset.top && event.pageY < offset.top + height);

			if (!isOver){
				$(this).find('.hover').css('opacity', 0.05);
				$hud.hide();
			}
		}
	}
	
	$candies = $('.candy')
		.each(function(){
			$('<div class="hover" />').appendTo(this);				
		});
		
	if (touchSupported)
 		$candies.bind(tap, function(event){
			if ($hud.is(':visible') && $hud.data('candy') == this) // allow toggling for touch devices
				leave.call(this, event);
			else {
				leave.call(this, event);
				enter.call(this, event);
			}
		});
	else
		$candies.hover(enter, leave);
	
	$('.filter').bind(tap, function(){
		var $filter = $(this),
			classname = '.' + $filter.text().toLowerCase(),
			fx = $filter.is('.collapsed') ? 'slideDown' : 'slideUp';

		$filter.toggleClass('collapsed');
		$(classname)[fx]('fast');
	});
});