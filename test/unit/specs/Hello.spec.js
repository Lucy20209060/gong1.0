import Vue from 'vue'
import index from '@/components/index'
import login from '@/components/login'

describe('index.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(index)
    const vm = new Constructor().$mount()
    // expect(vm.$el.querySelector('.index').textContent)
      // .to.equal('Welcome to Your Vue.js App')
  })
})
describe('login.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(login)
    const vm = new Constructor().$mount()
    // expect(vm.$el.querySelector('.login').textContent)
      // .to.equal('Welcome to Your Vue.js App')
  })
})
