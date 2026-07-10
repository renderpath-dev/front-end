<template>
  <section class="production-card">
    <p class="panel-kicker">Nginx fallback</p>
    <h3>Clean history routes need server fallback</h3>
    <p>
      A direct request for /router/dashboard reaches the server first. The
      server must return index.html so Vue Router can resolve the route in the
      browser.
    </p>
    <p class="panel-note">Configured rule: try_files $uri $uri/ /index.html;</p>
  </section>
</template>
