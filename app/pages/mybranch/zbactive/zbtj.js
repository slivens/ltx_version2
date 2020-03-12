/*
 * @Author: your name
 * @Date: 2019-09-19 11:04:00
 * @LastEditTime : 2020-01-17 10:39:52
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\pages\mybranch\zbactive\zbtj.js
 */
import React, { Component } from 'react';
import {Flex} from 'antd-mobile';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

function renderTabBar(props) {
    return (<Sticky>
      {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
  }
  const tabs = [
    { title: '全部活动', key: 't1' },
    { title: '我参与的', key: 't2' },
    { title: '我发布的', key: 't3' },
  ];
  
  class TabExample extends Component{
      constructor(props){
        super(props)
      }
    tabonChange=(tab,index)=>{
      localStorage.setItem('branch_tab',JSON.stringify(tab))
        this.props.tabonChange(tab)
    }
    componentDidMount(){
      let tab=localStorage.getItem('branch_tab');
      if(tab){
        this.props.tabonChange(JSON.parse(tab))
      }
    }
    render(){
      let tab=JSON.parse(localStorage.getItem('branch_tab'));
        return (
            <div>
                <StickyContainer>
                    <Tabs tabs={tabs}
                        initialPage={tab?tab.key:'t1'}
                        onChange={this.tabonChange}
                        tabBarUnderlineStyle={{ borderColor: "#F83A2E" }}
                        tabBarActiveTextColor={"#F83A2E"}
                        renderTabBar={renderTabBar}
                    >
                    </Tabs>
                </StickyContainer>
            </div>
        )
    }
  }
    
    
    export default TabExample;