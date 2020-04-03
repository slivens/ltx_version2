import React, { Component } from 'react';
import FooterBar from '../../components/footerBar/footerbar';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import Input from 'antd/es/input';
import 'antd/es/input/style';
const prefix = "ltx_home";
import './style/index.less';
import NoticeBar from '../../components/noticeBar';
import Banner from '../../components/banner';
import ListView from '../../components/homeListView';
import axios from 'axios';
import commonUrl from '../../config';
import { Tabs, WhiteSpace, Badge,Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {changeSearchValue} from '../../redux/actions';
import noAuth from '../../util/noAuth';
const { Search } = Input;
const notice_data = [
    {
        title: "党建先锋",
        pic: "djxf.png",
        path: "/mybranch"
    },
    {
        title: "学习教育",
        pic: "xxjy.png",
        path: "/eduTrain"
    },
    {
        title: "志愿者",
        pic: "zyz.png",
        path: "/volunteer"
    },
    {
        title: "老年大学",
        pic: "lndx.png",
        path: "/lndx"
    },
    {
        title: "老年报",
        pic: "db.png",
        path: "/lnb"
    },
]
const tabs = [
    { title: "时政要闻", key: "tab1",columnCode:"workNews" },
    { title: "银龄新闻", key: "tab2",columnCode:"provinceNews" },
    { title: "文史精粹", key: "tab3",columnCode:"countyNews" },
    { title: "养生乐游", key: "tab4",columnCode:"health" },
];
const alert = Modal.alert;


class Home extends Component {
    state = {
        data: [],
        notice_data: [],
        nowtabs:"tab1"
    }
    fetchdata = (type) => {
        axios.post(`${commonUrl}/app/qryNewsListByCode.do`, { columnCode: type })
            .then(res => {
                if (res.data.code === 'success') {
                    this.setState({ data: res.data.data })
                }
                noAuth.noAuthCode(res.data)

            })
    }
    showAlert = () => {
        const alertInstance = alert('提示', '当前为初始密码 , 是否前往重置密码', [
          { text: '否', onPress: () => console.log('cancel'), style: 'default' },
          { text: '是', onPress: () => this.props.history.push('/resetpwd') },
        ]);
      };
    componentDidMount(){
        if(this.props.isFirstPwd){
            this.showAlert()
        }
    }
    componentWillMount() {
        axios.post(`${commonUrl}/app/qryAppMenuList.do`, { userId: this.props.userid })
            .then(res => {
                if (res.data.code === 'success') {
                    let noticeData = res.data.data
                    const newdata = noticeData.map(item => {
                        switch (item.title) {
                            case "党建先锋":
                                return {
                                    ...item,
                                    path: "/mybranch"
                                }
                            case "学习教育":
                                return {
                                    ...item,
                                    path: "/eduTrain"
                                }
                            case "志愿者":
                                //volunteer
                                return {
                                    ...item,
                                    path: "/volunteer"
                                }
                            case "老年大学":
                                return {
                                    ...item,
                                    path: "/lndx"
                                }
                            case "活动中心":
                                return {
                                    ...item,
                                    path: "/hdzx"
                                }
                                case "老年报":
                                return {
                                    ...item,
                                    path: "/lnb"
                                }
                        }
                    })
                    this.setState({ notice_data: newdata })
                }
                noAuth.noAuthCode(res.data)
            })
            if(localStorage.getItem("tabs")){
                const tab= JSON.parse(localStorage.getItem("tabs"));


                this.setState({nowtabs:tab.key});
                this.fetchdata(tab.columnCode);
            }else{

                this.fetchdata("workNews");
            }
    }
    tabsOnchange = (tab, index) => {
        switch (tab.title) {
            case "时政要闻":
                this.setState({nowtabs:tab.key});
                localStorage.setItem("tabs",JSON.stringify(tab));
                this.fetchdata("workNews");
                break;
            case "银龄新闻":
                this.setState({nowtabs:tab.key});
                localStorage.setItem("tabs",JSON.stringify(tab));
                this.fetchdata("provinceNews");
                break;
            case "文史精粹":
                this.setState({nowtabs:tab.key});
                localStorage.setItem("tabs",JSON.stringify(tab));
                this.fetchdata("countyNews");
                break;
            case "养生乐游":
                this.setState({nowtabs:tab.key});
                localStorage.setItem("tabs",JSON.stringify(tab));
                this.fetchdata("health");
                break;
            default:
                this.setState({ data: [] })
                break;
        }
    }
    render() {
        return (
            <div className={prefix}>
                <div className={prefix + '_topBar'}>
                    {/*<span>首页</span>*/}
                    <div className="header_logo"><img src={require('../../../assets/images/HeaderLogo.png')}/></div>
                    <div className="header_search" 
                        onClick={()=>this.searchRef.focus()}
                        >
                        <Input
                            ref={ref=>this.searchRef=ref}
                            onFocus={()=>this.props.history.push({pathname:'/search',params:'home'})}
                            prefix={<Icon style={{color:"white"}} type="search"/>}
                            placeholder="搜索"
                            style={{
                                width: "2.2rem",
                                color: "white",
                                bottom: ".02rem",
                            }}
                        />
                        </div>
                    <div 
                        style={{
                            position: "absolute",
                            right: ".1rem",
                            top: "50%",
                            color: "#F7F8F4",
                            fontSize: ".17rem",
                            transform: "translateY(-50%)"
                        }}
                        type="search"
                    ><Icon type="snippets" /> 专题</div> 
                </div>
                {/* <NavBar/> */}
                <Banner />
                <NoticeBar data={this.state.notice_data} />
                <WhiteSpace />
                <Tabs tabs={tabs}
                    page={this.state.nowtabs}
                    initialPage={"tab1"}
                    tabBarUnderlineStyle={{ borderColor: "#F83A2E" }}
                    tabBarActiveTextColor={"#F83A2E"}
                    onChange={this.tabsOnchange}
                // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                </Tabs>
                <ListView data={this.state.data} />
                <FooterBar />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    userid: state.userinfo.id,
    isFirstPwd:state.userinfo.isFirstPwd
})
const mapdispatchToProps=(dispatch, ownProps)=>{
    return {
        searchhandle:(value)=>{
            dispatch(changeSearchValue(value))
        }
    }
}

export default connect(mapStateToProps, mapdispatchToProps)(withRouter(Home));