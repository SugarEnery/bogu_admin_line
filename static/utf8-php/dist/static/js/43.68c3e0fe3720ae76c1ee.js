webpackJsonp([43],{YylB:function(e,t,o){"use strict";var r={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticClass:"container form02"},[o("el-form",{ref:"form02",staticClass:"demo-form-inline",attrs:{"label-position":e.labelPosition,rules:e.rules,"label-width":e.labelWidth,inline:!1,model:e.form2}},[o("el-form-item",{attrs:{label:"标题",prop:"spots_title"}},[o("el-input",{attrs:{placeholder:"标题"},model:{value:e.form2.spots_title,callback:function(t){e.$set(e.form2,"spots_title",t)},expression:"form2.spots_title"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"来源",prop:"spots_source"}},[o("el-input",{attrs:{placeholder:"来源"},model:{value:e.form2.spots_source,callback:function(t){e.$set(e.form2,"spots_source",t)},expression:"form2.spots_source"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"简介",prop:"spots_abstract"}},[o("el-input",{attrs:{placeholder:"简介"},model:{value:e.form2.spots_abstract,callback:function(t){e.$set(e.form2,"spots_abstract",t)},expression:"form2.spots_abstract"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"类型",prop:"spots_type"}},[o("el-select",{attrs:{placeholder:"选择类型"},model:{value:e.form2.spots_type,callback:function(t){e.$set(e.form2,"spots_type",t)},expression:"form2.spots_type"}},[o("el-option",{attrs:{label:"网红景点",value:"1"}}),e._v(" "),o("el-option",{attrs:{label:"海边景点",value:"2"}}),e._v(" "),o("el-option",{attrs:{label:"森林景点",value:"3"}})],1)],1),e._v(" "),o("el-form-item",[o("el-upload",{attrs:{action:e.form2.doUpload,"list-type":"picture-card",accept:"image/*",name:"picture",headers:e.headers,limit:e.form2.imgLimit,"file-list":e.form2.productImgs,multiple:e.form2.isMultiple,"on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload,"on-exceed":e.handleExceed,"on-error":e.imgUploadError}},[o("i",{staticClass:"el-icon-plus"})]),e._v(" "),o("el-dialog",{attrs:{visible:e.form2.dialogVisible},on:{"update:visible":function(t){e.$set(e.form2,"dialogVisible",t)}}},[o("img",{attrs:{width:"100%",src:e.form2.dialogImageUrl,alt:""}})])],1),e._v(" "),o("el-form-item",{attrs:{label:"缩略图",prop:"spots_img"}},[o("el-input",{attrs:{placeholder:"缩略图"},model:{value:e.form2.spots_img,callback:function(t){e.$set(e.form2,"spots_img",t)},expression:"form2.spots_img"}})],1),e._v(" "),o("div",{staticClass:"box-container"},[o("Ueditor",{ref:"ue",staticStyle:{width:"100%"},attrs:{value:e.defaultMSG,ueditorConfig:e.config},on:{ready:e.editorReady}})],1),e._v(" "),o("el-form-item",{attrs:{label:" "}},[o("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("form2")}}},[e._v("立即创建")])],1)],1)],1)])},staticRenderFns:[]};t.a=r},iaKG:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("mhhp"),s=o.n(r);for(var a in r)"default"!==a&&function(e){o.d(t,e,function(){return r[e]})}(a);var l=o("YylB");var i=function(e){o("tlXC")},n=o("VU/8")(s.a,l.a,!1,i,null,null);t.default=n.exports},mhhp:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(o("woOf")),s=l(o("qzrg")),a=l(o("Eo2C"));function l(e){return e&&e.__esModule?e:{default:e}}t.default={name:"searchinput",data:function(){return{name:localStorage.getItem("name"),form2:{spots_title:"",spots_abstract:"",spots_source:"",spots_detail:"",spots_type:"",spots_img:"",doUpload:"http://web.newwynnhotel.com/admin/classes/picture_add",dialogImageUrl:"",dialogVisible:!1,productImgs:[],isMultiple:!0,imgLimit:1},form:{content:""},config:{initialFrameHeight:500},defaultMSG:null,editor:null,EditorObj:"",labelPosition:"right",labelWidth:"80px",rules:{user_tel:[{required:!0,message:"请填写手机",trigger:"change"}],product_id:[{type:"array",required:!0,message:"请至少选择一个产品",trigger:"change"}],number:[{required:!0,message:"请填写数量",trigger:"change"}]}}},computed:{headers:function(){return{Authorization:localStorage.getItem("Authorization")}}},components:{Ueditor:a.default},methods:{editorReady:function(e){var t=this;e.setContent(this.form.content),e.addListener("contentChange",function(){t.form2.spots_detail=e.getContent()})},handleRemove:function(e,t){console.log(e,t)},handlePictureCardPreview:function(e){console.log(e),this.dialogImageUrl=e.url,this.dialogVisible=!0},beforeAvatarUpload:function(e){console.log(e);var t=e.size/1024/1024<2;return t||this.$message.error("上传图片大小不能超过 2MB!"),t},handleAvatarSuccess:function(e,t){console.log(e),console.log(t),this.form2.spots_img=e,this.imageUrl=URL.createObjectURL(t.raw)},handleExceed:function(e,t){this.$message.error("上传图片不能超过6张!"),console.log(file,t)},imgUploadError:function(e,t,o){console.log(e),this.$message.error("上传图片失败!")},submitForm:function(e){var t=this;this.$refs.form02.validate(function(e){if(!e)return console.log("error submit!!"),!1;var o=(0,r.default)({},t.form2);s.default.msgApi.attraAdd(o).then(function(e){if(console.log(e),e&&e.data){var o=e.data;if(o&&1e3==o.error_code)t.$message({message:o.msg,type:"success"});else if(o&&0==o.error_code)return t.$message({message:"执行成功",type:"success"}),t.$router.push({path:"/attra_list"}),void(t.dialogEdittVisible=!1)}t.$message({message:"执行失败，请重试",type:"error"})}).catch(function(e){t.$message({message:"执行失败，请重试",type:"error"}),console.log(e)})})}}}},tlXC:function(e,t){}});