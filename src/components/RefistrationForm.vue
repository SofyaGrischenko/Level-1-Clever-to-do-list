<template>
  <form class="registration-form">
    <h1 class="registration-form__title">Sign Up</h1>
    <div class="registration-form__inputs">
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Password" />
    </div>
    <div class="registration-form__buttons">
      <button type="submit">sign in</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },

  methods:{
    
  }
}
</script>

<style scoped>
.registration-form {
  background-color: rgb(75, 129, 177);
  width: 35vw;
  height: 50vh;
  margin: 20vh auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.registration-form__title {
  font-size: 3rem;
  color: aliceblue;
}

.registration-form__inputs {
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 40px auto;
  gap: 20px;
}

.registration-form__buttons {
  display: flex;
  justify-content: center;
}
</style>
