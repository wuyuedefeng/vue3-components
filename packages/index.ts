import './styles/index.scss'
import { ScrollView } from './components/ScrollView'
import { AutoFontSizeView } from './components/AutoFontSizeView'

export default {
  install(app: any) {
    app.component(ScrollView.name, ScrollView)
    app.component(AutoFontSizeView.name, AutoFontSizeView)
  }
}