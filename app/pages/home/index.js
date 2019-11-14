import React, { Component } from 'react';
import FooterBar from '../../components/footerBar/footerbar';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
const prefix = "ltx_home";
import './style/index.less';
import NoticeBar from '../../components/noticeBar';
import Banner from '../../components/banner';
import ListView from '../../components/homeListView';
import axios from 'axios';
import commonUrl from '../../config';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import { connect } from 'react-redux';
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
    { title: "工作要闻", key: "tab1" },
    { title: "省直动态", key: "tab2" },
    { title: "市县动态", key: "tab3" },
];
class Home extends Component {
    state = {
        data: [],
        notice_data: []
    }
    fetchdata = (type) => {
        axios.post(`${commonUrl}/app/qryNewsListByCode.do`, { columnCode: type })
            .then(res => {
                if (res.data.code === 'success') {
                    this.setState({ data: res.data.data })
                }

            })
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
                                return {
                                    ...item,
                                    path: "/volunteer"
                                }
                            case "老年大学":
                                return {
                                    ...item,
                                    path: "/lndx"
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
            })
        this.fetchdata("workNews");
    }
    tabsOnchange = (tab, index) => {
        switch (tab.title) {
            case "工作要闻":
                this.fetchdata("workNews");
                break;
            case "省直动态":
                this.fetchdata("provinceNews");
                break;
            case "市县动态":
                this.fetchdata("countyNews");
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
                    <span>首页</span>
                    <Icon style={{
                        position: "absolute",
                        right: ".1rem",
                        top: "50%",
                        color: "#F7F8F4",
                        fontSize: ".24rem",
                        transform: "translateY(-50%)"
                    }}
                        type="search"
                    />
                </div>
                {/* <NavBar/> */}
                <Banner />
                <NoticeBar data={this.state.notice_data} />
                <WhiteSpace />
                <Tabs tabs={tabs}
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
    userid: state.userinfo.id
})

export default connect(mapStateToProps, null)(Home);