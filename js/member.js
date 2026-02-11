/**
 * MEMBER AREA - Auth gate, progress tracking, navigation
 * Supports multiple courses with independent progress tracking
 */

// Course configurations
const COURSES = {
  'curso': {
    key: 'claude-code-progress',
    total: 14,
    barId: 'progress-bar',
    textId: 'progress-text'
  },
  'chatgpt-mastery': {
    key: 'chatgpt-mastery-progress',
    total: 15,
    barId: 'progress-bar-chatgpt',
    textId: 'progress-text-chatgpt'
  },
  'ia-negocios': {
    key: 'ia-negocios-progress',
    total: 16,
    barId: 'progress-bar-negocios',
    textId: 'progress-text-negocios'
  },
  'ia-criadores': {
    key: 'ia-criadores-progress',
    total: 20,
    barId: 'progress-bar-criadores',
    textId: 'progress-text-criadores'
  }
};

// Detect current course from URL
function detectCourse() {
  const path = window.location.pathname;
  if (path.includes('/chatgpt-mastery/')) return 'chatgpt-mastery';
  if (path.includes('/ia-negocios/')) return 'ia-negocios';
  if (path.includes('/ia-criadores/')) return 'ia-criadores';
  if (path.includes('/curso/')) return 'curso';
  return null;
}

function getProgressKey() {
  const course = detectCourse();
  return course ? COURSES[course].key : null;
}

function getTotalLessons() {
  const course = detectCourse();
  return course ? COURSES[course].total : 14;
}

// Auth check
function checkAuth() {
  const identity = window.netlifyIdentity;
  if (!identity) return;

  identity.on('init', user => {
    if (!user) {
      window.location.href = '/pages/login.html';
    } else {
      initMemberArea(user);
    }
  });
}

// Dynamic greeting based on time of day
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

// Initialize member area
function initMemberArea(user) {
  const displayName = user.user_metadata?.full_name || user.email;

  const userName = document.getElementById('user-name');
  if (userName) {
    userName.textContent = displayName;
  }

  const greetingEl = document.getElementById('welcome-greeting');
  if (greetingEl) {
    greetingEl.innerHTML = getGreeting() + ', <span id="user-name">' + displayName + '</span>';
  }

  const avatar = document.getElementById('user-avatar');
  if (avatar) {
    const initial = displayName.charAt(0).toUpperCase();
    avatar.textContent = initial;
  }

  const userEmail = document.getElementById('user-email');
  if (userEmail) {
    userEmail.textContent = user.email;
  }

  const content = document.getElementById('member-content');
  if (content) {
    content.style.display = 'block';
  }

  updateProgressUI();
  initCheckboxes();
}

// Logout
function handleLogout() {
  const identity = window.netlifyIdentity;
  if (identity) {
    identity.logout();
  }
  window.location.href = '/';
}

// Progress tracking
function getProgress(key) {
  const progressKey = key || getProgressKey();
  if (!progressKey) return {};
  return JSON.parse(localStorage.getItem(progressKey) || '{}');
}

function saveProgress(progress, key) {
  const progressKey = key || getProgressKey();
  if (!progressKey) return;
  localStorage.setItem(progressKey, JSON.stringify(progress));
}

function markComplete(lessonId) {
  const progress = getProgress();
  progress[lessonId] = true;
  saveProgress(progress);
  updateProgressUI();
}

function toggleComplete(lessonId) {
  const progress = getProgress();
  if (progress[lessonId]) {
    delete progress[lessonId];
  } else {
    progress[lessonId] = true;
  }
  saveProgress(progress);
  updateProgressUI();
}

function updateProgressUI() {
  const isDashboard = window.location.pathname.replace(/\/$/, '').endsWith('/member') ||
                      window.location.pathname.replace(/\/$/, '').endsWith('/member/index.html');

  if (isDashboard) {
    // Update all course progress bars on dashboard
    Object.keys(COURSES).forEach(courseId => {
      const config = COURSES[courseId];
      const progress = getProgress(config.key);
      const completed = Object.keys(progress).length;
      const percent = Math.round((completed / config.total) * 100);

      const bar = document.getElementById(config.barId);
      if (bar) {
        bar.style.width = percent + '%';
      }

      const text = document.getElementById(config.textId);
      if (text) {
        text.textContent = percent + '%';
      }
    });
  } else {
    // Single course page - update local progress
    const course = detectCourse();
    if (!course) return;
    const config = COURSES[course];
    const progress = getProgress(config.key);
    const completed = Object.keys(progress).length;
    const percent = Math.round((completed / config.total) * 100);

    const bar = document.getElementById('progress-bar');
    if (bar) {
      bar.style.width = percent + '%';
    }

    const text = document.getElementById('progress-text');
    if (text) {
      text.textContent = `${completed}/${config.total} aulas concluidas (${percent}%)`;
    }
  }

  // Update checkmarks on lesson lists
  const progress = getProgress();
  document.querySelectorAll('[data-lesson]').forEach(el => {
    const lessonId = el.dataset.lesson;
    if (progress[lessonId]) {
      el.classList.add('completed');
    } else {
      el.classList.remove('completed');
    }
  });

  // Update checkboxes
  document.querySelectorAll('.lesson-checkbox').forEach(cb => {
    const lessonId = cb.dataset.lesson;
    cb.checked = !!progress[lessonId];
  });
}

function initCheckboxes() {
  document.querySelectorAll('.lesson-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      toggleComplete(cb.dataset.lesson);
    });
  });

  // Mark complete button on lesson pages
  const markBtn = document.getElementById('mark-complete-btn');
  if (markBtn) {
    markBtn.addEventListener('click', () => {
      const lessonId = markBtn.dataset.lesson;
      markComplete(lessonId);
      markBtn.textContent = 'Aula Concluida!';
      markBtn.classList.add('completed');
      markBtn.disabled = true;
    });

    // Check if already completed
    const progress = getProgress();
    if (progress[markBtn.dataset.lesson]) {
      markBtn.textContent = 'Aula Concluida!';
      markBtn.classList.add('completed');
      markBtn.disabled = true;
    }
  }
}

// Expose logout globally
window.handleLogout = handleLogout;

// Init
document.addEventListener('DOMContentLoaded', checkAuth);
