
/** *************Init JS*********************
	
    TABLE OF CONTENTS
	---------------------------
	1.Load function
	2.Set height-width function
	3.Mateve function
	4.MasonryPortfolio function
	5.Ready function
	6.Resize function
	7.LightGallery Init
	8.Availablity Calendar
 ** ***************************************/
 
 "use strict"; 
/*****Load function start*****/
var preloader = $(".preloader-it");
$(window).on('load', function () {
	onResizePort();
	preloader.delay(500).fadeOut("slow");
	if(window.location.href.indexOf("index.html#") > -1) 
		$("html, body").animate({scrollTop: $(window.location.hash).offset().top - 50 }, 800);
});
/*****Load function* end*****/

/***** Set height-width function start *****/
var setHeightWidth = function () {
	var height = $(window).height();
	$('.full-height').css('min-height', (height));
	$('#map_canvas').height($('#form_card_height').height());
	$('.full-width-header').width($('.main-wrapper').width());
};
/***** Set height-width function end *****/

/***** Mateve function start *****/
var Mateve = function () {
	/*Counter JS*/
	var countdown = $("#countdown");
	if( countdown.length > 0 )
		countdown.countdown({
			date: '9/30/2017',
		});
	
	/*SmoothScroll*/
	smoothScroll.init({
		speed: 800,
		easing: 'easeInOutCubic',
		offset: 50,
		updateURL: false,
		callbackBefore: function ( toggle, anchor ) {},
		callbackAfter: function ( toggle, anchor ) {},
	});
	
	/*Scrollspy*/
	var bodySel = $("#body");
	bodySel.scrollspy({ target: ".mdl-scroll-spy-1",offset:52 });
	var scollSpy2ActiveLI = "";
	bodySel.on('activate.bs.scrollspy', function () {
		if (scollSpy2ActiveLI != "") {
			scollSpy2ActiveLI.removeClass('active');            
		}        
		var activeTab = $('.mdl-scroll-spy-1 li.active a').attr('href');
		scollSpy2ActiveLI = $('.mdl-scroll-spy-2 li a[href="' + activeTab + '"]').parent();
		scollSpy2ActiveLI.addClass('active');
	})
	bodySel.trigger('activate.bs.scrollspy');
	
	/*Counter Animation*/
	var counterAnim = $('.counter-anim');
	if( counterAnim.length > 0 ){
		counterAnim.counterUp({ delay: 10,
        time: 1000});
	}
	
	
	/*Subscribe JS start*/
	var notifyM = $('#notifyMe');
	if( notifyM.length > 0 )
		notifyM.notifyMe(); 
	
	/* Map Initialization */
	if( $('#map_canvas').length > 0 ){	
		var settings = {
			zoom: 11,
			scrollwheel: false,
			center: new google.maps.LatLng(31.7754, 76.9861),
			styles:[
				{
					"stylers": [
						{
							"hue": "#007fff"
						},
						{
							"saturation": 89
						}
					]
				},
				{
					"featureType": "water",
					"stylers": [
						{
							"color": "#ffffff"
						}
					]
				},
				{
					"featureType": "administrative.country",
					"elementType": "labels",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				}
			]};		
			var map = new google.maps.Map(document.getElementById("map_canvas"), settings);	
			google.maps.event.addDomListener(window, "resize", function() {
				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
				map.setCenter(center);
			});	
			var contentString = '<div id="content-map-marker" style="text-align:left; padding-top:10px; padding-left:10px">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h4 id="firstHeading" class="firstHeading" style="color:#000; margin-bottom:0px;"><strong>Hello Friend!</strong></h4>'+
				'<div id="bodyContent">'+
				'<p style="font-family:Verdana; color:#999; font-size:12px; margin-bottom:10px">Here we are. Come to drink a coffee!</p>'+
				'</div>'+
				'</div>';
			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});	
			
			var companyPos = new google.maps.LatLng(31.7754, 76.9861);	
			var companyMarker = new google.maps.Marker({
				position: companyPos,
				map: map,
				title:"IIT Mandi",
				zIndex: 3});	
			google.maps.event.addListener(companyMarker, 'click', function() {
				infowindow.open(map,companyMarker);
			});	
		}
		
	/*Slimscroll*/
	$('.nicescroll-bar').slimscroll({height:'100%',color: '#01c853',opacity:1,size:5});
	
	/*Testimonial carousel*/
	$('.testimonial-carousel').owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		navText: ["<i class='zmdi zmdi-arrow-left'></i>","<i class='zmdi zmdi-arrow-right'></i>"],
		dots:false,
		autoplay:true,
		responsive:{
			0:{
				items:1
			}
		}
	});
	
	/*Client carousel*/
	$('#client_sec .client-carousel').owlCarousel({
		loop:true,
		margin:15,
		nav:false,
		dots:false,
		responsive:{
			0:{
				items:1
			},
			200:{
				items:2
			},
			400:{
				items:3
			},
			600:{
				items:4
			},
			1300:{
				items:5
			}
		}
	});
};
/***** Mateve function end *****/

/***** MasonryPortfolio function start *****/		
var portfolioWrap = $('.portfolio-wrap');
if( portfolioWrap.length > 0 ){	
	var $container = $('.portf'),
	$body = $('body');
	
	/*On Resize Portfolio Function*/
	var onResizePort= function() {
		$body.find('.portf').each(function () { 
			var winWidth = window.innerWidth;
			var container_mock = $('.gallery-wrap').width();
			columnNumb = 1;			
			var attr_col = $(this).attr('data-col'),
			portfolioWrapGutter = $('.portfolio-wrap.no-gutter');	
			 if (winWidth >= 1466) {
				
				portfolioWrap.css( {width : container_mock});
				portfolioWrapGutter.css( {width : container_mock});			
				$('.portfolio-wrap.no-gutter.full-width').css( {width : 100  + '%'});			
				var portfolioWidth = portfolioWrap.width();
				
				if (typeof attr_col !== typeof undefined && attr_col !== false) {
					columnNumb = $(this).attr('data-col');
				} else columnNumb = 3;
					
				var postWidth = Math.floor(portfolioWidth / columnNumb)			
				$(this).find('.item').each(function () { 
					$(this).css( { 
						width : postWidth - 20 + 'px',
						height : 'auto',
						margin : 10 + 'px' 
					});
					$('.no-gutter .'+$(this).attr('class')).css( {
						width : postWidth  + 'px',
						height : 'auto',
						margin : 0 + 'px' 
					});
					$('.wide.'+$(this).attr('class')).css( { 
						width : postWidth * 2 - 20 + 'px'  
					});
					$('.no-gutter .wide.'+$(this).attr('class')).css( { 
						width : postWidth * 2 + 'px'  
					});
					$('.tall.'+$(this).attr('class')).css( {
						height : 'auto' 
					});
					$('.small.'+$(this).attr('class')).css( {
						height : 'auto',  
					});
				
					$('.no-gutter .tall.'+$(this).attr('class')).css( {
						height : 'auto', 
					});
					$('.wide-tall.'+$(this).attr('class')).css( {
						width : postWidth * 2 - 20 + 'px',
						height : postWidth * 2 - 20 + 'px'  
					});
					$('.no-gutter .wide-tall.'+$(this).attr('class')).css( {
						width : postWidth * 2 + 'px',
						height : 'auto', 
					});
				});
				
				
			} else if (winWidth > 1024) {
				
				portfolioWrap.css( {width : container_mock});
				portfolioWrapGutter.css( {width : container_mock});		
				var portfolioWidth = portfolioWrap.width();
							
				if (typeof attr_col !== typeof undefined && attr_col !== false) {
					columnNumb = $(this).attr('data-col'); //alert(columnNumb);
				} else columnNumb = 3;
				
				postWidth = Math.floor(portfolioWidth / columnNumb)			
				$(this).find('.item').each(function () { 
					
					$(this).css( { 
						width : postWidth - 20 + 'px',
						height : 'auto',
						margin : 10 + 'px' 
					});
					
					$('.no-gutter .' +$(this).attr('class')).css( {
						width : postWidth  + 'px',
						height : 'auto',
						margin : 0 + 'px' 
					});
					$('.wide.'+$(this).attr('class') ).css( { 
						width : postWidth * 2 - 20 + 'px'  
					});
					$('.no-gutter .wide.'+$(this).attr('class')).css( { 
						width : postWidth * 2 + 'px'  
					});
					$('.tall.'+$(this).attr('class')).css( {
						height : 'auto', 
					});
					$('.small.'+$(this).attr('class')).css( {
						height : 'auto',  
					});
					$('.no-gutter .tall.'+$(this).attr('class')).css( {
						height : 'auto', 
					});
					$('.wide-tall.'+$(this).attr('class')).css( {
						width : postWidth * 2 - 20 + 'px',
						height : 'auto', 
					});
					$('.no-gutter .wide-tall.'+$(this).attr('class')).css( {
						width : postWidth * 2 + 'px',
						height : 'auto', 
					});
				});
				
				
			} else if (winWidth > 767) {
				
				portfolioWrap.css( {width : container_mock});
				portfolioWrapGutter.css({width : container_mock});
				var portfolioWidth = portfolioWrap.width(),
				
				columnNumb = 2;
				postWidth = Math.floor(portfolioWidth / columnNumb)			
				$(this).find('.item').each(function () { 
					$(this).css( { 
						width : postWidth - 20 + 'px',
						height : 'auto',
						margin : 10 + 'px' 
					});
					$('.no-gutter .'+$(this).attr('class')).css( {
						width : postWidth  + 'px',
						height : 'auto',
						margin : 0 + 'px' 
					});
					$('.wide.'+$(this).attr('class')).css( { 
						width : postWidth * 2 - 20 + 'px'  
					});
					$('.no-gutter .wide.'+$(this).attr('class')).css( { 
						width : postWidth * 2 + 'px'  
					});
					$('.tall.'+$(this).attr('class')).css( {
						height : 'auto',
					});
					$('.small.'+$(this).attr('class')).css( {
						height : 'auto',  
					});
					$('.no-gutter .tall.'+$(this).attr('class')).css( {
						height : 'auto', 
					});
					$('.wide-tall.'+$(this).attr('class')).css( {
						width : postWidth * 2 - 20 + 'px',
						height : postWidth   + 'px', 
					});
					$('.no-gutter .wide-tall.'+$(this).attr('class')).css( {
						width : postWidth * 2 + 'px',
						height : 'auto', 
					});
				});
				
				
			}	else if (winWidth > 479) {
				
				portfolioWrap.css( {width : container_mock});
				portfolioWrapGutter.css( {width : container_mock});
				var portfolioWidth = portfolioWrap.width(),
				
				columnNumb = 1;
				postWidth = Math.floor(portfolioWidth / columnNumb)			
				$(this).find('.item').each(function () { 
					$(this).css( { 
						width : postWidth - 20 + 'px',
						height : 'auto',
						margin : 10 + 'px' 
					});
					$('.no-gutter .'+$(this).attr('class')).css( {
						width : postWidth  + 'px',
						height : 'auto',
						margin : 0 + 'px' 
					});
					$('.wide.'+$(this).attr('class')).css( { 
						width : postWidth - 20 + 'px'  
					});
					$('.no-gutter .wide.'+$(this).attr('class')).css( { 
						width : postWidth + 'px'  
					});
					$('.tall.'+$(this).attr('class')).css( {
						height : 'auto', 
					});
					$('.small.'+$(this).attr('class')).css( {
						height : 'auto',  
					});
					$('.no-gutter .tall.'+$(this).attr('class')).css( {
						height : 'auto', 
					});
					$('.wide-tall.'+$(this).attr('class')).css( {
						width : postWidth - 20 + 'px',
						height : postWidth   + 'px', 
					});
					$('.no-gutter .wide-tall.'+$(this).attr('class')).css( {
						width : postWidth  + 'px',
						height : postWidth   + 'px', 
					});
				});
				
				
			}
			
			else if (winWidth <= 479) {
				
				portfolioWrap.css( {width : container_mock});
				portfolioWrapGutter.css( {width : container_mock});
				var portfolioWidth = portfolioWrap.width(),
				
				columnNumb = 1;
				postWidth = Math.floor(portfolioWidth / columnNumb)			
				$(this).find('.item').each(function () { 
					$(this).css( { 
						width : postWidth - 20 + 'px',
						height : 'auto',
						margin : 10 + 'px' 
					});
					$('.no-gutter .'+$(this).attr('class')).css( {
						width : postWidth  + 'px',
						height : 'auto',
						margin : 0 + 'px' 
					});
					$('.wide.'+$(this).attr('class')).css( { 
						width : postWidth - 20 + 'px'  
					});
					$('.no-gutter .wide.'+$(this).attr('class')).css( { 
						width : postWidth + 'px'  
					});
					$('.tall.'+$(this).attr('class')).css( {
						height : 'auto',  
					});
					$('.small.'+$(this).attr('class')).css( {
						height : 'auto',  
					});
					$('.no-gutter .tall.'+$(this).attr('class')).css( {
						height : 'auto', 
					});
					$('.wide-tall.'+$(this).attr('class')).css( {
						width : postWidth - 20 + 'px',
						height : postWidth   + 'px',  
					});
					$('.no-gutter .wide-tall.'+$(this).attr('class')).css( {
						width : postWidth + 'px',
						height : postWidth   + 'px', 
					});
				});
				
				
			}		
		});
		$container.isotope({
			itemSelector: '.item',
			gutter:0,
			layoutMode: 'packery',
			transitionDuration: "0.8s"
		});		
	};
	/*On Resize Portfolio Function*/
}
/***** MasonryPortfolio function End *****/

/*****Ready function start*****/
$(document).on('ready', function () {
  Mateve();
});
/*****Ready function end*****/

/***** Resize function start *****/
$(window).on("resize", function () {
	setHeightWidth();
	if( portfolioWrap.length > 0 )
		onResizePort();
}).resize();
/***** Resize function end *****/

/***** LightGallery init start *****/	
$(document).on('click', '#goto_box_1', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,		
        dynamicEl: [{
            'src': 'img/gallery1.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});

$(document).on('click', '#goto_box_2', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,		
        dynamicEl: [{
            "src": 'img/gallery2.jpg',
			'subHtml': '<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>'
        }]
    })
 
});

$(document).on('click', '#goto_box_3', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery3.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16..</p>"
        }]
    })
 
});

$(document).on('click', '#goto_box_4', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{  
            'src': 'img/gallery4.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16..</p>"
        }]
    })
 
});

$(document).on('click', '#goto_box_5', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            "src": 'img/gallery5.jpg',
			'subHtml': '<h4>IIT Mandi</h4><p>Rann-Neeti16..</p>'
        }]
    })
 
});

$(document).on('click', '#goto_box_6', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery6.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});

$(document).on('click', '#goto_box_7', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery7.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});

$(document).on('click', '#goto_box_8', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery8.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});
$(document).on('click', '#goto_box_9', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery9.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});
$(document).on('click', '#goto_box_10', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery10.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});
$(document).on('click', '#goto_box_11', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery11.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});
$(document).on('click', '#goto_box_12', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery12.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});
$(document).on('click', '#goto_box_13', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery13.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});
$(document).on('click', '#goto_box_14', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery14.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});
$(document).on('click', '#goto_box_15', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery15.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});
$(document).on('click', '#goto_box_16', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery16.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});
$(document).on('click', '#goto_box_17', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery17.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});
$(document).on('click', '#goto_box_18', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery18.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});
$(document).on('click', '#goto_box_19', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery19.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});
$(document).on('click', '#goto_box_20', function (e) {
	e.preventDefault();
    $(this).lightGallery({
        dynamic: true,
		thumbnail: false,
		hash:false,
		autoplay:true,
        dynamicEl: [{
            'src': 'img/gallery20.jpg',
            'subHtml': "<h4>IIT Mandi</h4><p>Rann-Neeti16.</p>"
        }]
    })
 
});

/***** LightGallery init end*****/

/***** Availablity Calendar Start*****/
var d = new Date();
var n = d.getFullYear();
var notAvailableDates = ['05-11-2017','05-12-2017','05-13-2017','06-14-2017','06-13-2017','06-12-2017','07-14-2017','07-13-2017','07-12-2017'];
$('#datepicker1').datepicker({
	showAnim: 'show',
	dayNamesMin: [ "S", "M", "T", "W", "T", "F", "S" ],
	beforeShowDay: function(d) {
		var dmy = (d.getMonth()+1); 
		if(d.getMonth()<9) 
			dmy="0"+dmy;
		dmy+= "-"; 
		if(d.getDate()<10) dmy+="0"; 
			dmy+=d.getDate() + "-" + d.getFullYear(); 
			
		if ($.inArray(dmy, notAvailableDates) != -1) {
			return [false, "","notAvailableDates"]; 
		} else{
			 return [true,"","Available"]; 
		}
	}
});
$(document).on('click', '#datepickopn', function (e) {
	e.stopPropagation();
	$('.datepicker').toggleClass('datepicker-open');
	return;
});
$(document).on('click', 'body', function (e) {
    $('.datepicker').removeClass('datepicker-open');
	return;
});
/***** Availablity Calendar End*****/

