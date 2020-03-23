import React, {Component} from 'react';
import {Flex} from 'antd-mobile';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import {Tabs, WhiteSpace} from 'antd-mobile';
import {StickyContainer, Sticky} from 'react-sticky';

function renderTabBar(props) {
    return (<Sticky>
        {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}

class PartyTab extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let tab = localStorage.getItem('branch_tab');
        if (tab) {
            this.props.tabonChange(JSON.parse(tab))
        }
    }

    tabonChange = (tab, index) => {
        localStorage.setItem('branch_tab', JSON.stringify(tab))
        this.props.tabonChange(tab)
    };

    render() {
        let tab = JSON.parse(localStorage.getItem('branch_tab'));
        const {tabs} = this.props;
        return (
            <div>
                <StickyContainer>
                    <Tabs tabs={tabs}
                          initialPage={tab ? tab.key : 't1'}
                          onChange={this.tabonChange}
                          tabBarUnderlineStyle={{borderColor: "#F83A2E"}}
                          tabBarActiveTextColor={"#F83A2E"}
                          renderTabBar={renderTabBar}
                    >
                    </Tabs>
                </StickyContainer>
            </div>
        )
    }
}


export default PartyTab;