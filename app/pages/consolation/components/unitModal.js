import React, {Component} from 'react';
import {Modal} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import 'antd/es/icon/style';
import './style/index.less';
import Axios from 'axios';
import commonUrl from '../../../config';
import {connect} from 'react-redux';
import UnitSelect from './unitSelect';

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

class UnitModal extends React.Component {
    state = {
        unitModal: false
    };

    componentWillReceiveProps(nextProps) {
        this.setState({unitModal: nextProps.visible});
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    };

    render() {
        const {unitModal} = this.state;
        const {onClose} = this.props;

        return (
            <Modal
                className="selectModal"
                visible={unitModal}
                transparent
                maskClosable={false}
                onClose={onClose}
                title={null}
                footer={[]}
                wrapProps={{onTouchStart: this.onWrapTouchStart}}
            >
                <div style={{height: '100%', overflow: 'scroll'}}>
                    <UnitSelect onClose={onClose}/>
                </div>
            </Modal>
        );
    }
}

export default connect(null, null)(withRouter(UnitModal))
