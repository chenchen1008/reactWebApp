/**
 * Created by guominghao on 2018/1/8.
 */
class EventScreen extends React.Component {

    constructor() {
        super()
        this._handleClick = this._handleClick.bind(this)
        this._handleDivClick = this._handleDivClick.bind(this)
    }

    componentDidMount() {
        document.addEventListener('click', this._handleBodyClick)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._handleBodyClick)
    }

    _handleBodyClick(e) {
        console.log('body clicked!')
    }

    _handleClick(e) {
        console.log("button clicked!")
        //e.stopPropagation()
        //e.nativeEvent.stopImmediatePropagation()
    }

    _handleDivClick(e) {
        console.log("div clicked!")
        //e.stopPropagation()
        //e.nativeEvent.stopImmediatePropagation()
    }

    render() {
        return (
            <div onClick={this._handleDivClick}>
                <button id="elem" onClick={this._handleClick}>Click me!</button>
            </div>
        )
    }

}