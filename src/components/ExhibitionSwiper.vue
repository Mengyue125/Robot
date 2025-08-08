<template>
  <section class="exhibition item" id="exhibition">
    <div class="swiper-container exhibition-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(img, index) in images" :key="index">
          <img :src="img" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

export default {
  name: 'ExhibitionSwiper',
  data() {
    return {
      images: [
        require('@/assets/img/banner1.jpg'),
        require('@/assets/img/banner2.jpg'),
        require('@/assets/img/banner3.jpg'),
        require('@/assets/img/banner4.jpg'),
        require('@/assets/img/banner5.jpg'),
        require('@/assets/img/banner6.jpg')
      ],
      swiperInstance: null
    }
  },
  mounted() {
    this.initSwiper();
  },
  methods: {
    initSwiper() {
      this.swiperInstance = new Swiper('.exhibition-swiper', {
        slidesPerView: 2,
        centeredSlides: false,
        spaceBetween: 30,
        loop: true,
        preloadImages: false,
        lazy: true,
        observer: true,
        breakpoints: {
          1000: {
            slidesPerView: 5,
          },
          630: {
            slidesPerView: 3,
          },
          10: {
            slidesPerView: 2,
          }
        }
      });
    }
  },
  beforeDestroy() {
    if (this.swiperInstance) {
      this.swiperInstance.destroy();
    }
  }
}
</script>

<style scoped>
.exhibition {
  width: 100%;
  background-color: rgb(252,252,252);
  padding: 50px 0;
  overflow: hidden;
}

.exhibition-swiper {
  width: 100%;
}

.exhibition-swiper img {
  width: 100%;
}
</style>