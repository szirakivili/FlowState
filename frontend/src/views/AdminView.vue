<template>
  <section class="admin-shell">
    <div class="page-header">
      <div>
        <p class="eyebrow">Admin</p>
        <h1 class="heading">Admin irányítópult</h1>
        <p class="lead">
          Itt áttekintheted a rendszer kulcsadatokat és adminisztratív
          gyorshivatkozásokat.
        </p>
      </div>
    </div>

    <div class="admin-grid">
      <article class="dashboard-card">
        <h2>Jogosultsági információ</h2>
        <p>
          Ez a felület csak adminisztrátor szerepkörű felhasználóknak elérhető.
        </p>
        <dl>
          <dt>Hozzáférés</dt>
          <dd>Csak olvasható statisztika és gyorsgombok jelennek meg.</dd>
        </dl>
      </article>

      <article class="dashboard-card">
        <h2>Gyors linkek</h2>
        <ul>
          <li>Felhasználó kezelés</li>
          <li>Teljes teendő lista</li>
          <li>Események kezelése</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style>
.admin-shell {
  display: grid;
  gap: 1.5rem;
}
.page-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
}
.admin-grid {
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
}
.dashboard-card ul {
  margin: 1rem 0 0;
  padding-left: 1.15rem;
}
.dashboard-card li {
  margin-bottom: 0.75rem;
}
.dashboard-card dt {
  font-weight: 700;
  margin-top: 1rem;
}
.dashboard-card dd {
  margin: 0.375rem 0 0;
  color: #475569;
}
</style>
