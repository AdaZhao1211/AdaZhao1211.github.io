$(function() {
$(".roll").css("opacity","0");
$(".roll").hover(function () {
$(this).stop().animate({
opacity: .6
}, "normal");
},
function () {
$(this).stop().animate({
opacity: 0
}, "fast");
});
});
