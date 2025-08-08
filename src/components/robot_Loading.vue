<template>
  <transition name="fade">
    <div class="fullscreen-loader" v-if="shouldShow">
      <div class="advanced-cube-loader" :style="containerStyle">
        <div 
          v-for="(cube, index) in cubes" 
          :key="index"
          class="cube"
          :class="`cube-${index + 1}`"
          :style="{
            'animation-delay': `${index * 0.1}s`,
            'background-color': color
          }"
        ></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'robot_Loading',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 80,
      validator: (value) => value > 0
    },
    color: {
      type: String,
      default: '#4786C9'
    },
    animationDuration: {
      type: Number,
      default: 1.3,
      validator: (value) => value > 0
    },
    gap: {
      type: Number,
      default: 2,
      validator: (value) => value >= 0
    },
    fadeDuration: {
      type: Number,
      default: 500
    },
    backgroundColor: {
      type: String,
      default: 'rgba(255, 255, 255, 1)'
    },
    zIndex: {
      type: Number,
      default: 9999
    }
  },
  data() {
    return {
      shouldShow: this.loading,
      cubes: Array(9).fill(null)
    }
  },
  computed: {
    containerStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        '--animation-duration': `${this.animationDuration}s`,
        '--gap': `${this.gap}px`
      }
    }
  },
  watch: {
    loading(newVal) {
      if (!newVal) {
        setTimeout(() => {
          this.shouldShow = false
          this.$emit('loaded')
        }, this.fadeDuration)
      } else {
        this.shouldShow = true
      }
    }
  }
}
</script>

<style scoped>
.fullscreen-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: v-bind('backgroundColor');
  z-index: v-bind('zIndex');
}

.advanced-cube-loader {
  position: relative;
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: var(--gap);
}

.cube {
  width: 100%;
  height: 100%;
  animation: cubeScale var(--animation-duration) infinite ease-in-out;
  transform-origin: center center;
}

.cube-1 { animation-delay: 0.2s; }
.cube-2 { animation-delay: 0.3s; }
.cube-3 { animation-delay: 0.4s; }
.cube-4 { animation-delay: 0.1s; }
.cube-5 { animation-delay: 0.2s; }
.cube-6 { animation-delay: 0.3s; }
.cube-7 { animation-delay: 0s; }
.cube-8 { animation-delay: 0.1s; }
.cube-9 { animation-delay: 0.2s; }

@keyframes cubeScale {
  0%, 70%, 100% {
    transform: scale3D(1, 1, 1);
    opacity: 1;
  }
  35% {
    transform: scale3D(0, 0, 1);
    opacity: 0.5;
  }
}
</style>

<style>
.fade-leave-active {
  transition: opacity v-bind('fadeDuration + "ms"');
}
.fade-leave-to {
  opacity: 0;
}
</style>