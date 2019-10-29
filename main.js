/*Comments in this file coming soon!*/
var isLoading = true;
loadSpin();

function loadSpin(){
	if(isLoading){
		$({deg: 0}).animate({deg: 360}, {
			duration: 250,
			step: function(now) {
				$('#spinner').css({
					transform: 'rotate(' + now + 'deg)'
				});
			}
		},"swing",setTimeout(function(){loadSpin();},900));	
	}
}

$(document).ready(function(){
	$(window).scrollTop(0);
	
	setTimeout(function(){ //Currently, this timeout simulates loading. Will be removed.
		isLoading = false; //shouldnt start after animation begins??
		$('#spinbox')
			.css({
				borderTopLeftRadius: 100, 
				borderTopRightRadius: 100, 
				borderBottomLeftRadius: 100, 
				borderBottomRightRadius: 100 })
			.animate({
				borderTopLeftRadius: 0, 
				borderTopRightRadius: 0, 
				borderBottomLeftRadius: 0, 
				borderBottomRightRadius: 0,
				width: '100%',
				height: '100%',
				top: '0%',
				marginTop:0,
				left: '0%',
				marginLeft:0
			}, 600, "swing", function(){
				$("#loadbg").remove()
				$("#loadbg").css('opacity', '0');
				$("body").css({"overflow":"visible"});
				
				$('#spinner').animate({top:'20%'}, 300, "swing", function(){
					$("#title").css({"z-index":"3"});
					$("#titlebutton").css({"z-index":"3"});
					$("#title").animate({"opacity":"1"},100);
					$("#titlebutton").animate({"opacity":"1"},100);
				});
			});
	}, 2000); 
});