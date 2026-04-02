<template>
  <section class="dashboard">
    <div class="dashboard-hero">
      <div>
        <p class="eyebrow">Üdvözöllek, {{ userName }}!</p>
        <h1 class="heading">A FlowState felületed</h1>
        <p class="lead">
          Itt láthatod a legfontosabb teendőket és eseményeket. Kezeld gyorsan a
          következő heteket.
        </p>
      </div>
      <div class="stats-grid">
        <div class="stat-card">
          <p class="stat-label">Összes teendő</p>
          <strong>{{ todos.length }}</strong>
        </div>
        <div class="stat-card">
          <p class="stat-label">Kész feladat</p>
          <strong>{{ completedCount }}</strong>
        </div>
        <div class="stat-card">
          <p class="stat-label">Esemény</p>
          <strong>{{ events.length }}</strong>
        </div>
      </div>
    </div>

    <div class="grid">
      <article class="dashboard-card">
        <h2>Mai teendők</h2>
        <ul>
          <li v-for="todo in todayTodos" :key="todo._id">
            <strong>{{ todo.title }}</strong>
            <span>{{ formatDueDate(todo.dueDate) }}</span>
          </li>
          <li v-if="todayTodos.length === 0">Ma nincs esedékes teendőd.</li>
        </ul>
      </article>

      <article class="dashboard-card">
        <h2>Közelgő események</h2>
        <ul>
          <li v-for="event in upcomingEvents" :key="event._id">
            <strong>{{ event.title }}</strong>
            <span>{{ formatEventLabel(event) }}</span>
          </li>
          <li v-if="upcomingEvents.length === 0">Nincs közelgő esemény.</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
const userName = computed(() => auth.user?.name || "Felhasználó");
const todos = ref([]);
const events = ref([]);

function formatDueDate(date) {
  if (!date) return "Nincs határidő";
  return new Date(date).toLocaleDateString("hu-HU", {
    day: "numeric",
    month: "short",
  });
}

function formatEventLabel(event) {
  const date = new Date(event.startDate);
  return `${date.toLocaleDateString("hu-HU", { day: "numeric", month: "short" })} · ${date.toLocaleTimeString("hu-HU", { hour: "2-digit", minute: "2-digit" })}`;
}

const todayTodos = computed(() => {
  const todayKey = new Date().toISOString().slice(0, 10);
  return todos.value.filter((todo) => todo.dueDate?.slice(0, 10) === todayKey);
});

const upcomingEvents = computed(() => events.value.slice(0, 4));
const completedCount = computed(
  () => todos.value.filter((todo) => todo.completed).length,
);

async function fetchData() {
  try {
    const [todosRes, eventsRes] = await Promise.all([
      axios.get("/api/todos"),
      axios.get("/api/events"),
    ]);
    todos.value = todosRes.data;
    events.value = eventsRes.data.sort(
      (a, b) => new Date(a.startDate) - new Date(b.startDate),
    );
  } catch (err) {
    console.error(err);
  }
}

onMounted(fetchData);
</script>

<style>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
}
.dashboard-hero {
  display: grid;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 32px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}
.stat-card {
  padding: 1.25rem 1.5rem;
  border-radius: 24px;
  background: #eef2ff;
  border: 1px solid rgba(99, 102, 241, 0.2);
}
.stat-label {
  margin: 0 0 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  color: #4f46e5;
}
.stat-card strong {
  display: block;
  font-size: 2.2rem;
  color: #1f2937;
}
.grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
.dashboard-card {
  background: #ffffffee;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
  padding: 1.75rem;
}
.dashboard-card h2 {
  margin-top: 0;
  font-size: 1.2rem;
}
.dashboard-card ul {
  margin: 1rem 0 0;
  padding-left: 1.15rem;
}
.dashboard-card li {
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.dashboard-card strong {
  margin-right: 1rem;
}
.dashboard-card span {
  color: #64748b;
  font-size: 0.95rem;
}
</style>
