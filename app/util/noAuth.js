import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Toast } from 'antd-mobile';
class noAuth extends Component {
    static noAuthCode=(res)=>{
        if(res.code==='noAuth'){
            Toast.fail(res.message,2,this.props.history.push('/login'))
        }
    }
}

export default withRouter(noAuth);