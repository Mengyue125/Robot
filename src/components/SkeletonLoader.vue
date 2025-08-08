<!-- components/NewsSkeleton.vue -->
<template>
  <div class="news-skeleton">
    <!-- 标题骨架 -->
    <div class="skeleton-title"></div>
    
    <!-- 分隔线骨架 -->
    <div class="skeleton-line"></div>
    
    <!-- 新闻列表骨架 -->
    <div class="skeleton-list">
      <div 
        v-for="n in count" 
        :key="n" 
        class="skeleton-item"
      >
        <div class="skeleton-image"></div>
        <div class="skeleton-details">
          <div class="skeleton-date"></div>
          <div class="skeleton-headline"></div>
          <div class="skeleton-summary"></div>
          <div class="skeleton-link"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsSkeleton',
  props: {
    count: {
      type: Number,
      default: 4
    }
  }
}
</script>

<style scoped>
/* 完全复制你原有的样式 */
.news-skeleton {
  width: 75%;
  margin: 0 auto;
  padding-top: 30px;
}

.skeleton-title {
  width: 120px;
  height: 30px;
  margin: 0 auto;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
  border-radius: 4px;
}

.skeleton-line {
  width: 150px;
  height: 2px;
  margin: 0 auto 30px;
  position: relative;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

.skeleton-line::after {
  content: '';
  position: absolute;
  width: 15px;
  height: 15px;
  left: 50%;
  top: -6.5px;
  transform: translateX(-50%) rotate(45deg);
  background: #f2f2f2;
}

.skeleton-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px 40px;
}

.skeleton-item {
  width: calc(50% - 20px);
  border-radius: 10px;
  overflow: hidden;
}

.skeleton-image {
  height: 270px;
  width: 100%;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

.skeleton-details {
  padding: 20px;
  position: relative;
}

.skeleton-date {
  position: absolute;
  top: 0;
  transform: translateY(-50%);
  width: 120px;
  height: 24px;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
  border-radius: 4px;
}

.skeleton-headline {
  height: 28px;
  margin-bottom: 12px;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
  border-radius: 4px;
}

.skeleton-summary {
  height: 22px;
  margin-bottom: 12px;
  width: 80%;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
  border-radius: 4px;
}

.skeleton-link {
  height: 18px;
  width: 40%;
  margin-left: auto;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% { background-position: 100% 50% }
  100% { background-position: 0 50% }
}

/* 响应式适配 */
@media (max-width: 1000px) {
  .skeleton-item {
    width: 100%;
  }
}

@media (max-width: 630px) {
  .skeleton-image {
    display: none;
  }
}
</style>