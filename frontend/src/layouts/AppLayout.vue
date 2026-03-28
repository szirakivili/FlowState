<template>
  <div class="flex h-screen">
    <Sidebar />
    <main class="flex-1 overflow-auto p-6">
      <Navbar />
      <RouterView />
    </main>
  </div>
</template>