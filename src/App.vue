<template>
  <div id="app" class="container">
    <h3 class="d-flex justify-content-center">Studenti</h3>
    <h5 class="d-flex justify-content-center">Page test</h5>
    <nav class="navbar navbar-expand-sm bg-light navbar-dark d-flex justify-content-center">
      <ul class="navbar-nav">
        <li class="nav-item m-1">
          <router-link class="btn btn-light btn-outline-primary"
          to="/">Studenti</router-link>
        </li>
        <li class="nav-item m-1">
          <router-link class="btn btn-light btn-outline-primary"
          to="/kursevi">Kursevi</router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>

