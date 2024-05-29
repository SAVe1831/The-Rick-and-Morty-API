import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import Card from '@/components/Card.vue'
import 'primeflex/primeflex.css'



const app = createApp(App);

app.component('my-card', Card);

app.mount('#app')
