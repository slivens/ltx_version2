import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import { Tabs, WhiteSpace ,Badge} from 'antd-mobile';
// import ConmonCard from '../../components/conmonCard';
import axios from 'axios';
import commonUrl from '../../config';
import ListView from '../../components/homeListView';
import {connect} from 'react-redux';
import noAuth from '../../util/noAuth';
const datasource=[
    {
      title:"我要报名",
      path:"/iwapply"  
    },
    {
        title:"我要请假",
        path:"/iwleave"
    },
    {
        title:"我要查询",
        path:"/iwsearch"
    },
    {
        title:"校历",
        path:"/schooldate"
    }
]
const tabs = [
    { title: "培训计划",key:"tab1",columnCode:"trainPlan" },
    { title: "培训资料" ,key:"tab2",columnCode:"trainData"},
    { title: "培训交流" ,key:"tab3",columnCode:"experience"},
  ];

class Edutrain extends Component {
    constructor(props) {
        super(props)
        this.state={
            data:[],
            tabs:"tab1",
        }
    }
    fetchdadta=(type)=>{
        axios.post(`${commonUrl}/app/qryNewsListByCode.do`,{columnCode:type})
        .then(res=>{
            if(res.data.code==='success'){
                this.setState({data:res.data.data})
            }
            noAuth.noAuthCode(res.data)
            
        })
    }
    componentWillMount(){
        if(localStorage.getItem("edu_tabs")){
            const tab= JSON.parse(localStorage.getItem("edu_tabs"));
            this.setState({tabs:tab.key});
            this.fetchdadta(tab.columnCode);
        }else{
            this.fetchdadta("trainPlan");
        }
           
    }
    tabsOnchange=(tab,index)=>{
        switch(tab.title){
            case "培训计划":
                this.setState({tabs:tab.key});
                localStorage.setItem("edu_tabs",JSON.stringify(tab));
                this.fetchdadta('trainPlan');
                break;
            case "培训资料":
                this.setState({tabs:tab.key});
                localStorage.setItem("edu_tabs",JSON.stringify(tab));
                this.fetchdadta('trainData');
                break;
            case "培训交流":
                this.setState({tabs:tab.key});
                localStorage.setItem("edu_tabs",JSON.stringify(tab));
                this.fetchdadta('experience');
                break;
            default:
                this.setState({data:[]})
                break;
        }
    }
    render() {
        return (
            <div className="eduTrain">
                <div className="eduTrain_topbar">
                    <Icon
                        onClick={() => this.props.history.goBack()}
                        style={{
                            position: "absolute",
                            left: ".1rem",
                            top: "50%",
                            color: "#F7F8F4",
                            fontSize: ".24rem",
                            transform: "translateY(-50%)"
                        }} type="left" />
                     学习教育</div>
                    {/* <div className="eduTrain_entry">
                    </div> */}
                    <Tabs tabs={tabs}
                    initialPage={"tab1"}
                    page={this.state.tabs}
                    tabBarUnderlineStyle={{borderColor:"#F83A2E"}}
                    tabBarActiveTextColor={"#F83A2E"}
                    onChange={this.tabsOnchange}
                    // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                </Tabs>
                <WhiteSpace size="lg"/>
                {/* <List data={this.state.data}/> */}
                <ListView style={{height:'calc(100% - .5rem - 58.5px)'}} data={this.state.data}/>
            </div>
        );
    }
}


const mapStateToProps=(state,ownprops)=>({
    userId:state.id
})
const EdutrainComp=withRouter(Edutrain)
export default connect(mapStateToProps,null)(EdutrainComp);