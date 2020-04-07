/*
 * @Author: your name
 * @Date: 2019-12-30 10:39:47
 * @LastEditTime : 2020-01-07 16:42:36
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\pages\search\index.js
 */
import React, { Component } from 'react';
import { SearchBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import commonUrl from '../../config';
import {connect} from 'react-redux';
import ListView from '../../components/homeListView';
import './style/index.less';
import {changeSearchValue} from '../../redux/actions';
import noAuth from '../../util/noAuth';
class index extends Component {
    state={
        textvalue:[],
        defaultValue:""

    }
    componentDidMount(){
        const {params}=this.props.location;
        if(params&&params==='home'){
            this.handleClick();
        }else{
            this.changehandle()
        }
    }
    handleClick = () => {
        this.autoFocusInst.focus();
      }
    showValue=()=>{
        const {params}=this.props.location;
        if(params&&params==='home'){
            return ""
        }
        return this.props.searchvalue;
        
    }
      changehandle=(e)=>{
          const value=this.autoFocusInst.state.value;
        axios.post(`${commonUrl}/app/qryNewsListByTitle.do`,{title:value})
        .then(res => {
            noAuth.noAuthCode(res.data)
            if (res.data.code === 'success') {
                localStorage.setItem('searchValue',value)
                this.props.changeSearchValue(value)
                let searchData = res.data.data;
                this.setState({ textvalue: searchData })
            }
        })
      }
    render() {
        return (
            <div className="searchComp">
                <div className="searchbar">
                    <SearchBar
                    showCancelButton
                    defaultValue={this.showValue()}
                    onBlur={this.changehandle} 
                    onCancel={() => this.props.history.push('/home')}
                    placeholder="搜索" 
                    ref={ref => this.autoFocusInst = ref} />
                </div>
                <div className="searchbox">
                <ListView style={{height:"auto"}} data={this.state.textvalue} />
                </div>
            </div>
        );
    }
}
const mapStateToprops=(state,ownprops)=>{
    return {
        searchvalue:state.searchValue
    }
}
const mapDispatchToProps = (dispatch, ownprops) => {
    return {
        changeSearchValue: (value) => {
            dispatch(changeSearchValue(value))
        }
    }
}
export default connect(mapStateToprops,mapDispatchToProps)(withRouter(index));