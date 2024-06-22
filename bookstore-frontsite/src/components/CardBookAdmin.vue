<template>
  <div class="card" style="width: 18rem">
    <img :src="book.cover" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ book.title }}</h5>
      <p class="card-text">
        {{ book.desc }}
      </p>
      <div class="d-flex justify-content-between">
        <router-link class="btn btn-warning" :to="'/edit/'+book.slug"><IMageEdit /> Edit</router-link>
        <button class="btn btn-danger" to="/hapus"><IPhTrash /> Hapus</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardBookAdmin',
  props: ['book']
}
</script>

<style></style>
