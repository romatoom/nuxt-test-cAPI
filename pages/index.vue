<template>
  <div class="container">
    <form class="card">
      <h1>Auth</h1>

      <h3 v-if="error">
        {{ error }}
      </h3>

      <div class="form-control" :class="{ 'invalid': !form.email.valid }">
        <label for="email">Email</label>
        <input id="email" v-model="form.email.value" type="email">
        <small v-if="form.email.errors.required">Email field is required</small>
      </div>

      <div class="form-control" :class="{ 'invalid': !form.password.valid }">
        <label for="password">Password</label>
        <input id="password" v-model="form.password.value" type="password">
        <small v-if="form.password.errors.required">Password field is required</small>
        <small v-else-if="form.password.errors.minLength">
          Password length can't be less then 8. Now it is {{ form.password.value.length }}.
        </small>
      </div>

      <button class="btn primary" type="submit" :disabled="!form.valid">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onErrorCaptured } from '@nuxtjs/composition-api'
import { useForm } from '@/assets/use/form.js'

const required = val => !!val
const minLength = num => val => val.length >= num

export default {
  setup () {
    const error = ref()
    const form = useForm({
      email: {
        value: '',
        validators: { required }
      },
      password: {
        value: '',
        validators: { required, minLength: minLength(8) }
      }
    })

    onErrorCaptured((e) => {
      error.value = e.message
    })

    return { form, error }
  }
}
</script>
