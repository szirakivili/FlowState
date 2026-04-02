<template>
  <div id="app">
    <div v-if="isAuthRoute" class="auth-shell">
      <router-view />
    </div>
    <div v-else class="app-shell">
      <header class="topbar">
        <div class="brand">
          <span class="brand-dot"></span>
          FlowState
        </div>

        <nav class="nav">
          <router-link to="/">Dashboard</router-link>
          <router-link to="/calendar">Naptár</router-link>
          <router-link to="/todos">Teendők</router-link>
        </nav>

        <button class="logout" @click="logout">Kijelentkezés</button>
      </header>

      <main class="app-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "./stores/auth";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const isAuthRoute = computed(() => route.meta.layout === "auth");

function logout() {
  auth.logout();
  router.push("/login");
}
</script>

<style>
html,
body,
#app {
  min-height: 100%;
  margin: 0;
}
body {
  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  background:
    radial-gradient(
      circle at top left,
      rgba(99, 102, 241, 0.18),
      transparent 30%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(16, 185, 129, 0.12),
      transparent 28%
    ),
    #f8fafc;
  color: #111827;
}
.auth-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.92);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(14px);
  position: sticky;
  top: 0;
  z-index: 10;
}
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.nav a {
  color: #334155;
  text-decoration: none;
  font-weight: 600;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.04);
  transition:
    background 0.2s ease,
    color 0.2s ease;
}
.nav a:hover {
  background: rgba(99, 102, 241, 0.12);
}
.nav a.router-link-active {
  color: white;
  background: linear-gradient(135deg, #6366f1, #10b981);
}
.logout {
  border: none;
  background: #e2e8f0;
  color: #1f2937;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  cursor: pointer;
}
.logout:hover {
  background: #cbd5e1;
}
.app-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
.card,
.dashboard-card {
  width: min(100%, 420px);
  background: #ffffffee;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.12);
  padding: 2.5rem;
}
.heading {
  margin: 0 0 1rem;
  font-size: clamp(1.8rem, 2.2vw, 2.6rem);
  line-height: 1.05;
}
.lead {
  margin: 0 0 1.75rem;
  color: #475569;
}
.form-group {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1.2rem;
}
label {
  display: grid;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #334155;
}
input {
  width: 100%;
  padding: 0.95rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #f8fafc;
  font-size: 1rem;
  color: #0f172a;
}
input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
}
button {
  width: 100%;
  border: none;
  border-radius: 14px;
  padding: 0.95rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #6366f1, #10b981);
  cursor: pointer;
  box-shadow: 0 14px 35px rgba(99, 102, 241, 0.18);
}
button:hover {
  opacity: 0.96;
}
.meta {
  margin-top: 1.25rem;
  text-align: center;
  color: #64748b;
  font-size: 0.95rem;
}
.meta a {
  color: #4f46e5;
  text-decoration: none;
}
.meta a:hover {
  text-decoration: underline;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
}
.brand-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #10b981);
}
</style>
