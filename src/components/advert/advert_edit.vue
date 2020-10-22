<template >
    <div>
        <!-- {{personInfo}} -->
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
              <el-form-item label="名称" prop="name">
                  <el-input v-model="form2.name" placeholder="名称"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-radio-group v-model="form2.status">
                  <el-radio label="1" >上线</el-radio>
                  <el-radio label="2" >下线</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="内容" prop="content">
                  <el-input v-model="form2.content" placeholder="内容" ></el-input>
              </el-form-item>
              <el-form-item label="广告图" prop="image">
                  <img :src="form2.image" width="100" height="100"/>
              </el-form-item>
              <el-form-item label="广告显示位置" prop="id">
                <el-select v-model="advertTypeList_info.name"  placeholder="请选择显示位置"  @click.native="advertTypeListApi()"  @change="selectGet(advertTypeList_info.name)"  >
                    <el-option
                    v-for="item in advertTypeList_info"
                    :key="item.id"
                    :lable="item.name"
                    :value="item.name" >
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="广告跳转位置" prop="id">
                <el-select v-model="advertUrlList_info.name"  placeholder="请选择跳转位置"   @change="UrlListselectGet(advertUrlList_info.name)"  >
                    <el-option
                    v-for="item in advertUrlList_info"
                    :key="item.id"
                    :lable="item.name"
                    :value="item.name" >
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="开始时间" prop="start_time">
                  <el-date-picker
                    v-model="form2.start_time"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间" prop="end_time">
                  <el-date-picker
                    v-model="form2.end_time"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="上传广告图" prop="image">
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

              <!-- <el-form-item label="广告图链接" prop="image">
                  <el-input v-model="form2.image" placeholder="广告图链接"></el-input>
              </el-form-item> -->
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
        status: "",
        type:"",
        url_type: "",
        image:"",
        content: "",
        start_time:'',
        end_time:"",
        // 上传图片
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
      advertTypeList_info:[],//广告位置列表
      advertUrlList_info:[],//广告跳转位置
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
        this.form2.name = this.personInfo.name;
        this.form2.id = this.personInfo.id;
        this.form2.title = this.personInfo.title;
        this.form2.content = this.personInfo.content;
        this.form2.status = this.personInfo.status;
        this.form2.type = this.personInfo.type;
        this.form2.url_type = this.personInfo.url_type;
        this.form2.start_time = this.personInfo.start_time;
        this.form2.end_time = this.personInfo.end_time;
        this.form2.image = this.personInfo.image;
        this.advertTypeList_info.name = this.personInfo.ads_type_name;
        this.advertUrlList_info.name = this.personInfo.ads_url_type_name;
    },
    editorReady(instance) {
        instance.setContent(this.form.content);
        instance.addListener('contentChange', () => {
            this.form2.new_content = instance.getContent();
        });
    },
    // 广告位置列表下拉菜单
    advertTypeListApi() {//初始化下拉框动态数据
        apis.msgApi.advertTypeList()
        .then((data)=>{
          console.log(data)
            if(data&&data.data){
                var json=data.data;
                if(json&& json.code == 1 ){
                  console.log(json)
                  // var advertTypeList_info = data.data.data
                  this.advertTypeList_info = data.data.data.ads_type_list;
                  // 跳转位置
                  this.advertUrlList_info = data.data.data.ads_url_type_list;
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
      this.advertTypeList_info.map((s, index) => {
        if (s.name === val) {
          this.id = this.advertTypeList_info[index].id;
          console.log(this.id);
          this.form2.type = this.id;
        }
      })
    },
    UrlListselectGet(val){
      console.log(val)
      this.advertUrlList_info.map((s, index) => {
        if (s.name === val) {
          this.id = this.advertUrlList_info[index].id;
          console.log(this.id);
          this.form2.url_type = this.id;
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
      // console.log(res);
      // console.log(file);
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
            apis.msgApi.advertEdit(param)
            .then((data)=>{
              console.log(data);
                if(data&&data.data){
                    var json=data.data;
                     if(json&&json.code == 1){
                        this.$message({message: '执行成功',type: "success"});
                        this.$router.push({ path: '/advert_list' })
                        this.dialogEdittVisible = false;
                        return;
                    }else{
                      this.$message({message: json.msg,type: "error"});
                    }
                }

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
