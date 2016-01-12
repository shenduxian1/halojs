/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-11-11
    @ 老虎机数字滚动
    @ 一个简单的调用如下:$.numberScroll(); -- 会自动去寻找带 `halo-number-scroll`的节点
    @ 需要优化成适合zepto.js调用的形式
*/
define("numberScroll",function(require,exports,module){
	'use zeptojs';
	var _scoller=function(_config){
		var webkit=require("prefix"),
	    config={
	        round:3,//默认三圈
	        duration: 1,//默认1s
	        direction: 'alternate',//方向，有三个值，up,down,alternate。默认是alternate
	        l2r:1,//滚动顺序，如果为1表示 从左到右 如果为0表示 从右到左
	        delay: .3,//组之间的时间延迟，默认.3s
	        groupNum:2,//默认2个一组
	        diffrentiation:1,//差异化滚动，默认是差异化滚动
	        minLen:0,//强制数字最小长度，0表示没有限制
	        undreg:''//强制无差异化匹配 ^ooxx 表示开头第3，4为无差异化滚动 xxx$ 表示倒数的后三们为无差异滚动
	    },
	    scroll=function(){
	        var numberContainer=document.querySelectorAll('[halo-number-scroll]');
	        for(var i=0,len=numberContainer.length;i<len;++i){
	            numberContainer[i].style.overflow="hidden!important";
	            initNumberScroll(numberContainer[i]);
	        }
	    },
	    w,h,
	    initNumberScroll=function(container,unscroll){//unscroll参数表示只是显示数字，不滚动
	        w=container.offsetWidth,h=container.offsetHeight;
	        var hinput=container.querySelector("input[type=hidden]"),diffrentiation=container.getAttribute("diffrentiation")||config.diffrentiation,undreg=container.getAttribute("undreg")||config.undreg,l2r=container.getAttribute("l2r")||config.l2r,groupNum=container.getAttribute("groupNum")||config.groupNum,minLen=container.getAttribute("minLen")||config.minLen;
	        diffrentiation=parseInt(diffrentiation),l2r=parseInt(l2r),groupNum=parseInt(groupNum)||1,minLen=parseInt(minLen)||0;
	        if(!hinput)return ;
	        var num=parseInt(hinput.value)||0,_container=container.querySelector("[HALO-NUMBERS-CONTAINER]"),haloNumbers=hinput.getAttribute("HALO-NUMBERS")||"";
	        if(num<0){
	            throw("wrong number!");
	            return ;
	        }
	        if(!_container){
	            _container=document.createElement("div");
	            _container.setAttribute("HALO-NUMBERS-CONTAINER","");
	            container.appendChild(_container);
	        }
	        if(!num||num==haloNumbers)return ;//不执行
	        var ni=(num+'').split(''),len=ni.length;
	        if(minLen){
	            //有最小长度限制
	            if(minLen>len){
	                for(var i=0;i<minLen-len;++i){
	                    ni.unshift(0);
	                }
	                len=minLen;//强制保持一致
	            }
	        }
	        if(haloNumbers==""){
	            //表示未初始化
	            for(var i=0;i<len;++i){
	                haloNumbers+="-";
	            }
	        }
	        var _ni=(haloNumbers+'').split(''),_len=_ni.length;
	        if(len>_len){//比旧数长
	            var diff=len-_len;
	            for(var i=0;i<diff;++i){
	                _ni.unshift('0');
	            }
	            _len=len;
	        }else if(len<_len){
	            //比旧数短
	            var diff=_len-len;
	            for(var i=0;i<diff;++i){
	                ni.unshift('0');
	            }
	            len=_len;
	        }
	        var undiffrentiationArr=[];//强制无差异数组
	        if(!diffrentiation){
	            undreg='';//无差异化滚动就不需要unreg匹配了
	        }else if(undreg!=''){
	            var undregLen=undreg.length;
	            undreg=undreg.toLowerCase();//强制转成小写
	            if(undreg.indexOf("^")==0){
	                //是匹配前几位
	                for(var i=0;i<undregLen;++i){
	                    if(undreg[i]=='x'){
	                        undiffrentiationArr[i-1]=1;
	                    }
	                }
	            }else if(undreg.indexOf("$")==undregLen-1){
	                //匹配后几位
	                var undregArr=(undreg.replace(/\$$/g,"")).split("");
	                for(var i=len-1;i>=0&&undregArr.length;--i){
	                    if(undregArr.pop()=='x'){
	                        undiffrentiationArr[i]=1;
	                    }
	                }
	            }else{
	                undreg='';//如果不是匹配前后数字，则认为为错误匹配直接忽略
	            }
	        }
	        var perW=w/len,str='',direction=container.getAttribute("direction")||config.direction;
	        if(direction!="up"&&direction!="down")direction="alternate";
	        var isAlterNate=(direction=="alternate"),needScrollI=(l2r?0:len);
	        for(var i=0;i<len;++i){
	            if(unscroll||ni[i]==_ni[i]&&diffrentiation&&!undiffrentiationArr[i]){//如果是有差异化滚动就需要走这一分支
	                str+='<i style="display:inline-block; vertical-align:top; position:relative; width: '+perW+'px; height: '+h+'px; line-height: '+h+'px; text-align: center; overflow: hidden;">'+ni[i]+'</i>';
	            }else{
	                isAlterNate&&(direction=(i%2==0?"up":"down"));
	                if(l2r){//从左到右滚动
	                    str+='<i style="display:inline-block; vertical-align:top; position:relative; width: '+perW+'px; height: '+h+'px; line-height: '+h+'px; text-align: center; overflow: hidden;">'+createNum(ni[i],_ni[i],Math.ceil(needScrollI++/groupNum),direction,h)+'</i>';
	                }else{//从右到左滚动
	                    str+='<i style="display:inline-block; vertical-align:top; position:relative; width: '+perW+'px; height: '+h+'px; line-height: '+h+'px; text-align: center; overflow: hidden;">'+createNum(ni[i],_ni[i],Math.ceil(needScrollI--/groupNum),direction,h)+'</i>';
	                }
	            }
	        }
	        hinput.setAttribute("HALO-NUMBERS",num);
	        _container.innerHTML=str;
	        var halonumber=document.querySelectorAll("[HALO-NUMBER]");
	        setTimeout(function(){
	            for(var i=0,len=halonumber.length;i<len;++i){
	                halonumber[i].getAttribute("direction")=="up"?(halonumber[i].style[webkit+"transform"]="translate3d(0,-100%,0)"):(halonumber[i].style[webkit+"transform"]="translate3d(0,0,0)");
	                //halonumber[i].removeAttribute("direction"),halonumber[i].removeAttribute("HALO-NUMBER");
	            }
	        },0);
	    },
	    createScrollNum=function(){
	        //生成滚动的数字
	        var str='';
	        for(var i=0;i<=9;++i){
	            str+='<div style="position:relative; width:100%; height: '+h+'px; line-height: '+h+'px; overflow:hidden; padding: 0; margin: 0; left: 0; top: 0;">'+i+'</div>';
	        }
	        return str;
	    },
	    createScrollNum2=function(h){
	        //生成滚动的数字
	        var str='';
	        for(var i=9;i>=0;--i){
	            str+='<div style="position:relative; width:100%; height: '+h+'px; line-height: '+h+'px; overflow:hidden; padding: 0; margin: 0; left: 0; top: 0;">'+i+'</div>';
	        }
	        return str;
	    },
	    createNum=function(number,oldNumber,groupIndex,direction){
	        var str='';
	        if('up'==direction){
	            str+='<div style="'+webkit+'transform: translate3d(0,0,0); '+webkit+'transition: '+webkit+'transform '+config.duration+'s ease-in-out '+config.delay*groupIndex+'s; position: absolute; width: 100%; height: auto; top: 0;" HALO-NUMBER direction="'+direction+'">';
	            str+='<div style="position:relative; width:100%; height: '+h+'px; line-height: '+h+'px; overflow:hidden; padding: 0; margin: 0; left: 0; top: 0;">'+oldNumber+'</div>';
	            for(var i=0;i<config.round;++i){
	                str+=createScrollNum(h);
	            }
	            for(var i=0;i<=number;++i){
	                str+='<div style="position:relative; width:100%; height: '+h+'px; line-height: '+h+'px; overflow:hidden; padding: 0; margin: 0 0 '+(i==number?'-'+h+'px':'0')+' 0; left: 0; top: 0;">'+i+'</div>';
	            }
	        }else{
	            str+='<div style="'+webkit+'transform: translate3d(0,-100%,0); '+webkit+'transition: '+webkit+'transform '+config.duration+'s ease-in-out '+config.delay*groupIndex+'s; position: absolute; width: 100%; height: auto; top: 0;" HALO-NUMBER direction="'+direction+'">';
	            for(var i=number;i>=0;--i){
	                str+='<div style="position:relative; width:100%; height: '+h+'px; line-height: '+h+'px; overflow:hidden; padding: 0; margin: 0 0 0 0; left: 0; top: 0;">'+i+'</div>';
	            }
	            for(var i=0;i<config.round;++i){
	                str+=createScrollNum2(h);
	            }
	            str+='<div style="position:relative; width:100%; height: '+h+'px; line-height: '+h+'px; overflow:hidden; padding: 0; margin: 0 0 -'+h+'px 0; left: 0; top: 0;">'+oldNumber+'</div>';
	        }
	        str+='</div>';
	        return str;
	    },
	    set=function(_config){
	        if(!_config)return ;
	        for(var i in config){
	            if(_config.hasOwnProperty(i)){
	                config[i]=_config[i];
	            }
	        }
	    },
	    show=function(){
	        //不滚动，只是显示数字
	        var numberContainer=document.querySelectorAll('[halo-number-scroll]');
	        for(var i=0,len=numberContainer.length;i<len;++i){
	            numberContainer[i].style.overflow="hidden!important";
	            initNumberScroll(numberContainer[i],true);
	        }
	    };
	    _config=_config||config;
	    set(_config);//默认设置一下配置
	    return {scroll:scroll,set:set,show:show}
	};
	module.exports=_scoller;
});