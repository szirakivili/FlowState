<template>
  <section class="calendar-shell">
    <div class="page-header">
      <div>
        <p class="eyebrow">Naptár</p>
        <h1 class="heading">Heti események</h1>
        <p class="lead">
          Kezeld a vizsgáidat, határidőidet és tanóráidat egy helyen.
        </p>
      </div>
      <div class="header-actions">
        <button @click="prevWeek">Előző hét</button>
        <button @click="nextWeek">Következő hét</button>
      </div>
    </div>

    <div class="calendar-grid">
      <article v-for="day in weekDays" :key="day.key" class="calendar-day">
        <div class="day-header">
          <span>{{ day.weekday }}</span>
          <strong>{{ day.day }}</strong>
        </div>
        <div class="event-list">
          <div
            v-if="eventsByDate[day.key]?.length"
            class="event-pill"
            v-for="event in eventsByDate[day.key]"
            :key="event._id"
            :style="{ borderLeftColor: event.color }"
          >
            <strong>{{ event.title }}</strong>
            <small>{{ formatTime(event.startDate) }}</small>
          </div>
          <p v-else class="empty-state">Nincs esemény ezen a napon.</p>
        </div>
      </article>
    </div>

    <div class="dashboard-card calendar-form-card">
      <div class="section-title">
        <div>
          <p class="eyebrow">Új esemény</p>
          <h2>Hozz létre gyorsan új eseményt</h2>
        </div>
      </div>

      <form @submit.prevent="createEvent" class="form-grid">
        <label>
          Cím
          <input
            v-model="eventForm.title"
            type="text"
            placeholder="Példa: Matematika házi"
            required
          />
        </label>
        <label>
          Dátum
          <input v-model="eventForm.date" type="date" required />
        </label>
        <label>
          Időpont
          <input v-model="eventForm.time" type="time" required />
        </label>
        <label>
          Kategória
          <select v-model="eventForm.category">
            <option value="lecture">Előadás</option>
            <option value="exam">Vizsga</option>
            <option value="deadline">Határidő</option>
            <option value="other">Egyéb</option>
          </select>
        </label>
        <label>
          Szín
          <input v-model="eventForm.color" type="color" />
        </label>
        <label class="full-width">
          Leírás
          <textarea
            v-model="eventForm.description"
            rows="4"
            placeholder="Részletek az eseményről"
          ></textarea>
        </label>

        <button type="submit">Esemény létrehozása</button>
      </form>
      <p v-if="error" class="meta error-message">{{ error }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const eventForm = ref({
  title: "",
  description: "",
  date: "",
  time: "09:00",
  category: "other",
  color: "#4F46E5",
});
const error = ref("");
const events = ref([]);
const currentWeekStart = ref(startOfWeek(new Date()));

function startOfWeek(date) {
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() - day + (day === 0 ? -6 : 1);
  result.setDate(diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

const weekDays = computed(() => {
  const start = new Date(currentWeekStart.value);
  return Array.from({ length: 7 }).map((_, index) => {
    const dayDate = new Date(start);
    dayDate.setDate(start.getDate() + index);
    return {
      date: dayDate,
      key: formatKey(dayDate),
      weekday: dayDate.toLocaleDateString("hu-HU", { weekday: "long" }),
      day: dayDate.toLocaleDateString("hu-HU", {
        day: "numeric",
        month: "short",
      }),
    };
  });
});

const eventsByDate = computed(() => {
  return events.value.reduce((map, event) => {
    const dateKey = formatKey(new Date(event.startDate));
    if (!map[dateKey]) map[dateKey] = [];
    map[dateKey].push(event);
    return map;
  }, {});
});

function formatKey(date) {
  return date.toISOString().slice(0, 10);
}

function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString("hu-HU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function fetchEvents() {
  error.value = "";
  try {
    const response = await axios.get("/api/events");
    events.value = response.data.sort(
      (a, b) => new Date(a.startDate) - new Date(b.startDate),
    );
  } catch (err) {
    error.value =
      err.response?.data?.message || "Nem sikerült betölteni az eseményeket.";
  }
}

async function createEvent() {
  if (!eventForm.value.title || !eventForm.value.date) {
    error.value = "Kérlek, add meg az esemény címét és dátumát.";
    return;
  }

  const startDate = `${eventForm.value.date}T${eventForm.value.time}:00`;

  try {
    await axios.post("/api/events", {
      title: eventForm.value.title,
      description: eventForm.value.description,
      startDate,
      color: eventForm.value.color,
      category: eventForm.value.category,
    });
    eventForm.value = {
      title: "",
      description: "",
      date: "",
      time: "09:00",
      category: "other",
      color: "#4F46E5",
    };
    await fetchEvents();
  } catch (err) {
    error.value =
      err.response?.data?.message || "Esemény létrehozása sikertelen.";
  }
}

function prevWeek() {
  const week = new Date(currentWeekStart.value);
  week.setDate(week.getDate() - 7);
  currentWeekStart.value = startOfWeek(week);
}

function nextWeek() {
  const week = new Date(currentWeekStart.value);
  week.setDate(week.getDate() + 7);
  currentWeekStart.value = startOfWeek(week);
}

onMounted(fetchEvents);
</script>

<style>
.calendar-shell {
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
.header-actions {
  display: flex;
  gap: 0.75rem;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}
.calendar-day {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  padding: 1rem;
  min-height: 220px;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.06);
}
.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}
.event-list {
  display: grid;
  gap: 0.75rem;
}
.event-pill {
  padding: 0.8rem;
  border-radius: 16px;
  border-left: 4px solid #4f46e5;
  background: #f8fafc;
}
.empty-state {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
}
.calendar-form-card {
  padding: 2rem;
}
.form-grid {
  display: grid;
  gap: 1rem;
}
.full-width {
  grid-column: 1 / -1;
}
textarea {
  min-height: 120px;
  resize: vertical;
}
.error-message {
  color: #b91c1c;
}
</style>
