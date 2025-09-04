<template>
  <div>
    <!-- 加载动画 -->
    <robot_Loading :loading="isLoading" />
    <!--	内容-->
    <article>
      <!--		轮播图-->
      <section class="banner item">
        <transition-group class="imgList" tag="ul">
          <li v-for="(v) in bannerList" :key="v.id">
            <img
              :src="require(`@/assets/${v.image_path}`)"
              :alt="v.description"
            />
          </li>
        </transition-group>
        <div class="left_right">
          <span @click="toggleBanner(1)">&lt;</span>
          <span @click="toggleBanner(0)">&gt;</span>
        </div>
      </section>
      <!--		新闻-->
      <section class="news item" id="News">
        <div class="news_title">
          <h2 class="title" data-i18n="News">{{ $t('menu.News') }}</h2>
          <div>
            <span @click="toggleNew(1)">&larr;</span>
            <span @click="toggleNew(0)">&rarr;</span>
          </div>
        </div>
        <transition-group class="news_main" tag="ul">
          <li v-for="v in newsList" :key="v.id">
            <h3>{{ currentLocale === 'zh-cn' ? v.title : v.title_us }}</h3>
            <p>{{ currentLocale === 'zh-cn' ? v.content : v.content_us }}</p>
            <div>
              <img
                :src="require(`@/assets/${v.image_path}`)"
                :alt="v.content"
              />
            </div>
            <div>
              {{ v.publish_time }}
              <a :href="v.link_url">{{ currentLocale === 'zh-cn' ? '查看详情' : 'Read More' }}</a>
            </div>
          </li>
        </transition-group>
      </section>
      <!--		介绍-->
      <section class="introduce item" id="Introduce">
        <div>
          <img src="../assets/img/1.webp" alt="" />
          <div>
            <h2 class="title" data-i18n="Introduce">{{ $t('menu.Introduce') }}</h2>
            <p>
              As we go through our daily routines, we are constantly putting
              tension on the clothes we wear. This tension then imbibes our
              clothes with a sort of physical power, which Morinaga has set out
              to visualize through light.
            </p>
            <p>
              Mechanochromic technology is used as a sensory tool in
              architectural structures to detect and visualize cracks ?sites of
              stress or tension ?on a building through a phenomenon which turns
              this tension into light.
            </p>
          </div>
        </div>
      </section>
      <!-- 画廊 -->
      <GallerySwiper />
      <!-- 指导老师 -->
      <section class="instruction item" id="instruction">
        <div>
          <h2 class="title" data-i18n="Team">{{ $t('menu.Team') }}</h2>
          <span class="line"><span></span></span>
          <ul class="instruction_list">
            <li>
              <div><img src="../assets/img/instruction1.webp" alt="" /></div>
              <div>
                <h3>Name</h3>
                <p>主指导</p>
              </div>
            </li>
            <li>
              <div><img src="../assets/img/instruction2.webp" alt="" /></div>
              <div>
                <h3>Name</h3>
                <p>主指导</p>
              </div>
            </li>
            <li>
              <div><img src="../assets/img/instruction3.webp" alt="" /></div>
              <div>
                <h3>Name</h3>
                <p>主指导</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <!-- 项目 -->
      <section class="project item" id="project">
        <div class="project_title">
          <h2 class="title" data-i18n="Project">{{ $t('menu.Project') }}</h2>
          <div>
            <span @click="toggleProject(1)">&larr;</span>
            <span @click="toggleProject(0)">&rarr;</span>
          </div>
        </div>
        <div class="project_main" ref="projectMain" :style="{ transform: projectTransform, transition: 'transform 0.5s ease' }">
          <li v-for="v in projectList" :key="v.id">
            <div>
              <img :src="formatImagePath(v.image_path)" :alt="v.title" />
            </div>
            <div>
              <h3>{{ currentLocale === 'zh-cn' ? v.title : v.title_us }}</h3>
        <p>{{ currentLocale === 'zh-cn' ? v.content : v.content_us}}</p>
              <div>
                {{ currentLocale === 'zh-cn' ? v.category : v.category_us }} | {{ v.project_time ? formatDate(v.project_time) : '2022.12.12' }}
                <a :href="v.link_url">{{ currentLocale === 'zh-cn' ? '查看详情' : 'Read more' }}</a> 
              </div>
            </div>
          </li>
        </div>
      </section>
      <!-- 图片展示 -->
      <ExhibitionSwiper />
    </article>
  </div>
</template>

<script>
import robot_Loading from "@/components/robot_Loading.vue";
import { useAnimation } from "@/composables/useAnimation";
import GallerySwiper from "@/components/GallerySwiper.vue";
import ExhibitionSwiper from "@/components/ExhibitionSwiper.vue";
import supabase from '@/plugins/supabase';

export default {
  name: "HomePage",
  components: { robot_Loading ,ExhibitionSwiper,GallerySwiper},
  setup() {
    useAnimation();
    return {};
  },
  data() {
    return {
      bannerList: [
        {
          "id": 2,
          "image_path": "img/banner1.webp",
          "description": "佛山高校首款自研人形机器人预计年内揭开面纱",
          "link_url": "https://gzdaily.dayoo.com/pc/html/2025-04/09/content_743_883794.htm",
          "sort_order": 1,
          "is_active": 1,
          "created_at": "2025-04-09 19:41:05"
        },
        {
          "id": 3,
          "image_path": "img/banner2.webp",
          "description": "佛山'AI赋能'活动精彩上演，憨态醒狮机器狗吸睛！",
          "link_url": "https://content.foshanplus.com/newsDetails.html?newsId=942547&memberId=1304447&utm_source=fsandroid&utm_medium=news&utm_campaign=context&utm_term=942547&utm_belong1=1304447",
          "sort_order": 1,
          "is_active": 1,
          "created_at": "2025-05-04 20:36:42"
        },
        {
          "id": 4,
          "image_path": "img/banner3.webp",
          "description": "醒狮队和机器狗现场battle！佛山市职业教育活动周上演人机斗舞",
          "link_url": "https://content.foshanplus.com/newsDetails.html?newsId=943910&memberId=126808&utm_source=fsandroid&utm_medium=news&utm_campaign=context&utm_term=943910&utm_belong1=126808&time=1747042902665",
          "sort_order": 1,
          "is_active": 1,
          "created_at": "2025-05-12 15:12:04"
        }
      ],
      newsList: [
  {
    "id": 1,
    "title": "佛山高校首款自研人形机器人预计年内揭开面纱",
    "content": "如今，佛山也有了自己的“机器汪”。在日前举行的佛山50公里徒步活动上，一只模拟了醒狮的机器狗成为现场的焦点，吸引不少市民前来互动。\n\n　　据悉，这只活泼灵动的“机器汪”由佛山高校顺德职业技术学院智能制造学院智能机器人研发团队打造，以宇树科技机器狗A1为原型，由MIT猎豹开源的机器模型进行研发。未来，这只佛山造“机器汪”或迎机器人“主人”。据该团队负责人透露，团队自研的人形机器人已经“在路上”，最快于今年9月揭开面纱。这将是佛山高校首款自研的人形机器人，集中展现佛山高校在机器人领域的集成创新能力。",
    "image_path": "img/banner1.webp",
    "publish_time": "2025-04-09",
    "link_url": "https://gzdaily.dayoo.com/pc/html/2025-04/09/content_743_883794.htm",
    "is_top": 0,
    "status": 1
  },
  {
    "id": 2,
    "title": "佛山“AI赋能”活动精彩上演，憨态醒狮机器狗吸睛！",
    "content": "5月4日，由佛山市工业和信息化局主办、佛山联通承办的“AI赋能·大集大利”主题活动在南海千灯湖环宇城精彩举行。智慧家庭、AI医疗、高效办公、机器人……在这里，场景化展区、数字互动区全面呈现联通智慧产品矩阵，吸引众多市民沉浸式体验前沿AI科技互动，近距离感受人工智能惠民应用走进生活。",
    "image_path": "img/banner2.webp",
    "publish_time": "2025-05-04",
    "link_url": "https://content.foshanplus.com/newsDetails.html?newsId=942547&memberId=1304447&utm_source=fsandroid&utm_medium=news&utm_campaign=context&utm_term=942547&utm_belong1=1304447",
    "is_top": 0,
    "status": 1
  },
  {
    "id": 3,
    "title": "醒狮队和机器狗现场battle！佛山市职业教育活动周上演人机斗舞",
    "content": "5月11日，2025年佛山市职业教育活动周暨全民终身学习活动周在市图书馆西门广场拉开帷幕。舞台上，技能绝活、文体节目不间断上演，集市展区汇聚了市内各高职院校、中职学校，这些学校精心布置了30多个特色摊位，提供茶艺品鉴、陶艺制作、中医养生科普、幼儿急救教学、3D打印等精彩体验活动，市民参与打卡就能兑换礼物。",
    "image_path": "img/banner3.webp",
    "publish_time": "2025-05-12",
    "link_url": "https://content.foshanplus.com/newsDetails.html?newsId=943910&memberId=126808&utm_source=fsandroid&utm_medium=news&utm_campaign=context&utm_term=943910&utm_belong1=126808&time=1747042902665",
    "is_top": 0,
    "status": 1
  },
  {
    "id": 4,
    "title": "法润童心 狮韵创玩启新航——佛山市幼儿园共同体童趣非遗绽放禅城区学前教育宣传月",
    "content": "随着一阵欢快的锣鼓声响起，小萌狮们舞动起来，他们在鼓点中跳跃、腾挪，展现传统文化的灵动之美，小萌狮的精彩表演引得台下的观众们掌声连连。这不仅是一场精彩的表演，更是一堂生动的传统文化与自主探究课程，展现出他们天真烂漫的童年风采和对醒狮文化的热爱之情，深刻体现出孩子们自信大方、勇敢坚毅，团结有爱的美好品德。",
    "image_path": "img/news1.webp",
    "publish_time": "2025-05-26",
    "link_url": "https://mp.weixin.qq.com/s/iYlGmjvpzjE_hb2LcRpGgA",
    "is_top": 0,
    "status": 1
  },
  {
    "id": 5,
    "title": "2025年广东省“全国科技活动周”活动在深圳启动",
    "content": "《广东新闻联播》是一档以时政经济为主，汇集国内外重大消息的综合性新闻节目。主要内容是报道广东在社会、政治、经济等方面所取得的巨大成就。在报道过程中，积极发挥正确导向、舆论监督，维护社会稳定的主流媒体作用。",
    "image_path": "img/news2.webp",
    "publish_time": "2025-05-27",
    "link_url": "https://m.itouchtv.cn/program/337/10/929560?shareId=GhxiybMD",
    "is_top": 0,
    "status": 1
  },
  {
    "id": 6,
    "title": "顺德50组星儿家庭踏上科技探索之旅",
    "content": "六一儿童节期间，由深圳市华侨公益基金会、盛幄集团IN279团队、顺德工业发展馆、佛山市精神残疾人及亲友会，联合发起“心向阳爱同行”之“科技护航、星芒闪耀”的星儿科技游乐场公益慈善活动在顺德工业发展馆启航，引领超过50组星儿家庭和普通家庭的孩子踏上了科技探索之旅。\n\n",
    "image_path": "img/news3.webp",
    "publish_time": "2025-06-05",
    "link_url": "https://content.foshanplus.com/newsDetails.html?newsId=948857&memberId=158096&utm_source=fsandroid&utm_medium=news&utm_campaign=context&utm_term=948857&utm_belong1=158096&time=1749085921505",
    "is_top": 0,
    "status": 1
  },
  {
    "id": 7,
    "title": "“AI赋能未来 科技联通生活”",
    "content": "为让青少年度过一个充满科技感的儿童节，深入贯彻国家“人工智能+”行动部署，6月1日至2日，由惠州市科学技术协会主办、中国联通惠州市分公司和惠州科技馆承办的“AI赋能未来 科技联通生活”2025年全国科技周特别活动在惠州市科技馆一楼展厅盛大启幕。活动通过十大前沿AI展项、沉浸式互动体验，全景呈现人工智能技术赋能千行百业的创新成果，累计吸引超5000人次市民参与，其中青少年占比超六成。孩子们在趣味探索中感受科技魅力，家长在场景体验中见证AI赋能未来，生动彰显惠州联通作为央企在科技创新以及对青少年科普教育中的责任担当。惠州市科协党组书记涂斯婷、惠州联通副总经理张凯等领导到现场参观指导。",
    "image_path": "img/news4.webp",
    "publish_time": "2025-06-02",
    "link_url": "https://mp.weixin.qq.com/s/tlHFHTqTvRRdkE2Z7Ufe4g",
    "is_top": 0,
    "status": 1
  }
],
      isLoading:true,
      num:0,
      projectNum: 0,
      projectItemsCount: 5, // 项目数量
      projectTransform: 'translateX(0%)',
      projectList: [
        {
          id: 1,
          title: '智能机器人教育平台',
          title_us: 'Smart Robot Education Platform',
          content: '为学校和培训机构提供全面的机器人教育解决方案，包含课程体系、教学设备和评估系统。',
          content_us: 'Providing comprehensive robot education solutions for schools and training institutions, including curriculum system, teaching equipment and evaluation system.',
          image_path: 'img/project1.webp',
          project_time: '2023-06-15',
          category: '教育',
          category_us: 'Education',
          link_url: 'News.html',
          sort_order: 1
        },
        {
          id: 2,
          title: 'AI编程夏令营',
          title_us: 'AI Programming Summer Camp',
          content: '面向青少年的人工智能编程培训项目，培养计算思维和创新能力。',
          content_us: 'AI programming training program for teenagers, cultivating computational thinking and innovation ability.',
          image_path: 'img/project2.webp',
          project_time: '2023-07-20',
          category: '培训',
          category_us: 'Training',
          link_url: 'News.html',
          sort_order: 2
        }
      ]
    };
  },
  mounted() {
    this.fetchBanners();
    this.fetchNews();
    this.fetchProjects();
  },
  methods: {
    async fetchBanners() {
      try {
        this.isLoading = true;
        const { data, error } = await supabase
          .from('banner')
          .select('*')
          .order('created_at', { ascending: false })
          .eq('is_active', 1);
          
        if (error) throw error;
        
        // 复制banner数据并修改id以确保key值不同
        const originalBanners = data;
        const copiedBanners1 = originalBanners.map(banner => ({
          ...banner,
          id: banner.id + 1000 // 第一层复制，id+1000
        }));
        
        this.bannerList = originalBanners.concat(copiedBanners1);
        // console.log('获取到的banner数据:', this.bannerList);
        this.isLoading = false;
      } catch (error) {
        // console.error('获取banner数据失败:', error);
        this.isLoading = false;
        // 可以添加错误处理逻辑
      }
    },
    
    async fetchNews() {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('publish_time', { ascending: false })
          .eq('status', 1);
          
        if (error) throw error;
        
        this.newsList = data;
        console.log('获取到的news数据:', this.newsList);
      } catch (error) {
        // console.error('获取news数据失败:', error);
        // 可以添加错误处理逻辑
      }
    },
    
    async fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('sort_order', { ascending: false });
          
        if (error) throw error;
        
        this.projectList = data;
        this.projectItemsCount = data.length;
        console.log('获取到的project数据:', this.projectList);
      } catch (error) {
        // console.error('获取project数据失败:', error);
        // 可以添加错误处理逻辑
      }
    },
    
    formatImagePath(imagePath) {
      // 如果没有图片路径，返回默认图片
      if (!imagePath) {
        return require('@/assets/img/project1.webp');
      }
      
      try {
        // 清理路径中的 './' 前缀
        let cleanPath = imagePath;
        if (imagePath.startsWith('./')) {
          cleanPath = imagePath.substring(2);
        }
        
        // 尝试加载图片
        return require(`@/assets/${cleanPath}`);
      } catch (error) {
        // 如果图片加载失败，返回默认图片
        console.warn('图片加载失败:', error);
        return require('@/assets/img/project1.webp');
      }
    },
    toggleProject(v) {
      // v为1表示向左切换，为0表示向右切换
      if (v) {
        this.projectNum--;
        if (this.projectNum < 0) {
          this.projectNum = this.projectItemsCount - 1;
        }
      } else {
        this.projectNum++;
        if (this.projectNum >= this.projectItemsCount) {
          this.projectNum = 0;
        }
      }
      
      // 使用原生JS计算实际元素宽度（包括边距）
      let offset = 0;
      if (this.$refs.projectMain) {
        const liElements = this.$refs.projectMain.querySelectorAll('li');
        if (liElements.length > 0) {
          const firstLi = liElements[0];
          // 获取元素的外部宽度（包括边距）
          const liWidth = firstLi.offsetWidth + parseFloat(getComputedStyle(firstLi).marginLeft) + parseFloat(getComputedStyle(firstLi).marginRight);
          // 计算总宽度百分比
          const containerWidth = this.$refs.projectMain.offsetWidth;
          const liWidthPercentage = (liWidth / containerWidth) * 100;
          // 计算偏移量百分比
          offset = -(this.projectNum * liWidthPercentage);
        }
      }
      
      // 应用变换
      this.projectTransform = `translateX(${offset}%)`;
    },
        
        formatDate(dateString) {
          if (!dateString) return '';
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}.${month}.${day}`;
        },
        
        toggleNew(v){
          if(v){
            const firstItem = this.newsList.shift();
            this.newsList.push(firstItem);
          }
          else{
            const lastItem = this.newsList.pop();
            this.newsList.unshift(lastItem);
          }
        },
        toggleBanner(v){
          if(v){
            const firstItem = this.bannerList.shift();
            this.bannerList.push(firstItem);
          }
          else{
            const lastItem = this.bannerList.pop();
            this.bannerList.unshift(lastItem);
          }
        }
  },
  watch: {
    // 监听语言变化，重新加载数据
    currentLocale: function() {
      // 不需要重新获取数据，只需触发视图更新
      this.$forceUpdate();
    }
  },
  computed:{
    currentLocale() {
      return this.$i18n.locale;
    }
  }
};
</script>

<style scoped>
/* CSS Document */
.banner {
  width: 80%;
  position: relative;
  overflow: hidden;
  height: 56.25vw; /* 16:9 比例 */
  max-height: 80vh; /* 可选的最大高度限制 */
  border-radius: 20px;
  margin: 30px auto;
}

.imgList li {
  width: 200px;
  position: absolute;
  left: 100%;
  top: calc(100% - 130px);
  cursor: pointer;
  transition: 1s ease;
  height: 95px;
  overflow: hidden;
  z-index: 1;
}

.imgList li img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 0% 70%;
}

.imgList li:nth-of-type(1) {
  transition: none;
}
.imgList li:nth-of-type(1),
.imgList li:nth-of-type(2) {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: inherit;
}

.imgList li:nth-of-type(3) {
  left: calc(50% - 310px);
}
.imgList li:nth-of-type(4) {
  left: calc(50% - 100px);
}
.imgList li:nth-of-type(5) {
  left: calc(50% + 110px);
}

.imgList li:last-of-type {
  z-index: 0;
}


.left_right {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  z-index: 1;
}

.left_right span {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  font-size: 30px;
  cursor: pointer;
}

/*新闻*/
.news {
  width: 80vw;
  margin: 0 auto;
  margin-top: 50px;
}

.news_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  margin-bottom: 5px;
}

.news_title > h2 {
  margin-bottom: 0;
}

.news_title > div {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.news_title > div > span {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 30px;
  border-radius: 10px;
}

.news_main {
  position: relative;
  overflow: hidden;
  height: 650px;
}

/* .news_main>li{
        position: absolute;
        top: 100%;
        left: calc(100% - 380px);
        width: 350px;
        padding: 15px;
        margin: 15px;
        box-shadow: 0px 0px 3px rgba(0,0,0,.2);
        transition: 1s ease;
        border-radius: 10px;
        background: white;
        color: rgba(19,36,88,1.00);
    } */

.news_main > li {  position: absolute;  top: -200%; /* 初始位置更靠上，完全不可见 */  left: calc(100% - 24vw);  width: 28%;  padding: 15px;  margin: 15px;  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); /* 更平滑的过渡曲线 */  border-radius: 10px;  background: white;  color: rgba(19, 36, 88, 1);  z-index: 1;}

.news_main > li > h3,
.news_main > li > p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.news_main > li > p {
  color: #222;
}

.news_main > li > div:first-of-type {
  width: 100%;
  height: 0;
  overflow: hidden;
  transition: 0.5s;
  border-radius: 10px;
}

.news_main > li > div:first-of-type img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.news_main > li > div:last-of-type {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(19, 36, 88, 1);
}

.news_main > li > div:last-of-type a {
  color: rgba(19, 36, 88, 1);
}

.news_main > li:nth-of-type(1) {
  top: -200% !important; /* 保持与其他条目一致的初始位置 */
}

.news_main > li:nth-of-type(1),
.news_main > li:nth-of-type(2) {
  width: 67%;
  top: 0;
  left: 0;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

.news_main > li:nth-of-type(1) > div:first-of-type,
.news_main > li:nth-of-type(2) > div:first-of-type {
  height: 400px;
  margin: 12px auto;
}

.news_main > li:nth-of-type(1) > p,
.news_main > li:nth-of-type(2) > p {
  -webkit-line-clamp: 3;
}

.news_main > li:nth-of-type(6) {
  top: 0;
}

.news_main > li:nth-of-type(5) {
  top: calc(calc(138px * 1) + 20px);
}
.news_main > li:nth-of-type(4) {
  top: calc(calc(138px * 2) + 40px);
}
.news_main > li:nth-of-type(3) {
  top: calc(calc(138px * 3) + 60px);
}

/* 修复选择器语法错误，解决飞入效果问题 */
/* 确保退出的新闻条目层级最低，并完全隐藏 */
.news_main > li.leave {
  z-index: -1; /* 层级低于所有其他元素 */
  opacity: 0;
  visibility: hidden;
  transform: translateY(100px);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* 确保当前显示的新闻条目层级更高 */
.news_main > li:nth-of-type(1),
.news_main > li:nth-of-type(2) {
  z-index: 2;
}

/* 其他新闻条目保持基础层级 */
.news_main > li:nth-of-type(n+3) {
  z-index: 1;
}

.introduce {
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(14, 42, 82, 1) 0 40%,
    rgba(235, 239, 248, 1) 40% 100%
  );
  padding: 70px 0;
  margin: 50px 0;
  margin-bottom: 60px;
}

.introduce > div {
  width: 860px;
  padding: 20px;
  margin: 0 auto;
  background: white;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}

.introduce > div > img {
  width: 48%;
}

.introduce > div > div {
  width: 50%;
  color: #222;
}

.introduce > div > div > h2 {
  text-align: left;
  border-left: 10px solid rgba(13, 41, 81, 1);
  padding-left: 10px;
}

/* 指导老师 */
.instruction {
  width: 100%;
  margin: 50px auto;
  background-color: rgb(252, 252, 252);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  padding-bottom: 100px;
}

.instruction > div {
  width: 80%;
}

.instruction h2 {
  margin-bottom: 30px;
}

.instruction > div > ul {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
}

.instruction > div > ul > li {
  width: calc(33.3% - 20px);
  position: relative;
  cursor: pointer;
}

.instruction > div > ul > li > div:first-of-type {
  width: 100%;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-top: 30px;
}
.instruction > div > ul > li > div:first-of-type > img {
  width: 70%;
  transition: 1s ease;
}

.instruction > div > ul > li > div:last-of-type {
  width: 80%;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border-bottom: 2px solid rgba(241, 80, 85, 1);
  background: white;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}

.instruction > div > ul > li > div:last-of-type > h3 {
  color: rgba(13, 41, 81, 1);
  font-size: 1.5em;
  cursor: pointer;
  transition: 0.5s ease;
}

.instruction > div > ul > li:hover img {
  transform: scale(1.1);
}

.instruction > div > ul > li:hover div:last-of-type > h3 {
  color: rgba(241, 80, 85, 1);
}

/*项目*/
.project {
  width: 80%;
  margin: 30px auto;
  position: relative;
  overflow: hidden;
  padding: 20px 0;
}

.project_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
}

.project_title > h2 {
  margin: 30px 0;
}

.project_title > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  font-size: 36px;
  color: rgba(30, 56, 137, 1);
  font-weight: bold;
}

.project_title > div > span {
  cursor: pointer;
}

.project_main {
  display: flex;
  position: relative;
  width: 100%;
  height: auto;
}

.project_main > li {
  width: calc(33.3% - 20px);
  overflow: hidden;
  border-radius: 10px;
  transition: 1s ease;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  flex-shrink: 0;
  height: calc(100% - 30px);
  margin: 0 10px;
}

.project_main > li:hover {
  box-shadow: 0px 5px 5px rgba(30, 56, 137, 0.5);
}

.project_main > li:hover img {
  transform: scale(1.1);
}

.project_main > li > div > img {
  width: 100%;
  height: 100%;
  transition: 1s ease;
  object-fit: cover;
}

.project_main > li > div:first-of-type {
  width: 100%;
  height: 180px; /* 固定高度 */
  overflow: hidden;
}

.project_main > li > div:last-of-type {
  padding: 3px 8px;
}

.project_main > li > div:last-of-type > h3 {
  height: 36px;
  overflow: scroll;
}

.project_main > li > div:last-of-type > p {
  color: rgba(115, 115, 115, 1);
  height: 108px;
  overflow: scroll;
}

.project_main > li > div:last-of-type > p::-webkit-scrollbar {
  display: none;
}
.project_main > li > div:last-of-type > h3::-webkit-scrollbar {
  display: none;
}

.project_main > li > div:last-of-type > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(115, 115, 115, 1);
}

.project_main > li > div:last-of-type > div > a {
  color: rgba(115, 115, 115, 1);
}

/*自适应1000px*/
@media (max-width: 1000px) {
  /* 轮播 */
  .imgList li {
    width: 150px;
    top: calc(100% - 91px);
    height: 71px;
  }

  .imgList li:nth-of-type(3) {
    left: calc(50% - 235px);
  }
  .imgList li:nth-of-type(4) {
    left: calc(50% - 75px);
  }
  .imgList li:nth-of-type(5) {
    left: calc(50% + 85px);
  }

  .left_right span {
    width: 50px;
    height: 50px;
  }

  /*新闻*/

  .news_main {
    height: 910px;
  }

  .news_main > li {
    left: 50%;
    width: calc(50% - 30px);
  }

  .news_main > li:nth-of-type(1),
  .news_main > li:nth-of-type(2) {
    width: calc(100% - 30px);
  }

  .news_main > li:nth-of-type(1) > div:first-of-type,
  .news_main > li:nth-of-type(2) > div:first-of-type {
    height: 335px;
  }
  .news_main > li:nth-of-type(3) {
    left: 0;
    top: calc(569px + 20px);
  }

  .news_main > li:nth-of-type(4) {
    top: calc(569px + 20px);
  }
  .news_main > li:nth-of-type(5) {
    top: calc(569px + 178px);
  }
  .news_main > li:nth-of-type(6) {
    top: calc(569px + 178px);
    left: 0;
  }

  /* 介绍 */
  .introduce > div {
    width: 600px;
  }

  .introduce > div > img {
    width: 100%;
    margin-bottom: 10px;
  }

  .introduce > div > div {
    width: 100%;
  }

  /* 团队成员 */
  .instruction > div > ul {
    gap: 90px 30px;
  }
  .instruction > div > ul > li {
    width: calc(50% - 15px);
  }

  /* 项目 */
  .project_main > li {
    width: calc(50% - 20px);
  }
}

/*自适应630px*/
@media (max-width: 630px) {
  .imgList li {
    width: 80px;
    top: calc(100% - 55px);
    height: 47px;
  }

  .imgList li:nth-of-type(3) {
    left: calc(50% - 130px);
  }
  .imgList li:nth-of-type(4) {
    left: calc(50% - 40px);
  }
  .imgList li:nth-of-type(5) {
    left: calc(50% + 50px);
  }

  .left_right span {
    width: 30px;
    height: 30px;
    font-size: 18px;
  }

  /*新闻*/
  .news_main {
    height: 665px;
  }

  .news_main > li {
    left: 0;
    width: calc(100% - 30px);
  }

  .news_main > li:nth-of-type(1) > div:first-of-type,
  .news_main > li:nth-of-type(2) > div:first-of-type {
    height: 250px;
  }
  .news_main > li:nth-of-type(3) {
    left: 0;
    top: calc(484px + 20px);
  }

  .news_main > li:nth-of-type(4) {
    top: calc(484px + 220px);
  }

  .introduce > div {
    width: 370px;
  }

  .introduce > div > img {
    display: none;
  }
  /* 团队成员 */
  .instruction > div > ul > li {
    width: 100%;
  }

  /* 项目 */
  .project_main > li {
    width: calc(100% - 20px);
  }
}

/* letter涵 */
.swiper {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 50px;
}

.swiper .swiper-slide img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

/* Exhibition */
.exhibition {
  width: 100%;
  background-color: rgb(252, 252, 252);
  padding: 50px 0;
  overflow: hidden;
}

.exhibition_box img {
  width: 100%;
}
</style>
