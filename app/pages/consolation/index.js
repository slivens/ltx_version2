import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import ConmonCard from '../../components/conmonCard';
import {consolationMenuData} from './data';
import './style/index.less';

class Consolation extends Component {
    state = {
        menudata: [],
        menuid: this.props.location.params
    };
    gowhere = (path) => {
        this.props.history.push(path)
    };

    componentWillMount() {
        this.setState({menudadta: consolationMenuData})
    }

    render() {
        return (
            <div className="consolation">
                <div className="consolation_topbar">
                    <Icon
                        onClick={() => this.props.history.goBack()}
                        style={{
                            position: "absolute",
                            left: ".1rem",
                            top: "50%",
                            color: "#F7F8F4",
                            fontSize: ".24rem",
                            transform: "translateY(-50%)"
                        }} type="left"/>
                    慰问管理
                </div>
                <div className="consolation_entry">
                    {
                        this.state.menudadta.map((item, index) =>
                            <ConmonCard
                                item={item}
                                key={index}
                                onClick={() => this.gowhere(item.path)}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}
const ConsolationComp = withRouter(Consolation);
export default connect(null, null)(ConsolationComp);