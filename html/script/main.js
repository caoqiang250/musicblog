
    $(document).ready(function() 
    {
		var options=
		{
			tab						: 'left',
			className				: 'checkmark',			
			slideImageIndexPage		: 1,
			slideImageIndexPageHome	: 1,
			showMenuSlider			: true,
			showMenuAtStart			: false,
			startPage				: 'menu'
		};
		
        var slide=
		[
			{image:'media/image/background/01.jpg',title:'<span class="supersized-caption-title">把我唱给你听<br/>By 傻强</span><br/><br/>'},
			{image:'media/image/background/02.jpg',title:'<span class="supersized-caption-title">如果有来生<br/>By 傻强</span><br/><br/>'},
			{image:'media/image/background/03.jpg',title:'<span class="supersized-caption-title">我要你<br/>By 傻强</span><br/><br/>'},
			{image:'media/image/background/04.jpg',title:'<span class="supersized-caption-title">天黑黑<br/>By 傻强</span><br/><br/>'},
			{image:'media/image/background/05.jpg',title:'<span class="supersized-caption-title">平凡之路<br/>By 傻强</span><br/><br/>'},
			{image:'media/image/background/06.jpg',title:'<span class="supersized-caption-title">因为爱情<br/>By 傻强</span><br/><br/>'}
		];
		
		var audio=
		[
			{title: '把我唱给你听',mp3:'media/audio/1.把我唱给你听.m4a'},
			{title: '如果有来生',mp3:'media/audio/2.如果有来生.mp3'},
			{title: '我要你',mp3:'media/audio/3.我要你.m4a'},
			{title: '天黑黑',mp3:'media/audio/4.天黑黑.m4a'},
			{title: '平凡之路',mp3:'media/audio/5.平凡之路.m4a'},
			{title: '因为爱情',mp3:'media/audio/6.因为爱情.m4a'}
		];
		
		var page=
		{
			'about.html'		: {tab:'left',className:'checkmark',slideImageIndexPage:1},
			'services.html'		: {tab:'right',className:'features',slideImageIndexPage:2},
			'portfolio.html'	: {tab:'left',className:'image',slideImageIndexPage:3},
			'blog.php'			: {tab:'right',className:'info',slideImageIndexPage:4},
			'contact.php'		: {tab:'left',className:'mail',slideImageIndexPage:5},
			'post.html'			: {tab:'right',className:'info',slideImageIndexPage:6}
		};
		
        $('#nostalgia').nostalgia(options,page,slide,audio,config,configDefault);
    });