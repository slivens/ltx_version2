import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import Avatar from 'antd/es/avatar';
import 'antd/es/avatar/style';
import 'antd/es/icon/style';
import './style/index.less';
import {Button, WhiteSpace, Flex, Toast, List, Badge} from 'antd-mobile';
import axios from 'axios';
import commonUrl from '../../config';
import {connect} from 'react-redux';
import noAuth from '../../util/noAuth';
import Topbar from '../../components/topbar/topbar';
import DescriptionBox from '../../components/descriptionBox/descriptionBox';
import {prefix} from "./prefix";
import {formatName} from "./utils";


class TeacherPoolDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
        };
    }

    componentWillMount() {
        this.fetchData()
    }

    fetchData = () => {
        const {pathname} = this.props.location;
        const teacherId = pathname.split('/')[2];
        axios.post(`${commonUrl}/app/teacherStore/getTeacherDetail.do`, {teacherId: teacherId})
            .then(res => {
                noAuth(res.data, () => this.props.history.push('/login'));
                if (res.data.code === "success") {
                    this.setState({detail: res.data.data})
                }
            })
    };

    componentDidMount() {

    }

    render() {
        const {detail} = this.state;
        const getHeadPhoto = (photo) => {
            if (photo) {
                return (
                    <img src={photo} key={`headPhoto{index}`} onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${commonUrl}/app/getUploadImg.do?fn=default.jpg`
                    }}/>
                )
            } else {
                return (
                    <Avatar size={60} icon="user"/>
                )
            }

        };
        return (
            <div className={prefix}>
                <Topbar title="师资详情" onClick={() => this.props.history.goBack()}/>
                <div className={prefix + "_detail_title_container"}>
                    <div className={prefix + "_detail_title_avatar"}>
                        {getHeadPhoto(detail.photo)}
                    </div>
                    <div className={prefix + "_detail_title_right"}>
                        <div className={prefix + "_detail_title_right_content"}>
                            <div className="title">{formatName(detail.name)}</div>
                            <Badge text={detail.teacherClass}
                                   style={{
                                       backgroundColor: '#71a9fe',
                                       height: '.26rem',
                                       lineHeight: '.26rem'
                                   }}
                            />
                        </div>
                    </div>
                </div>
                <WhiteSpace />
                <DescriptionBox title={"教师简介"}>
                    <div className={prefix + "_detail_intro"}>
                        {detail.intro}
                    </div>
                </DescriptionBox>
                <WhiteSpace />
                {detail && detail.course ? (
                    <DescriptionBox title={"主讲课题"}>
                        <div className={prefix + "_detail_course_container"}>
                            {/*  {
                             detail.course.map((item, index) => (
                             <div className={prefix + "_detail_course_content"}>
                             <span className={prefix + "_detail_dot"}/>
                             {item.name}
                             </div>
                             ))
                             }*/}
                            <div className={prefix + "_detail_course_content"} dangerouslySetInnerHTML={{__html:detail.course}}>
                              {/*  <span className={prefix + "_detail_dot"}/>*/}

                            </div>
                        </div>
                    </DescriptionBox>
                ) : ""}

            </div>
        );
    }
}
/*const mapStateToProps = (state, ownProps) => ({
 userId: state.userinfo.id
 });
 const mapdispatchToProps = (dispatch, ownProps) => {
 return {}
 };*/
export default connect(null, null)(withRouter(TeacherPoolDetail));
