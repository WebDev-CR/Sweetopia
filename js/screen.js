$(function(){
	var $hud = $('.hud');
	
	$('.candy')
		.each(function(){
			$('<div class="hover" />').appendTo(this);				
		})
		.hover(
			function(event){ // mouseenter
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
				$hud.css(offset).html($candy.data('html')).show();				
			}, 
			function(event){ // mouseleave
				if ($hud.is(':visible')){
					var offset = $hud.offset(), 
						width = $hud.width(), 
						height = $hud.height();
					if (event.pageX > offset.left && event.pageX < offset.left + width && event.pageY > offset.top && event.pageY < offset.top + height){
						console.log('hovering');
					}
					else {
						$(this).find('.hover').css('opacity', 0.05);
						$hud.hide();
					}
				}
			}
		)
	
	$('.filter').click(function(){
		var $filter = $(this),
			classname = '.' + $filter.text().toLowerCase(),
			fx = $filter.is('.collapsed') ? 'slideDown' : 'slideUp';

		$filter.toggleClass('collapsed');
		$(classname)[fx]('fast');
	});
});