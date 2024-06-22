<template>
  <div class="container">
    <div class="row mt-4 d-flex justify-content-center">
      <div class="col-md-8">
        <div class="mb-3">
          <label class="form-label">Judul</label>
          <input type="text" class="form-control" v-model="title" :value="{{ title }}" />
          <input type="hidden" class="form-control" v-model="id" :value="{{ id }}" />
        </div>
        <div class="mb-3">
          <label class="form-label">Deskripsi</label>
          <input type="text" class="form-control" v-model="desc" :value="{{ desc }}" />
        </div>
        <div class="mb-3">
          <label class="form-label">Penulis</label>
          <input type="text" class="form-control" v-model="author" :value="{{ author }}" />
        </div>
        <div class="mb-3">
          <label class="form-label">Sampul Buku</label>
          <input class="form-control" type="file" id="cover" />
        </div>
        <button class="btn btn-success" v-on:click="save(title, desc, author, id)">Simpan</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateForm',
  props: ['bookId'],
  data() {
    return {
      title: '',
      desc: '',
      author: ''
    }
  }
}
</script>

<style></style>
