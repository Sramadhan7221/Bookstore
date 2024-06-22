<script setup>
// import IconBookmark from './icons/IconBookmark.vue'
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item">
              <!-- <a class="nav-link" aria-current="page" href="#">Home</a> -->
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="#">Link</a> -->
              <router-link class="nav-link" to="/admin">Admin</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <!-- <a class="nav-link" href="#">Link</a> -->
              <!-- <router-link class="nav-link" to="/bookmark"><template><IconBookmark/></template></router-link> -->
              <router-link class="nav-link" to="/booklist"
                >Bookmark <IRiBookmark3Line style="font-size: 1.3em" /><span
                  class="badge my-text-bg-primary gap-2"
                  >0</span
                ></router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style></style>
