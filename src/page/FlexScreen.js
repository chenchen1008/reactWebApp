/**
 * Created by guominghao on 2018/1/7.
 */
/**
 * Created by guominghao on 2018/1/6.
 */

import React, {Component} from 'react';

class FlexScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    render() {

        return (
            <div style={{backgroundColor: '#ff00ff', display: 'flex',flexDirection:'column',height:'100vh',}}>
                <div style={{backgroundColor: '#00ffff',height:44}}>
                </div>
                <div style={{backgroundColor: '#00ff00',flexGrow:1,}}>
                </div>
                <div style={{backgroundColor: '#ffff00',height:44}}>
                </div>
            </div>
        );
    }
}
;

export default FlexScreen;