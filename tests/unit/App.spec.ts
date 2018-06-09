import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import Vuetify from 'vuetify';

const Vue = createLocalVue();
Vue.use(Vuetify);

describe('App.vue', () => {
  it('Mounts', () => {
    const wrapper = mount(App, {
      localVue: Vue,
    });
    expect(wrapper.attributes().id).toBe('app');
  });
});
