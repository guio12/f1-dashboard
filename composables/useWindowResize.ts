import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowResize() {
  const isDesktop = ref(window.innerWidth > 1024)

  const updateIsDesktop = () => {
    isDesktop.value = window.innerWidth > 1024
  }

  onMounted(() => {
    window.addEventListener('resize', updateIsDesktop)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateIsDesktop)
  })

  return { isDesktop }
}
