<template>
  <section class="dashboard">
    <div class="dashboard-hero">
      <div>
        <p class="eyebrow">Üdvözöllek, {{ userName }}!</p>
        <h1 class="heading">A FlowState felületed</h1>
        <p class="lead">
          Itt láthatod a legfontosabb teendőket, naptárbejegyzéseket és admin
          eszközöket.
        </p>
      </div>
    </div>

    <div class="grid">
      <article class="dashboard-card">
        <h2>Áttekintés</h2>
        <p>
          A regisztrációd sikeres volt. Most már használhatod az alkalmazás fő
          funkcióit.
        </p>
      </article>

      <article class="dashboard-card">
        <h2>Következő lépések</h2>
        <ul>
          <li>Lépj a <strong>Teendők</strong> oldalra a feladataidhoz.</li>
          <li>Nyisd meg a <strong>Naptár</strong> oldalt a heti tervekhez.</li>
          <li>Ha admin vagy, látogass el az <strong>Admin</strong> oldalra.</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
const userName = computed(() => auth.user?.name || "Felhasználó");
</script>

<style>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
}
.dashboard-hero {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 32px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
}
.eyebrow {
  margin: 0 0 0.75rem;
  color: #2563eb;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.8rem;
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
  margin: 0.75rem 0 0;
  padding-left: 1.15rem;
  color: #475569;
}
.dashboard-card li {
  margin-bottom: 0.5rem;
}
</style>
