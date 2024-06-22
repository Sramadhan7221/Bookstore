<script setup>
import Navbar from '../components/Navbar.vue'
import CardBookAdmin from '../components/CardBookAdmin.vue'

import axios from 'axios'
import router from '@/router'
</script>

<template>
  <Navbar />
  <div class="container">
    <div class="row mb-3 d-flex justify-content-between">
      <div class="col-md-3 mt-3 mx-2" v-for="book in books" :key="book.id">
        <CardBookAdmin :book="book" />
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
