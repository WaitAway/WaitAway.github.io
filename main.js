var isLoading = true;
var canShowNav = false;
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
	
	setTimeout(function(){
		isLoading = false;
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
				$('#spinner').animate({top:'20%'}, 300, "swing", function(){
					showNav();
					canShowNav = true;
					$("#loadbg").remove();
					$("body").css({"overflow":"visible"});
					$("#title").css({"z-index":"3"});
					$("#titlebutton").css({"z-index":"3"});
					$("#title").animate({"opacity":"1"},100);
					$("#titlebutton").animate({"opacity":"1"},100);
					
					$({someValue: 1}).animate({someValue: 0}, {
						duration: 200,
						step: function() { 
							$('#spinbox').css('background-image','linear-gradient(rgba(112,184,255,'+ this.someValue +'), rgba(82,134,186,1))');
						}
					});
				});
			});
	}, 100); 
});

window.setInterval(function(){
	scrollTop = $(window).scrollTop();
	
	if(scrollTop >= window.innerHeight*4){
		activate(5);
	} else if(scrollTop >= window.innerHeight*3){
		activate(4);
	} else if(scrollTop >= window.innerHeight*2){
		activate(3);
	} else if(scrollTop >= window.innerHeight){
		activate(2);
	} else {
		activate(1);
	}
}, 100);

function activate(id){
	if($("#nd1").hasClass("active")) $("#nd1").removeClass("active");
	if($("#nd2").hasClass("active")) $("#nd2").removeClass("active");
	if($("#nd3").hasClass("active")) $("#nd3").removeClass("active");
	if($("#nd4").hasClass("active")) $("#nd4").removeClass("active");
	if($("#nd5").hasClass("active")) $("#nd5").removeClass("active");
	
	if($("#nd"+id).hasClass("active") == false) $("#nd"+id).addClass("active");
}

var navHidden = true;
var animated = false;
var mouseX = -1;
window.addEventListener("wheel", hideNav);
function hideNav(){
	if(!navHidden && !animated && mouseX < 0.9){
		navHidden = true;
		
        animated = true;
		$("#nd1").animate({"left":"100%"},100,"linear");
		$("#nd2").animate({"left":"100%"},100,"linear");
		$("#nd3").animate({"left":"100%"},100,"linear");
		$("#nd4").animate({"left":"100%"},100,"linear");
		$("#nd5").animate({"left":"100%"},100,"linear", function() {
			animated = false;
		});
	}
}

$(document).mousemove(function(event) {
	mouseX = event.pageX/window.innerWidth;
	if(mouseX >= 0.9 && canShowNav && navHidden && !animated) showNav();
});

function showNav(){
	navHidden = false;
	
	animated = true;
	$("#nd1").animate({"left":"95%"},100,"linear");
	$("#nd2").animate({"left":"95%"},100,"linear");
	$("#nd3").animate({"left":"95%"},100,"linear");
	$("#nd4").animate({"left":"95%"},100,"linear");
	$("#nd5").animate({"left":"95%"},100,"linear", function() {
		animated = false;
	});
}