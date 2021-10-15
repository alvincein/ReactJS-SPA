import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';


export default class BrowserModal extends Component{

    // Handle back button function
    handleBack = () => {
        this.props.setModalVisible(false);
    };

    render() {
        return (
        <Modal
            visible={this.props.visible}
            closable={false}
            footer={null}
            style={{ top : 0}}
            width={1200}>
                <Button 
                    shape="circle" 
                    style={{ bottom: "0.5em"}} 
                    onClick={this.handleBack}>
                        <ArrowLeftOutlined />
                </Button>
                <iframe className="iframe-container" title="open-url" src={this.props.url}></iframe>
        </Modal>
        );
    }
}
