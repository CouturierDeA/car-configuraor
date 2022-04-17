declare module '*.vue' {
  import { App, DefineComponent } from 'vue'
  const component: ReturnType<DefineComponent> & {
    install(app: App): void
  }
  export default component
}
