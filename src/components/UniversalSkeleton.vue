<template>
  <div class="universal-skeleton" :class="[type, { 'with-header': showHeader }]">
    <!-- 标题区骨架 -->
    <div v-if="showHeader" class="skeleton-header">
      <div class="skeleton-title" :style="{ width: titleWidth }"></div>
      <div class="skeleton-line" :style="{ width: lineWidth }"></div>
    </div>

    <!-- 内容区骨架 -->
    <div class="skeleton-body">
      <!-- 列表型骨架 -->
      <template v-if="type === 'list'">
        <div 
          v-for="i in itemCount" 
          :key="i" 
          class="skeleton-item"
          :style="{
            height: itemHeight,
            width: itemWidth,
            margin: itemMargin
          }"
        >
          <slot name="item" :index="i">
            <template v-for="(block, bi) in blocks" >
              <div 
                :key="bi"
                class="skeleton-block"
                :class="`type-${block.type}`"
                :style="{
                  height: block.height,
                  width: block.width,
                  margin: block.margin,
                  borderRadius: block.radius
                }"
              ></div>
            </template>
          </slot>
        </div>
      </template>

      <!-- 轮播型骨架 -->
      <template v-else-if="type === 'carousel'">
        <div class="skeleton-slide" :style="{ height: slideHeight }">
          <slot name="slide">
            <div class="skeleton-image"></div>
          </slot>
        </div>
        <div class="skeleton-indicators">
          <div 
            v-for="i in indicatorCount" 
            :key="`indicator-${i}`" 
            class="skeleton-indicator"
          ></div>
        </div>
      </template>

      <!-- 网格型骨架 -->
      <template v-else-if="type === 'grid'">
        <div 
          v-for="i in itemCount" 
          :key="i" 
          class="skeleton-grid-item"
          :style="{
            height: gridItemHeight,
            aspectRatio: gridItemRatio
          }"
        >
          <slot name="grid-item" :index="i"></slot>
        </div>
      </template>

      <!-- 自定义型骨架 -->
      <template v-else-if="type === 'custom'">
        <slot></slot>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UniversalSkeleton',
  props: {
    // 骨架类型
    type: {
      type: String,
      default: 'list', // 'list' | 'carousel' | 'grid' | 'custom'
      validator: val => ['list', 'carousel', 'grid', 'custom'].includes(val)
    },
    
    // 公共配置
    showHeader: {
      type: Boolean,
      default: true
    },
    titleWidth: {
      type: String,
      default: '120px'
    },
    lineWidth: {
      type: String,
      default: '150px'
    },
    
    // 列表配置
    itemCount: {
      type: Number,
      default: 4
    },
    itemHeight: {
      type: String,
      default: 'auto'
    },
    itemWidth: {
      type: String,
      default: '100%'
    },
    itemMargin: {
      type: String,
      default: '0 0 20px 0'
    },
    blocks: {
      type: Array,
      default: () => [
        { type: 'image', height: '180px', width: '100%', margin: '0 0 15px 0' },
        { type: 'title', height: '24px', width: '70%', margin: '0 0 10px 0' },
        { type: 'text', height: '16px', width: '90%', margin: '0 0 8px 0' }
      ]
    },
    
    // 轮播配置
    slideHeight: {
      type: String,
      default: '300px'
    },
    indicatorCount: {
      type: Number,
      default: 3
    },
    
    // 网格配置
    gridItemHeight: {
      type: String,
      default: 'auto'
    },
    gridItemRatio: {
      type: String,
      default: '1/1'
    }
  }
}
</script>

<style scoped>
/* 基础动画 */
@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.universal-skeleton {
  --skeleton-base: #f0f0f0;
  --skeleton-highlight: #e0e0e0;
  --skeleton-radius: 4px;
}

/* 公共骨架样式 */
[class^="skeleton-"] {
  background: linear-gradient(
    90deg,
    var(--skeleton-base) 25%,
    var(--skeleton-highlight) 50%,
    var(--skeleton-base) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s linear infinite;
  border-radius: var(--skeleton-radius);
  overflow: hidden;
}

/* 标题区 */
.skeleton-header {
  text-align: center;
  margin-bottom: 30px;
}

.skeleton-title {
  height: 30px;
  margin: 0 auto 15px;
  display: inline-block;
}

.skeleton-line {
  height: 2px;
  margin: 0 auto;
  position: relative;
}

.skeleton-line::after {
  content: '';
  position: absolute;
  width: 15px;
  height: 15px;
  left: 50%;
  top: -6.5px;
  transform: translateX(-50%) rotate(45deg);
  background: var(--skeleton-base);
}

/* 列表型 */
.universal-skeleton.list .skeleton-body {
  display: flex;
  flex-direction: column;
}

.skeleton-item {
  border-radius: var(--skeleton-radius);
}

.skeleton-block.type-image {
  border-radius: var(--skeleton-radius) var(--skeleton-radius) 0 0;
}

/* 轮播型 */
.universal-skeleton.carousel .skeleton-body {
  position: relative;
}

.skeleton-slide {
  width: 100%;
  position: relative;
}

.skeleton-image {
  height: 70%;
  width: 100%;
}

.skeleton-caption {
  padding: 15px;
}

.skeleton-title-line {
  height: 24px;
  margin-bottom: 10px;
}

.skeleton-desc-line {
  height: 16px;
  width: 80%;
}

.skeleton-indicators {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.skeleton-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

/* 网格型 */
.universal-skeleton.grid .skeleton-body {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.skeleton-grid-item {
  border-radius: var(--skeleton-radius);
}

/* 响应式适配 */
@media (max-width: 768px) {
  .universal-skeleton.list .skeleton-item,
  .universal-skeleton.grid .skeleton-body {
    grid-template-columns: 1fr;
  }
  
  .universal-skeleton.carousel .skeleton-slide {
    height: 250px;
  }
}
</style>