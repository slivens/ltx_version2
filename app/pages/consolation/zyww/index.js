import React, { Component } from 'react';
import { SearchBar, Accordion, List } from 'antd-mobile';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import { withRouter } from 'react-router-dom';
import Avatar from 'antd/es/avatar';
import 'antd/es/avatar/style';
import FooterBar from '../../../components/footerBar/footerbar';
// import datasource from '../../../assets/data/addressBook.json';
import axios from 'axios';
import {connect} from 'react-redux';
import commonUrl from '../../../config';
import {Toast} from 'antd-mobile';

class index extends Component {
    constructor(props) {
        super(props);
        this.state={
            datasource:""
        }
    }
    componentWillMount() {
        const {personCategory,unitId}=this.props;
        Toast.loading('Loading...',0);
        axios.post(`${commonUrl}/app/qryMailList.do`,{personCategory,unitId}).then(
            res=>{
                if(res.data.code==='success'){
                   this.setState({datasource:res.data.data})
                   Toast.hide(); 
                }else{
                    Toast.hide();
                    Toast.fail(res.data.message)
                }
            }
        )
    }
    SearchChange=(searchContent)=>{
        const {personCategory,unitId}=this.props;
        // Toast.loading('Loading...',0);
        axios.post(`${commonUrl}/app/qryMailList.do`,{personCategory,unitId,searchContent}).then(
            res=>{
                if(res.data.code==='success'){
                   this.setState({datasource:res.data.data})
                //    Toast.hide(); 
                }else{
                    // Toast.hide();
                    Toast.fail(res.data.message)
                }
            }
        )
    }
    render() {
        const {datasource} = this.state;
        return (
            <div className="telbooks">
                <div className="topbar">
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
                    <div >住院慰问</div>
                </div>
                <SearchBar placeholder="搜索..." maxLength={20} onChange={this.SearchChange}/>
                <div className="telbooks_member">
                </div>
                <FooterBar />
            </div>
        );
    }
}

const mapStateToProps = (state,ownprops)=>{
    return{
        unitId:state.userinfo.unitId,
        personCategory:state.userinfo.personCategory
    }
}
export default connect(mapStateToProps, null)(withRouter(index));