<template>
  <div class="card" style="width: 18rem">
    <img :src="book.cover" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ book.title }}</h5>
      <p class="card-text">
        {{ book.desc }}
      </p>
      <div class="d-flex justify-content-between">
        <a href="#" class="btn btn-success">Baca</a>
        <button class="btn btn-primary" to="/"><IRiHeartFill color="red" /></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardBook',
  props: ['book']
}
</script>

<style></style>
