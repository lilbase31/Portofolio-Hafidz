(() => {
  'use strict';
  const arrow = direction => {
    const angle = {'↗':0,'→':45,'↘':90,'↓':135,'↙':180,'←':225,'↖':270,'↑':315}[direction] ?? 0;
    return `<svg class="ui-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path transform="rotate(${angle} 12 12)" d="M5 19 19 5M5 5h14v14"/></svg>`;
  };
  const withArrows = html => html.replace(/[↗→↘↓↙←↖↑]/g,arrow);
  window.portfolioIcons = {arrow,withArrows};

  const english = {".skip": "Skip to projects", ".nav-cta": "Let’s collaborate <span>↗</span>", ".hero-intro .eyebrow": "HELLO, I’M", ".hero-note p": "Design that speaks.<br>Video that tells a story.", ".text-link": "Explore projects <span>↘</span>", ".hero-bottom > span:first-child": "IDEAS. VISUALS. STORIES.", ".hero-bottom > a": "SCROLL TO EXPLORE <span>↓</span>", ".work .section-top p": "Every project has a story.<br>Here are a few of mine.", "#work-heading": "Selected work<span>.</span>", "[data-filter=\"all\"]": "All <small>27</small>", "[data-filter=\"design\"]": "Graphic Design <small>15</small>", "#load-more": "View more <span>＋</span>", ".about .section-top > span:last-child": "ABOUT ME", ".about-grid > h2": "Ideas into visuals.<br>Visuals into<br><em>stories.</em>", ".about-copy > p": "I’m Hafidz Aulia Rachman, a visual creator focused on graphic design and video editing.", ".about-copy > p:nth-child(2)": "I turn ideas into distinctive visuals, from social media designs to videos for content and promotional projects.", ".expertise > div:first-child h3": "Graphic Design", ".availability": "<i></i> Open to collaboration", ".contact-body h2": "Have an idea?<br><span>Let’s create it.</span>", ".contact-circle": "<span>↗</span>Let’s talk", ".contact-bottom p": "For job opportunities, creative projects,<br>or stories waiting to be visualized.", ".footer-bottom > a": "Back to top ↑", "#media-error": "Unable to load this media. Check your connection and try opening it again.", "#youtube-fallback": "If the player is unavailable, watch on YouTube ↗"};
  const videoPage = document.body.dataset.portfolio === 'video';
  english['#work-heading'] = videoPage ? 'VIDEO EDITING' : '<span class="social-media-title">SOCIAL MEDIA</span><span class="social-media-script">Design</span>';
  english['.work .section-top p'] = videoPage ? 'Stories, rhythm, and motion.<br>Explore my video editing projects.' : 'Identity, composition, and character.<br>Explore my graphic design projects.';
  english['[data-page="design"]'] = 'Graphic Design';
  english['.next-portfolio'] = videoPage ? 'Back to Graphic Design <span>↗</span>' : 'Next: Video Editing <span>↗</span>';
  english['.social-heading'] = 'FIND ME ON';
  english['.about .section-top > span:last-child'] = 'ABOUT ME';
  english['#about-heading'] = 'ABOUT<br>ME<span>.</span>';
  english['.about-copy > p'] = 'I’m Hafidz Aulia Rachman, a graphic designer, video editor, and content creator. I turn ideas into engaging visual designs and videos for social media, branding, and promotional projects, with a focus on clear messaging and strong character.';
  english['.software-design-heading'] = 'Graphic Design';
  english['.design-gallery-copy'] = 'Selected social media designs that communicate a message and build brand character.';
  english['.design-process h3'] = 'From ideas<br>to visuals.';
  english['.design-process p:first-of-type'] = 'I start by understanding the content goals, brand character, and audience. I turn ideas into visual concepts, then refine composition, typography, color, and imagery so the message is easy to understand.';
  english['.design-process p:last-of-type'] = 'Each design is adapted to feed or story formats, with a consistent look and ready to publish.';
  const dynamic = {"previousVideos": ["Video sebelumnya", "Previous videos"], "nextVideos": ["Video berikutnya", "Next videos"], "socialComposition": ["Komposisi mockup desain media sosial", "Social media design mockup composition"], "previousDesigns": ["Desain sebelumnya", "Previous designs"], "nextDesigns": ["Desain berikutnya", "Next designs"], "design": ["Desain Grafis", "Graphic Design"], "play": ["Putar", "Play"], "view": ["Lihat", "View"], "works": ["KARYA", "PROJECTS"], "available": ["karya tersedia", "projects available"], "openMenu": ["Buka menu", "Open menu"], "closeMenu": ["Tutup menu", "Close menu"]};
  const attributes = [["#story-projects", "aria-label", "Desain story dalam mockup ponsel", "Story designs in phone mockups"],["#projects", "aria-label", "Galeri karya", "Project gallery"], ['[data-gallery-direction="-1"]', "aria-label", "Desain sebelumnya", "Previous designs"], ['[data-gallery-direction="1"]', "aria-label", "Desain berikutnya", "Next designs"],[".about-seated img", "alt", "Hafidz Aulia Rachman dengan jaket burgundy dari sudut tiga perempat", "Hafidz Aulia Rachman wearing a burgundy jacket in a three-quarter portrait"],[".about-portrait img", "alt", "Hafidz Aulia Rachman dari sudut tiga perempat dengan jaket kulit burgundy", "Hafidz Aulia Rachman in a three-quarter portrait wearing a burgundy leather jacket"],[".brand", "aria-label", "Hafidz, beranda", "Hafidz, home"], ["#navigation", "aria-label", "Navigasi utama", "Main navigation"], [".filters", "aria-label", "Filter karya", "Filter projects"], ["#close-dialog", "aria-label", "Tutup preview", "Close preview"], [".contact-circle", "aria-label", "Kirim email untuk kolaborasi", "Email to collaborate"], [".portrait", "alt", "Hafidz Aulia Rachman mengenakan jaket kulit burgundy gelap", "Hafidz Aulia Rachman wearing a dark burgundy leather jacket"]];
  const originals = new Map();
  for (const selector of Object.keys(english)) {
    const element = document.querySelector(selector);
    if (element) originals.set(selector, element.innerHTML);
  }
  let language = 'id';
  try { if (localStorage.getItem('hafidz-language') === 'en') language = 'en'; } catch {}
  const t = key => dynamic[key]?.[language === 'en' ? 1 : 0] ?? key;
  function apply(next) {
    language = next === 'en' ? 'en' : 'id';
    document.documentElement.lang = language;
    for (const [selector, original] of originals) {
      document.querySelector(selector).innerHTML = withArrows(language === 'en' ? english[selector] : original);
    }
    for (const [selector, attribute, id, en] of attributes) document.querySelector(selector)?.setAttribute(attribute, language === 'en' ? en : id);
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
    const menu = document.querySelector('.menu-toggle');
    menu.setAttribute('aria-label', t(menu.getAttribute('aria-expanded') === 'true' ? 'closeMenu' : 'openMenu'));
    const word = document.querySelector('.hero-word text');
    if (word) word.textContent = language === 'en' ? 'PORTFOLIO' : 'PORTOFOLIO';
    document.querySelector('meta[name="description"]').content = language === 'en' ? 'Hafidz Aulia Rachman — graphic design and video editing portfolio. Explore visual projects, social media content and short films.' : 'Portofolio Hafidz Aulia Rachman — desain grafis dan video editing. Jelajahi karya visual, konten sosial media, dan film pendek.';
    try { localStorage.setItem('hafidz-language', language); } catch {}
    document.dispatchEvent(new Event('portfolio:language'));
  }
  window.portfolioLanguage = { t, get current() { return language; } };
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => apply(button.dataset.lang)));
  apply(language);
})();
