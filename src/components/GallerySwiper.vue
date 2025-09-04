<template>
  <section class="swiper item" id="file">
    <div class="swiper-wrapper">
      <div 
        class="swiper-slide" 
        v-for="(img, index) in images" 
        :key="index"
      >
        <img :src="img" alt="">
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </section>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

export default {
  name: 'GallerySwiper',
  data() {
    return {
      images: [
        require('@/assets/img/4-29 罗定邦中学 邀请函.webp'),
        require('@/assets/img/5-31 中山联通 邀请函.webp'),
        require('@/assets/img/5.16~18佛山省联通 邀请函_页面_1.webp'),
        require('@/assets/img/5.16~18佛山省联通 邀请函_页面_2.webp'),
        require('@/assets/img/5.21 佛山机关幼儿园 邀请函.webp'),
        require('@/assets/img/5.29 顺峰幼儿园 邀请函_页面_1.webp'),
        require('@/assets/img/5.29 顺德机关幼儿园 邀请函.webp')
      ],
      swiper: null
    }
  },
  mounted() {
    this.initSwiper();
  },
  methods: {
    initSwiper() {
      this.swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: -60,
        preloadImages: false,
        lazy: true,
        observer: true,
        observeParents: true,
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 3,
          slideShadows: true
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      });
    }
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
    }
  }
}
</script>

<style>
.swiper {
  width: 75% !important;
  margin: 0 auto;
  margin-bottom: 50px;
  height: 100%;
}

.swiper .swiper-slide img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

/* Enhanced pagination styling */
.swiper-pagination {
  position: relative;
  margin-top: 20px;
}

.swiper-pagination-bullet-custom {
  width: 12px;
  height: 12px;
  background: #ccc;
  opacity: 1;
  margin: 0 5px;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

.swiper-pagination-bullet-active {
  background: #4786C9;
  width: 24px;
  transform: scale(1.3);
  box-shadow: 0 0 0 2px rgba(71, 134, 201, 0.3);
}

/* Navigation buttons */
.swiper-button-prev,
.swiper-button-next {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  color: #4786C9;
  transition: all 0.3s ease;
}

.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 20px;
  font-weight: bold;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background: #4786C9;
  color: white;
}

@media (max-width: 768px) {
  .swiper {
    width: 95%;
  }
}
</style>