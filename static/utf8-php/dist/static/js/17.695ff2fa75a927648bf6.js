webpackJsonp([17],{"/hsq":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("wwB8"),r=i.n(o);for(var a in o)"default"!==a&&function(e){i.d(t,e,function(){return o[e]})}(a);var s=i("gfSO");var l=function(e){i("3Mi3")},n=i("VU/8")(r.a,s.a,!1,l,null,null);t.default=n.exports},"3Mi3":function(e,t){},gfSO:function(e,t,i){"use strict";var o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"container form02"},[i("el-form",{ref:"form02",staticClass:"demo-form-inline",attrs:{"label-position":e.labelPosition,rules:e.rules,"label-width":e.labelWidth,inline:!1,model:e.form2}},[i("el-form-item",{attrs:{label:"标题",prop:"ambitus_title"}},[i("el-input",{attrs:{placeholder:"标题"},model:{value:e.form2.ambitus_title,callback:function(t){e.$set(e.form2,"ambitus_title",t)},expression:"form2.ambitus_title"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"来源",prop:"ambitus_source"}},[i("el-input",{attrs:{placeholder:"来源"},model:{value:e.form2.ambitus_source,callback:function(t){e.$set(e.form2,"ambitus_source",t)},expression:"form2.ambitus_source"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"标签",prop:"ambitus_tag"}},[i("el-input",{attrs:{placeholder:"标签"},model:{value:e.form2.ambitus_tag,callback:function(t){e.$set(e.form2,"ambitus_tag",t)},expression:"form2.ambitus_tag"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"类型",prop:"ambitus_type"}},[i("el-select",{attrs:{placeholder:"选择类型"},model:{value:e.form2.ambitus_type,callback:function(t){e.$set(e.form2,"ambitus_type",t)},expression:"form2.ambitus_type"}},[i("el-option",{attrs:{label:"政府",value:"1"}}),e._v(" "),i("el-option",{attrs:{label:"医院",value:"2"}})],1)],1),e._v(" "),i("el-form-item",[i("el-upload",{attrs:{action:e.form2.doUpload,"list-type":"picture-card",accept:"image/*",name:"picture",headers:e.headers,limit:e.form2.imgLimit,"file-list":e.form2.productImgs,multiple:e.form2.isMultiple,"on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload,"on-exceed":e.handleExceed,"on-error":e.imgUploadError}},[i("i",{staticClass:"el-icon-plus"})]),e._v(" "),i("el-dialog",{attrs:{visible:e.form2.dialogVisible},on:{"update:visible":function(t){e.$set(e.form2,"dialogVisible",t)}}},[i("img",{attrs:{width:"100%",src:e.form2.dialogImageUrl,alt:""}})])],1),e._v(" "),i("el-form-item",{attrs:{label:"缩略图",prop:"ambitus_img"}},[i("el-input",{attrs:{placeholder:"缩略图"},model:{value:e.form2.ambitus_img,callback:function(t){e.$set(e.form2,"ambitus_img",t)},expression:"form2.ambitus_img"}})],1),e._v(" "),i("div",{staticClass:"box-container"},[i("Ueditor",{ref:"ue",staticStyle:{width:"100%"},attrs:{value:e.defaultMSG,ueditorConfig:e.config},on:{ready:e.editorReady}})],1),e._v(" "),i("el-form-item",{attrs:{label:" "}},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("form2")}}},[e._v("立即创建")])],1)],1)],1)])},staticRenderFns:[]};t.a=o},wwB8:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s(i("woOf")),r=s(i("qzrg")),a=s(i("Eo2C"));function s(e){return e&&e.__esModule?e:{default:e}}t.default={name:"searchinput",data:function(){return{personInfo:this.$route.query,name:localStorage.getItem("name"),form2:{ambitus_type:"",ambitus_title:"",ambitus_tag:"",ambitus_img:"",ambitus_source:"",doUpload:"http://web.newwynnhotel.com/admin/classes/picture_add",dialogImageUrl:"",dialogVisible:!1,productImgs:[],isMultiple:!0,imgLimit:1},form:{content:""},config:{initialFrameHeight:500},defaultMSG:null,editor:null,EditorObj:"",labelPosition:"right",labelWidth:"80px",rules:{user_tel:[{required:!0,message:"请填写手机",trigger:"change"}],product_id:[{type:"array",required:!0,message:"请至少选择一个产品",trigger:"change"}],number:[{required:!0,message:"请填写数量",trigger:"change"}]}}},computed:{headers:function(){return{Authorization:localStorage.getItem("Authorization")}}},mounted:function(){this.getParams()},components:{Ueditor:a.default},methods:{getParams:function(){var e=this.personInfo;console.log(e),this.form2.ambitus_id=this.personInfo.ambitus_id,this.form2.ambitus_type=this.personInfo.ambitus_type,this.form2.ambitus_title=this.personInfo.ambitus_title,this.form2.ambitus_tag=this.personInfo.ambitus_tag,this.form2.ambitus_img=this.personInfo.ambitus_img,this.form.content=this.personInfo.ambitus_detail,this.form2.ambitus_detail=this.personInfo.ambitus_detail,this.form2.ambitus_source=this.personInfo.ambitus_source},editorReady:function(e){var t=this;e.setContent(this.form.content),e.addListener("contentChange",function(){t.form2.ambitus_detail=e.getContent()})},handleRemove:function(e,t){console.log(e,t)},handlePictureCardPreview:function(e){console.log(e),this.dialogImageUrl=e.url,this.dialogVisible=!0},beforeAvatarUpload:function(e){console.log(e);var t=e.size/1024/1024<2;return t||this.$message.error("上传图片大小不能超过 2MB!"),t},handleAvatarSuccess:function(e,t){console.log(e),console.log(t),this.form2.ambitus_img=e,this.imageUrl=URL.createObjectURL(t.raw)},handleExceed:function(e,t){this.$message.error("上传图片不能超过6张!"),console.log(file,t)},imgUploadError:function(e,t,i){console.log(e),this.$message.error("上传图片失败!")},submitForm:function(e){var t=this;this.$refs.form02.validate(function(e){if(!e)return console.log("error submit!!"),!1;var i=(0,o.default)({},t.form2);r.default.msgApi.surrouEdit(i).then(function(e){if(console.log(e),e&&e.data){var i=e.data;if(i&&1e3==i.error_code)t.$message({message:i.msg,type:"success"});else if(i&&0==i.error_code)return t.$message({message:"执行成功",type:"success"}),t.$router.push({path:"/news_list"}),void(t.dialogEdittVisible=!1)}t.$message({message:"执行失败，请重试",type:"error"})}).catch(function(e){t.$message({message:"执行失败，请重试",type:"error"}),console.log(e)})})}}}}});