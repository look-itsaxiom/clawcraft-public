import DefaultTheme from 'vitepress/theme'
import ActivityVisualizer from '../../components/ActivityVisualizer.vue'
import ChangelogViewer from '../../components/ChangelogViewer.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ActivityVisualizer', ActivityVisualizer)
    app.component('ChangelogViewer', ChangelogViewer)
  }
}
