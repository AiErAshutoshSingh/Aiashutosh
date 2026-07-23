/**
 * ASHUTOSH SINGH - AI ENGINEER PORTFOLIO INTERACTIVITY
 * Features: Background Particles, Typing Effect, Skill Tabs & Animation,
 * Card 3D Tilt, Scroll Reveal, Form Handler, Testimonials Slider
 */

document.addEventListener('DOMContentLoaded', () => {
  initAuroraParticles();
  initTypingEffect();
  initNavbar();
  initScrollReveal();
  initSkillProgress();
  initSkillTabs();
  init3DTilt();
  initTestimonialsSlider();
  initContactForm();
  initCounterAnimation();
  initCursorGlow();
});

/* 1. Aurora Background Particles */
function initAuroraParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 15), 80);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      color: ['rgba(6, 182, 212, ', 'rgba(59, 130, 246, ', 'rgba(139, 92, 246, '][Math.floor(Math.random() * 3)],
      alpha: Math.random() * 0.5 + 0.2,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* 2. Typing Effect */
function initTypingEffect() {
  const target = document.getElementById('typing-roles');
  if (!target) return;

  const roles = [
    'AI Engineer',
    'GenAI Engineer',
    'LLM Engineer',
    'Machine Learning Engineer',
    'Data Scientist',
    'Data Analyst',
    'Prompt Engineer'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 100;

  function type() {
    const currentRole = roles[roleIdx];
    
    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      speed = 50;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      speed = 100;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      speed = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400; // Pause before typing next
    }

    setTimeout(type, speed);
  }

  type();
}

/* 3. Sticky Navbar & Mobile Toggle */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

/* 4. Scroll Reveal Intersection Observer */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1
  });

  reveals.forEach(el => observer.observe(el));
}

/* 5. Animated Skill Progress Bars */
function initSkillProgress() {
  const skillCards = document.querySelectorAll('.skill-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.progress-bar-fill');
        if (fill) {
          fill.style.width = fill.getAttribute('data-percent') + '%';
        }
      }
    });
  }, { threshold: 0.2 });

  skillCards.forEach(card => observer.observe(card));
}

/* 6. Skill Category Tabs */
function initSkillTabs() {
  const tabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      skillCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 7. Glass Card 3D Tilt Effect */
function init3DTilt() {
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });
}

/* 8. Testimonials Slider */
function initTestimonialsSlider() {
  const track = document.getElementById('testimonial-track');
  const dotsContainer = document.getElementById('testimonial-dots');
  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll('.testimonial-card');
  let currentSlide = 0;

  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  // Auto slide every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }, 5000);
}

/* 9. Contact Form Interactive Handler */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = '#10b981';
      form.reset();

      setTimeout(() => {
        btn.innerHTML = origText;
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    }, 1500);
  });
}

/* 10. Counter Animation */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number, .counter-val');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetNum = parseInt(counter.getAttribute('data-target') || counter.textContent);
        if (isNaN(targetNum)) return;

        let count = 0;
        const increment = Math.ceil(targetNum / 40);

        const updateCount = () => {
          count += increment;
          if (count < targetNum) {
            counter.textContent = count + '+';
            setTimeout(updateCount, 30);
          } else {
            counter.textContent = targetNum + '+';
          }
        };

        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* 11. Subtle Mouse Cursor Glow Follower */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}
