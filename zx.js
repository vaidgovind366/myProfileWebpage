// Basic interactions: theme toggle, nav toggle, typed text, modal, contact form
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const yearEl = document.getElementById('year');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const typedEl = document.getElementById('typed');

  // Year
  yearEl.textContent = new Date().getFullYear();

  // Theme: remember in localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light');
    themeToggle.textContent = '☀️';
    themeToggle.setAttribute('aria-pressed', 'true');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = body.classList.toggle('light');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-pressed', String(isLight));
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Nav toggle (mobile)
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.style.display = expanded ? '' : 'flex';
  });

  // Simple typing effect (looping)
  const phrases = [
    'Java • Data Analytics • Web Development',
    'Building practical software projects',
    'Learning & teaching algorithms and DSA'
  ];
  let ti = 0, pi = 0;
  function typeLoop(){
    const s = phrases[pi];
    if (ti <= s.length) {
      typedEl.textContent = s.slice(0, ti) + (ti % 2 ? '|' : '');
      ti++;
      setTimeout(typeLoop, 60);
    } else {
      // pause then delete
      setTimeout(() => eraseLoop(), 900);
    }
  }
  function eraseLoop(){
    const s = phrases[pi];
    if (ti > 0) {
      typedEl.textContent = s.slice(0, ti-1) + (ti % 2 ? '|' : '');
      ti--;
      setTimeout(eraseLoop, 30);
    } else {
      pi = (pi + 1) % phrases.length;
      setTimeout(typeLoop, 300);
    }
  }
  typeLoop();

  // Project modal
  const projectOpenBtns = document.querySelectorAll('.project-open');
  const projectModal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalLinks = document.getElementById('modal-links');
  const modalClose = document.querySelector('.modal-close');

  const projectsData = {
    1: {
      title: 'AI Quiz — Adaptive Difficulty',
      desc: 'Prototype that adapts question difficulty using a simple ML model + performance tracking. Backend in Java with a Python microservice for analytics. Includes a small admin dashboard.',
      tech: 'Java • Python • Flask • PostgreSQL',
      links: [{txt:'GitHub', href:'https://github.com/yourusername/ai-quiz'}]
    },
    2: {
      title: 'Data Analytics Dashboard',
      desc: 'Data cleaning, EDA, and visualization with Jupyter notebooks and scripts for reproducible analysis. Useful for class projects and competitions.',
      tech: 'Python • Pandas • Matplotlib • Jupyter',
      links: [{txt:'Notebooks', href:'https://github.com/yourusername/data-dashboard'}]
    },
    3: {
      title: 'Notes Manager (Android prototype)',
      desc: 'Simple Android notes app demonstrating local persistence with SQLite, search and basic UI patterns.',
      tech: 'Android • Java • SQLite',
      links: [{txt:'Source', href:'https://github.com/yourusername/notes-app'}]
    }
  };

  projectOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      openProjectModal(id);
    });
  });

  function openProjectModal(id){
    const p = projectsData[id];
    if(!p) return;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;
    modalTech.textContent = p.tech;
    modalLinks.innerHTML = '';
    p.links.forEach(l => {
      const a = document.createElement('a');
      a.href = l.href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'btn small';
      a.style.marginRight = '0.4rem';
      a.textContent = l.txt;
      modalLinks.appendChild(a);
    });
    projectModal.setAttribute('aria-hidden', 'false');
  }

  modalClose.addEventListener('click', () => {
    projectModal.setAttribute('aria-hidden', 'true');
  });

  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) projectModal.setAttribute('aria-hidden', 'true');
  });

  // Contact form: local validation + fake send
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const msg = form.message.value.trim();

    if (!name || !email || !msg) {
      status.textContent = 'Please complete all fields.';
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      status.textContent = 'Please enter a valid email.';
      return;
    }

    // Replace below with real send (e.g., server, Formspree, or emailjs)
    status.textContent = 'Sending...';
    setTimeout(() => {
      status.textContent = 'Message sent! I will reply to ' + email + ' soon.';
      form.reset();
    }, 900);
  });

  // Accessibility: skip link focus fix for some browsers
  const skip = document.querySelector('.skip-link');
  skip.addEventListener('click', () => {
    document.getElementById('main').focus();
  });
});