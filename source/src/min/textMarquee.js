define("textMarquee",function(a){"use zeptojs";var d=a("prefix"),e=a("stylesheet"),f=a("isDom"),g={},h=function(a){if(!a)return"";var b=("halo_marquee"+a).replace(/\./g,"_");return g[b]||(g[b]=1,setTimeout(function(){e.add("@"+d+"keyframes "+b+"{0%{"+d+"transform:translate3d(0,0,0);}100%{"+d+"transform:translate3d(-100%,0,0);}}"),e.add("."+b+"_move{"+d+"animation: "+b+" "+a+"s linear infinite;}")},500)),b+"_move"},i=function(a){var b,c,d;if(a=a||{},speed=a.speed||50,a.define=a.define||"halo_text_marquee",a.container)if("string"==typeof a.container)for(d=document.querySelectorAll(a.container),b=0,c=d.length;c>b;++b)j(d[b],speed);else f(a.container)&&j(a.container,speed);else if(f(this))j(this,speed);else if(this.length>0)for(b=0,c=this.length;c>b;++b)j(this[b],speed);else for(d=document.querySelectorAll("["+a.define+"]"),b=0,c=d.length;c>b;++b)j(d[b],speed)},j=function(a,b){var e,f,g,i,c=0,d=document.createElement("span");a.style.overflow="hidden",d.style.cssText="display:inline-block; white-space:nowrap; position:relative; left:100%;",d.innerHTML=a.innerHTML,a.innerHTML="",a.appendChild(d),e=d.offsetWidth,f=a.offsetWidth,g=e-f,0>=f||(c=(g+f)/b,i='<span style="display:inline-block; width:'+f+'px;"></span>',d.innerHTML=d.innerHTML+i,d.className=h(c))};return i});