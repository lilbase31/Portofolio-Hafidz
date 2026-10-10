(() => {
  'use strict';
  const arrow = direction => {
    const angle = {'↗':0,'→':45,'↘':90,'↓':135,'↙':180,'←':225,'↖':270,'↑':315}[direction] ?? 0;
    return `<svg class="ui-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path transform="rotate(${angle} 12 12)" d="M5 19 19 5M5 5h14v14"/></svg>`;
  };
  const withArrows = html => html.replace(/[↗→↘↓↙←↖↑]/g,arrow);
  window.portfolioIcons = {arrow,withArrows};

  const english = {".skip": "Skip to projects", ".nav-cta": "Let’s collaborate <span>↗</span>", ".hero-intro .eyebrow": "HELLO, I’M", ".hero-note p": "Design that speaks.<br>Video that tells a story.", ".text-link": "Explore projects <span>↘</span>", ".hero-bottom > span:first-child": "IDEAS. VISUALS. STORIES.", ".hero-bottom > a": "SCROLL TO EXPLORE <span>↓</span>", ".work .section-top p": "Every project has a story.<br>Here are a few of mine.", "#work-heading": "Selected work<span>.</span>", "[data-filter=\"all\"]": "All <small>27</small>", "[data-filter=\"design\"]": "Graphic Design <small>15</small>", "#load-more": "View more <span>＋</span>", ".about .section-top > span:last-child": "ABOUT ME", ".about-grid > h2": "Ideas into visuals.<br>Visuals into<br><em>stories.</em>", ".about-copy > p": "I’m Hafidz Aulia Rachman, a visual creator focused on graphic design and video editing.", ".expertise > div:first-child h3": "Graphic Design", ".availability": "<i></i> Open to collaboration", ".contact-body h2": "Have an idea?<br><span>Let's create it<br>and work together.</span>", ".contact-bottom p": "For job opportunities, creative projects,<br>or stories waiting to be visualized.", ".footer-bottom > a": "Back to top ↑", "#media-error": "Unable to load this media. Check your connection and try opening it again.", "#youtube-fallback": "If the player is unavailable, watch on YouTube ↗"};
  const videoPage = document.body.dataset.portfolio === 'video';
  english['#work-heading'] = videoPage ? 'VIDEO EDITING' : '<span class="social-media-title">SOCIAL MEDIA</span><span class="social-media-script">Design</span>';
  english['.work .section-top p'] = videoPage ? 'Stories, rhythm, and motion.<br>Explore my video editing projects.' : 'Identity, composition, and character.<br>Explore my graphic design projects.';
  english['[data-page="design"]'] = 'Graphic Design';
  english['.next-portfolio'] = videoPage ? 'Back to Graphic Design <span>↗</span>' : 'Next: Video Editing <span>↗</span>';
  english['.social-heading'] = 'FIND ME ON';
  english['.about .section-top > span:last-child'] = 'ABOUT ME';
  english['#about-heading'] = 'ABOUT<br>ME<span>.</span>';
  english['.about-copy > p'] = 'I’m Hafidz Aulia Rachman, a graphic designer, video editor, and content creator. I develop ideas into engaging visual designs and videos for social media, branding, and promotion, with a focus on clear messages and strong character.';
  english['.software-design-heading'] = 'Graphic Design';
  english['.design-gallery-copy'] = 'Selected social media designs that communicate a message and build brand character.';
  english['.design-process h3'] = 'From ideas<br>to visuals.';
  english['.design-process p:first-of-type'] = 'I start by understanding the content goals, brand character, and audience. I turn ideas into visual concepts, then refine composition, typography, color, and imagery so the message is easy to understand.';
  english['.design-process p:last-of-type'] = 'Each design is adapted to feed or story formats, with a consistent look and ready to publish.';
  english['#experience-marketing-period'] = '<time datetime="2025-08">August 2025</time> — <time datetime="2026-07">July 2026</time>';
  english['#experience-marketing-duration'] = '1 year';
  english['#experience-creative-period'] = '<time datetime="2023-06">June 2023</time> — <time datetime="2025-07">July 2025</time>';
  english['#experience-creative-duration'] = '2 years 2 months';
  english['#experience-freelance-role'] = 'Freelance Graphic Designer';
  english['#education-heading'] = 'EDUCATION';
  english['#education-major'] = 'Mathematics and Natural Sciences (MIPA)';
  english['#education-year'] = 'Graduated 2019';
  english['#experience-freelance-period'] = '<time datetime="2021-10">October 2021</time> — Present';
  const dynamic = {"previousVideos": ["Video sebelumnya", "Previous videos"], "nextVideos": ["Video berikutnya", "Next videos"], "socialComposition": ["Komposisi mockup desain media sosial", "Social media design mockup composition"], "previousDesigns": ["Desain sebelumnya", "Previous designs"], "nextDesigns": ["Desain berikutnya", "Next designs"], "design": ["Desain Grafis", "Graphic Design"], "play": ["Putar", "Play"], "view": ["Lihat", "View"], "works": ["KARYA", "PROJECTS"], "available": ["karya tersedia", "projects available"], "openMenu": ["Buka menu", "Open menu"], "closeMenu": ["Tutup menu", "Close menu"], "videoEditing":["Editing Video","Video Editing"], "shortform":["VIDEO PENDEK","SHORT FORM"], "cinematic":["SINEMATIK","CINEMATIC"], "portrait":["VERTIKAL","PORTRAIT"], "square":["PERSEGI","SQUARE"], "landscape":["HORIZONTAL","LANDSCAPE"], "documentary":["VIDEO DOKUMENTER","DOCUMENTARY VIDEO"], "podcast":["VIDEO PODCAST","PODCAST VIDEO"], "documentaryLabel":["DOKUMENTER","DOCUMENTARY"], "podcastLabel":["PODCAST","PODCAST"]};
  const attributes = [["#video-projects, #projects.shortform-track", "aria-label", "Galeri video pendek", "Shortform video gallery"], [".contact-social a[aria-label=\"Email\"], .hero-social a[aria-label=\"Email\"], .contact-social a[aria-label=\"Surel\"], .hero-social a[aria-label=\"Surel\"]", "aria-label", "Surel", "Email"],["#story-projects", "aria-label", "Desain story dalam mockup ponsel", "Story designs in phone mockups"],["#projects", "aria-label", "Galeri karya", "Project gallery"], ['[data-gallery-direction="-1"]', "aria-label", "Desain sebelumnya", "Previous designs"], ['[data-gallery-direction="1"]', "aria-label", "Desain berikutnya", "Next designs"],[".about-seated img", "alt", "Hafidz Aulia Rachman dengan jaket burgundy dari sudut tiga perempat", "Hafidz Aulia Rachman wearing a burgundy jacket in a three-quarter portrait"],[".about-portrait img", "alt", "Hafidz Aulia Rachman dari sudut tiga perempat dengan jaket kulit burgundy", "Hafidz Aulia Rachman in a three-quarter portrait wearing a burgundy leather jacket"],[".brand", "aria-label", "Hafidz, beranda", "Hafidz, home"], ["#navigation", "aria-label", "Navigasi utama", "Main navigation"], [".filters", "aria-label", "Filter karya", "Filter projects"], ["#close-dialog", "aria-label", "Tutup preview", "Close preview"], [".portrait", "alt", "Hafidz Aulia Rachman mengenakan jaket kulit burgundy gelap", "Hafidz Aulia Rachman wearing a dark burgundy leather jacket"]];
  const bilingual = {"#navigation a:nth-child(1)": ["Beranda", "Home"], "#navigation a:nth-child(2)": ["Tentang", "About"], "#navigation a:nth-child(3)": ["Karya", "Project"], "#navigation a:nth-child(4)": ["Kontak", "Contact"], ".creative-script": ["Kreatif", "Creative"], ".hero-roles": ["Desainer Grafis • Editor Video • Kreasi Konten", "Graphic Designer • Video Editor • Content Creation"], ".edition": ["PORTOFOLIO PILIHAN / 2026", "SELECTED PORTFOLIO / 2026"], ".section-top > .eyebrow:first-child": ["PORTOFOLIO KREATIF", "CREATIVE PORTFOLIO"], ".about .section-top > .eyebrow:last-child": ["TENTANG SAYA", "ABOUT ME"], "#about-heading": ["TENTANG<br>SAYA<span>.</span>", "ABOUT<br>ME<span>.</span>"], ".greeting-intro": ["Halo, saya", "Hello I’m"], ".software-group:last-child h3": ["Editing Video &amp; Kreasi Konten", "Video Editing &amp; Content Creation"], "#experience-heading": ["PENGALAMAN<br>KERJA", "WORK<br>EXPERIENCE"], ".experience-list > li:nth-child(1) .experience-role": ["Pemasaran Digital &amp; Perencana Konten", "Digital Marketing &amp; Content Planner"], ".experience-list > li:nth-child(2) .experience-role": ["Desainer Grafis, Editor Video &amp; Kreator Konten", "Graphic Designer, Video Editor &amp; Content Creator"], ".design-showcase .section-top > .eyebrow:last-child": ["DESAIN GRAFIS", "GRAPHIC DESIGN"], "#work-heading": ["<span class=\"social-media-title\">MEDIA SOSIAL</span><span class=\"social-media-script\">Desain</span>", "<span class=\"social-media-title\">SOCIAL MEDIA</span><span class=\"social-media-script\">Design</span>"], ".design-process > .eyebrow": ["PROSES DESAIN", "THE PROCESS"], ".video-showcase .section-top > .eyebrow:last-child": ["EDITING VIDEO", "VIDEO EDITING"], "#video-heading": ["EDITING VIDEO", "VIDEO EDITING"], "#shortform-heading": ["VIDEO PENDEK", "SHORTFORM"], "#other-video-heading": ["SINEMATIK &amp; PROYEK VIDEO", "CINEMATIC &amp; VIDEO PROJECTS"], ".contact-body h2": ["Punya ide?<br><span>Yuk, wujudkan<br>dan berkarya bersama.</span>", "Have an idea?<br><span>Let's create it<br>and work together.</span>"], ".contact-connect h3": ["Hubungi saya", "Contact me"], ".footer-bottom > span:nth-child(2)": ["DESAIN &amp; GERAK", "DESIGN &amp; MOTION"], ".dialog-bottom > span:first-child": ["HAFIDZ / KARYA PILIHAN", "HAFIDZ / SELECTED WORK"], "noscript p": ["Aktifkan JavaScript untuk membuka galeri interaktif.", "Enable JavaScript to open the interactive gallery."]};
  Object.assign(bilingual, {".video-process-intro": ["Saya mengembangkan ide menjadi konsep visual, menyusun alur cerita, lalu mengolah footage melalui editing, ritme, warna, dan audio agar pesan tersampaikan dengan jelas dan videonya terasa utuh.", "I develop ideas into visual concepts, build the story flow, then shape the footage through editing, pacing, color, and audio so the message is clear and the video feels cohesive."], ".shortform-description": ["Dari ide dan perencanaan shot sampai take dan editing, saya mengerjakan video pendek dengan gear yang terbatas: HP OPPO A92 untuk pengambilan gambar dan CapCut untuk editing. Saya memaksimalkan komposisi, cahaya yang tersedia, ritme potongan, teks, dan audio untuk menghasilkan konten yang menarik.", "From ideas and shot planning to filming and editing, I create shortform videos with limited gear: an OPPO A92 phone for filming and CapCut for editing. I make the most of composition, available light, cutting rhythm, text, and audio to create engaging content."], ".cinematic-description": ["Untuk video sinematik, saya mulai dari ide, suasana, dan alur cerita, lalu merencanakan komposisi serta pengambilan gambar. Pada tahap editing, saya merangkai footage, mengatur ritme, menyelaraskan warna, dan mengolah audio agar visual dan cerita saling mendukung.", "For cinematic videos, I start with the idea, mood, and story flow, then plan the composition and filming. During editing, I assemble the footage, refine the pacing, align the colors, and shape the audio so the visuals and story support each other."]});
  if (videoPage) bilingual["#work-heading"] = ["EDITING VIDEO","VIDEO EDITING"];
  for (const [selector, pair] of Object.entries(bilingual)) english[selector] = pair[1];
  const originals = new Map();
  for (const selector of Object.keys(english)) {
    const elements = [...document.querySelectorAll(selector)];
    if (elements.length) originals.set(selector, elements.map(element => ({element, html:bilingual[selector]?.[0] ?? element.innerHTML})));
  }
  let language = 'en';
  try { const saved = localStorage.getItem('hafidz-language-v2'); if (saved === 'id' || saved === 'en') language = saved; } catch {}
  const t = key => dynamic[key]?.[language === 'en' ? 1 : 0] ?? key;
  function apply(next) {
    language = next === 'en' ? 'en' : 'id';
    document.documentElement.lang = language;
    for (const [selector, entries] of originals) {
      for (const {element, html} of entries) element.innerHTML = withArrows(language === 'en' ? english[selector] : html);
    }
    for (const [selector, attribute, id, en] of attributes) document.querySelectorAll(selector).forEach(element => element.setAttribute(attribute, language === 'en' ? en : id));
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
    const freelanceDuration = document.querySelector('#freelance-duration');
    if (freelanceDuration) {
      const today = new Date();
      const totalMonths = Math.max(0,(today.getFullYear()-2021)*12+today.getMonth()-9);
      const years = Math.floor(totalMonths/12), months = totalMonths%12;
      const parts = [];
      if (years) parts.push(`${years} ${language==='en' ? years===1?'year':'years' : 'tahun'}`);
      if (months) parts.push(`${months} ${language==='en' ? months===1?'month':'months' : 'bulan'}`);
      freelanceDuration.textContent = parts.join(' ') || (language==='en'?'Less than 1 month':'Kurang dari 1 bulan');
    }
    const menu = document.querySelector('.menu-toggle');
    menu.setAttribute('aria-label', t(menu.getAttribute('aria-expanded') === 'true' ? 'closeMenu' : 'openMenu'));
    const word = document.querySelector('.hero-word text');
    if (word) word.textContent = language === 'en' ? 'PORTFOLIO' : 'PORTOFOLIO';
    document.querySelector('meta[name="description"]').content = language === 'en' ? 'Hafidz Aulia Rachman — graphic design and video editing portfolio. Explore visual projects, social media content and short films.' : 'Portofolio Hafidz Aulia Rachman — desain grafis dan video editing. Jelajahi karya visual, konten sosial media, dan film pendek.';
    document.dispatchEvent(new Event('portfolio:language'));
  }
  window.portfolioLanguage = { t, get current() { return language; } };
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => { apply(button.dataset.lang); try { localStorage.setItem('hafidz-language-v2', language); } catch {} }));
  apply(language);
})();
