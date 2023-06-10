import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

type Device = 'mobile' | 'desktop'

export const useAppStore = defineStore('app', () => {
  const sidebar = reactive({
    opened: true,
    withoutAnimation: false
  })

  const device = ref<Device>('desktop')

  function toggleSideBar() {
    sidebar.opened = !sidebar.opened
  }

  function closeSideBar(flag: boolean) {
    sidebar.opened = false
    sidebar.withoutAnimation = flag
  }

  function toggleDevice(value: Device) {
    device.value = value
  }



  return { sidebar, device, toggleSideBar, closeSideBar, toggleDevice }
})