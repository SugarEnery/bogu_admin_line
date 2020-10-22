<template>
    <div class="container aution">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">

            <el-form-item label="拍卖分类" prop="id">
              <el-select v-model="auctionType_info.name"  placeholder="请选择分类"   @change="selectGet(auctionType_info.name)"  >
                  <el-option
                  v-for="item in auctionType_info"
                  :key="item.id"
                  :lable="item.name"
                  :value="item.name" >
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="price_order">
               <el-select v-model="formSearch.price_order" placeholder="请选择排序">
                  <el-option label="从低到高" value="1"></el-option>
                  <el-option label="从高到低" value="2"></el-option>
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
            <!-- <el-button size="small" round type="danger" @click="deleteMany">批量删除</el-button> -->
        </el-row>
        <!-- 操作区----end -->
        <!-- 表格---start -->
        <el-table :data="tableData" class="autionBox" v-loading="listLoading"  border stripe style="width: 100%;" @selection-change="handleSelectionChange" id="out-table">
            <!-- <el-table-column type="selection" width="60">
            </el-table-column> -->
            <el-table-column prop="id" label="id" width="100" align="center" sortable>
                <!-- <template slot-scope="scope">
                    <a href="javacript:;" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.id}}</a>
                </template> -->
            </el-table-column>
            <el-table-column prop="name" label="名称" align="center" min-width="120" >
              <template slot-scope="scope">
                 {{ scope.row.name == null? '暂无' :scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column prop="end_price" label="成交价" align="center" min-width="120" >
              <template slot-scope="scope">
                 {{ scope.row.end_price == null? '暂无' :scope.row.end_price }}
              </template>
            </el-table-column>
            <el-table-column prop="auction_type_name" label="拍卖分类" align="center">
              <template slot-scope="scope">
                 {{ scope.row.auction_type_name == ''? '暂无' :scope.row.auction_type_name }}
              </template>
            </el-table-column>
            <el-table-column prop="order_status" label="订单状态" align="center" min-width="150">
              <template slot-scope="scope">
                 {{ scope.row.order_status == null? '暂无' :scope.row.order_status }}
              </template>
            </el-table-column>
            <el-table-column prop="express_name" label="物流公司" align="center" min-width="150">
            </el-table-column>
            <el-table-column prop="express_order_sn" label="订单" align="center" min-width="150">
            </el-table-column>
            <el-table-column prop="created_time" label="开始时间" align="center" min-width="200">
              <template slot-scope="scope">
                <font v-if="scope.row.created_time == 0" >暂无</font>
                <font v-else >{{scope.row.created_time}}</font>
              </template>
            </el-table-column>
            <el-table-column prop="effective_time" label="结束时间" align="center" width="200" >
              <template slot-scope="scope">
                 {{ scope.row.effective_time == ""? '暂无' :scope.row.effective_time }}
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="230">
                <template slot-scope="scope" >
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">单号</el-button>
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
                 <el-form-item label="ID" prop="auction_id">
                    <el-input v-model="formEdit.auction_id" placeholder="ID" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="订单号" prop="order_sn">
                    <el-input v-model="formEdit.order_sn" placeholder="订单号" ></el-input>
                </el-form-item>
                <el-form-item label="物流公司" prop="express_name">
                  <el-input v-model="formEdit.express_name" placeholder="物流公司名称" ></el-input>
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
}
.sticky p, .floated p, .fixed p, .ondemand p{
  float:left; padding:0px; margin:0px; margin-left:10px; line-height:45px; color:#fff; font-size:12px;}
	.sticky a, .floated a, .fixed a, .ondemand a{ float:right; margin:13px 10px 0px 0px; }
	img{border:0px;}
  #sticky{
    display: none;
  }
  .sticky {

  	position:fixed;
  	margin-bottom: 10px;
  	top:7rem;
  	right:0;
  	z-index:1000;
  	width:15%;
  	background: #2D8CF0;
  }
  #all_num p{
  	font-size: 16px;
  	display: block;
  	margin-top: 1rem;
  }
  #all_num p span{
  	padding-right: 1rem;
  	background: #2D8CF0;
  	color: #FFFFFF;
  	padding:.6rem .3rem;
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
                price_order: '',
                auction_type: '',
            },
            formEdit: { //表单编辑
                auction_id:'',
                order_sn: '',
                type_id:'',
                express_name:'',
            },
            auctionType_info:[],//拍卖分类列表
            type_info:[],//用户类型
            user_info:[],//用户类型搜索
            depart_info:[],//部门列表
            rulesEdit:  {
              type_id: [{ required: true, message: "请输入订单号", trigger: "change" }],
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
      // this.userList();
      // this.departList();
      var loginLog = {
          ip: returnCitySN["cip"],
          city: returnCitySN["cname"] + "-增删改查页"
      };

      // getSourceList.sourceApi.getSourceList(getSourceList);
    },
    methods: {
      // 拍卖分类列表下拉菜单
      auctionTypeListApi() {//初始化下拉框动态数据
          apis.msgApi.auctionTypeList()
          .then((data)=>{
            // console.log(data)
              if(data&&data.data){
                  var json=data.data;
                  if(json&& json.code == 1 ){
                    console.log(json)
                    var auctionType_info = data.data.data
                    this.auctionType_info = data.data.data;
                  }
              }

          })
          .catch((err)=>{
            this.$message({message: '执行失败，请重试',type: "error"});
          console.log(err)
          });
      },
      selectGet(val){
        console.log(val)
        this.auctionType_info.map((s, index) => {
          if (s.name === val) {
            this.id = this.auctionType_info[index].id;
            console.log(this.id);
            this.formSearch.auction_type = this.id;
          }
        })

      },
        /**
         * 查询列表
         */
        onSearch(){
            this.listLoading=true;
            if(this.formSearch.createtime){
                this.formSearch.startdate=this.formSearch.createtime[0];
                this.formSearch.enddate=this.formSearch.createtime[1];
            }
            let param = Object.assign({}, this.formSearch,this.pageInfo);
            var _this = this;
            apis.msgApi.auctionOrderList(param)
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
                    // 添加物流信息接口
                    apis.msgApi.orderInfoAdd(param)
                    .then((data)=>{
                      console.log(data);
                        if(data&&data.data){
                            var json=data.data;
                            if(json&&json.code== 1 ){
                              this.$message({message: '执行成功',type: "success"});
                              this.dialogEdittVisible = false;
                              this.onSearch();
                              return;
                            }else{
                              this.$message({message: json.msg,type: "error"});
                            }
                        }
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
                    apis.msgApi.clientdelete({ids:id})
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
            this.$confirm('此操作将批量永久删除文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        apis.msgApi.auctionDelete({ids:ids})
                        .then((data)=>{
                          console.log(data)
                          if(data.data == "5001"){
                             this.$message({message: '用户不存在',type: "error"});
                          }else if(data.data == 1){
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
            // console.log(rowData)
            // var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
            // this.$message({message: msg,type: "success"});
            this.dialogEdittVisible = true;//等dom渲染完，读取data中初始值，然后再复制，这样重置的是data中初始值
            this.$nextTick(()=>{
                this.dialogType='edit';
                this.formEditTitle='编辑';
                this.formEditDisabled=false;
                // this.formEdit= Object.assign({}, rowData);
                this.formEdit.gender+='';//必须转换成字符串才能回显
                this.formEdit.auction_id = rowData.id;
                if(rowData.express_order_sn != "暂无"){
                  this.formEdit.order_sn = rowData.express_order_sn;
                  this.formEdit.express_name = rowData.express_name;
                }

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
         * 打开详情页
         */
        openDetail(row){
            // this.$common.OpenNewPage(this,'detail',row);
            this.$router.push({ name: 'detail', query:row})
        },
    }
};
</script>
