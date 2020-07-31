<template>
  <div class="tinymce-editor">
    <editor v-model="myValue" :init="init"></editor>
  </div>
</template>
<script>
import { upLoadFiles } from "@/utils/api/api";
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/icons/default/icons";
import "tinymce/themes/silver";
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import "tinymce/plugins/image"; // 插入上传图片插件
// import 'tinymce/plugins/media'// 插入视频插件
// import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
// import "tinymce/plugins/wordcount"; // 字数统计插件
export default {
  mounted() {
    console.log("子组件");
  },
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
    // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
    baseUrl: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: "lists image"
    },
    // 在toolbar中添加工具栏相应按钮
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image table | removeformat"
    },
    params: {
      type: Object
    }
  },
  data() {
    return {
      init: {
        language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`, // 语言包路径
        language: "zh_CN", //语言
        skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`, //skin路径
        content_css: `${this.baseUrl}/tinymce/skins/content/default/content.css`,
        // skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide-dark`, // 暗色系
        // content_css: `${this.baseUrl}/tinymce/skins/content/dark/content.css`, // 暗色系
        height: 1000, //编辑器高度
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false, //是否禁用“Powered by TinyMCE”
        menubar: false, //顶部菜单栏显示
        // 此处为图片上传处理函数
        images_upload_handler: (blobInfo, success, failure) => {
          var { upLoadId, typeName, remarks } = this.params;
          let formdata = new FormData();
          formdata.set("file", blobInfo.blob());
          upLoadFiles(upLoadId, typeName, remarks, formdata)
            .then(res => {
              var url =
                "http://192.168.0.89:9007/f1/FileResources/AppWebDownLoad?pathtemp=" +
                res.temp[0].resId;
              success(url);
            })
            .catch(res => {
              failure("error");
            });
        }
      },
      myValue: this.value
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick(e) {
      console.log(e);
      this.$emit("onClick", e, tinymce);
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = "";
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    }
  }
};
</script>