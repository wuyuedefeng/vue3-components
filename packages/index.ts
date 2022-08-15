import './styles/index.scss'
import { ScrollView } from './components/ScrollView'

export default {
  install(app: any) {
    app.component(ScrollView.name, ScrollView)
  }
}