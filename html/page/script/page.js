/******************************************************************************/
/*	Google Maps																  */
/******************************************************************************/

// try
// {
// 	var coordinate=new google.maps.LatLng(48.864037,2.353477);

// 	var mapOptions= 
// 	{
// 		zoom				:	15,
// 		center				:	coordinate,
// 		streetViewControl	:	false,
// 		mapTypeControl		:	false,
// 		zoomControlOptions	: 
// 		{
// 			position		:	google.maps.ControlPosition.TOP_RIGHT
// 		},
// 		mapTypeId			:	google.maps.MapTypeId.ROADMAP
// 	};

// 	var googleMap=new google.maps.Map(document.getElementById('map'),mapOptions);
	
// 	var markerOptions=
// 	{
// 		map:googleMap,
// 		position:coordinate,
// 		icon:mainURL+'image/map_pointer.png'
// 	}

// 	new google.maps.Marker(markerOptions);
	
// 	$(window).resize(function() 
// 	{
// 		try { googleMap.setCenter(coordinate); }
// 		catch(e) {}
// 	});	
// }
// catch(e) {}
	
/******************************************************************************/
/*	Accordion in portfolio													  */
/******************************************************************************/
	
$('.nostalgia-accordion').accordion(
{
	icons					:	'',
	active					:	0,
	animate					:	'easeOutExpo',
	collapsible				:	true,
	heightStyle				:	'content',
	activate				:	function(event,ui)
	{
		var scrollbar=$('#nostalgia-tab-content-scroll').data('jsp');
		scrollbar.reinitialise();
		
		try
		{
			var top=parseInt($(ui.newHeader).position().top);
			scrollbar.scrollTo(0,top);			
		}
		catch(e) {}
	}
});

/******************************************************************************/
/*	Fancybox for images														  */
/******************************************************************************/

var helpers={title:{type:'inside'}};
helpers.buttons={skipSingle:true};	

$('.fancybox-image').fancybox(
{	
	type					:	'image',
	beforeShow				:	function()
	{
		this.title=$(this.element).nextAll('.fancybox-subtitle').text();
	},
	helpers					:	helpers
});

/******************************************************************************/
/*	Fancybox for youku videos												  */
/******************************************************************************/

var playerPaused=false;

helpers={title:{type:'inside'}};
helpers.media={};

$('.fancybox-video-youku').fancybox(
{
	helpers					:	helpers,
	beforeShow				:	function()
	{
		this.title=$(this.element).nextAll('.fancybox-subtitle').text();
		
		if($('.audio-player').hasClass('music-on'))
		{
			playerPaused=true;
			$('#jPlayer').jPlayer('pause');
		}
		
	},
	afterClose				:	function()
	{
		if((playerPaused) && (!$('.audio-player').hasClass('music-pause-user'))) $('#jPlayer').jPlayer('play');
	}
});
/******************************************************************************/
/*	Fancybox for youtube videos												  */
/******************************************************************************/

helpers={title:{type:'inside'}};
helpers.media={};

$('.fancybox-video-youtube').fancybox(
{
	helpers					:	helpers,
	beforeShow				:	function()
	{
		this.title=$(this.element).nextAll('.fancybox-subtitle').text();
		
		if($('.audio-player').hasClass('music-on'))
		{
			playerPaused=true;
			$('#jPlayer').jPlayer('pause');
		}
		
	},
	afterClose				:	function()
	{
		if((playerPaused) && (!$('.audio-player').hasClass('music-pause-user'))) $('#jPlayer').jPlayer('play');
	}
});

/******************************************************************************/
/*	Fancybox for vimeo videos											      */
/******************************************************************************/

helpers={title:{type:'inside'}};
helpers.media={};

$('.fancybox-video-vimeo').fancybox(
{
	helpers					:	helpers,
	beforeShow				:	function()
	{
		this.title=$(this.element).nextAll('.fancybox-subtitle').text();
		
		if($('.audio-player').hasClass('music-on'))
		{
			playerPaused=true;
			$('#jPlayer').jPlayer('pause');
		}
	},
	afterClose				:	function()
	{
		if((playerPaused) && (!$('.audio-player').hasClass('music-pause-user'))) $('#jPlayer').jPlayer('play');
	}
});

/******************************************************************************/
/*	Image preloader															  */
/******************************************************************************/

$('a.fancybox-image img,a.fancybox-video img').each(function() 
{
	$(this).attr('src',$(this).attr('src') + '?i='+getRandom(1,100000));
	$(this).bind('load',function() {$(this).parent('a').css('background-image','none');$(this).fadeIn(1000);});
});

/******************************************************************************/
/******************************************************************************/