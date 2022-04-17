import {createApp} from 'vue'
import App from '@/components/app/App.vue'
import {setupRouter} from './router'
const router = setupRouter(
    process.env.BASE_URL,
)

export const app = createApp(App)
    .use(router)

app.mount('#app')
