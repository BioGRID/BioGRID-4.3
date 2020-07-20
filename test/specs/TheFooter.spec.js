import test from 'ava'
import { mount } from '@vue/test-utils'
import TheFooter from '@/components/core/TheFooter.vue'

test('is a Vue instance', (t) => {
  const wrapper = mount(TheFooter)
  t.truthy(wrapper.vm)
})
