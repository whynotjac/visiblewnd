(function(){
  var lastMenuToggle=null;
  var reduceMotion=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function syncHeaderState(){
    document.querySelectorAll('.site-head').forEach(function(head){
      head.classList.toggle('is-scrolled',window.scrollY>8);
    });
  }

  function closeAllMenus(restoreFocus){
    document.querySelectorAll('.menu-toggle').forEach(function(b){
      b.setAttribute('aria-expanded','false');
      b.setAttribute('aria-label','Open menu');
    });
    document.querySelectorAll('.menu-panel').forEach(function(p){
      p.classList.remove('open');
      window.setTimeout(function(){ if(!p.classList.contains('open')) p.hidden=true; },reduceMotion?0:240);
    });
    if(restoreFocus && lastMenuToggle){
      lastMenuToggle.focus();
    }
  }

  // hamburger menu toggle
  document.querySelectorAll('.menu-toggle').forEach(function(btn){
    btn.addEventListener('click',function(){
      var head=btn.closest('.site-head');
      var panel=head.querySelector('.menu-panel');
      var open=btn.getAttribute('aria-expanded')==='true';
      if(open){
        closeAllMenus(false);
      } else {
        closeAllMenus(false);
        lastMenuToggle=btn;
        btn.setAttribute('aria-expanded','true');
        btn.setAttribute('aria-label','Close menu');
        if(panel){ panel.hidden=false; void panel.offsetWidth; panel.classList.add('open'); }
      }
    });
  });
  document.querySelectorAll('.menu-panel .menu-link,.menu-panel .menu-cta').forEach(function(link){
    link.addEventListener('click',function(){ closeAllMenus(false); });
  });
  document.addEventListener('pointerdown',function(e){
    if(!document.querySelector('.menu-panel.open')) return;
    if(!e.target.closest('.site-head')) closeAllMenus(false);
  });
  document.addEventListener('keydown',function(e){
    if(!document.querySelector('.menu-panel.open')) return;
    if(e.key==='Escape'){
      closeAllMenus(true);
    }
  });
  window.addEventListener('resize',function(){
    if(window.innerWidth>=1024) closeAllMenus(false);
  });
  window.addEventListener('scroll',function(){
    syncHeaderState();
    if(document.querySelector('.menu-panel.open')) closeAllMenus(false);
  },{passive:true});
  syncHeaderState();

  /* ---- gallery lightbox ---- */
  (function(){
    var lb=document.getElementById('lightbox');
    if(!lb) return;
    var lbImg=document.getElementById('lbImg');
    var items=[], current=-1, lastFocus=null;
    lb.hidden=true;
    function collect(){ items=Array.prototype.slice.call(document.querySelectorAll('.gal-open')); }
    function show(i){
      collect();
      if(i<0) i=items.length-1; if(i>=items.length) i=0;
      current=i;
      var el=items[i];
      lbImg.src=el.getAttribute('data-full');
      lbImg.alt=el.getAttribute('data-caption')||'';
    }
    function open(i){
      lastFocus=document.activeElement;
      show(i);
      lb.hidden=false;
      void lb.offsetWidth;
      lb.classList.add('open');
      document.body.style.overflow='hidden';
      document.getElementById('lbClose').focus();
    }
    function close(){
      lb.classList.remove('open');
      document.body.style.overflow='';
      setTimeout(function(){
        if(!lb.classList.contains('open')){
          lbImg.src='';
          lb.hidden=true;
          if(lastFocus && typeof lastFocus.focus==='function') lastFocus.focus();
        }
      },reduceMotion?0:300);
    }
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
      else if(e.key==='Tab'){
        var controls=[
          document.getElementById('lbClose'),
          document.getElementById('lbPrev'),
          document.getElementById('lbNext')
        ];
        var at=controls.indexOf(document.activeElement);
        if(e.shiftKey && at<=0){ e.preventDefault(); controls[controls.length-1].focus(); }
        else if(!e.shiftKey && at===controls.length-1){ e.preventDefault(); controls[0].focus(); }
      }
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
    function startCycle(){ stopCycle(); if(!paused && !reduceMotion){ cycleT=setInterval(advance,CYCLE); } }
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
// Progressive form submission keeps field values in place on errors and
// presents a responsive inline status. Native POST remains the no-JS fallback.
(function(){
  var MAX_FILE_BYTES=3*1024*1024;

  function getStatus(form){
    var status=form.querySelector('.form-status');
    if(status) return status;
    status=document.createElement('div');
    status.className='form-status';
    status.setAttribute('role','status');
    status.setAttribute('aria-live','polite');
    var button=form.querySelector('button[type="submit"]');
    if(button) button.insertAdjacentElement('afterend',status);
    else form.appendChild(status);
    return status;
  }

  function showStatus(form,message,type){
    var status=getStatus(form);
    status.textContent=message;
    status.className='form-status is-visible '+(type==='success'?'is-success':'is-error');
  }

  function clearStatus(form){
    var status=getStatus(form);
    status.textContent='';
    status.className='form-status';
  }

  function resetButton(form){
    var btn=form.querySelector('button[type="submit"]');
    if(!btn) return;
    btn.disabled=false;
    btn.removeAttribute('aria-busy');
    if(btn.dataset.originalText){
      btn.textContent=btn.dataset.originalText;
      delete btn.dataset.originalText;
    }
  }

  document.querySelectorAll('form[action="/api/submit"]').forEach(function(form){
    var fileInput=form.querySelector('input[type="file"][name="photo"]');
    if(fileInput){
      fileInput.addEventListener('change',function(){
        clearStatus(form);
        var file=fileInput.files && fileInput.files[0];
        if(file && file.size>MAX_FILE_BYTES){
          fileInput.setCustomValidity('Please choose an image smaller than 3 MB.');
          showStatus(form,'That image is larger than 3 MB. Choose a smaller image, or submit without a photo.','error');
        } else {
          fileInput.setCustomValidity('');
        }
      });
    }

    form.addEventListener('submit', async function(event){
      if(!window.fetch || !window.FormData) return;
      event.preventDefault();
      clearStatus(form);

      if(!form.reportValidity()) return;

      var file=fileInput && fileInput.files && fileInput.files[0];
      if(file && file.size>MAX_FILE_BYTES){
        showStatus(form,'That image is larger than 3 MB. Choose a smaller image, or submit without a photo.','error');
        fileInput.focus();
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      if(!btn || btn.disabled) return;
      btn.dataset.originalText = btn.textContent;
      btn.disabled = true;
      btn.setAttribute('aria-busy','true');
      btn.textContent = 'Sending…';

      try{
        var response=await fetch(form.action,{
          method:'POST',
          body:new FormData(form),
          headers:{'Accept':'application/json'}
        });
        var payload={};
        try{ payload=await response.json(); }catch(parseError){ payload={}; }
        if(!response.ok){
          throw new Error(payload.error || 'We could not send your request. Your entries are still here so you can try again.');
        }
        showStatus(form,payload.message || 'Thank you. Your request was sent successfully.','success');
        window.location.assign(payload.redirect || '/thank-you');
      }catch(error){
        resetButton(form);
        showStatus(
          form,
          error && error.message ? error.message : 'We could not send your request. Please try again or call (858) 334-9071.',
          'error'
        );
      }
    });
  });

  // Safari and other browsers may restore a page from back-forward cache with
  // the previous loading state intact. Always make the form usable again.
  window.addEventListener('pageshow',function(){
    document.querySelectorAll('form[action="/api/submit"]').forEach(resetButton);
  });
})();
