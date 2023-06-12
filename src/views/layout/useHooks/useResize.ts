import { onMounted, onBeforeMount } from 'vue';
import { useAppStore } from '@/stores/app';

export default () => {
  const WIDTH = 1024
  const RATIO = 3
  const { closeSideBar, toggleDevice } = useAppStore()

  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - RATIO < WIDTH
  }

  const resizeHandler = () => {
    if (!document.hidden) {
      const _isMobile = isMobile()

      toggleDevice(_isMobile ? 'mobile' : 'desktop')

      if (_isMobile) {
        closeSideBar(true)
      }
    }
  }

  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler)
  })

  onMounted(() => {
    resizeHandler()
  })

}