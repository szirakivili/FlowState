<template>
  <section class="card">
    <div class="brand">
      <span class="brand-dot"></span>
      FlowState
    </div>
    <h1 class="heading">Regisztráció</h1>
    <p class="lead">
      Hozz létre fiókot, és kezd el a személyre szabott tervezést.
    </p>

    <form @submit.prevent="register">
      <div class="form-group">
        <label>
          Név
          <input v-model="name" type="text" placeholder="Teljes név" required />
        </label>
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
      <button type="submit">Regisztráció</button>
    </form>

    <p v-if="error" class="meta" style="color: #b91c1c">{{ error }}</p>
    <p class="meta">
      Már van fiókod? <router-link to="/login">Bejelentkezés</router-link>
    </p>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const auth = useAuthStore();

async function register() {
  error.value = "";
  try {
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    router.push("/");
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      "Regisztrációs hiba. Ellenőrizd az adatokat.";
  }
}
</script>
