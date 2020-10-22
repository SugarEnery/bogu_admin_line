<template>
    <div class="container aution">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">

            <el-form-item label="名称" prop="keywords">
                <el-input v-model="formSearch.keywords" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="order">
               <el-select v-model="formSearch.order" placeholder="请选择排序">
                  <el-option label="从早到晚" value="1"></el-option>
                  <el-option label="从晚到早" value="2"></el-option>
               </el-select>
            </el-form-item>

            <el-form-item label=" " style="margin-left:50px;">
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button type="warning" plain @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 查询区----end -->
        <!-- 操作区----start -->
        <el-row class="mgb15">
            <!-- <el-button size="small" round type="primary" @click="handleAdd">新增</el-button> -->
            <el-button size="small" round type="danger" @click="deleteMany">批量删除</el-button>
            <el-button size="small" round type="danger" @click="onlineMany">批量上线</el-button>
            <el-button size="small" round type="danger" @click="offlineMany">批量下线</el-button>
        </el-row>
        <!-- 操作区----end -->
        <!-- 表格---start -->
        <el-table :data="tableData" class="autionBox" v-loading="listLoading"  border stripe style="width: 100%;" @selection-change="handleSelectionChange" id="out-table">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="id" label="id" width="100" align="center" sortable>
                <template slot-scope="scope">
                    <a href="#" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.id}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" align="center" min-width="120" >
              <template slot-scope="scope">
                 {{ scope.row.name == null? '暂无' :scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center" min-width="120" >
              <template slot-scope="scope">
                {{ scope.row.status == null ? '暂无' :scope.row.status == 1? '上线' :scope.row.status == 2 ? '下线':''}}
              </template>
            </el-table-column>
            <el-table-column prop="recommend_num" label="推荐指数" align="center">
              <template slot-scope="scope">
                <font v-if="scope.row.recommend_num == 1" >一星</font>
                <font v-if="scope.row.recommend_num == 2" >二星</font>
                <font v-if="scope.row.recommend_num == 3" >三星</font>
                <font v-if="scope.row.recommend_num == 4" >四星</font>
                <font v-if="scope.row.recommend_num == 5" >五星</font>
              </template>
            </el-table-column>
            <el-table-column prop="source_name" label="来源" align="center" min-width="150">
              <template slot-scope="scope">
                 {{ scope.row.source_name == null? '暂无' :scope.row.source_name }}
              </template>
            </el-table-column>
            <el-table-column prop="images" label="图片" align="center"  min-width="100" >
               <!-- 图片的显示 -->
               <template slot-scope="scope">
                  <img :src="scope.row.images"  min-width="100" />
               </template>
            </el-table-column>
            <el-table-column prop="images_detail" label="详情" align="center"  min-width="100" >
            </el-table-column>
            <el-table-column prop="link" label="跳转链接" align="center" min-width="200">
            </el-table-column>
            <el-table-column prop="dismount_time" label="时间" align="center" width="200" >
              <template slot-scope="scope">
                 {{ scope.row.dismount_time == ""? '暂无' :scope.row.dismount_time }}
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="230">
                <template slot-scope="scope" >
                    <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
                    <a href="#" style="color: #00D1B2" @click="auctioninforEdit(scope.row)"><el-button size="mini" >修改</el-button></a>
                    <!-- 接口删除 -->
                    <el-button size="mini" plain type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.page" :page-size="pageInfo.limit" :total="pageInfo.pageTotal" :page-sizes="[10,20]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 表格---end -->
        <!-- 编辑弹框---start -->
        <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="700px" @close="closeDialog('formEdit')">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :rules="rulesEdit" :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                 <el-form-item label="id" prop="id">
                    <el-input v-model="formEdit.id" placeholder="ID" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" prop="user_name">
                    <el-input v-model="formEdit.user_name" placeholder="用户姓名" ></el-input>
                </el-form-item>
                <el-form-item label="服务人员" prop="user_server_people">
                    <el-input v-model="formEdit.user_server_people" placeholder="服务人员" ></el-input>
                </el-form-item>
                <el-form-item label="开发人员" prop="user_develop_people">
                  <el-input v-model="formEdit.user_develop_people" placeholder="开发人员" ></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="user_remark">
                    <el-input v-model="formEdit.user_remark" placeholder="备注"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type_id">
                  <el-select v-model="type_info.type_name"  placeholder="请选择类型"   @change="typeGet(type_info.type_name)"  >
                      <el-option
                      v-for="item in type_info"
                      :key="item.type_id"
                      :lable="item.type_name"
                      :value="item.type_name" >
                      </el-option>
                  </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdittVisible = false">取 消</el-button>
                <el-button v-if="!formEditDisabled" type="primary" @click="handleSave">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑弹框---end -->
    </div>
</template>

<style lang="scss">
.aution{
    // 设置输入框的宽度
    .el-form-item__content {
        // width: 240px;
    }

}
.autionBox{
  .el-table__header tr,
    .el-table__header th {
      padding: 0;
      height: 40px;
  }
  .el-table__body tr,
    .el-table__body td {
      padding: 0;
      height: 80px;
  }
  .cell img{
    margin: 0;
    padding: 0;
    height: 80px;
    width: 100%;
  }
  .cell{
    max-height: 70px !important;
    overflow: auto !important;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */

  }
  .cell::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}

</style>

<script>
import apis from '../../apis/apis';
import io from 'socket.io-client';
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
    name: 'messageboard',
    data() {
        return {
            listLoading : false,//
            pageInfo: { //分页
                page: 1,
                limit: 10,//每页显示数据
                pageTotal: 80,
            },
            formSearch: { //表单查询
                order: '',
                keywords: '',

            },
            formEdit: { //表单编辑
                id:'',
                name: '',
                type_id:'',
                user_remark:'',
                user_name:'',
                user_server_people:'',
                user_develop_people:'',
            },
            type_info:[],//用户类型
            user_info:[],//用户类型搜索
            depart_info:[],//部门列表
            rulesEdit:  {
              // user_name:[{ required: true, message: "请输入用户姓名", trigger: "blur" }]
              // ,
              type_id: [{ required: true, message: "请选择用户类型", trigger: "change" }],
            },
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            dialogType:'',//弹框类型：add,edit,show
            tableData: [], //表单列表
            labelPosition: 'right', //lable对齐方式
            labelWidth: '80px', //lable宽度
            formLabelWidth: '120px',
            multipleSelection: []
        };
    },
    mounted(){
      this.onSearch();
      var loginLog = {
          ip: returnCitySN["cip"],
          city: returnCitySN["cname"] + "-增删改查页"
      };

      // getSourceList.sourceApi.getSourceList(getSourceList);
    },
    methods: {
        /**
         * 查询列表
         */
        onSearch(){
            this.listLoading=true;
            if(this.formSearch.createtime){
                this.formSearch.startdate=this.formSearch.createtime[0];
                this.formSearch.enddate=this.formSearch.createtime[1];
            }
            let params = Object.assign({}, this.formSearch,this.pageInfo);
            var _this = this;
            apis.msgApi.inforList(params)
            .then((data)=>{
              console.log(data.data);
                this.listLoading=false;
                if (data && data.data) {
                  var json = data.data.data;
                  if ( data.status == 200) {
                    this.pageInfo.pageTotal=json.count;
                    _this.tableData = json.data;
                  }
                  else if (json.message) {
                      this.$message({message: json.message,type: "error"});
                  }
                }
            })
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重试',type: "error"});
            });
        },
        // 选择用户类型导出用户
        exportExcel () {
            this.listLoading=true;
            let params = Object.assign({}, this.formSearch,this.pageInfo);
            apis.msgApi.clientLead(params)
            .then((data)=>{
              // console.log(data);
              this.listLoading=false;
              if(data.data.error_code == 1000){
                this.$message({message: data.data.msg ,type: "error"});
              }else{
                // this.tableData = data.data;
                setTimeout( function(){
                   let fix = document.querySelector('.el-table__fixed-right');
                    let wb;
                    //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
                    if(fix){
                      wb = XLSX.utils.table_to_book(document.querySelector('#out-table').removeChild(fix));
                      document.querySelector('#out-table').appendChild(fix);
                    }else{
                      wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
                    }
                    /* get binary string as output */
                    var wbout = XLSX.write(wb, {
                      bookType: 'xlsx',
                      bookSST: true,
                      type: 'array'
                    });
                    try {
                      FileSaver.saveAs(
                        new Blob([wbout], {
                          type: 'application/octet-stream'
                        }),
                        '客户列表.xlsx'
                      );
                    } catch (e) {
                      if (typeof console !== 'undefined') console.log(e, wbout);
                    }
                    return wbout;
                    this.$message({message: '导出成功',type: "success"});
                }, 1 * 500 );

              }
            })
            .catch((err)=>{
              this.$message({message: '执行失败，请重试',type: "error"});
              console.log(err)
            });

        },
        // 导出未分配资源用户
        exportundistributed () {
            this.listLoading=true;
            apis.msgApi.unclientLead()
            .then((data)=>{
              // console.log(data);
              this.listLoading=false;
              if(data.data.error_code == 1000){
                this.$message({message: data.data.msg ,type: "error"});
              }else{
                this.tableData = data.data;
                setTimeout( function(){
                   let fix = document.querySelector('.el-table__fixed-right');
                    let wb;
                    //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
                    if(fix){
                      wb = XLSX.utils.table_to_book(document.querySelector('#out-table').removeChild(fix));
                      document.querySelector('#out-table').appendChild(fix);
                    }else{
                      wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
                    }
                    /* get binary string as output */
                    var wbout = XLSX.write(wb, {
                      bookType: 'xlsx',
                      bookSST: true,
                      type: 'array'
                    });
                    try {
                      FileSaver.saveAs(
                        new Blob([wbout], {
                          type: 'application/octet-stream'
                        }),
                        '未分配资源列表.xlsx'
                      );
                    } catch (e) {
                      if (typeof console !== 'undefined') console.log(e, wbout);
                    }
                    return wbout;
                    this.$message({message: '导出成功',type: "success"});
                }, 1 * 500 );

              }
            })
            .catch((err)=>{
              this.$message({message: '执行失败，请重试',type: "error"});
              console.log(err)
            });

        },
        // 部门列表
        departList() {
          apis.msgApi.departList()
          .then((data)=>{
            // console.log(data)
              if(data&&data.data){
                  var json=data.data;
                  if(json&&data.status==200){
                    this.depart_info = json;
                  }
              }

          })
          .catch((err)=>{
            this.$message({message: '执行失败，请重试',type: "error"});
          console.log(err)
          });
        },
        departGet(val){
          console.log(val)
          this.depart_info.map((s, index) => {
            if (s.depart_name === val) {
              this.id = this.depart_info[index].id;
              console.log(this.id);
              this.formSearch.depart_id = this.id;
            }
          })
        },
        compare(attr) {
            return function(a,b){
                var val1 = a[attr];
                var val2 = b[attr];
                return val1 - val2;
            }
        },
        // 用户类型搜索
        userList() {//初始化下拉框动态数据
            let param = 1;
            apis.msgApi.userTyle(param)
            .then((data)=>{
              // console.log(data);
              if(data&&data.data){
                  var json=data.data;
                  if(json&&data.status==200){
                    this.user_info = data.data;
                    this.user_info.sort(this.compare('order'));
                    console.log( this.user_info.sort(this.compare('order')))
                  }
              }
            })
            .catch((err)=>{
              this.$message({message: '执行失败，请重试',type: "error"});
            console.log(err)
            });
        },
        userGet(val){
          console.log('搜索')
          console.log(val);
          this.user_info.map((s, index) => {
            if (s.type_name === val) {
              this.type_id = this.user_info[index].type_id;
              console.log(this.type_id);
              this.formSearch.type_id = this.type_id;
            }
          })
        },
        // 用户类型修改
        typeList() {//初始化下拉框动态数据
            let param = 1;
            apis.msgApi.userTyle(param)
            .then((data)=>{
              console.log(data);
                if(data&&data.data){
                    var json=data.data;
                    if(json&&data.status==200){
                      this.type_info = data.data;
                    }
                }

            })
            .catch((err)=>{
              this.$message({message: '执行失败，请重试',type: "error"});
            console.log(err)
            });
        },
        typeGet(val){
          console.log('修改')
          console.log(val);
          this.type_info.map((s, index) => {
            if (s.type_name === val) {
              this.type_id = this.type_info[index].type_id;
              console.log(this.type_id);
              this.formEdit.type_id = this.type_id;
            }
          })
        },

        handleSave(){
            if(this.dialogType=='add'){
                this.save();
            }
            else if(this.dialogType=='edit'){
                this.update();
            }
            else{
                this.$message({message: '操作异常',type: "error"});
            }
        },
        /**
         * 保存
         */
        save() {
            this.$refs["formEdit"].validate(valid => {
                if(valid){
                    let param = Object.assign({}, this.formEdit);
                    apis.msgApi.userAdd(param)
                    .then((data)=>{
                        if(data&&data.data){
                            var json=data.data;
                             if(json&&data.status==200){
                                this.$message({message: '执行成功',type: "success"});
                                this.dialogEdittVisible = false;
                                this.onSearch();
                                return;
                            }
                        }
                       this.$message({message: '执行失败，请重试',type: "error"});
                    })
                    .catch((err)=>{
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });
                }


            });
        },
         /**
         * 修改
         */
        update() {
            this.$refs["formEdit"].validate(valid => {
                if(valid){
                    let param = Object.assign({}, this.formEdit);
                    apis.msgApi.clientEdit(param)
                    .then((data)=>{
                      console.log(data);
                        if(data&&data.data){
                            var json=data.data;
                            if(json&&data.status== 200 ){
                              if( data.data.error_code == 1000 ){
                                // 、用户姓名！
                                  this.$message({message: data.data.msg,type: "error"});
                              }else{
                                  this.$message({message: '执行成功',type: "success"});
                                  this.dialogEdittVisible = false;
                                  this.onSearch();
                                  return;
                              }
                            }
                        }
                       // this.$message({message: '执行失败，请重试',type: "error"});
                    })
                    .catch((err)=>{
                      console.log(err);
                        // this.$message({message: '执行失败，请重试',type: "error"});
                    });
                }


            });
        },
         /**
         * 删除
         */
        handleDelete(index, rowData) {
             if(rowData.name=='使用文档'){
                this.$message('使用文档不可删除');
                return;
            }

            // var ids = new Array();
            var id = rowData.id;
            id = id.split(",");
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    apis.msgApi.inforDelete({ids:id})
                    .then((data)=>{
                      console.log(data);
                      if( data.data.code == 1){
                        this.$message({message: '执行成功',type: "success"});
                        this.onSearch();
                      }else if( data.data.code == -1){
                        this.$message({message: data.data.msg,type: "error"});
                        this.onSearch();
                      }
                    })
                    .catch((err)=>{
                      console.log(err)
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });

            }).catch((error) => {
              console.log(error)
                this.$message({type: 'info',message: '已取消删除'});
            });

        },
        /**
         * 批量删除
         */
        deleteMany() {
            var ids= this.multipleSelection.map(item => item.id);
            if(ids.length==0){
                 this.$message({message: '请选择要删除的项',type: "warn"});
                return;
            }
            this.$confirm('此操作将批量永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        apis.msgApi.inforDelete({ids:ids})
                        .then((data)=>{
                          console.log(data)
                          if(data.data.code == "5001"){
                             this.$message({message: '用户不存在',type: "error"});
                          }else if(data.data.code == 1){
                            // this.$common.isSuccess(data,()=>{
                              this.$message({message: '执行成功',type: "success"});
                              this.onSearch();
                            // });

                          }

                        })
                        .catch((err)=>{
                            this.$message({message: '执行失败，请重试',type: "error"});
                        });

                }).catch(() => {
                    this.$message({type: 'info',message: '已取消删除'});
                });

        },
        /**
         * 批量上线
         */
        onlineMany() {
            var ids= this.multipleSelection.map(item => item.id);
            var status ="1";
            if(ids.length==0){
                 this.$message({message: '请选择要删除的项',type: "warn"});
                return;
            }
            this.$confirm('此操作将批量上线, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        apis.msgApi.inforOnline({ids:ids,status:status})
                        .then((data)=>{
                          console.log(data)
                          if(data.data.code == "5001"){
                             this.$message({message: '用户不存在',type: "error"});
                          }else if(data.data.code == 1){
                            // this.$common.isSuccess(data,()=>{
                              this.$message({message: '执行成功',type: "success"});
                              this.onSearch();
                            // });

                          }

                        })
                        .catch((err)=>{
                            this.$message({message: '执行失败，请重试',type: "error"});
                        });

                }).catch(() => {
                    this.$message({type: 'info',message: '已取消删除'});
                });

        },
        /**
         * 批量下线
         */
        offlineMany() {
            var ids= this.multipleSelection.map(item => item.id);
            var status ="2";
            if(ids.length==0){
                 this.$message({message: '请选择要删除的项',type: "warn"});
                return;
            }
            this.$confirm('此操作将批量下线, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        apis.msgApi.inforOnline({ids:ids,status:status})
                        .then((data)=>{
                          console.log(data)
                          if(data.data.code == "5001"){
                             this.$message({message: '用户不存在',type: "error"});
                          }else if(data.data.code == 1){
                            // this.$common.isSuccess(data,()=>{
                              this.$message({message: '执行成功',type: "success"});
                              this.onSearch();
                            // });

                          }

                        })
                        .catch((err)=>{
                            this.$message({message: '执行失败，请重试',type: "error"});
                        });

                }).catch(() => {
                    this.$message({type: 'info',message: '已取消删除'});
                });

        },
        onReset(){
            this.$refs['formSearch'].resetFields();
            this.onSearch();
        },
        /**
         * 打开编辑弹窗
         */
        handleAdd() {
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='add';
                this.formEditTitle='新增';
                this.formEditDisabled=false;
            });


        },
        /**
         * 打开编辑弹窗
         */
        handleEdit(index, rowData) {
          console.log(rowData)
              this.type_info.type_name = rowData.type_id;
            //var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
            //this.$message({message: msg,type: "success"});
            this.dialogEdittVisible = true;//等dom渲染完，读取data中初始值，然后再复制，这样重置的是data中初始值
            this.$nextTick(()=>{
                this.dialogType='edit';
                this.formEditTitle='编辑';
                this.formEditDisabled=false;
                this.formEdit= Object.assign({}, rowData);
                this.type_info.map((s, index) => {
                  if (s.type_name === rowData.type_id) {
                    this.type_id = this.type_info[index].type_id;
                    console.log(this.type_id);
                    this.formEdit.type_id = this.type_id;
                  }
                })
                this.formEdit.gender+='';//必须转换成字符串才能回显
            });
        },
        /**
         * 打开详情页
         */
        handleDetail(index,rowData){
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='show';
                this.formEditTitle='详情';
                this.formEditDisabled=true;
                this.formEdit= Object.assign({}, rowData) ;
                this.formEdit.gender+='';
            });

        },
        /**
         * 关闭弹框，数据重置
         */
        closeDialog(formName){
            this.$refs[formName].resetFields();
        },
        /**
         * 分页大小切换
         */
        handleSizeChange(val) {
            this.pageInfo.limit = val;
            this.onSearch();
        },
        /**
         * 分页切换
         */
        handleCurrentChange(val) {
            this.pageInfo.page = val;
            this.onSearch();
        },
        /**
         * 点击选择
         */
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // this.$message({
            //     message: '选中的项是:' + JSON.stringify(this.multipleSelection),
            //     type: "success"
            // });
        },
        /**
         * 修改详情页
         */
        auctioninforEdit(row){
            this.$router.push({ name: 'infor_edit', query:row})
        },
    }
};
</script>
