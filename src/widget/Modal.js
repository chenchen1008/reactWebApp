/**
 * Created by guominghao on 2018/1/7.
 */
import React, {Component} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const isReact16 = ReactDOM.createPortal !== undefined;
const createPortal = isReact16
    ? ReactDOM.createPortal
    : ReactDOM.unstable_renderSubtreeIntoContainer;

function getParentElement(parent) {
    return parent();
}

export default class Modal extends Component {

    /* eslint-disable react/no-unused-prop-types */
    static propTypes = {
        visiable: PropTypes.bool.isRequired,
        style: PropTypes.object,
        parent: PropTypes.func,
    };
    /* eslint-enable react/no-unused-prop-types */

    static defaultProps = {
        visiable: false,
        style: {
            position: 'fixed',
            left: 0,
            top: 0,
        },
        parent() {
            return document.body;
        }
    };

    componentDidMount() {
        if (!isReact16) {
            this.node = document.createElement("div");
        }
        const parent = getParentElement(this.props.parent);
        parent.appendChild(this.node);
        !isReact16 && this.renderPortal(this.props);
    }

    componentWillReceiveProps(newProps) {
        const {visiable} = newProps;
        // Stop unnecessary renders if modal is remaining closed
        if (!this.props.visiable && !visiable) return;

        const currentParent = getParentElement(this.props.parent);
        const newParent = getParentElement(newProps.parent);

        if (newParent !== currentParent) {
            currentParent.removeChild(this.node);
            newParent.appendChild(this.node);
        }
        !isReact16 && this.renderPortal(newProps);
    }

    componentWillUpdate(newProps) {
    }

    componentWillUnmount() {
        if (!this.node || !this.portal) return;
        this.removePortal();
    }

    removePortal = () => {
        !isReact16 && ReactDOM.unmountComponentAtNode(this.node);
        const parent = getParentElement(this.props.parent);
        parent.removeChild(this.node);
    };

    portalRef = ref => {
        this.portal = ref;
    };

    renderPortal = props => {
        if (props.visiable) {
            const portal = createPortal(
                this,
                <div  {...props} />,
                this.node
            );
            this.portalRef(portal);
        }
    };

    render() {
        if (!this.node && isReact16) {
            this.node = document.createElement("div");
        }

        let {visiable, parent, style, ...other} = this.props;

        let containerStyle = Object.assign({}, styles.container, style);

        if (visiable) {
            return createPortal(
                <div
                    ref={this.portalRef}
                    {...other}
                    style={containerStyle}
                />,
                this.node
            );
        } else {
            return null;
        }

    }
}


const styles = {
    container: {
        position: 'fixed',
        left: '0',
        top: '0',
    }
};