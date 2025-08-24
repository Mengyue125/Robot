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
            <h3>{{ currentLocale === 'zh-cn' ? v.title : v.title_US }}</h3>
            <p>{{ currentLocale === 'zh-cn' ? v.content : v.content_US }}</p>
            <div>
              <a
                href="https://gzdaily.dayoo.com/pc/html/2025-04/09/content_743_883794.htm"
                target="_blank"
                >{{ currentLocale === 'zh-cn' ? '查看详情' : 'Read More' }}</a
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
import supabase from '@/plugins/supabase';
export default {
  name: "NewsPage",
  components: { SkeletonLoader },
  data() {
    return {
      newsList: [
  {
    "id": 1,
    "title": "佛山高校首款自研人形机器人预计年内揭开面纱",
    "content": "如今，佛山也有了自己的“机器汪”。在日前举行的佛山50公里徒步活动上，一只模拟了醒狮的机器狗成为现场的焦点，吸引不少市民前来互动。\n\n　　据悉，这只活泼灵动的“机器汪”由佛山高校顺德职业技术学院智能制造学院智能机器人研发团队打造，以宇树科技机器狗A1为原型，由MIT猎豹开源的机器模型进行研发。未来，这只佛山造“机器汪”或迎机器人“主人”。据该团队负责人透露，团队自研的人形机器人已经“在路上”，最快于今年9月揭开面纱。这将是佛山高校首款自研的人形机器人，集中展现佛山高校在机器人领域的集成创新能力。",
    "image_path": "img/banner1.jpg",
    "publish_time": "2025-04-09",
    "link_url": "https://gzdaily.dayoo.com/pc/html/2025-04/09/content_743_883794.htm",
    "is_top": 0,
    "status": 1
  },
  {
    "id": 2,
    "title": "佛山“AI赋能”活动精彩上演，憨态醒狮机器狗吸睛！",
    "content": "5月4日，由佛山市工业和信息化局主办、佛山联通承办的“AI赋能·大集大利”主题活动在南海千灯湖环宇城精彩举行。智慧家庭、AI医疗、高效办公、机器人……在这里，场景化展区、数字互动区全面呈现联通智慧产品矩阵，吸引众多市民沉浸式体验前沿AI科技互动，近距离感受人工智能惠民应用走进生活。",
    "image_path": "img/banner2.jpg",
    "publish_time": "2025-05-04",
    "link_url": "https://content.foshanplus.com/newsDetails.html?newsId=942547&memberId=1304447&utm_source=fsandroid&utm_medium=news&utm_campaign=context&utm_term=942547&utm_belong1=1304447",
    "is_top": 0,
    "status": 1
  },
  {
    "id": 3,
    "title": "醒狮队和机器狗现场battle！佛山市职业教育活动周上演人机斗舞",
    "content": "5月11日，2025年佛山市职业教育活动周暨全民终身学习活动周在市图书馆西门广场拉开帷幕。舞台上，技能绝活、文体节目不间断上演，集市展区汇聚了市内各高职院校、中职学校，这些学校精心布置了30多个特色摊位，提供茶艺品鉴、陶艺制作、中医养生科普、幼儿急救教学、3D打印等精彩体验活动，市民参与打卡就能兑换礼物。",
    "image_path": "img/banner3.jpg",
    "publish_time": "2025-05-12",
    "link_url": "https://content.foshanplus.com/newsDetails.html?newsId=943910&memberId=126808&utm_source=fsandroid&utm_medium=news&utm_campaign=context&utm_term=943910&utm_belong1=126808&time=1747042902665",
    "is_top": 0,
    "status": 1
  },
  {
    "id": 4,
    "title": "法润童心 狮韵创玩启新航——佛山市幼儿园共同体童趣非遗绽放禅城区学前教育宣传月",
    "content": "随着一阵欢快的锣鼓声响起，小萌狮们舞动起来，他们在鼓点中跳跃、腾挪，展现传统文化的灵动之美，小萌狮的精彩表演引得台下的观众们掌声连连。这不仅是一场精彩的表演，更是一堂生动的传统文化与自主探究课程，展现出他们天真烂漫的童年风采和对醒狮文化的热爱之情，深刻体现出孩子们自信大方、勇敢坚毅，团结有爱的美好品德。",
    "image_path": "img/news1.jpg",
    "publish_time": "2025-05-26",
    "link_url": "https://mp.weixin.qq.com/s/iYlGmjvpzjE_hb2LcRpGgA",
    "is_top": 0,
    "status": 1
  },
  {
    "id": 5,
    "title": "2025年广东省“全国科技活动周”活动在深圳启动",
    "content": "《广东新闻联播》是一档以时政经济为主，汇集国内外重大消息的综合性新闻节目。主要内容是报道广东在社会、政治、经济等方面所取得的巨大成就。在报道过程中，积极发挥正确导向、舆论监督，维护社会稳定的主流媒体作用。",
    "image_path": "img/news2.jpg",
    "publish_time": "2025-05-27",
    "link_url": "https://m.itouchtv.cn/program/337/10/929560?shareId=GhxiybMD",
    "is_top": 0,
    "status": 1
  },
  {
    "id": 6,
    "title": "顺德50组星儿家庭踏上科技探索之旅",
    "content": "六一儿童节期间，由深圳市华侨公益基金会、盛幄集团IN279团队、顺德工业发展馆、佛山市精神残疾人及亲友会，联合发起“心向阳爱同行”之“科技护航、星芒闪耀”的星儿科技游乐场公益慈善活动在顺德工业发展馆启航，引领超过50组星儿家庭和普通家庭的孩子踏上了科技探索之旅。\n\n",
    "image_path": "img/news3.jpg",
    "publish_time": "2025-06-05",
    "link_url": "https://content.foshanplus.com/newsDetails.html?newsId=948857&memberId=158096&utm_source=fsandroid&utm_medium=news&utm_campaign=context&utm_term=948857&utm_belong1=158096&time=1749085921505",
    "is_top": 0,
    "status": 1
  },
  {
    "id": 7,
    "title": "“AI赋能未来 科技联通生活”",
    "content": "为让青少年度过一个充满科技感的儿童节，深入贯彻国家“人工智能+”行动部署，6月1日至2日，由惠州市科学技术协会主办、中国联通惠州市分公司和惠州科技馆承办的“AI赋能未来 科技联通生活”2025年全国科技周特别活动在惠州市科技馆一楼展厅盛大启幕。活动通过十大前沿AI展项、沉浸式互动体验，全景呈现人工智能技术赋能千行百业的创新成果，累计吸引超5000人次市民参与，其中青少年占比超六成。孩子们在趣味探索中感受科技魅力，家长在场景体验中见证AI赋能未来，生动彰显惠州联通作为央企在科技创新以及对青少年科普教育中的责任担当。惠州市科协党组书记涂斯婷、惠州联通副总经理张凯等领导到现场参观指导。",
    "image_path": "img/news4.jpg",
    "publish_time": "2025-06-02",
    "link_url": "https://mp.weixin.qq.com/s/tlHFHTqTvRRdkE2Z7Ufe4g",
    "is_top": 0,
    "status": 1
  }
],
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
    },
    // 获取当前语言
    currentLocale() {
      return this.$i18n.locale;
    }
  },
  watch: {
    // 监听语言变化，重新加载数据
    currentLocale: function() {
      // 不需要重新获取数据，只需触发视图更新
      this.$forceUpdate();
    }
  },
  mounted() {
    // 初始化时显示加载状态
    this.isLoading = true;

    // 从Supabase获取数据
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('publish_time', { ascending: false })
          .eq('status', 1);
          
        if (error) throw error;
        
        this.newsList = data;
        this.total = Math.ceil(this.newsList.length / this.num);
        this.isLoading = false;
        this.updatebtn();
      } catch (error) {
        // console.error('Failed to load news data:', error);
        this.isLoading = false;
        // 显示错误提示
        alert('加载新闻数据失败，请稍后再试');
      }
    },
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
::v-deep .pglist span,
::v-deep .pglist div {
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
::v-deep #prev,
::v-deep #next {
  padding: 5px 10px;
  margin: 0 15px;
  color: rgba(14, 42, 82, 1);
  transition: 0.5s;
}
::v-deep #prev:hover,
::v-deep #next:hover,
::v-deep #currentpg {
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
