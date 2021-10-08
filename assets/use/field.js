import { ref, reactive, watch } from '@nuxtjs/composition-api'

const not = val => !val

export function useField (field) {
  const valid = ref(true)
  const value = ref(field.value)
  const errors = reactive({})

  const reassign = (val) => {
    valid.value = true
    // eslint-disable-next-line array-callback-return
    Object.keys(field.validators ?? {}).map((name) => {
      const isValid = field.validators[name](val)
      errors[name] = not(isValid)
      if (not(isValid)) {
        valid.value = false
      }
    })
  }

  watch(value, reassign)
  reassign(field.value)

  // eslint-disable-next-line no-return-assign
  return { value, valid, errors }
}
