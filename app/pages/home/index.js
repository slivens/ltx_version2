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
import axios from 'axios';
import commonUrl from '../../config';
import { Tabs, WhiteSpace, Badge, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeSearchValue, AddMenuList } from '../../redux/actions';
import noAuth from '../../util/noAuth';
import ListView from '../../components/homeListView/listViewComp';
import classnames from 'classnames';
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
  { title: "时政要闻", key: "tab1", columnCode: "workNews" },
  { title: "银龄新闻", key: "tab2", columnCode: "provinceNews" },
  { title: "文史精粹", key: "tab3", columnCode: "countyNews" },
  { title: "养生乐游", key: "tab4", columnCode: "health" },
];
const alert = Modal.alert;


class Home extends Component {
  state = {
    data: [],
    notice_data: [],
    nowtabs: tabs[0]
  }

  showAlert = () => {
    const alertInstance = alert('提示', '当前为初始密码 , 是否前往重置密码', [
      { text: '否', onPress: () => console.log('cancel'), style: 'default' },
      { text: '是', onPress: () => this.props.history.push('/resetpwd') },
    ]);
  }

  componentWillMount() {
    const { menuData } = this.props;
    if (!menuData.length) {
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
                case "家政服务":
                  return {
                    ...item,
                    path: "/homeServer"
                  }
                case "老年报":
                  return {
                    ...item,
                    path: "/lnb"
                  }
              }
            })
            // this.setState({ notice_data: newdata })
            this.props.saveMenuData(newdata)
          }
          noAuth(res.data, () => this.props.history.push('/login'))
        })
    }
    if (localStorage.getItem("tabs")) {
      const tab = JSON.parse(localStorage.getItem("tabs"));
      this.setState({ nowtabs: tab });
    }
  }
  tabsOnchange = (tab, index) => {
    switch (tab.title) {
      case "时政要闻":
        this.setState({ nowtabs: tab });
        localStorage.setItem("tabs", JSON.stringify(tab));
        break;
      case "银龄新闻":
        this.setState({ nowtabs: tab });
        localStorage.setItem("tabs", JSON.stringify(tab));
        break;
      case "文史精粹":
        this.setState({ nowtabs: tab });
        localStorage.setItem("tabs", JSON.stringify(tab));
        break;
      case "养生乐游":
        this.setState({ nowtabs: tab });
        localStorage.setItem("tabs", JSON.stringify(tab));
        break;
      default:
        this.setState({ data: [] })
        break;
    }
  }
  godetail = (id) => {
    this.props.history.push(`/detail/${id}`)
  }
  row = (item, sectionID, rowID) => {
    return (
      <div onClick={() => this.godetail(item.id)} key={rowID} className="homeListView_item">
        <div className={classnames("homeListView_item_right", item.imgPath ? "" : "noimg")}>
          <div className="homeListView_item_right-top">
            <div className="title">{item.title}</div>
            {/*<div dangerouslySetInnerHTML={{__html:item.abstractInfo}} className="content"/>*/}
          </div>
          <div className="homeListView_item_right-bottom">
            <span className="source">{item.source}</span>
            <span className={"count"}>{item.publicDate}</span>
            {/* <span className="date">2019-01-18</span> */}
            {/* <span className="count">1002&nbsp;阅读</span> */}
          </div>
        </div>
        {
          item.imgPath &&
          <div className="homeListView_item_pic">
            <div style={{ height: "100%", width: "100%" }} className="pic">
              <img onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${commonUrl}/app/getUploadImg.do?fn=default.jpg`
              }}
                src={item.imgPath} />
            </div>
          </div>
        }
      </div>
    );
  };
  render() {
    const params = {}
    const { menuData } = this.props;
    return (
      <div className={prefix}>
        <div className={prefix + '_topBar'}>
          {/*<span>首页</span>*/}
          <div className="header_logo"><img src={require('../../../assets/images/HeaderLogo.png')} /></div>
          <div className="header_search"
            onClick={() => this.searchRef.focus()}
          >
            <Input
              ref={ref => this.searchRef = ref}
              onFocus={() => this.props.history.push({ pathname: '/search', params: 'home' })}
              prefix={<Icon style={{ color: "white" }} type="search" />}
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
        <div style={{ position: "relative", height: ".5rem" }}></div>
        <Banner />
        <NoticeBar data={menuData} />
        <WhiteSpace />
        <Tabs tabs={tabs}
          page={this.state.nowtabs.key}
          initialPage={"tab1"}
          tabBarUnderlineStyle={{ borderColor: "#F83A2E" }}
          tabBarActiveTextColor={"#F83A2E"}
          onChange={this.tabsOnchange}
        // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
        </Tabs>
        {/* <ListView data={this.state.data} /> */}
        {/* <ListViewComp columnCode={this.state.nowtabs.columnCode} /> */}
        <ListView
          params={params}
          url={`${commonUrl}/app/qryNewsPageListByCode.do`}
          columnCode={this.state.nowtabs.columnCode}
          row={this.row}
          useBodyScroll
        />
        <div style={{ position: "relative", height: ".6rem" }}></div>
        <FooterBar />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userid: state.userinfo.id,
  isFirstPwd: state.userinfo.isFirstPwd,
  menuData: state.fetchMenuList
})
const mapdispatchToProps = (dispatch, ownProps) => {
  return {
    searchhandle: (value) => {
      dispatch(changeSearchValue(value))
    },
    saveMenuData: (data) => {
      dispatch(AddMenuList(data))
    }
  }
}

export default connect(mapStateToProps, mapdispatchToProps)(withRouter(Home));