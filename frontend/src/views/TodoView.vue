<template>
  <section class="todo-shell">
    <div class="page-header">
      <div>
        <p class="eyebrow">Teendők</p>
        <h1 class="heading">Feladataid kezelése</h1>
        <p class="lead">
          Hozz létre új feladatokat, és pipáld ki a készre jelentett elemeket.
        </p>
      </div>
      <div class="todo-summary">
        <strong>{{ activeCount }}</strong>
        <span>aktív teendő</span>
      </div>
    </div>

    <div class="todo-grid">
      <div class="dashboard-card todo-form-card">
        <div class="section-title">
          <div>
            <p class="eyebrow">Új teendő</p>
            <h2>Adj hozzá gyorsan egy feladatot</h2>
          </div>
        </div>

        <form @submit.prevent="createTodo" class="form-grid">
          <label>
            Feladat címe
            <input
              v-model="todoForm.title"
              type="text"
              placeholder="Példa: beadandó elkészítése"
              required
            />
          </label>
          <label>
            Határidő
            <input v-model="todoForm.dueDate" type="date" />
          </label>
          <label>
            Prioritás
            <select v-model="todoForm.priority">
              <option value="low">Alacsony</option>
              <option value="medium">Közepes</option>
              <option value="high">Magas</option>
            </select>
          </label>
          <label class="full-width">
            Jegyzet
            <textarea
              v-model="todoForm.notes"
              placeholder="Részletek..."
              rows="4"
            ></textarea>
          </label>
          <button type="submit">Feladat létrehozása</button>
        </form>
        <p v-if="error" class="meta error-message">{{ error }}</p>
      </div>

      <div class="todo-list-card">
        <div class="section-title">
          <div>
            <p class="eyebrow">Feladatlista</p>
            <h2>Jelenleg futó teendők</h2>
          </div>
        </div>

        <div class="todo-list">
          <article
            v-for="todo in todos"
            :key="todo._id"
            :class="['todo-card', { completed: todo.completed }]"
          >
            <div class="todo-top">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  :checked="todo.completed"
                  @change="toggleTodo(todo)"
                />
                <span class="custom-checkbox"></span>
              </label>
              <div>
                <h3>{{ todo.title }}</h3>
                <p class="tag">{{ todo.priority }}</p>
              </div>
            </div>
            <p class="todo-notes" v-if="todo.notes">{{ todo.notes }}</p>
            <div class="todo-meta">
              <span>{{ formatDueDate(todo.dueDate) }}</span>
              <button class="delete-btn" @click="deleteTodo(todo._id)">
                Törlés
              </button>
            </div>
          </article>
          <p v-if="todos.length === 0" class="empty-state">
            Nincsenek teendők. Hozz létre egyet a baloldali űrlapon.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const todoForm = ref({ title: "", notes: "", dueDate: "", priority: "medium" });
const todos = ref([]);
const error = ref("");

const activeCount = computed(
  () => todos.value.filter((todo) => !todo.completed).length,
);

function formatDueDate(date) {
  if (!date) return "Nincs határidő";
  return new Date(date).toLocaleDateString("hu-HU", {
    day: "numeric",
    month: "short",
  });
}

async function fetchTodos() {
  error.value = "";
  try {
    const response = await axios.get("/api/todos");
    todos.value = response.data.sort(
      (a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0),
    );
  } catch (err) {
    error.value =
      err.response?.data?.message || "Nem sikerült betölteni a teendőket.";
  }
}

async function createTodo() {
  if (!todoForm.value.title) {
    error.value = "Adj meg egy címet a teendőnek.";
    return;
  }
  try {
    await axios.post("/api/todos", {
      title: todoForm.value.title,
      notes: todoForm.value.notes,
      dueDate: todoForm.value.dueDate || null,
      priority: todoForm.value.priority,
    });
    todoForm.value = { title: "", notes: "", dueDate: "", priority: "medium" };
    await fetchTodos();
  } catch (err) {
    error.value =
      err.response?.data?.message || "Teendő létrehozása sikertelen.";
  }
}

async function toggleTodo(todo) {
  try {
    await axios.put(`/api/todos/${todo._id}`, { completed: !todo.completed });
    await fetchTodos();
  } catch (err) {
    error.value =
      err.response?.data?.message || "Nem sikerült frissíteni a teendőt.";
  }
}

async function deleteTodo(id) {
  try {
    await axios.delete(`/api/todos/${id}`);
    await fetchTodos();
  } catch (err) {
    error.value =
      err.response?.data?.message || "Nem sikerült törölni a teendőt.";
  }
}

onMounted(fetchTodos);
</script>

<style>
.todo-shell {
  display: grid;
  gap: 1.5rem;
}
.page-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.todo-summary {
  text-align: right;
}
.todo-summary strong {
  display: block;
  font-size: 2rem;
}
.todo-grid {
  display: grid;
  grid-template-columns: minmax(320px, 420px) 1fr;
  gap: 1.5rem;
}
.todo-form-card,
.todo-list-card {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
  padding: 2rem;
}
.form-grid {
  display: grid;
  gap: 1rem;
}
.full-width {
  grid-column: 1 / -1;
}
.todo-list {
  display: grid;
  gap: 1rem;
}
.todo-card {
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  background: #f8fafc;
  border-radius: 20px;
  border: 1px solid rgba(15, 23, 42, 0.08);
}
.todo-card.completed {
  opacity: 0.7;
  text-decoration: line-through;
}
.todo-top {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.checkbox-label {
  display: inline-flex;
  position: relative;
}
.checkbox-label input {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}
.custom-checkbox {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 8px;
  border: 2px solid #cbd5e1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}
.checkbox-label input:checked + .custom-checkbox {
  background: linear-gradient(135deg, #6366f1, #10b981);
  border-color: transparent;
}
.todo-card h3 {
  margin: 0;
}
.tag {
  margin-top: 0.3rem;
  display: inline-flex;
  padding: 0.3rem 0.75rem;
  background: #e0e7ff;
  border-radius: 999px;
  text-transform: capitalize;
  color: #4338ca;
  font-size: 0.82rem;
}
.todo-notes {
  margin: 0;
  color: #475569;
}
.todo-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  color: #64748b;
}
.delete-btn {
  border: none;
  background: transparent;
  color: #ef4444;
  cursor: pointer;
}
.empty-state {
  margin: 0;
  color: #64748b;
}
.error-message {
  color: #b91c1c;
}
@media (max-width: 900px) {
  .todo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
