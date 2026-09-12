const API = '/api/users';
const AUTH_API = '/api/auth';

let editingId = null;
let authToken = localStorage.getItem('token') || null;

// ---------- Auth tabs ----------
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    document.getElementById('login-form').classList.toggle('hidden', tab !== 'login');
    document.getElementById('register-form').classList.toggle('hidden', tab !== 'register');
  });
});

function setAuthMessage(text, isError = false) {
  const el = document.getElementById('auth-message');
  el.textContent = text;
  el.className = 'message ' + (isError ? 'error' : 'success');
}

function updateAuthStatus() {
  const el = document.getElementById('auth-status');
  el.textContent = authToken ? 'Logged in' : 'Not logged in';
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  try {
    const res = await fetch(`${AUTH_API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    authToken = data.token;
    localStorage.setItem('token', authToken);
    setAuthMessage(`Logged in as ${data.name}`);
    updateAuthStatus();
    loadUsers();
  } catch (err) {
    setAuthMessage(err.message, true);
  }
});

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  try {
    const res = await fetch(`${AUTH_API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    authToken = data.token;
    localStorage.setItem('token', authToken);
    setAuthMessage(`Registered and logged in as ${data.name}`);
    updateAuthStatus();
    loadUsers();
  } catch (err) {
    setAuthMessage(err.message, true);
  }
});

// ---------- Profile CRUD ----------
const form = document.getElementById('user-form');
const tbody = document.getElementById('users-tbody');
const formMessage = document.getElementById('form-message');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-edit');

function setFormMessage(text, isError = false) {
  formMessage.textContent = text;
  formMessage.className = 'message ' + (isError ? 'error' : 'success');
}

async function loadUsers() {
  const res = await fetch(API);
  const users = await res.json();
  tbody.innerHTML = '';
  document.getElementById('empty-message').classList.toggle('hidden', users.length > 0);

  users.forEach((u) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${u.id}</td>
      <td>${escapeHtml(u.name)}</td>
      <td>${escapeHtml(u.email)}</td>
      <td>${u.age ?? ''}</td>
      <td>${escapeHtml(u.bio ?? '')}</td>
      <td class="actions">
        <button class="secondary" data-edit="${u.id}">Edit</button>
        <button class="danger" data-delete="${u.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('[data-edit]').forEach((btn) =>
    btn.addEventListener('click', () => startEdit(btn.dataset.edit, users))
  );
  tbody.querySelectorAll('[data-delete]').forEach((btn) =>
    btn.addEventListener('click', () => deleteUser(btn.dataset.delete))
  );
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function startEdit(id, users) {
  const user = users.find((u) => String(u.id) === String(id));
  if (!user) return;
  editingId = user.id;
  document.getElementById('user-id').value = user.id;
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('age').value = user.age ?? '';
  document.getElementById('bio').value = user.bio ?? '';
  formTitle.textContent = `Edit Profile #${user.id}`;
  submitBtn.textContent = 'Save Changes';
  cancelBtn.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
  editingId = null;
  form.reset();
  formTitle.textContent = 'Add New Profile';
  submitBtn.textContent = 'Add Profile';
  cancelBtn.classList.add('hidden');
}

cancelBtn.addEventListener('click', resetForm);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    age: document.getElementById('age').value ? Number(document.getElementById('age').value) : null,
    bio: document.getElementById('bio').value,
  };

  try {
    let res;
    if (editingId) {
      res = await fetch(`${API}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Something went wrong');
    setFormMessage(editingId ? 'Profile updated.' : 'Profile added.');
    resetForm();
    loadUsers();
  } catch (err) {
    setFormMessage(err.message, true);
  }
});

async function deleteUser(id) {
  if (!confirm('Delete this profile?')) return;
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
  if (res.ok) loadUsers();
}

document.getElementById('refresh-btn').addEventListener('click', loadUsers);

// Init
updateAuthStatus();
loadUsers();
