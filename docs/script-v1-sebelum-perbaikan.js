let tasks = JSON.parse(localStorage.getItem('studytask.tasks.v1')) || [];
let filter = 'all';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const counter = document.getElementById('counter');
const filterButtons = document.querySelectorAll('[data-filter]');

function saveAndRender() {
  localStorage.setItem('studytask.tasks.v1', JSON.stringify(tasks));
  renderTasks();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  tasks.push({ title, done: false });
  input.value = '';
  saveAndRender();
});

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle('active', b === btn));
    renderTasks();
  });
});

function renderTasks() {
  const filtered = tasks.filter(t =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  );
  list.innerHTML = '';
  filtered.forEach((t, i) => {
    list.innerHTML += `
      <li class="${t.done ? 'done' : ''}">
        <input type="checkbox" ${t.done ? 'checked' : ''}
               onchange="toggleTask(${i})">
        <span>${t.title}</span>
        <button onclick="deleteTask(${i})">Hapus</button>
      </li>`;
  });
  counter.textContent = tasks.filter(t => !t.done).length + ' tugas belum selesai';
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

renderTasks();
