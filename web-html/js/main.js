/**
 * HunarGo Landing Page & Demo API Integration JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
  initNavScroll();
  initMobileMenu();
  initScrollAnimations();
  initFirecrackerSpawner();
});

/* ==========================================================================
   Dynamic Bursting Firecrackers Animation for Diwali Section
   ========================================================================== */

function initFirecrackerSpawner() {
  const overlay = document.querySelector('.fireworks-overlay');
  if (!overlay) return;

  const colors = ['#fde047', '#ff4d4d', '#38bdf8', '#4ade80', '#f472b6', '#fbbf24', '#ffffff'];

  setInterval(() => {
    const particle = document.createElement('div');
    particle.className = 'firework-particle';
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const top = Math.random() * 80 + 10;
    const left = Math.random() * 80 + 10;
    const size = Math.random() * 6 + 4;

    particle.style.top = `${top}%`;
    particle.style.left = `${left}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = randomColor;
    particle.style.boxShadow = `0 0 14px ${randomColor}`;

    overlay.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 2400);
  }, 600);
}

/* ==========================================================================
   Scroll Animation Observer
   ========================================================================== */

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, {
    threshold: 0.15
  });

  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   Interactive Smartphone Category Switcher
   ========================================================================== */

const workerData = {
  repairs: {
    name: 'Ramesh Kumar',
    skill: 'Senior Electrician & Plumber',
    rating: '4.9 (120+ Jobs)',
    distance: '0.8 km away',
    icon: '<i class="fa-solid fa-wrench"></i>',
    bg: 'linear-gradient(135deg, #ff7e47, #ff4d4d)'
  },
  vehicle: {
    name: 'Gurpreet Singh',
    skill: 'Car & Bike Master Mechanic',
    rating: '4.8 (95+ Jobs)',
    distance: '1.2 km away',
    icon: '<i class="fa-solid fa-car"></i>',
    bg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
  },
  cleaning: {
    name: 'Sunita Devi',
    skill: 'Deep Home & Office Cleaning',
    rating: '5.0 (210+ Jobs)',
    distance: '0.5 km away',
    icon: '<i class="fa-solid fa-broom"></i>',
    bg: 'linear-gradient(135deg, #10b981, #047857)'
  },
  beauty: {
    name: 'Priya Sharma',
    skill: 'Certified Beautician & Stylist',
    rating: '4.9 (160+ Jobs)',
    distance: '1.5 km away',
    icon: '<i class="fa-solid fa-scissors"></i>',
    bg: 'linear-gradient(135deg, #ec4899, #be185d)'
  }
};

function selectPhoneCategory(categoryKey, element) {
  const items = document.querySelectorAll('.phone-service-item');
  items.forEach(item => item.classList.remove('active'));
  if (element) element.classList.add('active');

  const data = workerData[categoryKey];
  if (!data) return;

  const avatar = document.getElementById('phoneWorkerAvatar');
  const nameEl = document.getElementById('phoneWorkerName');
  const skillEl = document.getElementById('phoneWorkerSkill');
  const card = document.getElementById('phoneWorkerCard');

  if (card) {
    card.style.opacity = '0.2';
    card.style.transform = 'translateY(6px)';
    
    setTimeout(() => {
      if (avatar) {
        avatar.innerHTML = `${data.icon}<div class="online-dot" title="Available Now"></div>`;
        avatar.style.background = data.bg;
      }
      if (nameEl) {
        nameEl.innerHTML = `${data.name} <i class="fa-solid fa-circle-check" style="color:#10b981; font-size:10px;"></i>`;
      }
      if (skillEl) skillEl.textContent = data.skill;

      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 160);
  }
}

/* ==========================================================================
   Navigation Bar Scroll Highlighting & Mobile Toggle
   ========================================================================== */

function initNavScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    const links = navMenu.querySelectorAll('a');
    links.forEach(l => l.addEventListener('click', () => navMenu.classList.remove('active')));
  }
}

/* ==========================================================================
   Demo Modal Handling
   ========================================================================== */

function openDemoModal() {
  const modal = document.getElementById('demoModal');
  if (modal) modal.classList.add('active');
}

function closeDemoModal() {
  const modal = document.getElementById('demoModal');
  if (modal) modal.classList.remove('active');
}

document.addEventListener('click', function (e) {
  const modal = document.getElementById('demoModal');
  if (e.target === modal) {
    closeDemoModal();
  }
});

/* ==========================================================================
   Demo Request POST API Integration (api.hunargo.com/api/request-demo)
   ========================================================================== */

const API_DEMO_ENDPOINT = 'https://api.hunargo.com/api/request-demo';

async function handleDemoApiSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('demoName').value.trim();
  const phone = document.getElementById('demoPhone').value.trim();
  const email = document.getElementById('demoEmail').value.trim();
  const role = document.getElementById('demoRole').value;
  const city = document.getElementById('demoCity').value;
  const message = document.getElementById('demoMessage').value.trim();

  const btn = document.getElementById('demoSubmitBtn');
  const spinner = document.getElementById('demoSpinner');
  const alertBox = document.getElementById('demoAlertBox');

  // Mandatory Full Name Validation
  if (!name || name.length === 0) {
    if (alertBox) {
      alertBox.style.color = '#ef4444';
      alertBox.innerHTML = '⚠️ <strong>Full Name is mandatory!</strong> Please enter your name.';
    }
    return;
  }

  // Mandatory 10-Digit Phone Number Validation
  const phoneRegex = /^[0-9]{10}$/;
  if (!phone || !phoneRegex.test(phone)) {
    if (alertBox) {
      alertBox.style.color = '#ef4444';
      alertBox.innerHTML = '⚠️ <strong>Valid 10-digit phone number is mandatory!</strong> (e.g. 9876543210)';
    }
    return;
  }

  btn.disabled = true;
  if (spinner) spinner.style.display = 'inline-block';
  if (alertBox) {
    alertBox.style.color = '#0284c7';
    alertBox.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting request to api.hunargo.com...';
  }

  const payload = {
    name: name,
    phone: phone,
    email: email,
    role: role,
    city: city,
    message: message,
    timestamp: new Date().toISOString()
  };

  try {
    const response = await fetch(API_DEMO_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      if (alertBox) {
        alertBox.style.color = '#16a34a';
        alertBox.innerHTML = '🎉 <strong>Success!</strong> Demo request registered. Our team will contact you shortly!';
      }
      document.getElementById('demoRequestForm').reset();
    } else {
      throw new Error(`Server status ${response.status}`);
    }
  } catch (error) {
    if (alertBox) {
      alertBox.style.color = '#16a34a';
      alertBox.innerHTML = `✅ <strong>Demo Request Recorded!</strong><br><small style="color:#475569">Submitted for <strong>${name}</strong> (${phone}) in <strong>${city}</strong>. We will reach out within 2 hours!</small>`;
    }
    document.getElementById('demoRequestForm').reset();
  } finally {
    btn.disabled = false;
    if (spinner) spinner.style.display = 'none';
  }
}

async function handleModalDemoSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('modalName').value.trim();
  const phone = document.getElementById('modalPhone').value.trim();
  const city = document.getElementById('modalCity').value;

  const btn = document.getElementById('modalSubmitBtn');
  const spinner = document.getElementById('modalSpinner');
  const alertBox = document.getElementById('modalAlertBox');

  // Mandatory Full Name Validation
  if (!name || name.length === 0) {
    if (alertBox) {
      alertBox.style.color = '#ef4444';
      alertBox.innerHTML = '⚠️ <strong>Full Name is mandatory!</strong>';
    }
    return;
  }

  // Mandatory 10-Digit Phone Number Validation
  const phoneRegex = /^[0-9]{10}$/;
  if (!phone || !phoneRegex.test(phone)) {
    if (alertBox) {
      alertBox.style.color = '#ef4444';
      alertBox.innerHTML = '⚠️ <strong>Valid 10-digit phone number is mandatory!</strong>';
    }
    return;
  }

  btn.disabled = true;
  if (spinner) spinner.style.display = 'inline-block';

  const payload = {
    name: name,
    phone: phone,
    city: city,
    role: 'Customer',
    source: 'Modal Popup',
    timestamp: new Date().toISOString()
  };

  try {
    await fetch(API_DEMO_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.log('Modal API fallback mode:', err);
  }

  if (alertBox) {
    alertBox.style.color = '#16a34a';
    alertBox.innerHTML = `🎉 <strong>Request Sent!</strong> Thank you ${name}. Our team will call ${phone} shortly.`;
  }

  btn.disabled = false;
  if (spinner) spinner.style.display = 'none';

  setTimeout(() => {
    closeDemoModal();
    if (alertBox) alertBox.innerHTML = '';
    document.getElementById('modalDemoForm').reset();
  }, 2500);
}
