import Axios from "axios";

/**
 * 提供msg相关接口
 */
// var name
// name=localStorage.getItem("name");
export default {
    // 客户管理
    // 客户列表/
    clientList({mobile,order,keywords,page,limit}){
      var params =''
      if(mobile){
          params+='mobile='+mobile+'&';
      }
      if(order){
          params+='order='+order+'&';
      }
      if(keywords){
          params+='keywords='+keywords+'&';
      }
      if(page){
        params+='page='+page+'&';
      }
      if(limit){
          params+='limit='+limit+'&';
      }
      return Axios.get('http://api.chinabogu.com/homeApi/userInfo?'+params);
    },
    // 客户删除/
    clientdelete({ids}){
      var param ={
        ids
      }
      return Axios.post('http://api.chinabogu.com/homeApi/userInfoDelete',param);
    },
    // 拍卖管理
    // 拍卖列表/
    auctionList({order,keywords,page,limit}){
      var params =''
      if(order){
          params+='order='+order+'&';
      }
      if(keywords){
          params+='keywords='+keywords+'&';
      }
      if(page){
        params+='page='+page+'&';
      }
      if(limit){
          params+='limit='+limit+'&';
      }
      return Axios.get('http://api.chinabogu.com/homeApi/auctionList?'+params);
    },
    // 拍卖分类列表
    auctionTypeList(param){
        return Axios.get('http://api.chinabogu.com/homeApi/auctionTypeList', param);
    },
    // 专家分类列表
    expertsTypeList(param){
        return Axios.get('http://api.chinabogu.com/homeApi/getExpertTypeList', param);
    },
    // 拍卖批量删除
    auctionDelete({ids}){
      var param ={
        ids
      }
      return Axios.post('http://api.chinabogu.com/homeApi/auctionAllDelete',param);
    },
    // 拍卖批量上线
    auctionOnline({ids,status}){
      var param ={
        ids,
        status
      }
      return Axios.post('http://api.chinabogu.com/homeApi/auctionOnLine',param);
    },
    // 添加拍卖
    auctionAdd({name,image,status,auction_type,starting_price,bond_price,markup_range,images,start_time,end_time,}){
      var param ={
        name,
        image,
        status,
        auction_type,
        starting_price,
        bond_price,
        markup_range,
        images,
        start_time,
        end_time
      }
      return Axios.post('http://api.chinabogu.com/homeApi/auctionCreate',param);
    },
    // 拍卖修改
    auctionEdit({id,name,image,status,auction_type,starting_price,bond_price,markup_range,images,start_time,end_time}){
      var param ={
        id,
        name,
        image,
        status,
        auction_type,
        starting_price,
        markup_range,
        images,
        start_time,
        end_time
      }
      return Axios.post('http://api.chinabogu.com/homeApi/auctionUpdate',param);
    },
    // 拍卖订单列表
    auctionOrderList({auction_type,price_order,page,limit}){
      var params =''
      if(auction_type){
          params+='auction_type='+auction_type+'&';
      }
      if(price_order){
          params+='price_order='+price_order+'&';
      }
      if(page){
          params+='page='+page+'&';
      }
      if(limit){
          params+='limit='+limit+'&';
      }
      return Axios.get('http://api.chinabogu.com/homeApi/auctionOrderList',params);
    },
    // 鉴定列表
    identifiList({status,order_status,order,page,limit}){
      var params =''
      if(status){
          params+='status='+status+'&';
      }
      if(order_status){
          params+='order_status='+order_status+'&';
      }
      if(order){
          params+='order='+order+'&';
      }
      if(page){
          params+='page='+page+'&';
      }
      if(limit){
          params+='limit='+limit+'&';
      }
      return Axios.get('http://api.chinabogu.com/homeApi/appraisalList?'+params);
    },
    // 平台鉴定提交1
    platformIdentifi({id,expert_opinion,dating}){
        var param={
            id,
            expert_opinion,
            dating,
        };
        return Axios.post('http://api.chinabogu.com/homeApi/appraisalUpdate', param);
    },
    // 专家鉴定提交2
    expertsIdentifi({id,expert_opinion,collection_name,collection_year}){
        var param={
            id,
            expert_opinion,
            collection_name,
            collection_year
        };
        return Axios.post('http://api.chinabogu.com/homeApi/appraisalUpdate', param);
    },
    // 广告
    // 广告位置接口 跳转位置
    advertTypeList(param){
      return Axios.get('http://api.chinabogu.com/homeApi/typeList', param);
    },
    // 广告添加
    advertAdd({name,image,status,type,url_type,content,start_time,end_time,}){
      var param ={
        name,
        image,
        status,
        type,
        url_type,
        content,
        start_time,
        end_time
      }
      return Axios.post('http://api.chinabogu.com/homeApi/adsCreate',param);
    },
    // 广告位置修改
    advertEdit({name,image,status,type,url_type,content,start_time,end_time,id}){
      var param ={
        name,
        image,
        status,
        type,
        url_type,
        content,
        start_time,
        end_time,
        id
      }
      return Axios.post('http://api.chinabogu.com/homeApi/adsUpdate',param);
    },
    // 广告列表
    advertList({status,type,order,keywords,page,limit}){
      var params =''
      if(status){
          params+='status='+status+'&';
      }
      if(type){
          params+='type='+type+'&';
      }
      if(order){
          params+='order='+order+'&';
      }
      if(keywords){
          params+='keywords='+keywords+'&';
      }
      if(page){
          params+='page='+page+'&';
      }
      if(limit){
          params+='limit='+limit+'&';
      }
      return Axios.get('http://api.chinabogu.com/homeApi/adsList?'+params);
    },
    // 广告批量删除
    advertDelete({ids}){
      var param ={
        ids
      }
      return Axios.post('http://api.chinabogu.com/homeApi/adsDelete',param);
    },
    // 资讯列表
    inforList({status,dismount_order,keywords,page,limit}){
      var params =''
      if(status){
          params+='status='+status+'&';
      }
      if(dismount_order){
          params+='dismount_order='+dismount_order+'&';
      }
      if(keywords){
          params+='keywords='+keywords+'&';
      }
      if(page){
          params+='page='+page+'&';
      }
      if(limit){
          params+='limit='+limit+'&';
      }
      return Axios.get('http://api.chinabogu.com/homeApi/realtimeInfoList?'+params);
    },
    // 资讯添加
    inforAdd({name,images,status,number,source,type,recommend_num,link,images_detail,dismount_time,}){
      var param ={
        name,
        images,
        status,
        number,
        source,
        type,
        recommend_num,
        link,
        images_detail,
        dismount_time
      }
      return Axios.post('http://api.chinabogu.com/homeApi/realtimeInfoCreate',param);
    },
    // 资讯来源列表
    inforSourceList(param){
        return Axios.get('http://api.chinabogu.com/homeApi/sourceList', param);
    },
    // 资讯修改
    inforEdit({name,images,status,number,source,type,recommend_num,link,images_detail,dismount_time,id}){
      var param ={
        name,
        images,
        status,
        number,
        source,
        type,
        recommend_num,
        link,
        images_detail,
        dismount_time,
        id
      }
      return Axios.post('http://api.chinabogu.com/homeApi/realtimeInfoUpdate',param);
    },
    // 资讯删除
    inforDelete({ids}){
      var param ={
        ids
      }
      return Axios.post('http://api.chinabogu.com/homeApi/realtimeInfoAllDelete',param);
    },
    // 资讯上下线
    inforOnline({ids,status}){
      var param ={
        ids,
        status
      }
      return Axios.post('http://api.chinabogu.com/homeApi/realtimeInfoAllDelete',param);
    },
    // 专家管理
    // 专家列表
    expertsList({keywords,page,limit}){
      var params =''
      if(keywords){
          params+='keywords='+keywords+'&';
      }
      if(page){
          params+='page='+page+'&';
      }
      if(limit){
          params+='limit='+limit+'&';
      }
      return Axios.get('http://api.chinabogu.com/homeApi/getExpertList?'+params);
    },
    // 专家添加
    expertsAdd({name,tag,image,price,content,type}){
      var param ={
        name,
        tag,
        image,
        price,
        content,
        type
      }
      return Axios.post('http://api.chinabogu.com/homeApi/expertCreate',param);
    },
    // 专家修改
    expertsEdit({name,image,price,tag,content,id,type}){
      var param ={
        name,
        image,
        price,
        content,
        id,
        type
      }
      return Axios.post('http://api.chinabogu.com/homeApi/deletionInfoUpdate',param);
    },
    // 专家删除
    expertsDelete({ids}){
      var param ={
        ids
      }
      return Axios.post('http://api.chinabogu.com/homeApi/deletionDeleteAll',param);
    },
    // 上传图片
    imgUpload({param}){
      // var param
      return Axios.post('http://api.chinabogu.com/homeApi/upload',param);
    },
    // 添加物流信息
    orderInfoAdd({auction_id,order_sn,express_name}){
      var param ={
        auction_id,
        order_sn,
        express_name,
      }
      return Axios.post('http://api.chinabogu.com/homeApi/addOrderInfoCreate',param);
    },
}
