webpackJsonp([31],{DWPO:function(e,t,o){"use strict";var r={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticClass:"container form02"},[o("el-form",{ref:"form02",staticClass:"demo-form-inline",attrs:{"label-position":e.labelPosition,rules:e.rules,"label-width":e.labelWidth,inline:!1,model:e.form2}},[o("el-form-item",{attrs:{label:"新闻类型",prop:"news_type"}},[o("el-select",{attrs:{placeholder:"选择类型"},model:{value:e.form2.news_type,callback:function(t){e.$set(e.form2,"news_type",t)},expression:"form2.news_type"}},[o("el-option",{attrs:{label:"公司动态",value:"1"}}),e._v(" "),o("el-option",{attrs:{label:"新闻中心",value:"2"}}),e._v(" "),o("el-option",{attrs:{label:"商务政策",value:"3"}})],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"标题",prop:"news_title"}},[o("el-input",{attrs:{placeholder:"标题"},model:{value:e.form2.news_title,callback:function(t){e.$set(e.form2,"news_title",t)},expression:"form2.news_title"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"来源",prop:"news_source"}},[o("el-input",{attrs:{placeholder:"来源"},model:{value:e.form2.news_source,callback:function(t){e.$set(e.form2,"news_source",t)},expression:"form2.news_source"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"摘要",prop:"news_abstract"}},[o("el-input",{attrs:{placeholder:"摘要"},model:{value:e.form2.news_abstract,callback:function(t){e.$set(e.form2,"news_abstract",t)},expression:"form2.news_abstract"}})],1),e._v(" "),o("el-form-item",[o("el-upload",{attrs:{action:e.form2.doUpload,"list-type":"picture-card",accept:"image/*",name:"picture",headers:e.headers,limit:e.form2.imgLimit,"file-list":e.form2.productImgs,multiple:e.form2.isMultiple,"on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload,"on-exceed":e.handleExceed,"on-error":e.imgUploadError}},[o("i",{staticClass:"el-icon-plus"})]),e._v(" "),o("el-dialog",{attrs:{visible:e.form2.dialogVisible},on:{"update:visible":function(t){e.$set(e.form2,"dialogVisible",t)}}},[o("img",{attrs:{width:"100%",src:e.form2.dialogImageUrl,alt:""}})])],1),e._v(" "),o("el-form-item",{attrs:{label:"封面图",prop:"news_img"}},[o("el-input",{attrs:{placeholder:"封面图"},model:{value:e.form2.news_img,callback:function(t){e.$set(e.form2,"news_img",t)},expression:"form2.news_img"}})],1),e._v(" "),o("div",{staticClass:"box-container"},[o("Ueditor",{ref:"ue",staticStyle:{width:"100%"},attrs:{value:e.defaultMSG,ueditorConfig:e.config},on:{ready:e.editorReady}})],1),e._v(" "),o("el-form-item",{attrs:{label:" "}},[o("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("form2")}}},[e._v("立即创建")])],1)],1)],1)])},staticRenderFns:[]};t.a=r},Gi61:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("YKWm"),l=o.n(r);for(var a in r)"default"!==a&&function(e){o.d(t,e,function(){return r[e]})}(a);var i=o("DWPO");var s=function(e){o("oFRc")},n=o("VU/8")(l.a,i.a,!1,s,null,null);t.default=n.exports},YKWm:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(o("woOf")),l=i(o("qzrg")),a=i(o("Eo2C"));function i(e){return e&&e.__esModule?e:{default:e}}t.default={name:"searchinput",data:function(){return{name:localStorage.getItem("name"),form2:{news_title:"",news_source:"",news_abstract:"",news_detail:"",news_type:"",news_img:"",article_img:"",doUpload:"http://web.newwynnhotel.com/admin/classes/picture_add",dialogImageUrl:"",dialogVisible:!1,productImgs:[],isMultiple:!0,imgLimit:1},form:{content:""},config:{initialFrameHeight:500},defaultMSG:null,editor:null,EditorObj:"",labelPosition:"right",labelWidth:"80px",rules:{}}},computed:{headers:function(){return{Authorization:localStorage.getItem("Authorization")}}},mounted:function(){},components:{Ueditor:a.default},methods:{editorReady:function(e){var t=this;e.setContent(this.form.content),e.addListener("contentChange",function(){t.form2.news_detail=e.getContent()})},handleRemove:function(e,t){console.log(e,t)},handlePictureCardPreview:function(e){console.log(e),this.dialogImageUrl=e.url,this.dialogVisible=!0},beforeAvatarUpload:function(e){console.log(e);var t=e.size/1024/1024<2;return t||this.$message.error("上传图片大小不能超过 2MB!"),t},handleAvatarSuccess:function(e,t){console.log(e),console.log(t),this.form2.news_img=e,this.imageUrl=URL.createObjectURL(t.raw)},handleExceed:function(e,t){this.$message.error("上传图片不能超过6张!"),console.log(file,t)},imgUploadError:function(e,t,o){console.log(e),this.$message.error("上传图片失败!")},submitForm:function(e){var t=this;this.$refs.form02.validate(function(e){if(!e)return console.log("error submit!!"),!1;var o=(0,r.default)({},t.form2);l.default.msgApi.newsAdd(o).then(function(e){if(console.log(e),e&&e.data){var o=e.data;if(o&&1e3==o.error_code)t.$message({message:o.msg,type:"success"});else if(o&&0==o.error_code)return t.$message({message:"执行成功",type:"success"}),t.$router.push({path:"/news_list"}),void(t.dialogEdittVisible=!1)}t.$message({message:"执行失败，请重试",type:"error"})}).catch(function(e){t.$message({message:"执行失败，请重试",type:"error"}),console.log(e)})})}}}},oFRc:function(e,t){}});