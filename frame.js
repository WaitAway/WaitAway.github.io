var map;
var marker1;
var marker2;
var marker3;
var marker4;
var marker5;
var marker6;
function initMap() {
	map = new google.maps.Map(
		document.getElementById('map'), {zoom: 13, center: {lat: 45.419642, lng: -75.69}});
	marker1 = new google.maps.Marker({position: {lat: 45.417958, lng: -75.691275}, map: map});
	marker2 = new google.maps.Marker({position: {lat: 45.403017, lng: -75.702779}, map: map});
	marker3 = new google.maps.Marker({position: {lat: 45.430368, lng: -75.682169}, map: map});
	marker4 = new google.maps.Marker({position: {lat: 45.42987, lng: -75.718744}, map: map});
	marker5 = new google.maps.Marker({position: {lat: 45.4221, lng: -75.6823}, map: map});
	marker6 = new google.maps.Marker({position: {lat: 45.4015, lng: -75.648}, map: map});
}


$(document).ready(function(){
	//$(".cardcontainer").css({"border-radius":"0px"});
	$("#card1").on("mouseover", function () {
		map.panTo(marker1.getPosition());
	});
	
	$("#card2").on("mouseover", function () {
		map.panTo(marker2.getPosition());
	});
	
	$("#card3").on("mouseover", function () {
		map.panTo(marker5.getPosition());
	});
	
	$("#card4").on("mouseover", function () {
		map.panTo(marker4.getPosition());
	});
	
	$("#card5").on("mouseover", function () {
		map.panTo(marker3.getPosition());
	});
	
	$("#card6").on("mouseover", function () {
		map.panTo(marker6.getPosition());
	});
});