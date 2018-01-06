/**
 *
 */
import React, {Component} from 'react';
import WheelDialog from '../widget/wheel/WheelDialog';
import AeraData from '../widget/wheel/AreaData';

class AreaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            address: '',
        }
    }

    /**
     * 城市选择回调，返回省市区的下标
     */
    onAddressSelect(pIndex, cIndex, aIndex) {
        var data = AeraData;
        var province = data[pIndex].name;
        var city = data[pIndex].child[cIndex].name;
        var country ='';
        if(data[pIndex].child[cIndex].child){
            country = data[pIndex].child[cIndex].child[aIndex].name;
        }
        var address = province + city + country;
        console.log(" address:  --->" + address)
        this.state.address = address;
        //与渲染无关的数据  直接存在this对象里  如果存在State里面会导致页面脏渲染，卡顿
    }

    onClick() {
        var ans = '选择的地址：' + this.state.address;
        alert(ans);
    }

    componentDidMount() {
        this.setState({data: AeraData});
        /* var self = this;
         $.get("http://ac-wiuh7w1y.clouddn.com/c4acc5d3bec3fb3216fa.json",
         function (data) {
         self.setState({data: data});
         });*/
    }

    render() {
        return (<div >
                <div className="btn" onClick={this.onClick.bind(this)}>点击获取城市</div>
                <WheelDialog
                    data={this.state.data}
                    onAddressSelect={this.onAddressSelect.bind(this)}//传进回调
                />
            </div>
        )
    }
}

export default AreaScreen;
