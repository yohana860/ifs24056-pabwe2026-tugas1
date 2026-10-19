// StudyTask - versi akhir (setelah perbaikan bug dari hasil AI)

const KEY = 'studytask.tasks';
let tasks = load();
let filter = 'all';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const counter = document.getElementById('counter');
const filterButtons = document.querySelectorAll('[data-filter]');

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

// id unik supaya operasi tidak bergantung pada posisi di layar
function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  tasks.push({ id: newId(), title, done: false });
  input.value = '';
  save();
  render();
});

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle('active', b === btn));
    render();
  });
});

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) task.done = !task.done;
  save();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  save();
  render();
}

function render() {
  const visible = tasks.filter((t) =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  );

  list.replaceChildren();
  visible.forEach((t) => {
    const li = document.createElement('li');
    if (t.done) li.classList.add('done');

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = t.done;
    check.addEventListener('change', () => toggleTask(t.id));

    const text = document.createElement('span');
    text.textContent = t.title; // aman dari XSS

    const del = document.createElement('button');
    del.textContent = 'Hapus';
    del.addEventListener('click', () => deleteTask(t.id));

    li.append(check, text, del);
    list.appendChild(li);
  });

  const remaining = tasks.filter((t) => !t.done).length;
  counter.textContent = remaining + ' tugas belum selesai';
}

render();
