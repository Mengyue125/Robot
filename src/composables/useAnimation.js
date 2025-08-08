import { onMounted, onUnmounted } from 'vue'

export function useAnimation() {
  // 动画配置参数
  const animationConfig = {
    offset: 60,      // 提前多少像素触发动画
    delayStep: 0.15,  // 每个元素之间的动画延迟(秒)
    throttleTime: 10  // 滚动事件节流时间(毫秒)
  }

  // 节流函数
  const throttle = (fn, delay) => {
    let lastCall = 0
    return function(...args) {
      const now = new Date().getTime()
      if (now - lastCall < delay) return
      lastCall = now
      return fn(...args)
    }
  }

  // 检查元素是否在视口中
  const isInViewport = (el, offset = 0) => {
    const rect = el.getBoundingClientRect()
    return (
      rect.top <= (window.innerHeight - offset) &&
      rect.bottom >= offset
    )
  }

  // 处理动画逻辑
  const handleAnimation = () => {
    const items = document.querySelectorAll('.item')
    
    items.forEach((el, index) => {
      if (isInViewport(el, animationConfig.offset)) {
        // 元素进入视口时添加动画类
        el.style.transitionDelay = `${index * animationConfig.delayStep}s`
        el.classList.add('animate-in')
      } else if (window.scrollY + window.innerHeight < el.offsetTop) {
        // 元素完全离开视口上方时移除动画类(可选)
        el.classList.remove('animate-in')
      }
    })
  }

  // 节流处理后的动画函数
  const throttledHandleAnimation = throttle(handleAnimation, animationConfig.throttleTime)

  onMounted(() => {
    // 初始检查
    handleAnimation()
    // 添加滚动监听
    window.addEventListener('scroll', throttledHandleAnimation)
  })

  onUnmounted(() => {
    // 移除滚动监听
    window.removeEventListener('scroll', throttledHandleAnimation)
  })
}