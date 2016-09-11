import "../css/index.less"


$(".c_next,.c_prev").on("mouseenter",function(){
	$(this).css("opacity","1")	
});


$(".c_next,.c_prev").on("mouseout",function(){
	$(this).css("opacity","0.5")	
});




class Slide{
	// isAuto = true;

	constructor(ele,isAuto=false,interval=5000){
		this.ele = ele;
		this.interval = interval;
		this.isAuto = isAuto;
		this.activeIndex = 0;
		if(isAuto){
			this.timer = this.autoPlay();
		}


	}

	prev(){

		if(this.isAuto){
			clearInterval(this.timer);
			this.timer = null;
			setTimeout(()=>this.timer = this.autoPlay(),this.interval);
		}

		this.ele.css({
			"transform":"translate(0)",
			"transition":"0.5s linear all"
		})
		this.activeIndex = 0;
		
	}

	next(){
		if(this.isAuto){
			clearInterval(this.timer);
			this.timer = null;
			setTimeout(()=>this.timer = this.autoPlay(),this.interval);
		}
		this.ele.css({
			"transform":"translate(-50%)",
			"transition":"0.5s linear all"
		});
		this.activeIndex = 1;
	}

	autoPlay(){
		return setInterval(()=>{
			if(this.activeIndex===0){
				this.next();
			}else{
				this.prev();
			}
		},this.interval);
	}

}

var UL = $(".carousel ul");
var slider = new Slide(UL,true);

$(".c_next").on("click",function(){
	slider.next();
});
$(".c_prev").on("click",function(){
	slider.prev();
});



//listen scroll

var ScrollListener = {
	/**
	 * ele  :  fn
	 * @type {Array}
	 */
	eles:[],

	add:function(ele,fn){
		this.eles.push({ele,fn});
		return this;
	},
	listen:function(){
		var _windowHeight = $(window).height();
		var _half = Math.floor(_windowHeight/2)-300;
		$(window).on("scroll",function(){
			this.eles.forEach(function(v,k){
				if(($(v.ele).offset().top - $(window).scrollTop()+_half ) < _windowHeight){
					v.fn();
					this.remove(k);
		    	}
			}.bind(this));		    
		}.bind(this));
	},
	remove:function(i){
		this.eles.splice(i,1);
	}
}


ScrollListener.add($(".procedure_d"),function(){
	$(".procedure_d").addClass("active");
})
.add($(".award1"),function(){
	$(".award1").addClass("fadeInUp")
})
.add($(".award2"),function(){
	$(".award2").addClass("fadeInUp")
})
.add($(".require_box"),function(){
	$(".require_box").addClass("fadeInUp")
})

ScrollListener.listen();

setTimeout(function(){
	var v = new Vivus('newl', {duration: 3000,start:"manual",onReady:function(){
		$("#newl").show();
	}});
	var t=0;

	function render(){
		t+=0.005
		v.setFrameProgress(t);
		requestAnimationFrame(render);
	}
	render();
},1000);
