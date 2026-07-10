<template>
  <section class="production-card">
    <p class="panel-kicker">Docker static deploy</p>
    <h3>Builder image and runtime image have different contents</h3>
    <p>
      The build stage installs dependencies and creates dist. The runtime stage
      only serves copied static files through Nginx.
    </p>
    <dl class="definition-grid">
      <div>
        <dt>Build stage</dt>
        <dd>Node image with source and dependencies</dd>
      </div>
      <div>
        <dt>Runtime stage</dt>
        <dd>Nginx image with dist only</dd>
      </div>
    </dl>
  </section>
</template>
