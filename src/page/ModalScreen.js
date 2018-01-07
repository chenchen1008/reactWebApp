/**
 * Created by guominghao on 2018/1/7.
 */
/**
 * Created by guominghao on 2018/1/7.
 */

import React, {Component} from 'react';
import Modal from '../widget/Modal';

class ModalScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isOpen: false,
        };
    }

    render() {

        return (
            <div style={{backgroundColor: '#ff00ff', display: 'flex', flexDirection: 'column', height: '100vh',}}>
                <div style={{backgroundColor: '#00ffff', height: 44}} onClick={() => {
                    this.setState({isOpen: !this.state.isOpen})
                }}>
                </div>
                <Modal visiable={this.state.isOpen} onClick={()=>this.setState({isOpen: !this.state.isOpen})} style={{
                    /*position: 'fixed',
                    left: 0,
                    top: 0,*/
                    width: 100,
                    height: 100,
                    backgroundColor: '#456',
                    opacity: 0.2
                }}>hello</Modal>
            </div>
        );
    }
}
;

export default ModalScreen;