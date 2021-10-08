import { computed, reactive } from '@nuxtjs/composition-api'
import { useField } from '@/assets/use/field'

export function useForm (init = {}) {
  const form = reactive({})
  const validKey = 'valid'

  for (const [key, value] of Object.entries(init)) {
    form[key] = useField(value)
  }

  const withoutValid = k => k !== validKey

  form[validKey] = computed(() => Object.keys(form).filter(withoutValid).every(k => form[k].valid))

  return form
}
