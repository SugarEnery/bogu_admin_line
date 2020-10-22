<template >
    <div>
        <!-- 查询区----start -->
        <!-- {{personInfo}} -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
              <el-form-item label="id" prop="id">
                  <el-input v-model="form2.id" placeholder="id"></el-input>
              </el-form-item>
              <el-form-item label="名称" prop="name">
                  <el-input v-model="form2.name" placeholder="名称"></el-input>
              </el-form-item>
              <el-form-item label="拍卖状态">
                <el-radio-group v-model="form2.status">
                  <el-radio label="1" >上线</el-radio>
                  <el-radio label="2" >下线</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="起拍价" prop="starting_price">
                  <el-input v-model="form2.starting_price" placeholder="起拍价" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
></el-input>
              </el-form-item>
              <el-form-item label="加价幅度" prop="markup_range">
                  <el-input v-model="form2.markup_range" placeholder="加价幅度" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></el-input>
              </el-form-item>
              <el-form-item label="拍卖分类" prop="auction_type">
                <el-select v-model="auctionType_info.name"  placeholder="请选择分类"  @click.native="auctionTypeListApi()"  @change="selectGet(auctionType_info.name)"  >
                    <el-option
                    v-for="item in auctionType_info"
                    :key="item.id"
                    :lable="item.name"
                    :value="item.name" >
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="开始拍卖时间" prop="start_time">
                  <el-date-picker
                    v-model="form2.start_time"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="结束拍卖时间" prop="end_time">
                  <el-date-picker
                    v-model="form2.end_time"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="上传主图" prop="image">
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
        id:'',
        name: "",
        auction_type: "",
        status: "",
        starting_price:"",
        start_time:'',
        end_time:"",
        markup_range: "",
        image:"",
        images: "",
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
              'Authorization': localStorage.getItem('Authorization'),
              'Access-Control-Allow-Headers':'x-requested-with:content-type'
          }
      }
  },
  mounted() {
    this.getParams();
    // this.auctionTypeListApi();
  },
  components: {
    Ueditor
  },
  methods: {
    getParams() {
        // 取到路由带过来的参数
        const routerParams = this.personInfo
        // this.mallCode = routerParams;
        console.log(routerParams);
        // 将数据放在当前组件的数据内
        this.form2.id = this.personInfo.id;
        this.form2.name = this.personInfo.name;
        this.form2.image = this.personInfo.image;
        this.form2.status = this.personInfo.status;
        this.form2.auction_type = this.personInfo.auction_type;
        this.form2.starting_price = this.personInfo.starting_price;
        this.form2.markup_range = this.personInfo.markup_range;
        this.form.content = this.personInfo.images;
        this.form2.images = this.personInfo.images;
        this.form2.start_time = this.personInfo.start_time;
        this.form2.end_time = this.personInfo.end_time;
        this.auctionType_info.name = this.personInfo.auction_type_name;
    },
    editorReady(instance) {
      console.log(instance)
        instance.setContent(this.form.content);
        instance.addListener('contentChange', () => {
            this.form2.images = instance.getContent();
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
          this.form2.auction_type = this.id;
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
      this.form2.image = "http://api.chinabogu.com"+res.data.filePath;
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
            this.form2.images = instance.getContent();
        });
    },
    //表单提交
    submitForm(form2) {
      this.$refs["form02"].validate(valid => {
        if(valid){
            let param = Object.assign({}, this.form2);
            apis.msgApi.auctionEdit(param)
            .then((data)=>{
              console.log(data);
                if(data&&data.data){
                    var json=data.data;
                     if(json&&json.code == 1){
                        this.$message({message: '执行成功',type: "success"});
                        this.$router.push({ path: '/auction_list' })
                        this.dialogEdittVisible = false;
                        return;
                    }else{
                      this.$message({message: json.msg,type: "error"});
                    }
                }
               // this.$message({message: '执行失败，请重试',type: "error"});
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
