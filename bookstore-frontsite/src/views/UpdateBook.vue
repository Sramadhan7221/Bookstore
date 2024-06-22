<script setup>
import Navbar from '../components/Navbar.vue'

import axios from 'axios'
import router from '@/router'
</script>

<template>
  <Navbar />
  <div class="container">
    <div class="row mt-4 d-flex justify-content-center">
      <div class="col-md-8">
        <div class="mb-3">
          <label class="form-label">Judul</label>
          <input type="text" class="form-control" v-model="title" />
          <input type="hidden" class="form-control" id="slug" :value="{{ $route.params.id }}" />
        </div>
        <div class="mb-3">
          <label class="form-label">Deskripsi</label>
          <input type="text" class="form-control" v-model="desc" />
        </div>
        <div class="mb-3">
          <label class="form-label">Penulis</label>
          <input type="text" class="form-control" v-model="author" />
        </div>
        <div class="mb-3">
          <label class="form-label">Sampul Buku</label>
          <input class="form-control" type="file" id="cover" />
        </div>
        <button class="btn btn-success" v-on:click="save(title, desc, author)">Simpan</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      desc: '',
      author: '',
      bookId: ''
    }
  },
  methods: {
    save(title, desc, author) {
        axios
          .patch(
            'http://127.0.0.1:5000/books/' + bookId,
            {
              title: title,
              desc: desc,
              author: author,
              cover: document.querySelector('#cover').files
            },
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )
          .then((obj) => {
            if (obj.status === 200) router.replace({ path: '/' })
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              console.error(error.data.msg)
            } else {
              console.error(error)
            }
          })

    //   if (id.length > 0) {
    //     axios
    //       .post(
    //         'http://127.0.0.1:5000/books',
    //         {
    //           title: title,
    //           desc: desc,
    //           author: author,
    //           cover: document.querySelector('#cover').files
    //         },
    //         {
    //           headers: {
    //             'Content-Type': 'multipart/form-data'
    //           }
    //         }
    //       )
    //       .then((obj) => {
    //         if (obj.status === 200) router.replace({ path: '/' })
    //       })
    //       .catch((error) => {
    //         if (error.response && error.response.status === 401) {
    //           console.error(error.data.msg)
    //         } else {
    //           console.error(error)
    //         }
    //       })
    //   } else {
        
    //   }
    },
    setBook(data) {
        this.title = data.title,
        this.desc = data.desc,
        this.author = data.author,
        this.bookId = data.id
    }
  },
  mounted() {
    axios
      .get('http://127.0.0.1:5000/books/'+ $route.params.id)
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
