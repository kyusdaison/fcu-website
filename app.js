(function(){
  var root=document.documentElement;
  root.classList.add('js');
  var KEY='fcu-lang';
  function setLang(l){
    root.classList.remove('lang-en','lang-zh');
    root.classList.add('lang-'+l);
    root.setAttribute('lang', l==='zh'?'zh-Hans':'en');
    document.querySelectorAll('.toggle button').forEach(function(b){
      b.classList.toggle('on', b.getAttribute('data-lang')===l);
    });
    document.querySelectorAll('[data-en][data-zh]').forEach(function(el){
      el.textContent = (l==='zh') ? el.getAttribute('data-zh') : el.getAttribute('data-en');
    });
    document.dispatchEvent(new CustomEvent('fcu:lang',{detail:l}));
    try{localStorage.setItem(KEY,l);}catch(e){}
  }
  var saved;
  try{saved=localStorage.getItem(KEY);}catch(e){}
  if(location.hash==='#zh') saved='zh';
  if(location.hash==='#en') saved='en';
  setLang(saved==='zh'?'zh':'en');
  document.querySelectorAll('.toggle button').forEach(function(b){
    b.addEventListener('click',function(){setLang(b.getAttribute('data-lang'));});
  });
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
    },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  }else{
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');});
  }
})();

/* interfaculty diagram interaction + live info panel */
(function(){
  var svg=document.querySelector('.diagram'); if(!svg) return;
  var panel=document.querySelector('.dx-panel');
  var panelFac=null;
  function nodes(){return svg.querySelectorAll('.fnode');}
  function curLang(){return document.documentElement.classList.contains('lang-zh')?'zh':'en';}
  function highlight(i){
    svg.classList.add('dim');
    nodes().forEach(function(n){ n.classList.toggle('active', n.getAttribute('data-i')===i); });
    svg.querySelectorAll('.edge').forEach(function(e){
      var lit = e.classList.contains('spoke') ? e.getAttribute('data-n')===i
              : (e.getAttribute('data-a')===i || e.getAttribute('data-b')===i);
      e.classList.toggle('lit', lit);
    });
  }
  function clearHL(){
    svg.classList.remove('dim');
    svg.querySelectorAll('.active').forEach(function(el){el.classList.remove('active');});
    svg.querySelectorAll('.lit').forEach(function(el){el.classList.remove('lit');});
  }
  function setPanel(i){
    if(!panel) return;
    var l=curLang();
    var eb=panel.querySelector('.dx-eyebrow'), nm=panel.querySelector('.dx-name'),
        de=panel.querySelector('.dx-desc'), en=panel.querySelector('.dx-enter'),
        enl=panel.querySelector('.dx-enter-label');
    if(i==='hub'){
      eb.textContent=l==='zh'?'共享内核':'Shared core';
      nm.textContent=l==='zh'?'跨学院 · 荣誉内核':'Interfaculty · Honours Core';
      de.textContent=l==='zh'?'本科荣誉学位汲取五大学院之长——以跨学科为设计原则。':'Undergraduate honours degrees draw on all five faculties — interdisciplinary by design.';
      if(en) en.style.display='none';
      panel.style.borderLeftColor='#111D24';
      return;
    }
    if(!i){
      eb.textContent=l==='zh'?'五大学院':'The five faculties';
      nm.textContent=l==='zh'?'跨学院设计':'Interfaculty by design';
      de.textContent=l==='zh'?'悬停或点击任一学院即可预览,再进入查看完整页面。':'Hover or tap a faculty to preview it — then enter the full page.';
      if(en) en.style.display='none';
      panel.style.borderLeftColor='#A51B18';
      return;
    }
    var node=svg.querySelector('.fnode[data-i="'+i+'"]'); if(!node) return;
    eb.textContent=(l==='zh'?'第 0'+i+' 学院':'Faculty 0'+i);
    nm.textContent=node.getAttribute('data-name-'+l);
    de.textContent=node.getAttribute('data-desc-'+l);
    if(en){ en.style.display=''; en.setAttribute('href', node.getAttribute('href')); }
    if(enl){ enl.textContent=l==='zh'?'进入':'Enter'; }
    var c=node.querySelector('.ncirc');
    panel.style.borderLeftColor=c?c.getAttribute('fill'):'#A51B18';
  }
  function select(i){ panelFac=i; highlight(i); setPanel(i); }
  var noHover = !!(window.matchMedia && matchMedia('(hover: none)').matches);
  nodes().forEach(function(n){
    var i=n.getAttribute('data-i');
    n.addEventListener('mouseenter',function(){select(i);});
    n.addEventListener('focus',function(){select(i);});
    n.addEventListener('mouseleave',clearHL);
    n.addEventListener('blur',clearHL);
    /* touch: first tap previews, second tap on same node opens its page */
    n.addEventListener('click',function(e){ if(noHover && panelFac!==i){ e.preventDefault(); select(i); } });
  });
  var hub=svg.querySelector('.hub');
  if(hub){
    hub.addEventListener('mouseenter',function(){
      svg.classList.add('dim');
      nodes().forEach(function(n){n.classList.add('active');});
      svg.querySelectorAll('.edge.spoke').forEach(function(e){e.classList.add('lit');});
      panelFac='hub'; setPanel('hub');
    });
    hub.addEventListener('mouseleave',clearHL);
  }
  document.addEventListener('fcu:lang',function(){ setPanel(panelFac); });
  setPanel(null);
})();

/* mobile hamburger menu */
(function(){
  var header=document.querySelector('header'); if(!header) return;
  var btn=header.querySelector('.menubtn'); if(!btn) return;
  btn.addEventListener('click',function(){
    var open=header.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded', open?'true':'false');
  });
  header.querySelectorAll('.navlinks a').forEach(function(a){
    a.addEventListener('click',function(){ header.classList.remove('menu-open'); btn.setAttribute('aria-expanded','false'); });
  });
})();
