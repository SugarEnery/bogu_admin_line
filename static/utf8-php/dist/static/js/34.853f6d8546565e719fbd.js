webpackJsonp([34],{"3IVZ":function(e,t){},hMrK:function(e,t,r){"use strict";var o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"container form02"},[r("el-form",{ref:"form02",staticClass:"demo-form-inline",attrs:{"label-position":e.labelPosition,rules:e.rules,"label-width":e.labelWidth,inline:!1,model:e.form2}},[r("el-form-item",{attrs:{label:"类型",prop:"company_type"}},[r("el-input",{attrs:{placeholder:"标题"},model:{value:e.form2.company_type,callback:function(t){e.$set(e.form2,"company_type",t)},expression:"form2.company_type"}})],1),e._v(" "),r("div",{staticClass:"box-container"},[r("Ueditor",{ref:"ue",staticStyle:{width:"100%"},attrs:{value:e.defaultMSG,ueditorConfig:e.config},on:{ready:e.editorReady}})],1),e._v(" "),r("el-form-item",{attrs:{label:" "}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("form2")}}},[e._v("立即修改")])],1)],1)],1)])},staticRenderFns:[]};t.a=o},pKS7:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("x6lK"),n=r.n(o);for(var a in o)"default"!==a&&function(e){r.d(t,e,function(){return o[e]})}(a);var i=r("hMrK");var s=function(e){r("3IVZ")},l=r("VU/8")(n.a,i.a,!1,s,null,null);t.default=l.exports},x6lK:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(r("woOf")),n=i(r("qzrg")),a=i(r("Eo2C"));function i(e){return e&&e.__esModule?e:{default:e}}t.default={name:"searchinput",data:function(){return{name:localStorage.getItem("name"),form2:{company_type:"",company_detail:"",company_id:""},form:{content:""},config:{initialFrameHeight:500},defaultMSG:null,editor:null,EditorObj:"",labelPosition:"right",labelWidth:"80px",rules:{user_tel:[{required:!0,message:"请填写手机",trigger:"change"}],product_id:[{type:"array",required:!0,message:"请至少选择一个产品",trigger:"change"}],number:[{required:!0,message:"请填写数量",trigger:"change"}]}}},computed:{headers:function(){return{Authorization:localStorage.getItem("Authorization")}}},components:{Ueditor:a.default},created:function(){this.form2.company_type=this.$route.query.company_type,this.form.content=this.$route.query.company_detail,this.form2.company_id=this.$route.query.company_id},methods:{editorReady:function(e){var t=this;e.setContent(this.form.content),e.addListener("contentChange",function(){t.form2.company_detail=e.getContent()})},submitForm:function(e){var t=this;this.$refs.form02.validate(function(e){if(!e)return console.log("error submit!!"),!1;var r=(0,o.default)({},t.form2);n.default.msgApi.introUpd(r).then(function(e){if(console.log(e),e&&e.data){var r=e.data;if(r&&1e3==r.error_code)t.$message({message:r.msg,type:"success"});else if(r&&0==r.error_code)return t.$message({message:"执行成功",type:"success"}),t.$router.push({path:"/intro_list"}),void(t.dialogEdittVisible=!1)}t.$message({message:"执行失败，请重试",type:"error"})}).catch(function(e){t.$message({message:"执行失败，请重试",type:"error"}),console.log(e)})})}}}}});