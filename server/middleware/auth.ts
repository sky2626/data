import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token: string | null = localStorage.getItem("token");

    if (!token) {
      return navigateTo("/admin/sinin"); // Redirect unauthenticated users
    }
  }
});
