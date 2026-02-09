/**
 * MEMBER AREA - Auth gate, progress tracking, navigation
 */

const PROGRESS_KEY = 'claude-code-progress';

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

// Initialize member area
function initMemberArea(user) {
  // Show user info
  const userName = document.getElementById('user-name');
  if (userName) {
    userName.textContent = user.user_metadata?.full_name || user.email;
  }

  const userEmail = document.getElementById('user-email');
  if (userEmail) {
    userEmail.textContent = user.email;
  }

  // Show content
  const content = document.getElementById('member-content');
  if (content) {
    content.style.display = 'block';
  }

  // Init progress
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
function getProgress() {
  return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
}

function saveProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
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
  const progress = getProgress();
  const totalLessons = 14;
  const completed = Object.keys(progress).length;
  const percent = Math.round((completed / totalLessons) * 100);

  // Update progress bar
  const bar = document.getElementById('progress-bar');
  if (bar) {
    bar.style.width = percent + '%';
  }

  // Update progress text
  const text = document.getElementById('progress-text');
  if (text) {
    text.textContent = `${completed}/${totalLessons} aulas concluidas (${percent}%)`;
  }

  // Update checkmarks on lesson lists
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
