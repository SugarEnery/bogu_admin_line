webpackJsonp([10],{CTlP:function(e,t,i){"use strict";var a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container messageboard"},[i("el-row",{staticClass:"mgb15"},[i("el-button",{attrs:{size:"small",round:"",type:"primary"},on:{click:e.handleAdd}},[e._v("新增")])],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"60"}}),e._v(" "),i("el-table-column",{attrs:{prop:"admin_id",label:"账号id",width:"100",align:"center",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[i("a",{staticStyle:{color:"#00D1B2"},attrs:{href:"javacript:;"},on:{click:function(i){e.openDetail(t.row)}}},[e._v(e._s(t.row.admin_id))])]}}])}),e._v(" "),i("el-table-column",{attrs:{prop:"admin_name",label:"账号名称",align:"center",width:"100"}}),e._v(" "),i("el-table-column",{attrs:{prop:"admin_password",label:"账号密码",align:"center",width:"350"}}),e._v(" "),i("el-table-column",{attrs:{prop:"admin_ctime",label:"创建时间",align:"center",width:"100"}}),e._v(" "),i("el-table-column",{attrs:{prop:"admin_fid",label:"父id",align:"center",width:"100"}}),e._v(" "),i("el-table-column",{attrs:{label:"操作",fixed:"right","min-width":"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{size:"mini"},on:{click:function(i){e.handleEdit(t.$index,t.row)}}},[e._v("编辑")])]}}])})],1),e._v(" "),i("el-pagination",{attrs:{background:"",layout:"total,sizes,prev, pager, next,jumper","current-page":e.pageInfo.currentPage,"page-size":e.pageInfo.pageSize,total:e.pageInfo.pageTotal,"page-sizes":[5,10,20,50]},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),e._v(" "),i("el-dialog",{attrs:{title:e.formEditTitle,visible:e.dialogEdittVisible,width:"700px"},on:{"update:visible":function(t){e.dialogEdittVisible=t},close:function(t){e.closeDialog("formEdit")}}},[i("el-form",{ref:"formEdit",staticClass:"demo-form-inline",attrs:{"label-position":e.labelPosition,"label-width":e.labelWidth,rules:e.rulesEdit,disabled:e.formEditDisabled,inline:!0,model:e.formEdit}},[i("el-form-item",{attrs:{label:"账号id",prop:"admin_id"}},[i("el-input",{attrs:{placeholder:"id"},model:{value:e.formEdit.admin_id,callback:function(t){e.$set(e.formEdit,"admin_id",t)},expression:"formEdit.admin_id"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"账号名称",prop:"admin_name"}},[i("el-input",{attrs:{placeholder:"部门名字"},model:{value:e.formEdit.admin_name,callback:function(t){e.$set(e.formEdit,"admin_name",t)},expression:"formEdit.admin_name"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogEdittVisible=!1}}},[e._v("取 消")]),e._v(" "),e.formEditDisabled?e._e():i("el-button",{attrs:{type:"primary"},on:{click:e.handleSave}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};t.a=a},CiLK:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(i("woOf")),n=r(i("qzrg"));function r(e){return e&&e.__esModule?e:{default:e}}t.default={name:"messageboard",data:function(){return{listLoading:!1,pageInfo:{currentPage:1,pageSize:20,pageTotal:20},formSearch:{id:null,depart_name:""},formEdit:{id:null,depart_name:""},rulesEdit:{name:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:2,max:4,message:"长度在 2 到 4 个字符",trigger:"blur"}],city:[{required:!0,message:"请输入城市",trigger:"blur"}],type:[{required:!0,message:"请选择类别",trigger:"change"}],gender:[{required:!0,message:"请选择性别",trigger:"change"}]},formEditTitle:"编辑",formEditDisabled:!1,dialogEdittVisible:!1,dialogType:"",tableData:[],labelPosition:"right",labelWidth:"80px",formLabelWidth:"120px",multipleSelection:[]}},mounted:function(){this.onSearch();returnCitySN.cip,returnCitySN.cname},methods:{onSearch:function(){var e=this;this.listLoading=!0,this.formSearch.createtime&&(this.formSearch.startdate=this.formSearch.createtime[0],this.formSearch.enddate=this.formSearch.createtime[1]);var t=(0,a.default)({},this.formSearch,this.pageInfo),i=this;n.default.msgApi.directorList(t).then(function(t){if(console.log(t),e.listLoading=!1,t&&t.data){var a=t.data;1e3==t.data.error_code?e.$message({message:"权限不足！请联系管理员",type:"error"}):200==t.status?i.tableData=a:a.message&&e.$message({message:a.message,type:"error"})}}).catch(function(t){e.listLoading=!1,e.$message({message:"查询异常，请重试",type:"error"})})},handleSave:function(){"add"==this.dialogType?this.save():"edit"==this.dialogType?this.update():this.$message({message:"操作异常",type:"error"})},save:function(){var e=this;this.$refs.formEdit.validate(function(t){if(t){var i=(0,a.default)({},e.formEdit);n.default.msgApi.accountAdd(i).then(function(t){if(t&&t.data&&(t.data&&200==t.status))return e.$message({message:"执行成功",type:"success"}),e.dialogEdittVisible=!1,void e.onSearch();e.$message({message:"执行失败，请重试",type:"error"})}).catch(function(t){e.$message({message:"执行失败，请重试",type:"error"})})}})},update:function(){var e=this;this.$refs.formEdit.validate(function(t){if(t){var i=(0,a.default)({},e.formEdit);n.default.msgApi.departEdit(i).then(function(t){if((console.log(t),t&&t.data)&&(t.data&&200==t.status))return e.$message({message:"执行成功",type:"success"}),e.dialogEdittVisible=!1,void e.onSearch();e.$message({message:"执行失败，请重试",type:"error"})}).catch(function(e){console.log(e)})}})},deleteMany:function(){var e=this,t=this.multipleSelection.map(function(e){return e.id});0!=t.length?this.$confirm("此操作将批量永久删除文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.default.msgApi.deleteBatch({ids:t}).then(function(t){e.$common.isSuccess(t,function(){e.onSearch()})}).catch(function(t){e.$message({message:"执行失败，请重试",type:"error"})})}).catch(function(){e.$message({type:"info",message:"已取消删除"})}):this.$message({message:"请选择要删除的项",type:"warn"})},onReset:function(){this.$refs.formSearch.resetFields()},handleAdd:function(){var e=this;this.dialogEdittVisible=!0,this.$nextTick(function(){e.dialogType="add",e.formEditTitle="新增",e.formEditDisabled=!1})},handleEdit:function(e,t){var i=this;this.dialogEdittVisible=!0,this.$nextTick(function(){i.dialogType="edit",i.formEditTitle="编辑",i.formEditDisabled=!1,i.formEdit=(0,a.default)({},t),i.formEdit.gender+=""})},handleDetail:function(e,t){var i=this;this.dialogEdittVisible=!0,this.$nextTick(function(){i.dialogType="show",i.formEditTitle="详情",i.formEditDisabled=!0,i.formEdit=(0,a.default)({},t),i.formEdit.gender+=""})},closeDialog:function(e){this.$refs[e].resetFields()},handleSizeChange:function(e){this.pageInfo.pageSize=e,this.onSearch()},handleCurrentChange:function(e){this.pageInfo.currentPage=e,this.onSearch()},handleSelectionChange:function(e){this.multipleSelection=e},openDetail:function(e){this.$common.OpenNewPage(this,"detail",e)}}}},UMdT:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("CiLK"),n=i.n(a);for(var r in a)"default"!==r&&function(e){i.d(t,e,function(){return a[e]})}(r);var o=i("CTlP");var s=function(e){i("p6fQ")},l=i("VU/8")(n.a,o.a,!1,s,null,null);t.default=l.exports},p6fQ:function(e,t){}});