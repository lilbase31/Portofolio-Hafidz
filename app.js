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
  // Keep the screenshot order within each format; feature the tradition pair together.
  const feedOrder = ['jagonya-kretek', 'paper-favo', 'varian-mangga', 's-nya-apa', '3pk-nikmatnya', 'feed-2', 'dari-ladang-ke-lintingan', 'the-taste-of-tradition', 'its-jago-time', 'teka-teki-mewah', 'tot-mewah'];
  const feedRank = p => { const i = feedOrder.indexOf(p.id.split('/').pop()); return i < 0 ? 100 : i; };
  const projects = data.projects.filter(p => p.category !== 'design' || !document.body.dataset.collection || p.collection === document.body.dataset.collection).sort((a,b) => filter === 'design' ? feedRank(a) - feedRank(b) || Date.parse(b.createdAt || 0) - Date.parse(a.createdAt || 0) : rank(a) - rank(b));
  const label = p => p.type === 'video' ? 'Video Editing' : t('design');
  function createProjectCard(p,i) {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `project card-enter ${p.type === 'video' ? 'video' : ''} ${p.height > p.width ? 'vertical' : ''} ${p.type === 'video' && p.width > p.height ? 'wide' : ''}`;
      card.style.setProperty('--delay', `${Math.min(i,5)*45}ms`);
      if (p.category === 'design') card.style.setProperty('--design-ratio', `${p.width} / ${p.height}`);
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
      card.addEventListener('click',()=>openProject(p,card)); return card;

  }
  function createFeedCarousel(track) {
    const carousel = document.createElement('div'); carousel.className = 'feed-carousel';
    const controls = document.createElement('div'); controls.className = 'feed-carousel-controls';
    const previous = document.createElement('button'), next = document.createElement('button');
    for (const [button,direction,key,icon] of [[previous,-1,'previousDesigns','←'],[next,1,'nextDesigns','→']]) {
      button.type = 'button'; button.className = 'feed-carousel-arrow';
      button.textContent = icon; button.setAttribute('aria-label',t(key));
      button.addEventListener('click', () => {
        const cards = [...track.children];
        const current = cards.reduce((best,card,i) => Math.abs(card.offsetLeft-track.scrollLeft) < Math.abs(cards[best].offsetLeft-track.scrollLeft) ? i : best,0);
        const target = cards[Math.max(0,Math.min(cards.length-1,current+direction))];
        if (target) track.scrollTo({left:target.offsetLeft,behavior:reduced.matches?'instant':'smooth'});
      });
      controls.append(button);
    }
    track.addEventListener('keydown',event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); (event.key === 'ArrowLeft' ? previous : next).click();
      }
    });
    const update = () => {
      previous.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= track.scrollWidth-track.clientWidth-1;
    };
    track.addEventListener('scroll',update,{passive:true});
    carousel.append(track,controls); requestAnimationFrame(update); return carousel;
  }
  function render() {
    const list = projects.filter(p => filter === 'all' || p.category === filter);
    grid.replaceChildren();
    const stories = document.querySelector('#story-projects');
    if (filter === 'design' && stories) {
      stories.replaceChildren();
      const groups = {};
      for (const format of ['portrait', 'square', 'editorial']) {
        const group = document.createElement('div');
        group.className = `feed-group feed-group-${format}`;
        group.setAttribute('role', 'group');
        group.setAttribute('aria-label', format === 'portrait' ? 'Feed 4:5' : format === 'square' ? 'Feed 1:1' : 'Dari Ladang ke Lintingan · The Taste of Tradition');
        groups[format] = group; grid.append(format === 'editorial' ? group : createFeedCarousel(group));
      }
      list.forEach((p,i) => {
        const card = createProjectCard(p,i);
        const story = Math.abs(p.width / p.height - 9 / 16) < .02;
        if (story) {
          const phone = document.createElement('div');
          phone.className = p.mockup ? 'phone-mockup iphone-art' : 'phone-mockup';
          if (p.mockup) {
            const image = card.querySelector('img');
            image.src = p.mockup; image.width = 840; image.height = 1260;
            image.alt = `${p.title} — iPhone 17 mockup`;
            card.classList.add('phone-render');
            phone.append(card);
          } else {
            card.classList.add('phone-screen');
            const speaker = document.createElement('span');
            speaker.className = 'phone-speaker'; speaker.setAttribute('aria-hidden','true');
            phone.append(card,speaker);
          }
          stories.append(phone);
        } else {
          const editorial = ['dari-ladang-ke-lintingan', 'the-taste-of-tradition'].includes(p.id.split('/').pop());
          groups[editorial ? 'editorial' : p.height > p.width ? 'portrait' : 'square'].append(card);
        }
      });
    } else list.slice(0,limit).forEach((p,i) => grid.append(createProjectCard(p,i)));
    if (more) more.hidden = limit >= list.length;
    const count = document.querySelector('#project-count');
    if (count) count.textContent = `${Math.min(limit,list.length)} / ${list.length} ${t('works')}`;
    document.querySelector('#result-status').textContent = `${list.length} ${t('available')}${filter==='design'?' · '+t('design'):filter==='video'?' · Video Editing':''}`;
  }
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
  more?.addEventListener('click',()=>{const previous=grid.children.length;limit+=8;render();grid.children[previous]?.focus({preventScroll:true});});
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
