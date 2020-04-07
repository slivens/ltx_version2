import React, { Component } from 'react';
import ImageCode from './verifyComp';
import { withRouter } from 'react-router-dom';
const verify1=require('../../../assets/images/verify1.jpg')
const verify2=require('../../../assets/images/verify2.jpg')
class App extends Component {
    state = {
        url: "",
        imageWidth:""
    }

    componentDidMount() {
        const imageWidth=document.body.clientWidth;
        this.setState({imageWidth,url:verify1})
    }

    onReload = () => {
        this.setState({url:verify2})
    }
    componentWillUnmount(){
        clearTimeout(this.Timer)
    }
    render() {
        return (
                <ImageCode
                    imageWidth={this.state.imageWidth}
                    imageUrl={this.state.url}
                    onReload={this.onReload}
                    onMatch={() => {
                        this.Timer=setTimeout(()=>this.props.history.push('/login'),2000) 
                    }}
                />
          
        )
    }
}
export default withRouter(App);