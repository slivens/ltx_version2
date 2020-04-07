/*
 * @Author: your name
 * @Date: 2019-09-03 20:37:00
 * @LastEditTime : 2020-01-07 10:10:58
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\pages\detail\index.js
 */
import React, { Component } from 'react';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import { withRouter,Route } from 'react-router-dom';
import Test from './test';
import axios from 'axios';
import commonUrl from '../../config';
import { ActionSheet, WingBlank, WhiteSpace, Button, Toast,Modal ,Steps} from 'antd-mobile';
import WordComp from '../../components/changeWord';
import classnames from 'classnames';
import noAuth from '../../util/noAuth';
var shares=null;
var sweixin=null;
var sqq=null;
var sweibo=null;
const Step = Steps.Step;
const dataList = [
    { url: 'cTTayShKtEIdQVEMuiWt', title: '朋友圈' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '调整字体' }
  ].map(obj =>{
      if(obj.title==="调整字体"){
            return {          
                icon: <img src={`http://218.5.2.250:11889/app/getUploadImg.do?fn=font.jpg`} alt={obj.title} style={{ width: 36 }} />,
                title: obj.title,
              }
      }else{
          return {          
            icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
            title: obj.title,
          }
          
      }
  });
    class DetailTop extends Component{
        constructor(props){
            super(props)
            this.state={
                findOne:{},
                count:"",
                clicked1: 'none',
                modal2:false,
                wordSize:"word_default"
            }
            this.wordcomp=React.createRef();
        }
        
        
        updateSerivces=(buttonIndex,resolve)=>{
            const _this=this;
                try {
                    plus.share.getServices(function(s){
                        shares={};
                        for(var i in s){
                            var t=s[i];
                            shares[t.id]=t;
                        }
                    console.log("...shares..." + JSON.stringify(shares));	
                    sweixin=shares['weixin'];
                    sqq=shares['qq'];
                    sweibo=shares['sinaweibo'];
                    if(buttonIndex===0){
                        _this.shareFriends();
                    }else if(buttonIndex===1){
                        _this.shareWeixin();
                    }else if(buttonIndex===2){
                        _this.shareQQ();
                    }else if(buttonIndex===3){
                        _this.shareWeibo();
                    }else if(buttonIndex===4){
                        _this.adjustWord()
                        resolve()
                    }
                    else{
                        resolve()
                    }
                    }, function(e){
                        outSet('获取分享服务列表失败：'+e.message);
                    });
                } catch (error) {
                    if(buttonIndex===0){
                        _this.shareFriends();
                    }else if(buttonIndex===1){
                        _this.shareWeixin();
                    }else if(buttonIndex===2){
                        _this.shareQQ();
                    }else if(buttonIndex===3){
                        _this.shareWeibo();
                    }else if(buttonIndex===4){
                        _this.adjustWord()
                        resolve()
                    }
                    else{
                        resolve()
                    }
                }
        }
        adjustWord=()=>{
            this.setState({modal2:true})
        }
        shareCondition=(srv, msg)=>{
            let _this=this;
            if(!srv) {
				console.log('无效的分享服务！');
				return;
			}
			// 发送分享
			if(srv.authenticated) {
				console.log('---已授权---');
				_this.doShare(srv, msg);
			} else{
				console.log('---未授权---');
				srv.authorize(function(){
					_this.doShare(srv, msg);
				}, function(e){
					console.log('认证授权失败：'+JSON.stringify(e));
				});
			} 
        }
        doShare=(srv, msg)=>{
            srv.send(msg, function(){
				console.log('分享到"'+srv.description+'"成功！');
			}, function(e){
				alert(e.message);
				console.log('分享到"'+srv.description+'"失败: '+JSON.stringify(e));
			});
        }
        shareWeixin=()=>{
            const detid=this.props.location.pathname.split('/')[2];
            console.log("...朋友...");
            const {findOne}=this.state;
            var msg={type:'web',
            href:`http://218.5.2.250:11889//app/articles.do?newsId=${detid}`,
            title:findOne.title,
            content:findOne.abstractInfo,
            thumbs:['http://218.5.2.250:11889/app/getUploadImg.do?fn=logo.jpg'],
            extra:{scene:'WXSceneSession'}};
			this.shareCondition(sweixin, msg);
        }
        shareFriends=()=>{
            const detid=this.props.location.pathname.split('/')[2];
            console.log("...朋友圈...");
            const {findOne}=this.state;
            var msg={type:'web',
            href:`http://218.5.2.250:11889//app/articles.do?newsId=${detid}`,
            title:findOne.title,
            content:findOne.abstractInfo,
            thumbs:['http://218.5.2.250:11889/app/getUploadImg.do?fn=logo.jpg'],
            extra:{scene:'WXSceneTimeline'}};
			this.shareCondition(sweixin, msg);
        }
        shareQQ=()=>{
            const detid=this.props.location.pathname.split('/')[2];
            const {findOne}=this.state;
            var msg={
            type:'text',
            title:findOne.title,
            content:findOne.abstractInfo,
            thumbs:['http://218.5.2.250:11889/app/getUploadImg.do?fn=logo.jpg'],
            href:`http://218.5.2.250:11889//app/articles.do?newsId=${detid}`
            };
            this.shareCondition(sqq, msg);
        }
        shareWeibo=()=>{
            const detid=this.props.location.pathname.split('/')[2];
            const {findOne}=this.state;
            var msg={
                type:'web',
                title:findOne.title,
                href:`http://218.5.2.250:11889//app/articles.do?newsId=${detid}`,
                thumbs:['http://218.5.2.250:11889/app/getUploadImg.do?fn=logo.jpg'],
                content:findOne.abstractInfo
            };
			this.shareCondition(sweibo, msg);
        }
        showShareActionSheet = () => {
            ActionSheet.showShareActionSheetWithOptions({
              options: dataList,
              // title: 'title',
              message: '网页由  福建省委老干部局 提供',
            },
            (buttonIndex) => {
                console.log('@@@@@@@@@',buttonIndex)
              this.setState({ clicked1: buttonIndex > -1 ? dataList[buttonIndex].title : 'cancel' });
              // also support Promise
              return new Promise((resolve) => {
                // Toast.info('closed after 1000ms');
                if(window.plus){
                    this.updateSerivces(buttonIndex,resolve);
                    console.log('@@@@@@@@window.plus')
                }else{
                    console.log('@@@@@@@@plusready')
                    document.addEventListener('plusready', this.updateSerivces(buttonIndex,resolve), false);
                }
                // setTimeout(resolve, 1000);
              });
            });
          }
        componentWillMount(){
            
                const detid=this.props.location.pathname.split('/')[2];
                axios.post(`${commonUrl}/app/updateReadingQuantity.do`,{newsId:detid})
                .then(res=>{
                    if(res.data.code==='success'){
                        this.setState({count:res.data.data})
                    }
                    noAuth.noAuthCode(res.data)
                })
                axios.post(`${commonUrl}/app/qryNewsDetail.do`,{newsId:detid})
                .then(res=>{
                    if(res.data.code==='success'){
                        this.setState({findOne:res.data.data})
                    }
                    noAuth.noAuthCode(res.data)
                })
               
        } 
        componentDidMount(){
            const word_size=localStorage.getItem("word_size");
            if(word_size){
                this.setState({wordSize:word_size})
            }
        }
        changeWord=(key)=>{
            this.setState({wordSize:key})
        }
        showWordSize=()=>{
            switch(this.state.wordSize){
                case "default":
                return "word_default";
                case "small":
                return "word_small";
                case "big":
                return "word_big";
                default:
                return "";
            }
        }
   
    render() {
        const {history,location} = this.props;
        const {findOne,count}=this.state;
        return (
            <div className={classnames("ltx_itemDetail",this.showWordSize())}>
                <div className="ltx_itemDetail_topbar">
                    <Icon 
                    onClick={()=>history.goBack()}
                    style={{
                    position: "absolute",
                    left: ".1rem",
                    top: "50%",
                    color: "#F7F8F4",
                    fontSize: ".24rem",
                    transform: "translateY(-50%)"
                }} type="left" />
                <div >详情</div>
                <Icon 
                    onClick={this.showShareActionSheet}
                    style={{
                    position: "absolute",
                    right: ".1rem",
                    top: "50%",
                    color: "#F7F8F4",
                    fontSize: ".3rem",
                    transform: "translateY(-50%)"
                }} type="ellipsis" />
                </div>
                <div className="ltx_itemDetail_body">
                    <div className="title">{findOne.title}</div>
                    <div className="date">
                    {findOne.source&&<span style={{marginRight:".1rem"}}>来源：{findOne.source}</span>}<span>{findOne.publicDate}</span>
                    
                    <div>{findOne.author&&<span style={{marginRight:".1rem"}}>作者：{findOne.author}</span>}<span>访问量：{findOne.readingQuantity}</span></div>
                    </div>
                    {/* <div className="pic"><img src={findOne.imgPath}/></div> */}
                    <div className="content" dangerouslySetInnerHTML={{__html:findOne.publicInfo}}></div>
                </div>
                <Modal
                    popup
                    visible={this.state.modal2}
                    onClose={()=>this.setState({modal2:false})}
                    animationType="slide-up"
                    style={{height:"1rem"}}
                >
                <WordComp onClick={this.changeWord}/>
                </Modal>
            </div>
        )
                }
}
export default withRouter(DetailTop)