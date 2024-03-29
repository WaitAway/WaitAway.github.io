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

function book(){
	$("#form-main").animate({"opacity":"1"},100);
	$("#form-main").css({"z-index":"1"});
};

$(document).ready(function(){
	$(window).scrollTop(0);
	
	setTimeout(function(){
		isLoading = false;
		$('#spinbox')
			.css({
				borderTopLeftRadius: 100, 
				borderTopRightRadius: 100, 
				borderBottomLeftRadius: 100, 
				borderBottomRightRadius: 100})
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
				$('#spinbox').css({"min-height": "900px"});
				$('#spinner').animate({top:'20%'}, 300, "swing", function(){
					showNav();
					canShowNav = true;
					$("#loadbg").remove();
					$("body").css({"overflow-y":"visible"});
					$("#title").css({"z-index":"3"});
					$("#titlebutton").css({"z-index":"3"});
					$("#title").animate({"opacity":"1"},100);
					$("#titlebutton").animate({"opacity":"1"},100);
					$(".fa").animate({"opacity":"1"},100);
					
					setupBubbles();
					
					$({someValue: 1}).animate({someValue: 0}, {
						duration: 200,
						step: function() { 
							$('#spinbox').css('background-image','linear-gradient(rgba(112,184,255,'+ this.someValue +'), rgba(82,134,186,1))');
						}
					});
				});
			});
	}, 2000); 
});

//Ugly workaround, could be improved
function setupBubbles(){
	$(".ibubble").hover(function(){
		$(this).find(".ibtext").css({
			"font-size": "25px",
			"font-family": "'Forum', cursive",
			"text-shadow": "none"});
	}, function(){
		$(this).find(".ibtext").css({
			"font-size": "40px",
			"font-family": "'Arial Black', 'Archivo Black', 'Arial Bold', Gadget, sans-serif",
			"text-shadow": "0px 0px 5px black"});
	});
}

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

window.addEventListener('click', function(e){   
  if (!document.getElementById('form-main').contains(e.target)){
    $("#form-main").animate({"opacity":"0"},100);
    $("#form-main").css({"z-index":"-1"});
  } 
});

var isBlack = false;
$(window).scroll(function() {
   var p = $(this).scrollTop()/$(document).height();
   if (p > 0.28 && p < 0.55){
       if(!isBlack){
		   $(".navdot").css({ borderTopColor: '#000000', borderLeftColor: '#000000', borderRightColor: '#000000', borderBottomColor: '#000000' });
		   $(".navdot").addClass("black");
		   isBlack = true;
	   }
   } else {
		if(isBlack){
			$(".navdot").css({ borderTopColor: '#FFFFFF', borderLeftColor: '#FFFFFF', borderRightColor: '#FFFFFF', borderBottomColor: '#FFFFFF' });
		    $(".navdot").removeClass("black");
			isBlack = false;
	    }
   } 
});