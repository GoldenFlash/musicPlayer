;(function(){
	var myAudio = $("audio")[0];//获取audio对象
	var lyricArr = [];//歌词数组
	var num = 0;
	var musicName = $(".content .music-massage .musicName");
	var  singer = $(".content .music-massage .singer");
	var  record = $(".content .music-massage .record");
	// var  singer = $(".content .music-massage .singer");
	getChannelNext();
	getMusic();
	setInterval(present,100);
	setPercentage();

	myAudio.addEventListener('ended', function(){
	  getMusic();
	});
	//播放暂停按钮

	$(".btn1").click(function(){
		if(myAudio.paused){
			play();//myAudio.play()
		}else{
			pause();//myAudio.pause()
		}
	});
		//播放下一首
	$(".btn2").click(function(){
		getMusic();
		
	});

	//频道切换
	

	$(".btn3").click(function(){
		getChannelPre();
	});	

	$(".btn4").click(function(){
		getChannelNext();
	});	




	//播放函数
	function play(){

		myAudio.play();
		$(".btn1").removeClass("glyphicon-play").addClass("glyphicon-pause");
	}

	function pause(){
		myAudio.pause();
		$(".btn1").removeClass("glyphicon-pause").addClass("glyphicon-play");
	}

	//获取频道信息
	function getChannelPre(){
		
		num=num-1;
		$.ajax({ 
			Method:'get',
			dataType:'json',
			url:'http://api.jirengu.com/fm/getChannels.php',
			success:function(data){
				var channel = data.channels;
				// var num = Math.floor(Math.random()*channel.length);
				
					
				var channelName = channel[num].name;
				var channelId = channel[num].channel_id;
				// alert(channelId);
				record.text(channelName);
				record.attr('title',channelName);
				record.attr('data-id',channelId);
			},
		});
	}

	function getChannelNext(){
		
		num=num+1;
		$.ajax({ 
			Method:'get',
			dataType:'json',
			url:'http://api.jirengu.com/fm/getChannels.php',
			success:function(data){
				var channel = data.channels;
				// var num = Math.floor(Math.random()*channel.length);
				
					
				var channelName = channel[num].name;
				var channelId = channel[num].channel_id;
				// alert(channelId);
				record.text(channelName);
				record.attr('title',channelName);
				record.attr('data-id',channelId);
				// var w = record.attr('data-id');
				// alert(w);
			},
		});
	}

	//通过ajax获取歌曲
	function getMusic(){
		// $(".music-lyric .lyric").empty();//清空歌词信息
		var channelId = record.attr('data-id');
		// alert(channelId);
		$.ajax({
			Method:'get',
			dataType:'json',
			url:'http://api.jirengu.com/fm/getSong.php',
			data:{'channel':channelId},
			success:function(data){
				var resource = data.song[0],
					src = resource.url,
					bgpic = resource.picture,
					sid = resource.sid,
					ssid = resource.ssid,
					title = resource.title,
					author = resource.artist;
					// alert(ssid)
				$("audio").attr('src',src);
				$("audio").attr('sid',sid);
				$("audio").attr('ssid',ssid);
				musicName.text(title);
				musicName.attr('title',title);
				singer.text(author);
				singer.attr('title',author);
				$(".background").css({
					'background':'url('+bgpic+')',
					'background-repeat':'no-repeat',
					'background-position':'center',
					'background-size':'cover',

				});
				getLyric();
			}
		});

	}

	//获取歌词
	function getLyric(){
		var sid = $("audio").attr('sid'),
			ssid = $("audio").attr('ssid');
		$.ajax({
			Method:'post',
			url:'http://api.jirengu.com/fm/getLyric.php',
			data:{
				sid:sid,
				ssid:ssid,
			},
			success:function (data){
		
				var lyric = JSON.parse(data);
				
				if(lyric.lyric){
					$(".music-lyric .lyric").empty();//清空歌词信息
					var line = lyric.lyric.split('\n');//歌词为以排数为界的数组
					var timeReg = /\[\d{2}:\d{2}.\d{2}]/g; //时间的正则
					var result = [];
					if(line!=""){
						for(var i=0;i<line.length;i++){//遍历歌词数组
							var time = line[i].match(timeReg);//每组匹配时间 得到时间数组
							if(!time)continue;//如果没有 就跳过继续
							var value = line[i].replace(time,"");// 纯歌词
							 for(var j= 0;j<time.length;j++){
								 var t = time[j].slice(1,-1).split(':');//分析时间  时间的格式是[00:00.00] 分钟和毫秒是t[0],t[1]
								// var t = time.split(':');
								 //把结果做成数组 result[0]是当前时间，result[1]是纯歌词
								 var timerArr = parseInt(t[0],10)*60 + parseFloat(t[1]);
								 result.push([timerArr,value]);

							}
						}
					} 
					//时间排序
					result.sort(function(a,b){
						return a[0]-b[0];
					});
					lyricArr = result;
					renderLyric();
				}

			},
				erro:function(){},
		});
	}

	function renderLyric(){
		var lyrli = "";
		for(var i= 0;i<lyricArr.length;i++){
			lyrli +="<li data-time ='"+lyricArr[i][0]+"'>"+lyricArr[i][1] +"</li>";
		}
		$(".music-lyric .lyric-view .lyric").append(lyrli);
		 setInterval(showLyric,100);//怎么展示歌词
	}

	function showLyric(){
    var liH = $(".lyric li").eq(5).outerHeight()-3; //每行高度
    for(var i=0;i< lyricArr.length;i++){//遍历歌词下所有的li
        var curT = $(".lyric li").eq(i).attr("data-time");//获取当前li存入的当前一排歌词时间
        var nexT = $(".lyric li").eq(i+1).attr("data-time");
        var curTime = myAudio.currentTime;
        if ((curTime > curT) && (curT < nexT)){//当前时间在下一句时间和歌曲当前时间之间的时候 就渲染 并滚动
            $(".lyric li").removeClass("active");
            $(".lyric li").eq(i).addClass("active");
            $('.music-lyric .lyric').css('top', -liH*(i-2));
        }
    }
}

//进度条
function present(){
	var length = myAudio.currentTime/myAudio.duration*100;
	$(".progressbar").width(length+'%');
}

function setPercentage(){
	$(".basebar").mousedown(function(e){
		var posx = e.pageX;
		var targetleft = $(this).offset().left;
		var barlength=  (posx - targetleft)/400*100;
		$(".progressbar").width(barlength+'%');
		myAudio.currentTime = myAudio.duration*barlength/100;
		
	});
}

})();