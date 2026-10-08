(() => {
  'use strict';
  const data = window.PORTFOLIO;
  if (!data) return;
  const t = key => window.portfolioLanguage.t(key);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const grid = document.querySelector('#projects');
  const dialog = document.querySelector('#project-dialog');
  const media = document.querySelector('#dialog-media');
  const error = document.querySelector('#media-error');
  const more = document.querySelector('#load-more');
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  let filter = document.body.dataset.portfolio === 'video' ? 'video' : 'design', limit = 8, opener, closeTimer;
  // A deliberate mix of landscape film, design and vertical editing in the first view.
  const preferred = ['IBXJGuySfq4', 'LRmsrFJLTvc', 'cinematic-05', 'combo-coffee', 'the-taste-of-tradition', 'talkinghead-03', 'its-jago-time', 'dari-ladang-ke-lintingan', 'cinematic-03', 'teka-teki-mewah'];
  const rank = p => { const i = preferred.indexOf(p.id.split('/').pop()); return i < 0 ? 100 : i; };
  const projects = [...data.projects].sort((a,b) => rank(a) - rank(b));
  const label = p => p.type === 'video' ? 'Video Editing' : t('design');
  function render() {
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.querySelector('small').textContent = String(projects.filter(p => button.dataset.filter === 'all' || p.category === button.dataset.filter).length);
  });

    const list = projects.filter(p => filter === 'all' || p.category === filter);
    grid.replaceChildren();
    list.slice(0,limit).forEach((p,i) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `project card-enter ${p.type === 'video' ? 'video' : ''} ${p.height > p.width ? 'vertical' : ''} ${p.type === 'video' && p.width > p.height ? 'wide' : ''}`;
      card.style.setProperty('--delay', `${Math.min(i,5)*45}ms`);
      card.setAttribute('aria-label', `${p.type === 'video' ? t('play') : t('view')} ${p.title}`);
      const img = document.createElement('img');
      img.src = p.thumbnail; img.alt = p.title; img.loading = 'lazy'; img.decoding = 'async';
      img.width = p.width; img.height = p.height;
      img.addEventListener('error', () => {img.hidden = true; const fallback = document.createElement('span'); fallback.className='asset-fallback'; fallback.textContent=p.title; card.prepend(fallback);}, {once:true});
      card.append(img);
      const info = document.createElement('span'); info.className = 'project-info';
      const infoCopy = document.createElement('span');
      const category = document.createElement('small'); category.textContent=label(p);
      const title = document.createElement('strong'); title.textContent=p.title;
      const arrow = document.createElement('span'); arrow.textContent='↗'; arrow.setAttribute('aria-hidden','true');
      infoCopy.append(category,title); info.append(infoCopy,arrow); card.append(info);
      if(p.type === 'video') {
        const play=document.createElement('span'); play.className='play'; play.textContent='▶'; play.setAttribute('aria-hidden','true');
        const tag=document.createElement('span'); tag.className='video-tag'; tag.textContent=p.tag || (p.height>p.width?'SHORT FORM':'CINEMATIC');
        card.append(play,tag);
      }
      card.addEventListener('click',()=>openProject(p,card)); grid.append(card);
    });
    if (filter === 'design') requestAnimationFrame(updateGalleryCurve);
    more.hidden=limit>=list.length;
    document.querySelector('#project-count').textContent=`${Math.min(limit,list.length)} / ${list.length} ${t('works')}`;
    document.querySelector('#result-status').textContent=`${list.length} ${t('available')}${filter==='all'?'':filter==='design'?' · '+t('design'):' · Video Editing'}`;
  }
  let galleryTicking = false;
  function updateGalleryCurve() {
    galleryTicking = false;
    if (filter !== 'design') return;
    const width = grid.clientWidth;
    if (!width) return;
    for (const card of grid.children) {
      const offset = Math.max(-1, Math.min(1, (card.offsetLeft + card.offsetWidth / 2 - grid.scrollLeft - width / 2) / (width / 2)));
      card.style.setProperty('--gallery-yaw', `${-offset * 30}deg`);
      card.style.setProperty('--gallery-lift', `${-Math.abs(offset) * 52}px`);
      card.style.setProperty('--gallery-scale', String(1 + Math.abs(offset) * .1));
    }
  }
  function scheduleGalleryCurve() {
    if (galleryTicking) return;
    galleryTicking = true;
    requestAnimationFrame(updateGalleryCurve);
  }
  grid.addEventListener('scroll', scheduleGalleryCurve, {passive:true});
  addEventListener('resize', scheduleGalleryCurve);
  document.querySelectorAll('[data-gallery-direction]').forEach(button => button.addEventListener('click', () => grid.scrollBy({left:Number(button.dataset.galleryDirection) * grid.clientWidth * .65, behavior:reduced.matches?'instant':'smooth'})));
  function openProject(p,trigger) {
    dialog.dataset.projectId=p.id;
    clearTimeout(closeTimer); dialog.classList.remove('closing'); opener=trigger;
    document.querySelector('#dialog-title').textContent=p.title;
    document.querySelector('#dialog-category').textContent=label(p);
    document.querySelector('#dialog-format').textContent=p.height>p.width?'PORTRAIT':p.height===p.width?'SQUARE':'LANDSCAPE';
    error.hidden=true; document.querySelector('#youtube-fallback').hidden=true; media.replaceChildren();
    if (p.provider === 'youtube') {
      const frame = document.createElement('iframe');
      frame.className = 'youtube-player';
      frame.title = p.title;
      frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(p.youtubeId)}?playsinline=1&rel=0`;
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      media.append(frame);
      const fallback = document.querySelector('#youtube-fallback');
      fallback.href = p.src;
      fallback.hidden = false;
    } else {
    const asset=document.createElement(p.type==='video'?'video':'img');
    if(p.type==='video') {asset.controls=true; asset.playsInline=true; asset.preload='metadata'; asset.poster=p.thumbnail; asset.setAttribute('aria-label',p.title);}
    else asset.alt=p.title;
    asset.addEventListener('error',()=>{error.hidden=false;}); asset.src=p.src; media.append(asset);
    }
    document.body.classList.add('modal-open'); dialog.showModal(); document.querySelector('#close-dialog').focus();
  }
  function closeProject() {
    const video=media.querySelector('video'); if(video) video.pause();
    media.querySelector('iframe')?.remove();
    if(!dialog.open||dialog.classList.contains('closing')) return;
    dialog.classList.add('closing');
    closeTimer=setTimeout(()=>dialog.close(),reduced.matches?0:170);
  }
  dialog.addEventListener('close',()=>{const video=media.querySelector('video');if(video){video.pause();video.removeAttribute('src');video.load();}media.replaceChildren();document.body.classList.remove('modal-open');dialog.classList.remove('closing');opener?.focus({preventScroll:true});});
  dialog.addEventListener('cancel',e=>{e.preventDefault();closeProject();});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeProject();}});
  document.querySelector('#close-dialog').addEventListener('click',closeProject);
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;limit=8;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render();}));
  more.addEventListener('click',()=>{const previous=grid.children.length;limit+=8;render();grid.children[previous]?.focus({preventScroll:true});});
  function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',t('openMenu'));navigation.classList.remove('open');}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?t('closeMenu'):t('openMenu'));navigation.classList.toggle('open',open);});
  navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
  document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
  if('IntersectionObserver' in window&&!reduced.matches){document.body.classList.add('motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
  let ticking=false;
  function onScroll(){if(ticking)return;ticking=true;requestAnimationFrame(()=>{const y=scrollY;document.querySelector('.header').classList.toggle('scrolled',y>20);const active=!reduced.matches&&innerWidth>650;const word=document.querySelector('.hero-word'),portrait=document.querySelector('.portrait-wrap');if(word)word.style.transform=active?`translateY(${Math.min(y*.09,42)}px)`:'none';if(portrait)portrait.style.translate=active?`0 ${Math.min(y*.035,20)}px`:'none';ticking=false;});}
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);reduced.addEventListener('change',onScroll);
  document.querySelector('#year').textContent=new Date().getFullYear();
  document.addEventListener('portfolio:language', () => {
    render();
    if (dialog.open) {
      const project = projects.find(p => p.id === dialog.dataset.projectId);
      if (project) document.querySelector('#dialog-category').textContent = label(project);
    }
  });
  render();onScroll();
})();
