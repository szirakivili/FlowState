<template>
  <section class="card">
    <div class="brand">
      <span class="brand-dot"></span>
      FlowState
    </div>
    <h1 class="heading">Bejelentkezés</h1>
    <p class="lead">
      Lépj be, hogy megkezdhesd a napi teendők és naptár kezelést.
    </p>

    <form @submit.prevent="login">
      <div class="form-group">
        <label>
          Email cím
          <input
            v-model="email"
            type="email"
            placeholder="pelda@email.com"
            required
          />
        </label>
        <label>
          Jelszó
          <input
            v-model="password"
            type="password"
            placeholder="Jelszó"
            required
          />
        </label>
      </div>
      <button type="submit">Bejelentkezés</button>
    </form>

    <p v-if="error" class="meta" style="color: #b91c1c">{{ error }}</p>
    <p class="meta">
      Nincs fiókod? <router-link to="/register">Regisztrálj</router-link>
    </p>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

const error = ref("");

async function login() {
  error.value = "";
  try {
    await auth.login({ email: email.value, password: password.value });
    router.push("/");
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      "Bejelentkezési hiba. Ellenőrizd az adataidat.";
  }
}
</script>
