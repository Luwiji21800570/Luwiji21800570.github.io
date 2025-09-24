(() => {
    const parallaxLayers = Array.from(document.querySelectorAll('.parallax-layer'));
    const sections = Array.from(document.querySelectorAll('.section'));
    const navLinks = Array.from(document.querySelectorAll('.nav-link, .nav-logo'));
    const buttons = Array.from(document.querySelectorAll('.btn'));
  
    let latestY = 0;
    let ticking = false;
  
    function onScroll() {
      latestY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          parallaxLayers.forEach(layer => {
            const rate = parseFloat(layer.dataset.rate || 0.05);
            layer.style.transform = `translateY(${latestY * rate}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.18 });
  
    sections.forEach(s => observer.observe(s));
  
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.add('flash');
        setTimeout(() => target.classList.remove('flash'), 700);
      });
    });
  
    function createRipple(e) {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.6;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    }
  
    buttons.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        createRipple(e);
        btn.style.transform = 'scale(0.985)';
      });
      btn.addEventListener('pointerup', () => {
        btn.style.transform = '';
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.transform = '';
      });
  
      const target = btn.dataset.target;
      if (target) {
        btn.addEventListener('click', (e) => {
          const el = document.querySelector(target);
          if (!el) return;
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          el.classList.add('flash');
          setTimeout(()=>el.classList.remove('flash'), 700);
        });
      }
    });
  
    window.addEventListener('load', () => {
      const hero = document.querySelector('#hero');
      if (hero) {
        hero.classList.add('in-view');
      }
    });
  
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
  
    if (navToggle && navLinksContainer) {
      navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        navLinksContainer.classList.toggle('open');
      });
  
      navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinksContainer.classList.remove('open');
          navToggle.setAttribute('aria-expanded', false);
        });
      });
    }
  
    (() => {
      const container = document.querySelector('.floating-blobs');
      const blobCount = 10;
      const blobs = [];
  
      class Blob {
        constructor() {
          this.el = document.createElement('div');
          this.el.className = 'floating-blob';
          this.size = 60 + Math.random() * 60;
          this.el.style.width = `${this.size}px`;
          this.el.style.height = `${this.size}px`;
          this.x = Math.random() * window.innerWidth;
          this.y = Math.random() * window.innerHeight;
          this.vx = (Math.random() - 0.5) * 0.3;
          this.vy = (Math.random() - 0.5) * 0.3;
          container.appendChild(this.el);
        }
  
        update() {
          this.x += this.vx;
          this.y += this.vy;
  
          if (this.x < -this.size) this.x = window.innerWidth + this.size;
          else if (this.x > window.innerWidth + this.size) this.x = -this.size;
  
          if (this.y < -this.size) this.y = window.innerHeight + this.size;
          else if (this.y > window.innerHeight + this.size) this.y = -this.size;
  
          this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
        }
      }
  
      for (let i = 0; i < blobCount; i++) {
        blobs.push(new Blob());
      }
  
      function animate() {
        blobs.forEach(blob => blob.update());
        requestAnimationFrame(animate);
      }
  
      animate();
  
      window.addEventListener('resize', () => {
        blobs.forEach(blob => {
          blob.x = Math.random() * window.innerWidth;
          blob.y = Math.random() * window.innerHeight;
        });
      });
    })();
  
  })();
