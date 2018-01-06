/**
 *
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

export  default  class HomeScreen extends React.Component {

    /*static  propTypes = {
     todos: React.PropTypes.array.isRequire
     };*/

    constructor(props) {
        super(props); // 需要在第一行
        this.state = {};
    }

    render() {
        return (
            <div style={{backgroundColor:'#ffffff',width:'100%',height:700}}>
                <div style={styles.container}>
                    <Spinner />
                </div>
            </div>

        );
    }

    handleAdd() {
        alert('test');
    }


};

const styles = {
    container: {
        position: 'fixed',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        opacity: 0.4,
    }
};