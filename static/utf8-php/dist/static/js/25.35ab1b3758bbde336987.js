webpackJsonp([25],{"/qnR":function(e,o,r){"use strict";var t={render:function(){var e=this,o=e.$createElement,r=e._self._c||o;return r("div",[r("div",{staticClass:"container form02"},[r("el-form",{ref:"form02",staticClass:"demo-form-inline",attrs:{"label-position":e.labelPosition,rules:e.rules,"label-width":e.labelWidth,inline:!1,model:e.form2}},[r("el-form-item",{attrs:{label:"标题",prop:"pro_name"}},[r("el-input",{attrs:{placeholder:"标题"},model:{value:e.form2.pro_name,callback:function(o){e.$set(e.form2,"pro_name",o)},expression:"form2.pro_name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"英文名",prop:"pro_english_name"}},[r("el-input",{attrs:{placeholder:"英文名"},model:{value:e.form2.pro_english_name,callback:function(o){e.$set(e.form2,"pro_english_name",o)},expression:"form2.pro_english_name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"摘要",prop:"pro_abstract"}},[r("el-input",{attrs:{placeholder:"摘要"},model:{value:e.form2.pro_abstract,callback:function(o){e.$set(e.form2,"pro_abstract",o)},expression:"form2.pro_abstract"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"价格",prop:"pro_price"}},[r("el-input",{attrs:{placeholder:"价格"},model:{value:e.form2.pro_price,callback:function(o){e.$set(e.form2,"pro_price",o)},expression:"form2.pro_price"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"面积",prop:"pro_area"}},[r("el-input",{attrs:{placeholder:"面积"},model:{value:e.form2.pro_area,callback:function(o){e.$set(e.form2,"pro_area",o)},expression:"form2.pro_area"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"房屋类型",prop:"pro_house_type"}},[r("el-input",{attrs:{placeholder:"房屋类型"},model:{value:e.form2.pro_house_type,callback:function(o){e.$set(e.form2,"pro_house_type",o)},expression:"form2.pro_house_type"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"产品类型",prop:"pro_type"}},[r("el-input",{attrs:{placeholder:"产品类型"},model:{value:e.form2.pro_type,callback:function(o){e.$set(e.form2,"pro_type",o)},expression:"form2.pro_type"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"小区",prop:"pro_residential"}},[r("el-input",{attrs:{placeholder:"小区"},model:{value:e.form2.pro_residential,callback:function(o){e.$set(e.form2,"pro_residential",o)},expression:"form2.pro_residential"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"位置",prop:"pro_position"}},[r("el-input",{attrs:{placeholder:"位置"},model:{value:e.form2.pro_position,callback:function(o){e.$set(e.form2,"pro_position",o)},expression:"form2.pro_position"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"视频地址",prop:"pro_video"}},[r("el-input",{attrs:{placeholder:"视频地址"},model:{value:e.form2.pro_video,callback:function(o){e.$set(e.form2,"pro_video",o)},expression:"form2.pro_video"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否热门",prop:"is_hot"}},[r("el-select",{attrs:{placeholder:"是否热门"},model:{value:e.form2.is_hot,callback:function(o){e.$set(e.form2,"is_hot",o)},expression:"form2.is_hot"}},[r("el-option",{attrs:{label:"否",value:"-1"}}),e._v(" "),r("el-option",{attrs:{label:"是",value:"1"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"缩略图",prop:"pro_img"}},[r("el-upload",{attrs:{action:e.form2.doUpload,"list-type":"picture-card",accept:"image/*",name:"picture",headers:e.headers,limit:e.form2.imgLimit,"file-list":e.form2.productImgs,multiple:e.form2.isMultiple,"on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload,"on-exceed":e.handleExceed,"on-error":e.imgUploadError}},[r("i",{staticClass:"el-icon-plus"})]),e._v(" "),r("el-dialog",{attrs:{visible:e.form2.dialogVisible},on:{"update:visible":function(o){e.$set(e.form2,"dialogVisible",o)}}},[r("img",{attrs:{width:"100%",src:e.form2.dialogImageUrl,alt:""}})]),e._v(" "),r("el-input",{attrs:{placeholder:"缩略图"},model:{value:e.form2.pro_img,callback:function(o){e.$set(e.form2,"pro_img",o)},expression:"form2.pro_img"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"地址图片",prop:"img"}},[r("el-upload",{attrs:{action:e.form2.doUploadmore,"list-type":"picture-card",accept:"image/*",name:"picture",headers:e.headers,limit:e.form2.imgLimit2,"file-list":e.form2.productImgs2,multiple:e.form2.isMultiple2,"on-preview":e.handlePictureCardPreview2,"on-remove":e.handleRemove2,"on-success":e.handleAvatarSuccess2,"before-upload":e.beforeAvatarUpload2,"on-exceed":e.handleExceed2,"on-error":e.imgUploadError2}},[r("i",{staticClass:"el-icon-plus"})]),e._v(" "),r("el-dialog",{attrs:{visible:e.form2.dialogVisible},on:{"update:visible":function(o){e.$set(e.form2,"dialogVisible",o)}}},[r("img",{attrs:{width:"100%",src:e.form2.dialogImageUrl,alt:""}})]),e._v(" "),r("el-input",{attrs:{placeholder:"地址图片"},model:{value:e.form2.pro_address,callback:function(o){e.$set(e.form2,"pro_address",o)},expression:"form2.pro_address"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"多图",prop:"img"}},[r("el-upload",{attrs:{action:e.form2.doUploadmore,"list-type":"picture-card",accept:"image/*",name:"picture",headers:e.headers,limit:e.form2.imgLimit3,"file-list":e.form2.productImgs3,multiple:e.form2.isMultiple3,"on-preview":e.handlePictureCardPreview3,"on-remove":e.handleRemove3,"on-success":e.handleAvatarSuccess3,"before-upload":e.beforeAvatarUpload3,"on-exceed":e.handleExceed3,"on-error":e.imgUploadError3}},[r("i",{staticClass:"el-icon-plus"})]),e._v(" "),r("el-dialog",{attrs:{visible:e.form2.dialogVisible},on:{"update:visible":function(o){e.$set(e.form2,"dialogVisible",o)}}},[r("img",{attrs:{width:"100%",src:e.form2.dialogImageUrl,alt:""}})])],1),e._v(" "),r("div",{staticClass:"box-container"},[r("Ueditor",{ref:"ue",staticStyle:{width:"100%"},attrs:{value:e.defaultMSG,ueditorConfig:e.config},on:{ready:e.editorReady}})],1),e._v(" "),r("el-form-item",{attrs:{label:" "}},[r("el-button",{attrs:{type:"primary"},on:{click:function(o){e.submitForm("form2")}}},[e._v("立即创建")])],1)],1)],1)])},staticRenderFns:[]};o.a=t},FEsX:function(e,o,r){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=i(r("woOf")),l=i(r("qzrg")),a=i(r("Eo2C"));function i(e){return e&&e.__esModule?e:{default:e}}o.default={name:"searchinput",data:function(){return{name:localStorage.getItem("name"),form2:{pro_name:"",pro_abstract:"",pro_english_name:"",pro_price:"",pro_area:"",pro_house_type:"",pro_type:"",pro_residential:"",pro_position:"",pro_detail:"",pro_address:"",pro_video:"",is_hot:"",pro_img:"",img:[],doUpload:"http://web.newwynnhotel.com/admin/classes/picture_add",doUploadmore:"http://web.newwynnhotel.com/admin/classes/picture_add",dialogImageUrl:"",dialogVisible:!1,productImgs:[],isMultiple:!0,imgLimit:1,imgLimit2:1,productImgs2:[],isMultiple2:!0,imgLimit3:6,productImgs3:[],isMultiple3:!0},form:{content:""},config:{initialFrameHeight:500},defaultMSG:null,editor:null,EditorObj:"",labelPosition:"right",labelWidth:"80px",rules:{user_tel:[{required:!0,message:"请填写手机",trigger:"change"}],product_id:[{type:"array",required:!0,message:"请至少选择一个产品",trigger:"change"}],number:[{required:!0,message:"请填写数量",trigger:"change"}]}}},computed:{headers:function(){return{Authorization:localStorage.getItem("Authorization")}}},components:{Ueditor:a.default},methods:{editorReady:function(e){var o=this;e.setContent(this.form.content),e.addListener("contentChange",function(){o.form2.pro_detail=e.getContent()})},handleRemove:function(e,o){console.log(e,o)},handlePictureCardPreview:function(e){console.log(e),this.dialogImageUrl=e.url,this.dialogVisible=!0},beforeAvatarUpload:function(e){console.log(e);var o=e.size/1024/1024<2;return o||this.$message.error("上传图片大小不能超过 2MB!"),o},handleAvatarSuccess:function(e,o){console.log(e),console.log(o),this.form2.pro_img=e,this.imageUrl=URL.createObjectURL(o.raw)},handleExceed:function(e,o){this.$message.error("上传图片不能超过1张!"),console.log(file,o)},imgUploadError:function(e,o,r){console.log(e),this.$message.error("上传图片失败!")},handleRemove2:function(e,o){console.log(e,o)},handlePictureCardPreview2:function(e){console.log(e),this.dialogImageUrl=e.url,this.dialogVisible=!0},beforeAvatarUpload2:function(e){console.log(e);var o=e.size/1024/1024<2;return o||this.$message.error("上传图片大小不能超过 2MB!"),o},handleAvatarSuccess2:function(e,o){console.log(e),console.log(o),this.form2.pro_address=e,this.imageUrl=URL.createObjectURL(o.raw)},handleExceed2:function(e,o){this.$message.error("上传图片不能超过1张!"),console.log(file,o)},imgUploadError2:function(e,o,r){console.log(e),this.$message.error("上传图片失败!")},handleRemove3:function(e,o){console.log(e,o)},handlePictureCardPreview3:function(e){console.log(e),this.dialogImageUrl=e.url,this.dialogVisible=!0},beforeAvatarUpload3:function(e){console.log(e);var o=e.size/1024/1024<2;return o||this.$message.error("上传图片大小不能超过 2MB!"),o},handleAvatarSuccess3:function(e,o){console.log(e),console.log(o),this.form2.img.push(e),this.imageUrl=URL.createObjectURL(o.raw)},handleExceed3:function(e,o){this.$message.error("上传图片不能超过6张!"),console.log(file,o)},imgUploadError3:function(e,o,r){console.log(e),this.$message.error("上传图片失败!")},submitForm:function(e){var o=this;this.$refs.form02.validate(function(e){if(!e)return console.log("error submit!!"),!1;var r=(0,t.default)({},o.form2);l.default.msgApi.projectAdd(r).then(function(e){if(console.log(e),e&&e.data){var r=e.data;if(r&&1e3==r.error_code)o.$message({message:r.msg,type:"success"});else if(r&&0==r.error_code)return o.$message({message:"执行成功",type:"success"}),o.$router.push({path:"/activity_list"}),void(o.dialogEdittVisible=!1)}o.$message({message:"执行失败，请重试",type:"error"})}).catch(function(e){o.$message({message:"执行失败，请重试",type:"error"}),console.log(e)})})}}}},L9Vr:function(e,o,r){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=r("FEsX"),l=r.n(t);for(var a in t)"default"!==a&&function(e){r.d(o,e,function(){return t[e]})}(a);var i=r("/qnR");var s=function(e){r("bSu8")},n=r("VU/8")(l.a,i.a,!1,s,null,null);o.default=n.exports},bSu8:function(e,o){}});