import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import './less/index.less';
import LoginInput from '../../components/loginInput';
import Divider from 'antd/es/divider';
import 'antd/es/divider/style';
import { withRouter, Link } from 'react-router-dom';
import Form from 'antd/es/form';
import 'antd/es/form/style';
const prefix = "ltx_login";
import axios from 'axios';
import { Toast, Modal,Checkbox } from 'antd-mobile';
import { AddUserInfo} from '../../redux/actions';
import { connect } from 'react-redux';
import commonUrl from '../../config';
import noAuth from '../../util/noAuth';
const alert = Modal.alert;
const AgreeItem = Checkbox.AgreeItem;
class Logincomp extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.AgreeSecret=false
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  showAlert = () => {
    const alertInstance = alert('提示', '当前为初始密码 , 是否前往重置密码', [
      { text: '否', onPress: () => console.log('cancel'), style: 'default' },
      { text: '是', onPress: () => this.props.history.push('/resetpwd') },
    ]);
  }
  bindPhone = (id = "") => {
    if (window.deviceId && window.deviceType) {
      axios.post(`${commonUrl}/app/bindDeviceInfo.do`, {
        deviceId: window.deviceId,
        deviceType: window.deviceType,
        userId: id
      }).then(res => {
        if (res.data.code === 'success') {
          console.log('******绑定设备成功******')
        }
        noAuth(res.data, () => this.props.history.push('/login'))
      })
    }
  }
  handleLogin = (e) => {
    e.preventDefault();
    if(!this.AgreeSecret){
      Toast.fail('您未同意《隐私政策》')
      return
    }
    this.props.form.validateFields((err, values) => {

      if (!err) {
        axios.post(`${commonUrl}/app/appLogin.do`, { username: values.username, password: values.password })
          .then(res => {
            noAuth(res.data, this.props.history.push('/login'))
            if (res.data.code === "success") {
              clearTimeout(this.timer)
              this.props.handleUserinfo(res.data.data);
              // document.cookie = `username=${values.username}; path=/`;
              // document.cookie = `password=${values.password}; path=/`;
              if (typeof (Storage) !== 'undefined') {
                localStorage.setItem('username', values.username);
                localStorage.setItem('password', values.password);
              }
              localStorage.setItem('loginState', 'online');
              //绑定设备信息
              try {
                this.bindPhone(res.data.data.id);
              } catch (error) {
                console.log(err)
              }
              let errCount = localStorage.getItem('ErrPwdCount');
              if (errCount >= 1) {
                this.props.history.push('/verify')
                return
              }
              Toast.success('登录成功', 1, () => {
                this.props.history.push('/home')
                if (this.props.isFirstPwd) {
                  this.showAlert()
                }
              });
              localStorage.setItem('ErrPwdCount', 0);

            } else {
              Toast.fail(`登录失败：${res.data.message}`, 2, () => {
                if (res.data.message && res.data.message === '密码错误') {
                  let errCount = localStorage.getItem('ErrPwdCount');
                  if (errCount >= 1) {
                    this.props.history.push('/verify')
                  }
                  errCount++;
                  localStorage.setItem('ErrPwdCount', errCount);

                }
              })
            }
          }).catch((err) => {
            Toast.fail(`登录失败：${err}`, 2)
          })
      }
    });
  }

  componentWillMount() {
    localStorage.setItem('ErrPwdCount', 0);
    if (localStorage.getItem('loginState') === 'loginout') {
      return
    }
    if (localStorage.getItem('username')) {
      axios.post(`${commonUrl}/app/appLogin.do`,
        {
          username: localStorage.getItem('username'),
          password: localStorage.getItem('password')
        })
        .then(res => {
          noAuth(res.data, () => this.props.history.push('/login'))
          if (res.data.code === "success") {
            this.props.handleUserinfo(res.data.data);
            this.props.history.push('/home');
            if (this.props.isFirstPwd) {
              this.showAlert()
            }
          } else {

            Toast.fail(`登录失败：${res.data.message}`, 2, () => {
              localStorage.setItem("loginState", 'loginout')
              this.props.history.push('/login');
            })
          }
        })
    }
  }

  forgetpwd = () => {
    this.props.history.push('/resetpwd');
  }

  render() {
    const { username_err, pssword_err } = this.state;
    const { getFieldDecorator } = this.props.form;
    const initusername = localStorage.getItem('username') || '';
    const initpwd = localStorage.getItem('password') || '';
    return (
      <div className={prefix}>
        {/* <img src={login_bg}/> */}
        {
          !localStorage.getItem('loginState') || localStorage.getItem('loginState') !== 'online' ?
            <Form>
              <div className={prefix + '-card'}>
                <div className={prefix + '-card-avatar'} />
                <span className={prefix + '-card-title'}></span>
                {/* <Icon type="mima" style={{fontSize:"20px"}}/> */}
                <Form.Item>
                  {getFieldDecorator('username', {
                    initialValue: initusername,
                    rules: [{ required: true, message: '请输入用户名' }],
                  })(
                    <LoginInput placeholder="请输入身份证号码" type="user" icon="user" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    initialValue: initpwd,
                    rules: [{ required: true, message: '请输入密码' }],
                  })(
                    <LoginInput type="password" icon="lock" />
                  )}
                </Form.Item>
                <AgreeItem 
                style={{marginLeft:".32rem"}}
                data-seed="logId" onChange={e => this.AgreeSecret=e.target.checked}>
                  勾选即代表您同意 <Link to="/secret" >《隐私政策》</Link><Link to="/useragreement" >《用户协议》</Link>
                </AgreeItem>
                <Button onClick={this.handleLogin} type="warning" className="login_btn">登录</Button>
                {/* <div className={prefix + "_pwd"}>
                                 <span onClick={this.forgetpwd}>修改密码</span>
                                 <Divider style={{ background: "#5f5d5b" }} type="vertical" />
                                 <span>现在注册</span>
                                 </div> */}
              </div>
            </Form>
            :
            <div></div>
        }
      </div>
    );
  }
}
const mapStateToProps = (state, ownprops) => {
  return {
    isFirstPwd: state.userinfo.isFirstPwd
  }
}
const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    handleUserinfo: (info) => {
      dispatch(AddUserInfo(info))
    }
  }
}
const reduxLogin = withRouter(Form.create({ name: 'normal_login' })(Logincomp));
export default connect(mapStateToProps, mapDispatchToProps)(reduxLogin);
