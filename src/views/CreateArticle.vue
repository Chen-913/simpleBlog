<template>
<div class="create-article-container">
  <h1>添加文章</h1>
  <div class="title">
    文章标题<input type="text" class="container__input" v-model.trim="articleTitle" />
    <button class="button" @click="handleSubmit">提交</button>
  </div>
  <div style="border: 1px solid #ccc;">
      <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />
      <Editor
          style="height: 500px; overflow-y: hidden; text-align:left;"
          v-model="html"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
      />
  </div>
</div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import '@wangeditor/editor/dist/css/style.css';

export default {
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: '',
      toolbarConfig: { },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'simple', // or 'simple'
      articleTitle: '',
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    handleSubmit() {
      if (!this.articleTitle) { alert('文章标题不能为空'); return; }
      if (!this.html.trim()) { alert('文章内容不能为空'); return; }

      let id = null;
      if (this.$store.getters.lastArticle) {
        id = this.$store.getters.lastArticle.id + 1;
      } else {
        id = 0;
      }
      const articleData = {
        id,
        title: this.articleTitle,
        content: this.html,
        createTime: (new Date()).getTime(),
      };
      // console.log('提交文章');
      this.$store.dispatch('addArticle', articleData);
      alert('添加成功');
      this.articleTitle = '';
      this.html = '';
      this.$router.push({ name: 'Article' });
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //   this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>';
    //   window.editor = this.editor;
    // }, 1500);
  },
  beforeDestroy() {
    const { editor } = this;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<style lang='less'>
.create-article-container {
  .title{
    position:relative;
    display: flex;
    height: 25px;
    line-height: 25px;
    margin-bottom: 20px;
    /* Border */
    // border: 1px solid rgba(0, 0, 0, 0.3);

    .container__input {
      border-color: 1px solid rgba(0, 0, 0, 0.3);
      /* Take available width */
      // flex: 1;
      margin-left: 10px;
      width: 200px;
    }
    .button{
      position:absolute;
      right: 0px;
    }
  }
}

</style>
