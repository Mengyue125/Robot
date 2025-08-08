<template>
  <article>
    <SkeletonLoader v-if="isLoading" :count="4" />
    <!-- 内容 -->
    <template v-else>
      <h2 class="title" data-i18n="News">{{ $t('menu.News') }}</h2>
      <span class="line"><span></span></span>
      <section class="news-box">
        <div class="news" v-for="v in currentNews" :key="v.id">
          <div class="img-box">
            <!-- <img :src="v.image_path" alt=""> -->
            <img :src="require(`@/assets/${v.image_path}`)" :alt="v.content">
          </div>
          <div class="content-box">
            <span>{{ v.publish_time }}</span>
            <h3>{{ v.title }}</h3>
            <p>{{ v.content }}</p>
            <div>
              <a
                href="https://gzdaily.dayoo.com/pc/html/2025-04/09/content_743_883794.htm"
                target="_blank"
                >查看详情</a
              >
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- 分页 -->
    <div class="pglist"></div>
  </article>
</template>

<script>
import SkeletonLoader from "@/components/SkeletonLoader.vue";
export default {
  name: "NewsPage",
  components: { SkeletonLoader },
  data() {
    return {
      newsList: [],
      isLoading: true,
      num: 4, // 每页显示数量
      pgIndex: 1, // 当前页码
      total: 0, // 总页数
      visiblePages: 5, // 可见页码数量
    };
  },
  computed: {
    // 计算当前页显示的新闻
    currentNews() {
      const startIndex = (this.pgIndex - 1) * this.num;
      const endIndex = startIndex + this.num;
      return this.newsList.slice(startIndex, endIndex);
    }
  },
  mounted() {
    this.$axios
      .get(
        "http://web11557.y9.computerqwq.cf/Robot/public/index.php/banner/news"
      )
      .then((res) => {
        this.newsList = res.data;
        this.total = Math.ceil(this.newsList.length / this.num);
        this.isLoading = false;
        this.updatebtn();
      });
  },
  methods: {
    // 更新分页按钮
    updatebtn() {
      const pglist = document.querySelector('.pglist');
      pglist.innerHTML = '';
      pglist.appendChild(this.createButton('prev', 'PREV'));

      if (this.total <= this.visiblePages) {
        for (let i = 1; i <= this.total; i++) {
          pglist.appendChild(this.createPageButton(i));
        }
      } else {
        if (this.pgIndex <= 3) {
          for (let i = 1; i <= this.visiblePages; i++) {
            pglist.appendChild(this.createPageButton(i));
          }
          pglist.appendChild(this.createEllipsis());
        } else if (this.pgIndex > this.total - 3) {
          pglist.appendChild(this.createEllipsis());
          for (let i = this.total - 4; i <= this.total; i++) {
            pglist.appendChild(this.createPageButton(i));
          }
        } else {
          pglist.appendChild(this.createEllipsis());
          for (let i = this.pgIndex - 2; i <= this.pgIndex + 2; i++) {
            pglist.appendChild(this.createPageButton(i));
          }
          pglist.appendChild(this.createEllipsis());
        }
      }

      pglist.appendChild(this.createButton('next', 'NEXT'));
      this.currentpage();
    },
    // 创建页码按钮
    createPageButton(pageNum) {
      const button = document.createElement('div');
      button.textContent = pageNum;
      button.addEventListener('click', () => {
        if (this.pgIndex !== pageNum) {
          this.pgIndex = pageNum;
          this.updatebtn();
          window.scrollTo(0, 0);
        }
      });
      return button;
    },
    // 创建上一页/下一页按钮
    createButton(id, text) {
      const button = document.createElement('span');
      button.id = id;
      button.textContent = text;
      button.addEventListener('click', () => {
        if (id === 'prev' && this.pgIndex > 1) {
          this.pgIndex--;
          this.updatebtn();
          window.scrollTo(0, 0);
        } else if (id === 'next' && this.pgIndex < this.total) {
          this.pgIndex++;
          this.updatebtn();
          window.scrollTo(0, 0);
        }
      });
      return button;
    },
    // 创建省略号
    createEllipsis() {
      const ellipsis = document.createElement('span');
      ellipsis.textContent = '...';
      return ellipsis;
    },
    // 高亮当前页码
    currentpage() {
      const pageButtons = document.querySelectorAll('.pglist div');
      pageButtons.forEach(button => {
        if (parseInt(button.textContent) === this.pgIndex) {
          button.id = 'currentpg';
        } else {
          button.removeAttribute('id');
        }
      });
    }
  }
};
</script>

<style scoped>
.title:first-of-type {
  padding-top: 30px;
}

.News_top {
  padding-top: 30px;
}

.news-box {
  width: 75%;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px 40px;
}
/*内容布局*/
.news {
  width: calc(50% - 20px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(14, 42, 82, 1);
  transition: 1s;
}
.news:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
}
.img-box {
  height: 270px;
  overflow: hidden;
}
.img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content-box {
  position: relative;
  padding: 20px 20px 10px;
}
.content-box h3,
.content-box p {
  height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content-box > span {
  position: absolute;
  top: 0;
  transform: translateY(-50%);
  border-radius: 10px;
  padding: 0 10px;
  background: rgba(14, 42, 82, 1);
  border: 2px solid rgba(14, 42, 82, 1);
  line-height: 22px;
  color: white;
  transition: 0.5s;
}
.news:hover .content-box > span {
  background: white;
  color: rgba(14, 42, 82, 1);
}
.content-box div {
  text-align: right;
}
.content-box h3,
.content-box div a {
  color: rgba(14, 42, 82, 1);
}
/*分页*/
.pglist {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}
/deep/ .pglist span,
/deep/ .pglist div {
  height: 35px;
  min-width: 35px;
  padding: 5px;
  margin: 0 5px;
  border-radius: 10px;
  border: 2px solid rgba(14, 42, 82, 1);
  line-height: 22px;
  text-align: center;
  cursor: pointer;
}
/deep/ #prev,
/deep/ #next {
  padding: 5px 10px;
  margin: 0 15px;
  color: rgba(14, 42, 82, 1);
  transition: 0.5s;
}
/deep/ #prev:hover,
/deep/ #next:hover,
/deep/ #currentpg {
  background: rgba(14, 42, 82, 1);
  color: white;
}
/*响应式*/
@media (max-width: 1000px) {
  .news {
    width: 100%;
  }
}
@media (max-width: 630px) {
  .news {
    overflow: unset;
  }
  .img-box {
    display: none;
  }
}
</style>
