/**
 * Created by guominghao on 2018/1/6.
 */

import React, {Component} from 'react';

class WheelView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.onScroll = this.onScroll.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.reSet = this.reSet.bind(this);
        this.transfrom = this.transfrom.bind(this);
    }
    /**
     * 当有新的属性需要更新时。也就是网络数据回来之后
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {//接收父组建的数据
        this.setState({
            data: nextProps.data,
        });//把新的数据填进列表，setState会自动触发render更新界面
        this.refs.scroller.scrollTop = 40 * nextProps.index;
        //每个列表选项高度为40px;
    }
    componentDidMount() {
        var self = this;
        self.refs.scroller.addEventListener('touchstart', touchStart, false);
        self.refs.scroller.addEventListener('touchend', touchEnd, false);
        self.refs.scroller.addEventListener('mousedown', touchStart, false);
        self.refs.scroller.addEventListener('mouseup', touchEnd, false);

        function touchStart(event) {
            self.isTouchStart = true;
        }

        function touchEnd(event) {
            self.isTouchStart = false;
            self.timer = setTimeout(self.reSet, 100)
            //100毫秒未触摸，认定滚动结束进行状态修正
        }
    }

    /**
     * 监听滚动事件
     * @param e
     */
    onScroll() {
        var self = this;
        if (this.timer) clearTimeout(this.timer)//如果一直在滚动，不会触发timer
        this.timer = setTimeout(self.reSet, 100)
        //100毫秒未滚动，认定滚动结束
    }

    /**
     * 状态修正
     */
    reSet() {
        var self = this;
        if (self.isTouchStart)return;//如果在触摸状态，返回
        console.log('scrolling ends..')
        var top = self.refs.scroller.scrollTop;//滚过的高度
        var dis = top % 40;
        var target;
        if (dis > 20) {//超过一半，向下滚
            target = top + (40 - dis);
            self.transfrom(target);
        } else {//否则滚回去
            target = top - dis;
            self.transfrom(target);
        }
        self.index = target / 40;//  当前选中的序号
        self.props.onDataChange(self.props.type, self.index);
    }
    handleClick(e) {   //点到哪个滚到目标位置
        console.log(e.clientY - 120);
        var distance = e.clientY - 120;  //当前点击的位置距目标位置的距离
        var self = this;
        var top = self.refs.scroller.scrollTop;  //滚过的高度
        var target = top + Math.floor(distance / 40) * 40;  //需要滚动的高度
        self.transfrom(target);    //动画过渡到目标位置
        self.index = target / 40;  //  当前选中的序号
        self.props.onDataChange(self.props.type, self.index);
        //回调函数数据改变事件
    }
    /**
     * 动画过渡到目标位置
     * @param target
     */
    transfrom(target) {
        var self = this;
        var now = self.refs.scroller.scrollTop;
        var step = (target - now) / 20;
        setTimeout(function () {
            self.refs.scroller.scrollTop = self.refs.scroller.scrollTop + step;
            if (self.refs.scroller.scrollTop != target)
                setTimeout(this, 10);//没有滚动到目标位置，继续触发自己
        }, 10);
    }

    render() {
        if(this.state.data && this.state.data.length > 0){
            return (<div className="container"
                         ref="scroller"
                         onScroll={this.onScroll}
                         onClick={this.handleClick}>
                    <div className="scroller">
                        {
                            this.state.data.map(function (item) {
                                //循环把数据显示出来
                                return <div className="item">{item}</div>
                            })
                        }
                    </div>
                </div>
            );
        }else{
            return (<div className="container"
                         ref="scroller"
                         onScroll={this.onScroll}
                         onClick={this.handleClick}>
                    <div className="scroller">
                        <div className="item"></div>
                        <div className="item"></div>
                    </div>
                </div>
            );
        }
    }
};

export default WheelView;