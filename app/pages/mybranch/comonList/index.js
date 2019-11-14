import React, { Component } from 'react';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import {withRouter} from 'react-router-dom';
import Listview from '../../../components/homeListView';
import axios from 'axios';
import commonUrl from '../../../config';
import Nodata from '../../../components/nodata';
class index extends Component {
    state={
        listdata:[]
    }
    switchData=()=>{
     
    }
    componentWillMount(){
        const {branchtype} = this.props;
        switch(branchtype){
            case "ldyzj":
                return this.fetchdadta("oldPartyHome");
            case "lgbdx":
                return this.fetchdadta("oldPartySchool");
            case "hsjd":
                return this.fetchdadta("redBase");
                case "zyzbd":
                return this.fetchdadta("volunteer");
                case "yszd":
                return this.fetchdadta("health");
                case "shgc":
                return this.fetchdadta("history");
                case "ycjp":
                return this.fetchdadta("original");
                case "dzfwt":
                return this.fetchdadta("server");
                case "general":
                return this.fetchdadta("general");
            default:
                return [];

        }
    }
    fetchdadta=(type)=>{
        axios.post(`${commonUrl}/app/qryNewsListByCode.do`,{columnCode:type})
        .then(res=>{
            if(res.data.code==='success'){
                this.setState({listdata:res.data.data})
            }
            
        })
    }
    render() {
        return (
            <div className="mybranch_list">
                <div className="mybranch_list_topbar">
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
                    {this.props.title}</div>
                    <div className="mybranch_list_entry">
                        {
                            this.state.listdata.length?
                            <Listview data={this.state.listdata}/>
                            :<Nodata style={{height:"100%"}}/>
                        }
                    </div>
            </div>
        );
    }
}

export default withRouter(index);