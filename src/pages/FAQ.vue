<template>
  <!-- 内容 -->
  <article>
    <section class="intro item" id="Introduce">
      <div>
        <div>
          <h2 class="title" data-i18n="Introduce">{{ $t('menu.Introduce') }}</h2>
          <span></span>
          <p>
            {{ $t('menu.detail_introduce') }}
          </p>
        </div>
        <img src="../assets/img/1.webp" alt="" />
      </div>
    </section>
    <section class="faq item" id="FAQ">
      <h2 class="title" data-i18n="FAQ">{{ $t('menu.FAQ') }}</h2>
      <span class="line"><span></span></span>
      <ul>
        <li
          v-for="(v, index) in faqs"
          :key="index"
          :class="{ current: activeIndex === index }"
          @click="toggle(index)"
        >
          <h3>{{ v.question }}</h3>
          <transition
            enter-active-class="animate__animated animate__zoomIn"
            leave-active-class="animate__animated animate__zoomOut"
          >
            <p v-show="activeIndex === index">{{ v.answer }}</p>
          </transition>
          <span></span><span></span>
        </li>
      </ul>
    </section>

    <section class="contact-box item" id="Contact">
      <div class="contact">
        <ul>
          <li>
            <h3>{{ $t('menu.Address') }}</h3>
            <p>{{ $t('menu.detail_address') }}</p>
          </li>
          <li>
            <h3>{{ $t('menu.Phone') }}</h3>
            <p>+86 199 2473 0995</p>
          </li>
          <li>
            <h3>{{ $t('menu.Email') }}</h3>
            <p>kishibe_ruhan@163.com</p>
          </li>
          <li>
            <h3>{{ $t('menu.Working hours') }}</h3>
            <p>24H</p>
          </li>
        </ul>
      </div>
      <div class="touch" id="TOUCH">
        <h1 data-i18n="Touch">{{ $t('menu.Touch') }}</h1>
        <p>
          Nulla imperdiet odio tempor nisl vulputate scelerisque. Fusce interdum
          ultricies convallis. Vivamus efficitur purus eu elit scelerisque
          blandit. Nullam viverra est quis erat fringilla,at rutrum sem lacinia.
        </p>
        <form action="">
          <input v-model="name" type="text" placeholder="Name" />
          <input v-model="email" type="email" placeholder="Email" />
          <input v-model="subject" type="text" placeholder="Subject" />
          <textarea
            v-model="message"
            name=""
            id="" a
            cols="10"
            rows="5"
            placeholder="Message"
          ></textarea>
          <input type="submit" @click.prevent="submitForm" :disabled="isSubmitting" :value="isSubmitting ? '提交中...' : 'SUBMIT'" />
        </form>
      </div>
    </section>
  </article>
</template>

<script>
import { useAnimation } from '@/composables/useAnimation';
import supabase from '@/plugins/supabase';
export default {
  name: "FaqPage",
  setup(){
        useAnimation();
        return {}
    },
  data() {
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
      activeIndex: 0,
      isSubmitting: false,
      faqs: [
        {
          question: "Vue 是什么?",
          answer: "Vue 是一套用于构建用户界面的渐进式框架。",
        },
        { question: "Vue 的特点是什么?", answer: "易用、灵活、高效。" },
        {
          question: "Vue 3 有什么新特性?",
          answer: "Composition API、性能提升、更好的 TypeScript 支持等。",
        },
      ],
    };
  },
  methods: {
    toggle(index) {
        this.activeIndex = this.activeIndex === index ? -1 : index;
        console.log(this.activeIndex)
    },
    async submitForm() {
      try {
        // 如果已经在提交中，则直接返回
        if (this.isSubmitting) {
          return;
        }
        
        // 设置为提交中状态
        this.isSubmitting = true;
        // 验证表单数据
        if (!this.name || !this.email || !this.message) {
          alert('请填写所有必填字段');
          this.isSubmitting = false; // 重置提交状态
          return;
        }

        // 验证邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
          alert('请输入有效的邮箱地址');
          this.isSubmitting = false; // 重置提交状态
          return;
        }

        // 将数据写入Supabase
        const { data, error } = await supabase
          .from('contact_form')
          .insert([{
            name: this.name,
            email: this.email,
            subject: this.subject,
            message: this.message
          }]);

        if (error) {
          console.error('Error submitting form:', error);
          alert('表单提交失败，请稍后再试。');
        } else {
          console.log('Form submitted successfully:', data);
          alert('表单提交成功！');
          // 重置表单
          this.name = '';
          this.email = '';
          this.subject = '';
          this.message = '';
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        alert('发生意外错误，请稍后再试。');
      } finally {
        // 无论成功还是失败，都重置提交状态
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
/* CSS Document */
/*介绍*/
.intro {
  padding: 80px 0;
  background: linear-gradient(
    to right,
    rgba(14, 42, 82, 1) 0 40%,
    rgba(235, 239, 248, 1) 40% 100%
  );
}
.intro > div {
  width: 860px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  background: white;
  padding: 20px;
  align-items: stretch;
}
.intro > div .title {
  border-left: 10px solid rgba(13, 41, 81, 1);
  text-align: left;
  padding-left: 5px;
  color: rgba(13, 41, 81, 1);
}
.intro > div img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.intro > div > div:first-child {
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: auto;
  padding-right: 10px;
}
.intro > div > div:first-child p {
  flex: 1;
  margin-top: 10px;
}
/*自定义滚动条样式*/
.intro > div > div:first-child::-webkit-scrollbar {
  width: 6px;
}

.intro > div > div:first-child::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.intro > div > div:first-child::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.intro > div > div:first-child::-webkit-scrollbar-thumb:hover {
  background: #555;
}
/*常见问题解答*/
.faq {
  width: 60%;
  margin: 60px auto;
}
.faq ul li {
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 5px 20px;
  cursor: pointer;
  padding-right: 50px;
}
.faq ul li:nth-of-type(n + 2) {
  margin-top: 20px;
}
.faq ul li h3 {
  color: rgba(13, 41, 81, 1);
}

.faq ul li span {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 14px;
  height: 2px;
  transition: 0.3s;
  background: rgba(13, 41, 81, 1);
}
.faq ul li span:nth-of-type(2) {
  transform: rotate(90deg);
}
.current span:nth-of-type(1) {
  transform: rotate(135deg) !important;
}
.current span:nth-of-type(2) {
  transform: rotate(225deg) !important;
}

/*联系部分*/
.contact-box {
  width: 75%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 50px auto;
}
.contact {
  width: calc(35% - 30px);
  background: rgba(19, 36, 88, 1);
  padding: 50px;
  color: white;
}
.contact li {
  padding: 10px 0;
}
.contact li:nth-of-type(n + 2) {
  border-top: 2px dashed rgba(182, 182, 182, 1);
}
.touch {
  width: 65%;
}
.touch h1 {
  font-size: 26px;
  color: rgba(19, 36, 88, 1);
  margin-bottom: 20px;
}
.touch p {
  color: rgba(19, 36, 88, 1);
}
.touch form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.touch form input {
  width: calc(50% - 10px);
  height: 40px;
  outline: none;
  padding: 0 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  margin-bottom: 30px;
  color: rgba(0, 0, 0, 0.5);
}
.touch form textarea {
  width: 100%;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  resize: none;
  border-radius: 20px;
  color: rgba(0, 0, 0, 0.5);
  padding: 15px;
  margin-bottom: 20px;
}
.touch form input[type="submit"] {
  width: auto;
  background: rgb(47, 95, 238);
  color: white;
  border-radius: 6px;
  margin-bottom: 0;
  cursor: pointer;
  transition: 1s ease;
}

.touch form input[type="submit"]:hover {
  background: rgba(19, 36, 88, 1);
}

.img-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  background: rgba(13, 41, 80, 1);
  border-radius: 10px;
  margin-bottom: 4px;
}
/*自适应768px*/
@media (max-width: 900px) {
  .intro > div {
    width: 600px;
  }
  .faq {
    width: 80%;
  }
  .intro > div img,
  .intro > div div {
    width: 100%;
  }

  .contact-box {
    width: 80%;
    gap: 20px;
    flex-direction: column-reverse;
  }

  .contact-box > div {
    width: 100%;
  }
}
/*自适应480px*/
@media (max-width: 630px) {
  .intro > div {
    width: 330px;
  }
  .intro > div img {
    display: none;
  }
}
</style>
