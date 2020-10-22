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
            <!-- <el-table-column prop="type" label="标签" align="center" min-width="50">
              <template slot-scope="scope">
                <div v-for="(item, index) in auctionType_info" :key="index" >
                  <div v-if="scope.row.id == 1" >陶瓷</div>
                  <div v-else-if="scope.row.id == 2" >玉器</div>

                </div>
              </template>
            </el-table-column> -->
            <el-table-column prop="type" label="类型" align="center" min-width="50" >
              <!-- 遍历类型 -->
              <template slot-scope="scope">
                <div v-for="(item, index) in auctionType_info" :key="index" >
<!-- {{index}} -->
<!-- {{scope.row.name}} -->
                  <div v-if="scope.row.id == 1" >陶瓷</div>
                  <div v-else-if="scope.row.id == 2" >玉器</div>

                </div>
              </template>
            </el-table-column>
            <el-table-column prop="tag" label="标签" align="center" min-width="150">
            </el-table-column>
            <el-table-column prop="content" label="介绍" align="center" min-width="150">
            </el-table-column>
            <el-table-column prop="price" label="价格" align="center" min-width="200">
            </el-table-column>
            <el-table-column prop="image" label="图片" align="center"  min-width="100" >
               <!-- 图片的显示 -->
               <template slot-scope="scope">
                  <img :src="scope.row.image"  min-width="100" />
               </template>
            </el-table-column>

            <el-table-column prop="created_time" label="创建时间" align="center" width="200" >
              <template slot-scope="scope">
                 {{ scope.row.created_time == ""? '暂无' :scope.row.created_time }}
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
            auctionType_info:[],
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
      this.auctionTypeListApi();
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
            apis.msgApi.expertsList(params)
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
        // 拍卖分类列表下拉菜单
        auctionTypeListApi() {//初始化下拉框动态数据
            apis.msgApi.auctionTypeList()
            .then((data)=>{
              console.log(data)
                if(data&&data.data){
                    var json=data.data;
                    if(json&& json.code == 1 ){
                      this.auctionType_info = data.data.data;
                    }
                }
            })
            .catch((err)=>{
              this.$message({message: '执行失败，请重试',type: "error"});
            console.log(err)
            });
        },
        compare(attr) {
            return function(a,b){
                var val1 = a[attr];
                var val2 = b[attr];
                return val1 - val2;
            }
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
                    apis.msgApi.expertsDelete({ids:id})
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
                        apis.msgApi.expertsDelete({ids:ids})
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
            //var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
            //this.$message({message: msg,type: "success"});
            this.dialogEdittVisible = true;//等dom渲染完，读取data中初始值，然后再复制，这样重置的是data中初始值
            this.$nextTick(()=>{
                this.dialogType='edit';
                this.formEditTitle='编辑';
                this.formEditDisabled=false;
                this.formEdit= Object.assign({}, rowData);
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
            this.$router.push({ name: 'experts_edit', query:row})
        },
    }
};
</script>
