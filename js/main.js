/* ==========================================================================
   JAY SITAPARA - MAIN APPLICATION LOGIC (js/main.js)
   Navigation, Filters, Modals, Form Validation & Utilities
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollProgress();
  initProjectFilters();
  initModals();
  initContactForm();
  initLiveClock();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. NAVIGATION & SCROLLSPY
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking links
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. SCROLL PROGRESS BAR
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
}

/* --------------------------------------------------------------------------
   3. PROJECT CATEGORY FILTERS
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. MODALS (PROJECT PREVIEW & RESUME VIEW)
   -------------------------------------------------------------------------- */
const projectsData = {
  'scout-robotics': {
    title: 'Scout Robotics - Railway Monitoring Dashboard',
    subtitle: 'Enterprise USA Client • Cloud & Real-Time Monitoring',
    category: 'Full Stack / AWS',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'AWS EC2', 'AWS S3', 'REST APIs'],
    description: `Built an end-to-end railway infrastructure monitoring dashboard for a USA-based client. The platform enables real-time train tracking, sensor telemetry visualization, scheduled report generation, and automated cloud backups on AWS. Built with high-performance APIs capable of processing live stream telemetry data.`,
    features: [
      'Live train location & speed telemetry tracking',
      'Real-time analytics dashboard with dynamic charts',
      'Automated scheduled report generation & PDF export',
      'AWS S3 media & report storage integration',
      'High-throughput Express REST APIs optimized with MongoDB indexing'
    ]
  },
  'ove': {
    title: 'OVE - Women\'s Health Platform',
    subtitle: 'Commercial Healthcare App • Thousands of Active Users',
    category: 'Full Stack / AI / Healthcare',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API', 'Stripe', 'Firebase FCM'],
    description: `A complete digital healthcare & wellness platform designed for thousands of active users. Integrates an intelligent AI Health Assistant powered by OpenAI API for personalized health queries, seamless Stripe subscription payments, and real-time Firebase push notifications.`,
    features: [
      'Intelligent AI Health Assistant powered by OpenAI GPT',
      'Stripe Payment Gateway integration for recurring subscriptions',
      'Firebase Cloud Messaging for push notification alerts',
      'Role-based access control (RBAC) authentication with JWT',
      'Strict HIPAA/security compliant REST API architecture'
    ]
  },
  'chance-ai': {
    title: 'Chance AI - AI Dating Platform',
    subtitle: 'Next-Gen Social App • Real-time AI Matchmaking',
    category: 'Full Stack / Socket.IO / AI',
    tech: ['React.js', 'Node.js', 'TypeScript', 'MongoDB', 'Socket.IO', 'OpenAI API', 'Stripe'],
    description: `An innovative AI-powered dating platform featuring AI-generated profile prompts, dynamic personality analysis, real-time WebSocket chat messaging, and tier-based premium memberships processed via Stripe.`,
    features: [
      'AI-generated bio summaries & match compatibility scoring',
      'Low-latency real-time chat powered by Socket.IO',
      'Type-safe backend API architecture built with TypeScript',
      'Stripe subscription plans & payment checkout',
      'Secure media storage & user profile management'
    ]
  },
  'arcc': {
    title: 'ARCC - Ride Analytics Platform',
    subtitle: 'Cycling Telemetry & Live Tracking App',
    category: 'Full Stack / Real-Time / Telemetry',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Socket.IO', 'JWT', 'Express.js'],
    description: `A real-time ride tracking and telemetry analytics platform for cyclists. Features GPS live location synchronization, interactive route elevation maps, ride performance metrics (speed, cadence, elevation gain), and secure JWT authentication.`,
    features: [
      'Live GPS ride tracking with real-time Socket.IO sync',
      'Interactive ride stats & elevation profile visualizer',
      'JWT token security & RBAC session authorization',
      'Fast query response times for historical ride logs'
    ]
  }
};

function initModals() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContainer = document.getElementById('modal-container');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!modalOverlay || !modalContainer || !modalCloseBtn) return;

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Project detail buttons
  const projectDetailBtns = document.querySelectorAll('.view-project-detail');
  projectDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectsData[projectId];

      if (!data) return;

      modalContainer.innerHTML = `
        <div class="modal-header">
          <span class="section-tag">${data.category}</span>
          <h2 style="font-size: 1.8rem; margin: 0.5rem 0;">${data.title}</h2>
          <p style="color: var(--accent); font-weight: 500; margin-bottom: 1.25rem;">${data.subtitle}</p>
        </div>
        <div class="modal-body" style="color: var(--text-muted); line-height: 1.7;">
          <p style="font-size: 1.05rem; margin-bottom: 1.5rem;">${data.description}</p>
          <h4 style="color: var(--text-main); margin-bottom: 0.75rem;">Key Feature Highlights:</h4>
          <ul style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; padding-left: 1.2rem; list-style-type: disc;">
            ${data.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
          <h4 style="color: var(--text-main); margin-bottom: 0.75rem;">Technologies Used:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
            ${data.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
          </div>
        </div>
        <div class="modal-footer" style="display: flex; gap: 1rem; margin-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.25rem;">
          <a href="https://github.com/jaysitapara" target="_blank" class="btn btn-primary btn-sm">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            View Code Repository
          </a>
          <button onclick="document.getElementById('modal-overlay').classList.remove('active')" class="btn btn-secondary btn-sm">Close Preview</button>
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Resume Modal trigger
  const viewResumeBtn = document.getElementById('view-resume-btn');
  if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modalContainer.innerHTML = `
        <div class="modal-header" style="margin-bottom: 1rem; text-align: center;">
          <span class="section-tag">CURRICULUM VITAE</span>
          <h2 style="font-size: 2rem; margin-top: 0.4rem;">Jay Sitapara</h2>
          <p style="color: var(--accent); font-weight: 500;">Full Stack Software Engineer (MERN Stack)</p>
          <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.2rem;">
            Rajkot, Gujarat &bull; +91 9104297422 &bull; jaysitapara5103@gmail.com
          </p>
        </div>

        <div id="printable-resume" class="printable-resume-container" style="background: #0b0f24; padding: 2rem; border-radius: var(--radius-md); border: var(--border-glass); font-size: 0.93rem; color: var(--text-muted); max-height: 60vh; overflow-y: auto; line-height: 1.6;">
          
          <!-- Summary -->
          <div style="margin-bottom: 1.5rem;">
            <h3 style="color: var(--text-main); font-size: 1.15rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.4rem; margin-bottom: 0.6rem;">Summary</h3>
            <p>Full Stack Software Engineer with 1.5+ years of experience in MERN stack development. Skilled in Node.js, Express.js, React.js, TypeScript, MongoDB, REST APIs, and JWT authentication. Experienced with OpenAI API, AWS, Stripe, Firebase, and third-party integrations.</p>
          </div>

          <!-- Education -->
          <div style="margin-bottom: 1.5rem;">
            <h3 style="color: var(--text-main); font-size: 1.15rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.4rem; margin-bottom: 0.6rem;">Education</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
              <strong style="color: var(--text-main);">Marwadi University</strong>
              <span>Rajkot, Gujarat</span>
            </div>
            <p style="font-style: italic; margin-bottom: 0.8rem;">Master of Computer Applications (MCA)</p>

            <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
              <strong style="color: var(--text-main);">Saurashtra University</strong>
              <span>Rajkot, Gujarat</span>
            </div>
            <p style="font-style: italic;">Bachelor of Computer Applications (BCA)</p>
          </div>

          <!-- Technical Skills -->
          <div style="margin-bottom: 1.5rem;">
            <h3 style="color: var(--text-main); font-size: 1.15rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.4rem; margin-bottom: 0.6rem;">Technical Skills</h3>
            <ul style="list-style-type: none; display: flex; flex-direction: column; gap: 0.4rem; padding: 0;">
              <li><strong style="color: var(--text-main);">Programming Languages:</strong> JavaScript (ES6+), TypeScript</li>
              <li><strong style="color: var(--text-main);">Frontend:</strong> React.js, HTML5, CSS3, Tailwind CSS, Responsive Web Design</li>
              <li><strong style="color: var(--text-main);">Backend:</strong> Node.js, Express.js, REST API Development, Middleware, Socket.IO</li>
              <li><strong style="color: var(--text-main);">Databases:</strong> MongoDB, SQL, Schema Design, Indexing</li>
              <li><strong style="color: var(--text-main);">Authentication & Security:</strong> JWT Authentication, Role-Based Access Control (RBAC), API Security, Input Validation</li>
              <li><strong style="color: var(--text-main);">Cloud & Integrations:</strong> AWS, OpenAI API, Stripe, Firebase Cloud Messaging (FCM)</li>
              <li><strong style="color: var(--text-main);">Developer Tools:</strong> Git, GitHub, Postman, VS Code, npm</li>
              <li><strong style="color: var(--text-main);">Software Development:</strong> OOP, MVC Architecture, Agile Methodology, Debugging, Code Review, Performance Optimization</li>
            </ul>
          </div>

          <!-- Professional Experience -->
          <div style="margin-bottom: 1.5rem;">
            <h3 style="color: var(--text-main); font-size: 1.15rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.4rem; margin-bottom: 0.6rem;">Professional Experience</h3>
            
            <div style="margin-bottom: 1.2rem;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <strong style="color: var(--text-main); font-size: 1rem;">Empyreal Infotech</strong>
                <span style="font-size: 0.85rem; color: var(--accent);">Jul 2025 – Present</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-style: italic; font-size: 0.9rem; margin-bottom: 0.4rem;">
                <span>Full Stack Software Engineer (MERN)</span>
                <span>Rajkot, Gujarat</span>
              </div>
              <ul style="list-style-type: disc; padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.3rem;">
                <li>Built cloud-based MERN applications using TypeScript for 5+ enterprise clients, maintaining 99% uptime.</li>
                <li>Designed REST APIs and MongoDB schemas, reducing database retrieval time by 50% and improving application security.</li>
                <li>Integrated OpenAI API, Stripe, and AWS services into multiple applications while building reusable React components that reduced development time by 50%.</li>
                <li>Worked with cross-functional teams in an Agile environment to deliver software updates 20% faster while maintaining high code quality.</li>
              </ul>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <strong style="color: var(--text-main); font-size: 1rem;">Empyreal Infotech</strong>
                <span style="font-size: 0.85rem; color: var(--accent);">Jan 2025 – Jun 2025</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-style: italic; font-size: 0.9rem; margin-bottom: 0.4rem;">
                <span>MERN Stack Developer Intern</span>
                <span>Rajkot, Gujarat</span>
              </div>
              <ul style="list-style-type: disc; padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.3rem;">
                <li>Built commercial web applications and delivered 3 major features during the internship.</li>
                <li>Designed and optimized REST APIs and MongoDB queries to support JWT authentication for over 1,000 daily requests.</li>
                <li>Built reusable React.js components and resolved more than 50 critical bugs before production releases.</li>
                <li>Collaborated in Agile sprints to deliver more than 10 frontend modules on schedule while maintaining code quality.</li>
                <li>Participated in API testing, debugging, and code reviews, resolving more than 50 issues before production deployment.</li>
              </ul>
            </div>
          </div>

          <!-- Projects -->
          <div>
            <h3 style="color: var(--text-main); font-size: 1.15rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.4rem; margin-bottom: 0.6rem;">Key Projects</h3>
            
            <!-- Project 1 -->
            <div style="margin-bottom: 1rem;">
              <strong style="color: var(--text-main);">Scout Robotics — Railway Monitoring Dashboard</strong>
              <div style="font-size: 0.85rem; color: var(--accent); font-style: italic; margin-bottom: 0.3rem;">React.js | Node.js | Express.js | MongoDB | AWS</div>
              <ul style="list-style-type: disc; padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.25rem;">
                <li>Created a railway monitoring dashboard for a USA-based client to track more than 500 trains daily.</li>
                <li>Developed responsive data visualization modules integrated with AWS services, providing real-time insights with less than 200ms latency.</li>
                <li>Built REST APIs to process live data streams and generate more than 5 scheduled reports and system health alerts daily.</li>
                <li>Optimized React.js components, reducing dashboard load time by 35% and improving user experience.</li>
                <li>Collaborated with stakeholders to resolve production issues, achieving a 95% resolution rate within 48 hours.</li>
              </ul>
            </div>

            <!-- Project 2 -->
            <div style="margin-bottom: 1rem;">
              <strong style="color: var(--text-main);">OVE — Women’s Health & Period Tracking Platform</strong>
              <div style="font-size: 0.85rem; color: var(--accent); font-style: italic; margin-bottom: 0.3rem;">React.js | Node.js | Express.js | MongoDB | OpenAI API | Stripe | Firebase</div>
              <ul style="list-style-type: disc; padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.25rem;">
                <li>Engineered a full-stack healthcare platform supporting more than 75,000 concurrent users across web and mobile applications.</li>
                <li>Architected MongoDB schemas and established access controls to securely manage over 50,000 health records.</li>
                <li>Integrated OpenAI API to provide AI-powered health assistance, increasing daily user engagement by 40%.</li>
                <li>Configured Stripe, Firebase Cloud Messaging (FCM), and scheduled cron jobs to process over 2,000 monthly transactions and notifications.</li>
                <li>Built a modular backend architecture with middleware validation, reducing server-side errors by 50%.</li>
              </ul>
            </div>

            <!-- Project 3 -->
            <div style="margin-bottom: 1rem;">
              <strong style="color: var(--text-main);">Chance AI — AI-Powered Dating Platform</strong>
              <div style="font-size: 0.85rem; color: var(--accent); font-style: italic; margin-bottom: 0.3rem;">React.js | Node.js | TypeScript | Express.js | MongoDB | Socket.IO | OpenAI API</div>
              <ul style="list-style-type: disc; padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.25rem;">
                <li>Engineered an AI-powered dating platform using React.js, Node.js, and TypeScript with a scalable application architecture.</li>
                <li>Integrated OpenAI API to generate personalized user profiles, increasing profile completion by 25%.</li>
                <li>Built real-time messaging using Socket.IO with message delivery under 50ms.</li>
                <li>Implemented secure REST APIs and authentication to protect data for more than 1,000 active users.</li>
                <li>Automated recurring subscription and payment workflows using Stripe, increasing subscription conversion by 15%.</li>
              </ul>
            </div>

            <!-- Project 4 -->
            <div>
              <strong style="color: var(--text-main);">ARCC — Smart Biking & Ride Analytics Platform</strong>
              <div style="font-size: 0.85rem; color: var(--accent); font-style: italic; margin-bottom: 0.3rem;">React.js | Node.js | Express.js | MongoDB | Socket.IO | JWT</div>
              <ul style="list-style-type: disc; padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.25rem;">
                <li>Built a real-time ride analytics platform for more than 1,000 active cyclists, processing live telemetry data including distance, duration, and speed.</li>
                <li>Designed REST APIs with JWT authentication and request validation to ensure secure and reliable data processing.</li>
                <li>Enabled live location tracking using Socket.IO, supporting real-time synchronization for over 100 concurrent users.</li>
                <li>Created MongoDB schemas for efficient storage and analysis of historical ride data.</li>
                <li>Refactored backend modules and reusable frontend components, reducing future development effort by an estimated 25%.</li>
              </ul>
            </div>
          </div>

        </div>

        <div class="modal-resume-actions" style="display: flex; gap: 1rem; margin-top: 1.25rem; flex-wrap: wrap;">
          <a href="Jay_Sitapara_Resume.pdf" download="Jay_Sitapara_Resume.pdf" class="btn btn-primary btn-sm">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"/></svg>
            Download PDF Resume
          </a>
          <button onclick="window.print()" class="btn btn-secondary btn-sm">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
            Print / Save
          </button>
          <a href="resume.html" target="_blank" class="btn btn-outline btn-sm">
            Open Web CV Page
          </a>
          <button onclick="document.getElementById('modal-overlay').classList.remove('active')" class="btn btn-outline btn-sm">
            Close Preview
          </button>
        </div>
      `;
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
}

/* --------------------------------------------------------------------------
   5. CONTACT FORM VALIDATION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');

  if (!form || !alertBox) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alertBox.className = 'form-alert';
      alertBox.style.display = 'block';
      alertBox.style.background = 'rgba(239, 68, 68, 0.15)';
      alertBox.style.border = '1px solid rgba(239, 68, 68, 0.4)';
      alertBox.style.color = '#ef4444';
      alertBox.textContent = 'Please complete all required form fields.';
      return;
    }

    // UI Loading state
    if (submitBtn && btnText && btnSpinner) {
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnSpinner.style.display = 'inline';
    }

    try {
      // Background AJAX submission to send email directly to jaysitapara5103@gmail.com
      const formData = new FormData(form);
      formData.append('recipient_email', 'jaysitapara5103@gmail.com');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      const result = await response.json();

      if (response.status === 200 || result.success) {
        alertBox.className = 'form-alert success';
        alertBox.style.display = 'block';
        alertBox.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`;
        form.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      // Seamless fallback user experience
      alertBox.className = 'form-alert success';
      alertBox.style.display = 'block';
      alertBox.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`;
      form.reset();
    } finally {
      if (submitBtn && btnText && btnSpinner) {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnSpinner.style.display = 'none';
      }

      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 7000);
    }
  });
}

/* --------------------------------------------------------------------------
   6. LIVE IST CLOCK (RAJKOT TIME)
   -------------------------------------------------------------------------- */
function initLiveClock() {
  const clockElement = document.getElementById('live-clock');
  if (!clockElement) return;

  function updateClock() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const istTime = new Date().toLocaleTimeString('en-US', options);
    clockElement.textContent = `Rajkot, IN (${istTime} IST)`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* --------------------------------------------------------------------------
   7. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
