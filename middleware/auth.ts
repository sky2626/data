import { defineNuxtRouteMiddleware, navigateTo, useRequestURL } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  const url = useRequestURL();
  //  List of routes that don't require authentication
  const publicPages = ['/admin/signin'];

  //  If the user is going to a public page, allow it.
  if (publicPages.includes(url.pathname)) {
    return;
  }

  //  This code will run on *both* the server and the client.
  const isAuthenticated = () => {
    //  localStorage is ONLY available in the browser (client-side).
    if (process.client) {
      const token = localStorage.getItem('token');
      return !!token; //  Returns true if token exists, false otherwise.
    }
    //  On the server, localStorage doesn't exist.  You'd check for a session
    //  or cookie using server-side methods.  For this example, we'll
    //  assume no authentication on the server if there's no localStorage.
    return false;
  };

  if (!isAuthenticated()) {
    return navigateTo('/admin/signin'); // Redirect to login if not authenticated
  }
});
