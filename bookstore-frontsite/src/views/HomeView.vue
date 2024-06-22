<script setup>
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import CardBook from '../components/CardBook.vue'

import axios from 'axios'
import router from '@/router'
</script>

<template>
  <Navbar />
  <Hero />
  <div class="container">
    <div class="row mt-4">
      <div class="col">
        <h2>Paling Populer</h2>
      </div>
      <div class="col">
        <router-link to="/popular-book" class="btn btn-primary"
          ><IRiListUnordered /> Lihat Semua</router-link
        >
      </div>
    </div>

    <div class="row mb-3 d-flex justify-content-between">
      <div class="col-md-3 mt-3 mx-2" v-for="book in books" :key="book.id">
        <CardBook :book="book" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: []
    }
  },
  methods: {
    setBook(data) {
      this.books = data
    }
  },
  mounted() {
    axios
      .get('http://127.0.0.1:5000/books')
      .then((response) => {
        this.setBook(response.data)
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          router.replace({ path: '/login' })
        } else {
          console.error(error)
        }
      })
  }
}
</script>
