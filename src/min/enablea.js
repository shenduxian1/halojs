define("enablea",function(require,exports,module){function _touchstart(a){var b=a.targetTouches||a.changedTouches||[],c=b[0];c&&(X=c.pageX,Y=c.pageY)}function chkPrevent(a){var d,e,f,g,b=a.changedTouches||[],c=b[0];0>X||0>Y||!c||(d=c.pageX,e=c.pageY,f=Math.abs(X-d),g=Math.abs(Y-e),X=-1,Y=-1,f>5||g>5||(""!=touchType?chkEl(a):setTimeout(function(){""!=touchType&&chkEl(a)},50)))}function deptchClick(a){var b=document.createEvent("HTMLEvents");b.initEvent("click",!0,!0),a.dispatchEvent(b)}function chkEl(a){var b=a.target;deptchClick(b)}function chkA(href){if(href&&0!=href.indexOf("javascript:"))location.href=href;else if(0==href.indexOf("javascript:")){var evalString=href.replace("javascript:","");eval(decodeURIComponent(evalString))}}function chkParent(a){for(var b=a.parentNode;"BODY"!=b.tagName&&"HTML"!=b.tagName;){if("A"==b.tagName){chkA(b.href);break}b=b.parentNode}}var _prevent=window.TouchEvent.prototype.preventDefault,touchType="",X=-1,Y=-1;window.TouchEvent.prototype.preventDefault=function(){("touchstart"==this.type||"touchmove"==this.type||"touchend"==this.type||"touchcancel"==this.type)&&(touchType=this.type),_prevent.apply(this,arguments)},document.body.addEventListener("touchstart",_touchstart,!0),document.body.addEventListener("touchend",chkPrevent,!0),document.body.addEventListener("touchcancel",chkPrevent,!0),module.exports={}});