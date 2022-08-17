import './styles/index.scss'
import { ScrollView } from './components/ScrollView'
import { AutoFontSizeView } from './components/AutoFontSizeView'
import { SignatureCanvas } from './components/SignatureCanvas'

export default {
  install(app: any) {
    app.component(ScrollView.name, ScrollView)
    app.component(AutoFontSizeView.name, AutoFontSizeView)
    app.component(SignatureCanvas.name, SignatureCanvas)
  }
}