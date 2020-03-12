/*
 * @Author: your name
 * @Date: 2019-09-03 11:05:04
 * @LastEditTime: 2019-12-02 10:24:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\components\banner\index.js
 */
import React, { Component } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import './style/index.less';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import commonUrl from '../../config';
class Banner extends React.Component {
  state = {
    data: [
    ],
    imgHeight: "2.32rem",
  }
  componentDidMount() {
    // simulate img loading
    // setTimeout(() => {
    //   this.setState({
    //     data: [banner1, banner2, banner3],
    //   });
    // }, 100);
  }
  componentWillMount(){
    axios.post(`${commonUrl}/app/qryNewsListByCode.do`,{
      columnCode:"bannerNews"
    }).then(res=>{
      if(res.data.code==='success'){
        this.setState({data:res.data.data})
      }
    })
  }
  render() {
    return (
      <Carousel
        autoplay
        infinite
        dotStyle={{ color: "red" }}
        // cellSpacing={10}
        // slideWidth={0.8}
        className="ltx_carousel"
        style={{ height: "2.32rem"}}
      // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
      // afterChange={index => console.log('slide to', index)}
      >
        {this.state.data.map(val => (
          <a
            key={val.id}
            onClick={() => this.props.history.push(`/detail/${val.id}`)}
            style={{ display: 'inline-block', width: '100%', height: "2.32rem" }}
          >
            <img
              src={val.imgPath}
              alt=""
              style={{ width: '100%', verticalAlign: 'top', height: "100%" }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
            <div className="banner_title">{val.title}</div>
          </a>
        ))}
      </Carousel>
    );
  }
}
export default withRouter(Banner);