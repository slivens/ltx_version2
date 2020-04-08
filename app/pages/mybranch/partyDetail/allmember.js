import React, {Component} from 'react';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import {withRouter} from 'react-router-dom';
import {Flex} from 'antd-mobile';
import axios from 'axios';
import commonUrl from '../../../config/index';
import {Badge} from 'antd-mobile';
import noAuth from '../../../util/noAuth';


class allmember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        const {actId} = this.props.location;
        axios.post(`${commonUrl}/app/subAct/getAllRegPerson.do`, {activityId: actId})
            .then(res => {
                noAuth(res.data,()=>this.props.history.push('/login'))
                if (res.data.code === "success") {
                    this.setState({items: res.data.data})
                } else {
                }
            })
    }

    render() {
        const {items} = this.state;
        const {location} = this.props;
        const {params} = location;
        return (
            <div className="allmember">
                <div className="allmember_topbar">
                    <Icon
                        onClick={() => this.props.history.goBack()}
                        style={{
                            position: "absolute",
                            left: ".1rem",
                            top: "50%",
                            color: "#F7F8F4",
                            fontSize: ".24rem",
                            transform: "translateY(-50%)"
                        }}
                        type="left"
                    />
                    全部人员
                </div>
                <div className="allmember_box">
                    {items.map((item, index) => {
                        return (
                            <div className="allmember_item" key={`allmember_item_${index}`}>
                                {
                                    item.sex === "男"
                                        ? <img src={require('../../../../assets/images/male.png')}/>
                                        : <img src={require('../../../../assets/images/female.png')}/>
                                }
                                <span className="allmember_username">{item.username}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default withRouter(allmember);