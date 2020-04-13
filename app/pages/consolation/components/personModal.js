import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import 'antd/es/icon/style';
import PersonSelect from './personSelect';
import './style/index.less';

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

class PersonModal extends React.Component {
    state = {
        personModal: false
    };

    componentWillReceiveProps(nextProps) {
        this.setState({personModal: nextProps.visible});
    }

    onWrapTouchStart = (e) => {
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    };

    render() {
        const {personModal} = this.state;
        const {onClose,defaultCheckValues,module} = this.props;
        return (
            <Modal
                className="selectModal"
                visible={personModal}
                transparent
                maskClosable={false}
                onClose={onClose}
                title={null}
                footer={[]}
                wrapProps={{onTouchStart: this.onWrapTouchStart}}
            >
                <div style={{height: '100%', overflow: 'scroll'}}>
                    <PersonSelect onClose={onClose} defaultCheckValues={defaultCheckValues} module={module}/>
                </div>
            </Modal>
        );
    }
}
export default connect(null, null)(withRouter(PersonModal))
