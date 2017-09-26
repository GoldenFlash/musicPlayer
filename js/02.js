;(function(){
	var Music = function(){
		that = this;
		var myAudio = $("audio")[0];
		this.myAudio=myAudio//获取audio对象
		this.lyricArr = [];//歌词数组
		this.num = 0;
		this.musicName = $(".controls .music-message .musicName");
		this.singer = $(".controls .music-message .singer");
		this.record = $(".controls .channel .record");
		// var  singer = $(".content .music-massage .singer");
		this.getChannelNext();
		// this.getMusic();
		setInterval(this.present,100);
		this.setPercentage();
		this.setVolume();

		this.myAudio.addEventListener('ended', function(){
		  that.getMusic();
		});
		//播放暂停按钮

		$(".btn1").click(function(){
			if(that.myAudio.paused){
				that.play();
			}else{
				that.pause();
			}
		});
			//播放下一首
		$(".btn2").click(function(){
			that.getMusic();
			
		});

		//频道切换
		
		$(".btn3").click(function(){
			that.getChannelPre();
		});	

		$(".btn4").click(function(){
			that.getChannelNext();
		});	
		// 播放器图标切换
		var volume ="";
		$(".volume .volume-icon").click(function(){
			if(that.myAudio.volume !=0){
				volume = that.myAudio.volume;
				$(this).addClass('glyphicon-volume-off').removeClass('glyphicon-volume-up');
				that.myAudio.volume=0;
			}else{
				$(this).addClass('glyphicon-volume-up').removeClass('glyphicon-volume-off');
				that.myAudio.volume=volume;
			}
		});
		// 喜欢与收藏按钮切换
		$(".music-icon .star").click(function(){
			if($(this).hasClass('glyphicon-star-empty')){
				$(this).addClass('glyphicon-star').removeClass('glyphicon-star-empty').css('color','#F7E031');
			}else{
				$(this).addClass('glyphicon-star-empty').removeClass('glyphicon-star').css('color','#3A3A39');
			}
		});

		$(".music-icon .heart").click(function(){
			if($(this).hasClass('glyphicon-heart-empty')){
				$(this).addClass('glyphicon-heart').removeClass('glyphicon-heart-empty').css('color','#F2163E');
			}else{
				$(this).addClass('glyphicon-heart-empty').removeClass('glyphicon-heart').css('color','#3A3A39');
			}
		});

	};
	Music.prototype = {
			//播放函数
		play:function (){

			this.myAudio.play();
			$(".btn1").removeClass("glyphicon-play").addClass("glyphicon-pause");
		},

		pause:function (){
			this.myAudio.pause();
			$(".btn1").removeClass("glyphicon-pause").addClass("glyphicon-play");
		},

		//获取频道信息
		getChannelPre:function(){
			
			// this.num=this.num-1;
			$.ajax({ 
				Method:'get',
				dataType:'json',
<<<<<<< HEAD
				url: "https://jirenguapi.applinzi.com/fm/getChannels.php",
=======
				url:'https://api.jirengu.com/fm/getChannels.php',
>>>>>>> c2de6eee73ee17a45a3d66caea7f5a1f9c1e235d
				success:function(data){
					var channel = data.channels;
					that.num = Math.floor(Math.random()*channel.length);
					
						
					var channelName = channel[that.num].name;
					var channelId = channel[that.num].channel_id;
					// alert(channelId);
					that.record.text(channelName);
					that.record.attr('title',channelName);
					that.record.attr('data-id',channelId);
					that.getMusic();
				},
			});
		},

		getChannelNext:function (){
			
			// this.num=this.num+1;
			$.ajax({ 
				Method:'get',
				dataType:'json',
<<<<<<< HEAD
				url: "https://jirenguapi.applinzi.com/fm/getChannels.php",
=======
				url:'https://api.jirengu.com/fm/getChannels.php',
>>>>>>> c2de6eee73ee17a45a3d66caea7f5a1f9c1e235d
				success:function(data){
					var channel = data.channels;
					that.num = Math.floor(Math.random()*channel.length);
					
						
					var channelName = channel[that.num].name;
					var channelId = channel[that.num].channel_id;
					// alert(channelId);
					that.record.text(channelName);
					that.record.attr('title',channelName);
					that.record.attr('data-id',channelId);
					that.getMusic();
				},
			});
		},

		//通过ajax获取歌曲
		getMusic:function (){
			
			var channelId = this.record.attr('data-id');
			$.ajax({
				Method:'get',
				dataType:'json',
<<<<<<< HEAD
				url:"https://jirenguapi.applinzi.com/fm/getSong.php",
=======
				url:'https://api.jirengu.com/fm/getSong.php',
>>>>>>> c2de6eee73ee17a45a3d66caea7f5a1f9c1e235d
				data:{'channel':channelId},
				success:function(data){
					var resource = data.song[0],
						src = resource.url,
						bgpic = resource.picture,
						sid = resource.sid,
						ssid = resource.ssid,
						title = resource.title,
						author = resource.artist;
					
					$("audio").attr('src',src);
					$("audio").attr('sid',sid);
					$("audio").attr('ssid',ssid);
					that.musicName.text(title);
					that.musicName.attr('title',title);
					that.singer.text(author);
					that.singer.attr('title',author);
					// $(".lyricBox").css({
					// 	'background':'url('+bgpic+')',
					// 	'background-repeat':'no-repeat',
					// 	'background-position':'center',
					// 	'background-size':'cover',

					// });
					that.getLyric();
					if($('.btn1').hasClass('glyphicon-play')){
						that.myAudio.pause();
					}
				}
			});

		},

		//获取歌词
		getLyric:function (){
			var sid = $("audio").attr('sid'),
				ssid = $("audio").attr('ssid');
			$.ajax({
				Method:'post',
<<<<<<< HEAD
				url: "https://jirenguapi.applinzi.com/fm/getLyric.php",
=======
				url:'https://api.jirengu.com/fm/getLyric.php',
>>>>>>> c2de6eee73ee17a45a3d66caea7f5a1f9c1e235d
				data:{
					sid:sid,
					ssid:ssid,
				},
				success:function (data){
			
					var lyric = JSON.parse(data);
					
					if(lyric.lyric){
						$(".lyricBox .lyric").empty();//清空歌词信息
						var line = lyric.lyric.split('\n');//歌词为以排数为界的数组
						var timeReg = /\[\d{2}:\d{2}.\d{2}]/g; //时间的正则
						var result = [];
						if(line!=""){
							for(var i=1;i<line.length;i++){//遍历歌词数组
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
						that.lyricArr = result;
						that.renderLyric();
					}

				},
					erro:function(){
						var html =$("<div>没有歌词！</div>");
						$(".lyricBox .lyric").append(html);
					},
			});
		},

		// setTime:function(){
		// 	var this.lyricArr;
		// },
		//将歌词插入html
		renderLyric:function (){
			var lyrli = "";
			for(var i= 0;i<this.lyricArr.length;i++){
				lyrli +="<li data-time ='"+this.lyricArr[i][0]+"'>"+this.lyricArr[i][1] +"</li>";
			}
			$(".lyricBox .lyric").append(lyrli);
			 setInterval(that.showLyric,100);//怎么展示歌词
		},

		// 控制歌词显示
		showLyric:function (){
		    var liH = $(".lyric li").eq(5).outerHeight()-3; //每行高度
		    for(var i=0;i< that.lyricArr.length;i++){//遍历歌词下所有的li
		        var curT = $(".lyric li").eq(i).attr("data-time");//获取当前li存入的当前一排歌词时间
		        var nexT = $(".lyric li").eq(i+1).attr("data-time");
		        var curTime = that.myAudio.currentTime;
		        if ((curTime > curT) && (curT < nexT)){//当前时间在下一句时间和歌曲当前时间之间的时候 就渲染 并滚动
		            $(".lyric li").removeClass("active");
		            $(".lyric li").eq(i).addClass("active");
		            $('.lyricBox .lyric').css('top', -liH*(i-2));
		        }
		    }
		},

		//进度条
		present:function (){
			var length = that.myAudio.currentTime/that.myAudio.duration*100;
			$(".bar .progressbar").width(length+'%');
		},

		setPercentage:function (){
			$(".basebar").mousedown(function(e){
				var posx = e.pageX;
				var targetleft = $(this).offset().left;
				var barlength=  (posx - targetleft)/200*100;
				$(".bar .progressbar").width(barlength+'%');
				that.myAudio.currentTime = that.myAudio.duration*barlength/100;
				
			});
		},
		setVolume:function(){
			var vw = that.myAudio.volume*100;
			$(".controls .volume .volumebase .volumebar").css('width',vw+'%');
			$(".controls .volume .volume-ctrl").mousedown(function(e){
				var posx = e.pageX;
				var targetleft = $(this).offset().left;
				var barlength=  (posx - targetleft)/100*100;
				$(".controls .volume .volumebase .volumebar").width(barlength+'%');
				that.myAudio.volume = barlength/100;
				$(".controls .volume .volume-ctrl").on('mousemove',function(e){
					posx = e.pageX;
					targetleft =$(".controls .volume .volume-ctrl").offset().left;
					barlength=  (posx - targetleft)/100*100;
					$(".controls .volume .volumebase .volumebar").width(barlength+'%');
					that.myAudio.volume = barlength/100;
					if(that.myAudio.volume==0.5){
						$(".volume .volume-icon").addClass('glyphicon-volume-off').removeClass('glyphicon-volume-up');
					}else{
						$(".volume .volume-icon").addClass('glyphicon-volume-up').removeClass('glyphicon-volume-off');
					}
				});

			});
			$(".controls .volume .volume-ctrl").on('mouseup mouseleave',function(){
				$(this).unbind('mousemove');
			});
		}
	};
	var player= new Music();
})();})();
