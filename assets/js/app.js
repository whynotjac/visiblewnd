(function(){
  function closeAllMenus(){
    document.querySelectorAll('.menu-toggle').forEach(function(b){ b.setAttribute('aria-expanded','false'); });
    document.querySelectorAll('.menu-panel').forEach(function(p){ p.classList.remove('open'); setTimeout(function(){ if(!p.classList.contains('open')) p.hidden=true; },350); });
    document.querySelectorAll('.menu-overlay').forEach(function(o){ o.classList.remove('open'); setTimeout(function(){ if(!o.classList.contains('open')) o.hidden=true; },300); });
  }
  // hamburger menu toggle
  document.querySelectorAll('.menu-toggle').forEach(function(btn){
    btn.addEventListener('click',function(){
      var head=btn.closest('.site-head');
      var panel=head.querySelector('.menu-panel');
      var overlay=head.querySelector('.menu-overlay');
      var open=btn.getAttribute('aria-expanded')==='true';
      if(open){
        btn.setAttribute('aria-expanded','false');
        if(panel){ panel.classList.remove('open'); setTimeout(function(){ panel.hidden=true; },350); }
        if(overlay){ overlay.classList.remove('open'); setTimeout(function(){ overlay.hidden=true; },300); }
      } else {
        btn.setAttribute('aria-expanded','true');
        if(panel){ panel.hidden=false; void panel.offsetWidth; panel.classList.add('open'); }
        if(overlay){ overlay.hidden=false; void overlay.offsetWidth; overlay.classList.add('open'); }
      }
    });
  });
  document.querySelectorAll('.menu-overlay').forEach(function(o){ o.addEventListener('click',closeAllMenus); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeAllMenus(); });

  /* ---- gallery lightbox ---- */
  (function(){
    var lb=document.getElementById('lightbox');
    if(!lb) return;
    var lbImg=document.getElementById('lbImg');
    var items=[], current=-1;
    function collect(){ items=Array.prototype.slice.call(document.querySelectorAll('.gal-open')); }
    function show(i){
      collect();
      if(i<0) i=items.length-1; if(i>=items.length) i=0;
      current=i;
      var el=items[i];
      lbImg.src=el.getAttribute('data-full');
      lbImg.alt=el.getAttribute('data-caption')||'';
    }
    function open(i){ show(i); lb.hidden=false; void lb.offsetWidth; lb.classList.add('open'); document.body.style.overflow='hidden'; }
    function close(){ lb.classList.remove('open'); document.body.style.overflow=''; setTimeout(function(){ if(!lb.classList.contains('open')) lbImg.src=''; },300); }
    document.addEventListener('click',function(e){
      var btn=e.target.closest && e.target.closest('.gal-open');
      if(btn){ e.preventDefault(); collect(); open(items.indexOf(btn)); }
    });
    document.getElementById('lbClose').addEventListener('click',close);
    document.getElementById('lbPrev').addEventListener('click',function(){ show(current-1); });
    document.getElementById('lbNext').addEventListener('click',function(){ show(current+1); });
    lb.addEventListener('click',function(e){ if(e.target===lb) close(); });
    document.addEventListener('keydown',function(e){
      if(!lb.classList.contains('open')) return;
      if(e.key==='Escape') close();
      else if(e.key==='ArrowLeft') show(current-1);
      else if(e.key==='ArrowRight') show(current+1);
    });
  })();
  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click',function(){
      var panel=document.getElementById(btn.getAttribute('aria-controls'));
      var open=btn.getAttribute('aria-expanded')==='true';
      btn.setAttribute('aria-expanded',open?'false':'true');
      if(panel)panel.classList.toggle('open',!open);
    });
  });
  // team spotlight showcase (matches original: zones [0-36],[30-64],[62-100]; auto-cycle 5500ms; pause 12s on select)
  (function(){
    var root=document.getElementById('familyShowcase');
    if(!root) return;
    var members=[
      {name:'Jonathan Cubbison',title:'Partner',zone:[0,36],
       desc:"Jonathan leads project coordination, installation execution, and client communication from kickoff through completion. He is known for clear planning, clean jobsite standards, and detail-focused delivery on both custom homes and high-end renovations."},
      {name:'Neil Cubbison',title:'Partner',zone:[30,64],
       desc:"Neil is the foundation of the team expertise. He has worked on complex window and door projects for over 30 years and in glass even longer, passing on decades of hands-on knowledge, precision practices, and professional standards to the next generation."},
      {name:'William Cubbison',title:'Partner',zone:[62,100],
       desc:"William supports product selection, technical layout review, and field problem-solving across complex window and door scopes. His approach balances performance, design intent, and practical installation methods that hold up over time."}
    ];
    var CYCLE=5500, RESUME=12000;
    var active=0, paused=false, resumeT=null, cycleT=null;
    var dimL=root.querySelector('.sc-dim-left'),
        dimR=root.querySelector('.sc-dim-right'),
        feather=root.querySelector('.sc-feather'),
        info=root.querySelector('#scInfo'),
        roleEl=root.querySelector('#scRole'),
        nameEl=root.querySelector('#scName'),
        descEl=root.querySelector('#scDesc'),
        zones=root.querySelectorAll('.sc-zone'),
        dots=root.querySelectorAll('.sc-dotbtn');

    function render(){
      var m=members[active], z=m.zone;
      // left dim covers 0..zone[0]; right dim covers zone[1]..100
      dimL.style.right=(100-z[0])+'%';
      dimL.style.opacity=(z[0]===0)?'0':'1';
      dimR.style.left=z[1]+'%';
      dimR.style.opacity=(z[1]===100)?'0':'1';
      feather.style.left=z[0]+'%';
      feather.style.right=(100-z[1])+'%';
      // update info with fade-up re-trigger
      roleEl.textContent=m.title;
      nameEl.textContent=m.name;
      descEl.textContent=m.desc;
      info.classList.remove('sc-anim');
      void info.offsetWidth; // reflow to restart animation
      info.classList.add('sc-anim');
      dots.forEach(function(d,i){d.classList.toggle('active',i===active);});
    }
    function advance(){ active=(active+1)%members.length; render(); }
    function startCycle(){ stopCycle(); if(!paused){ cycleT=setInterval(advance,CYCLE); } }
    function stopCycle(){ if(cycleT){ clearInterval(cycleT); cycleT=null; } }
    function select(i){
      active=i; render();
      paused=true; stopCycle();
      if(resumeT) clearTimeout(resumeT);
      resumeT=setTimeout(function(){ paused=false; startCycle(); }, RESUME);
    }
    // hover: switch the active person while pointing at their zone (and pause auto-cycle)
    function hoverSelect(i){
      if(i===active && paused) return;
      active=i; render();
      paused=true; stopCycle();
      if(resumeT){ clearTimeout(resumeT); resumeT=null; }
    }
    zones.forEach(function(z){
      var i=+z.getAttribute('data-i');
      z.addEventListener('click',function(){ select(i); });
      // only enable hover-select on devices that actually hover (skip touch)
      if(window.matchMedia && window.matchMedia('(hover:hover)').matches){
        z.addEventListener('mouseenter',function(){ hoverSelect(i); });
      }
    });
    dots.forEach(function(d){ d.addEventListener('click',function(){ select(+d.getAttribute('data-i')); }); });
    // when the cursor leaves the photo, resume auto-cycle after a short delay
    var photo=root.querySelector('.showcase-photo');
    if(photo){
      photo.addEventListener('mouseleave',function(){
        if(resumeT) clearTimeout(resumeT);
        resumeT=setTimeout(function(){ paused=false; startCycle(); }, 2500);
      });
    }
    render(); startCycle();
  })();
})();