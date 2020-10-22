<template >
    <div>
      <!-- {{personInfo}} -->
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
              <el-form-item label="名称" prop="name">
                  <el-input v-model="form2.name" placeholder="名称"></el-input>
              </el-form-item>
              <el-form-item label="拍卖状态">
                <el-radio-group v-model="form2.status">
                  <el-radio label="1" >上线</el-radio>
                  <el-radio label="2" >下线</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="推荐指数" prop="order">
                 <el-select v-model="form2.recommend_num" placeholder="请选择推荐指数">
                    <el-option label="一星" value="1"></el-option>
                    <el-option label="二星" value="2"></el-option>
                    <el-option label="三星" value="3"></el-option>
                    <el-option label="四星" value="4"></el-option>
                    <el-option label="五星" value="5"></el-option>
                 </el-select>
              </el-form-item>
              <el-form-item label="来源" prop="source">
                <el-select v-model="source_info.name"  placeholder="请选择来源"   @change="sourceGet(source_info.name)"  >
                    <el-option
                    v-for="item in source_info"
                    :key="item.id"
                    :lable="item.name"
                    :value="item.name" >
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分类" prop="type">
                <el-select v-model="auctionType_info.name"  placeholder="请选择分类"   @change="selectGet(auctionType_info.name)"  >
                    <el-option
                    v-for="item in auctionType_info"
                    :key="item.id"
                    :lable="item.name"
                    :value="item.name" >
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="链接" prop="link">
                  <el-input v-model="form2.link" placeholder="请输入链接"></el-input>
              </el-form-item>
              <el-form-item label="到期时间" prop="dismount_time">
                  <el-date-picker
                    v-model="form2.dismount_time"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="主图" prop="images">
                  <img :src="form2.images" width="100" height="100"/>
              </el-form-item>
              <el-form-item label="上传主图" prop="images">
                <el-upload
                  :action="form2.doUpload"
                  list-type="picture-card"
                  accept="image/*"
                  name = "file"
                  :headers="headers"
                  :limit="form2.imgLimit"
                  :file-list="form2.productImgs"
                  :multiple="form2.isMultiple"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :on-exceed="handleExceed"
                  :on-error="imgUploadError">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="form2.dialogVisible">
                  <img width="100%" :src="form2.dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
              <div class="box-container">
                  <Ueditor @ready="editorReady"
                    ref="ue"
                    :value="defaultMSG"
                    :ueditorConfig="config"
                    style="width:100%;">
                  </Ueditor>
              </div>


              <el-form-item label=" ">
                  <el-button type="primary" @click="submitForm('form2')">立即创建</el-button>
              </el-form-item>
            </el-form>
        </div>
        <!-- 查询区----end -->
    </div>
</template>
<style lang="scss">
// 设置输入框的宽度
.form02 {
  .el-form-item__content {
    width: 310px;
    .el-select {
      width: 300px;
    }
  }
}
.el-checkbox-group .el-checkbox {
  margin-left: 0;
  // padding-right: 30px;
}
.el-checkbox{
  width:150px;
  // display: inline;
}
.document-editor__editable{
    min-height: 400px;
}
.ck-content{
  min-height: 400px;
}
.el-textarea__inner{
  height:150px;
}
</style>
<script>
import apis from '../../apis/apis';
import Ueditor from '../../components/ckeditor/baidu.vue';
export default {
  name: "searchinput",
  data() {
    return {
      personInfo:this.$route.query,
      form2: {
        //表单对象
        name: "",
        status: "",
        images:"",
        number:'',
        source: "",
        type:'',
        recommend_num:'',
        link:'',
        images_detail:"",
        dismount_time: "",
        doUpload:'http://api.chinabogu.com/homeApi/upload',
        dialogImageUrl: '',
        dialogVisible: false,
        productImgs: [],
        isMultiple: true,
        imgLimit: 1
      },
      defaultMSG: null,
      form: {
          content: ''
      },
      config: {
          initialFrameHeight: 500
      },
      orderprice:[],
      auctionType_info:[],//拍卖分类列表
      source_info:[],//来源列表
      peoples:[],
      products:[],
      editor:null,//编辑器实例
      EditorObj: "",
      labelPosition: "right", //lable对齐方式
      labelWidth: "100px", //lable宽度
      rules:  {
      }
    };
  },
  computed: {
      headers() {
          return {
              'userToken': localStorage.getItem("token"),
              'uid' : localStorage.getItem("uid"),
              'Access-Control-Allow-Headers':'x-requested-with:content-type'
          }
      }
  },
  mounted() {
    this.getParams();
    this.auctionTypeListApi();
    this.sourceListApi();

  },
  components: {
    Ueditor
  },
  methods: {
    getParams() {
        // 取到路由带过来的参数
        const routerParams = this.personInfo
        // this.mallCode = routerParams;
        // console.log(routerParams);
        // 将数据放在当前组件的数据内
        this.form2.id = this.personInfo.id;
        this.form2.name = this.personInfo.name;
        this.form2.images = this.personInfo.images;
        this.form2.status = this.personInfo.status;
        this.form2.source = this.personInfo.source;
        this.form2.type = this.personInfo.type;
        this.form2.recommend_num = this.personInfo.recommend_num;
        this.form2.link = this.personInfo.link;
        this.form2.images = this.personInfo.images;
        this.form2.images_detail = this.personInfo.images_detail;
        this.form.content = this.personInfo.images_detail;
        this.form2.dismount_time = this.personInfo.dismount_time;
    },
    // 列表下拉菜单
    sourceListApi() {//初始化下拉框动态数据
        apis.msgApi.inforSourceList()
        .then((data)=>{
          console.log(data)
            if(data&&data.data){
                var json=data.data;
                if(json&& json.code == 1 ){
                  console.log(json)
                  // var source_info = data.data.data
                  this.source_info = data.data.data;
                }
            }

        })
        .catch((err)=>{
          this.$message({message: '执行失败，请重试',type: "error"});
        console.log(err)
        });
    },
    sourceGet(val){
      console.log(val)
      this.source_info.map((s, index) => {
        if (s.name === val) {
          this.id = this.source_info[index].id;
          // console.log(this.id);
          this.form2.source = this.id;
        }
      })

    },
    // 拍卖分类列表下拉菜单
    auctionTypeListApi() {//初始化下拉框动态数据
        apis.msgApi.auctionTypeList()
        .then((data)=>{
          console.log(data)
            if(data&&data.data){
                var json=data.data;
                if(json&& json.code == 1 ){
                  console.log(json)
                  // var auctionType_info = data.data.data
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
          this.form2.type = this.id;
        }
      })

    },
    handleRemove(file, fileList) {//移除图片
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {//预览图片时调用
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
      console.log(file);
      const isJPG = true;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {//图片上传成功
      console.log(res);
      console.log(file);
      this.form2.images = "http://api.chinabogu.com/"+res.data.filePath;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleExceed(files, fileList) {//图片上传超过数量限制
      this.$message.error('上传图片不能超过6张!');
      console.log(file, fileList);
    },
    imgUploadError(err, file, fileList){//图片上传失败调用
      console.log(err)
      this.$message.error('上传图片失败!');
    },
    // 编辑器
    editorReady(instance) {
        instance.setContent(this.form.content);
        instance.addListener('contentChange', () => {
            this.form2.images_detail = instance.getContent();
        });
    },
    //表单提交
    submitForm(form2) {
      this.$refs["form02"].validate(valid => {
        if(valid){
            let param = Object.assign({}, this.form2);
            apis.msgApi.inforEdit(param)
            .then((data)=>{
              console.log(data);
                if(data&&data.data){
                    var json=data.data;
                     if(json&&json.code == 1){
                        this.$message({message: '执行成功',type: "success"});
                        this.$router.push({ path: '/infor_list' })
                        this.dialogEdittVisible = false;
                        return;
                    }
                }
               this.$message({message: '执行失败，请重试',type: "error"});
            })
            .catch((err)=>{
                this.$message({message: '执行失败，请重试',type: "error"});
                console.log(err)
            });
        }else {
          console.log("error submit!!");
          return false;
        }
      });
    },

  }
};
</script>
