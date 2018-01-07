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

function getParentElement(parentSelector) {
    return parentSelector();
}

export default class Modal extends Component {

    /* eslint-disable react/no-unused-prop-types */
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        style: PropTypes.object,
        parentSelector: PropTypes.func,
    };
    /* eslint-enable react/no-unused-prop-types */

    static defaultProps = {
        isOpen: false,
        parentSelector() {
            return document.body;
        }
    };

    componentDidMount() {
        if (!isReact16) {
            this.node = document.createElement("div");
        }
        const parent = getParentElement(this.props.parentSelector);
        parent.appendChild(this.node);
        !isReact16 && this.renderPortal(this.props);
    }

    componentWillReceiveProps(newProps) {
        const {isOpen} = newProps;
        // Stop unnecessary renders if modal is remaining closed
        if (!this.props.isOpen && !isOpen) return;

        const currentParent = getParentElement(this.props.parentSelector);
        const newParent = getParentElement(newProps.parentSelector);

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
        const parent = getParentElement(this.props.parentSelector);
        parent.removeChild(this.node);
    };

    portalRef = ref => {
        this.portal = ref;
    };

    renderPortal = props => {
        if (props.isOpen) {
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

        if (this.props.isOpen) {
            return createPortal(
                <div
                    ref={this.portalRef}
                    {...this.props}
                />,
                this.node
            );
        } else {
            return null;
        }

    }
}