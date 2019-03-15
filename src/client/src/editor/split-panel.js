import React from 'react';
import ReactDOM from 'react-dom';
import './split-panel.css';

export default class SplitPanel extends React.Component {
    constructor(props) {
        super(props);

        this.dragStarted = false;
        this.dragStartPosition = 0;
        
        this.leftRef = this.props.children[0].ref;
        this.rightRef = this.props.children[1].ref;
        
        this.handleRef = React.createRef();
    }

    dragStart = (e) => {
        e.preventDefault();

        this.dragStarted = true;
        this.dragStartPosition = this.handleRef.current.offsetLeft;
    }

    drag = (e) => {
        if (!this.dragStarted)
            return;

        e.preventDefault();

        // Resize taking as pivot the current mouse X-axis position
        this.resize(e.clientX);
    }

    dragStop = () => {
        this.dragStarted = false;
        this.dragStartPosition = 0;
    }

    onWindowResize = () => {
        this.resize(this.handleRef.current.offsetLeft);
    }

    resize = (pivotOffset) => {
        var leftNode = ReactDOM.findDOMNode(this.leftRef.current);
        var rightNode = ReactDOM.findDOMNode(this.rightRef.current);

        // Do not resize if the window is shrunk up to 400px or less
        if (window.innerWidth <= 400)
            return;

        // The pivot will be placed where the left panel should end, so it is as
        // easy as using the pivot's offset as the panel's width
        var leftPanelWidth = pivotOffset;

        // Same logic applies for the right panel starting from the right-most side of
        // the window
        var rightPanelWidth = window.innerWidth - pivotOffset;


        // Checks to not shrink the panels less than 200px, and in case the panels
        // are lesser than 200px, adjust them properly
        if (leftPanelWidth < 200) {
            leftPanelWidth = 200;
            rightPanelWidth = leftNode.offsetWidth + rightNode.offsetWidth - 200;
        } else if (rightPanelWidth < 200) {
            leftPanelWidth = leftNode.offsetWidth + rightNode.offsetWidth - 200;
            rightPanelWidth = 200;
        }                    

        // Update the panels using pixels
        leftNode.style.width = leftPanelWidth + "px";
        rightNode.style.width = rightPanelWidth + "px";
        
        // Update the handler position using percentage, that way we don't
        // lose it form the viewport on windows resize, and when that happens
        // we can use the handler's left offset as pivot
        var handlerLeftPos = (leftPanelWidth - 1) * 100 / window.innerWidth;
        this.handleRef.current.style.left = handlerLeftPos + "%";
    }

    componentDidMount = () => {
        window.addEventListener("mousemove", this.drag);
        window.addEventListener("mouseup", this.dragStop);
        window.addEventListener("resize", this.onWindowResize)
    }

    componentWillUnmount = () => {
        window.removeEventListener("mousemove", this.drag);
        window.removeEventListener("mouseup", this.dragStop);
        window.removeEventListener("resize", this.onWindowResize)
    }

    render () {
        return (
            <div className={this.props.className}>
                {React.cloneElement(this.props.children[0], { className: "scrollable-panel left-panel" })}
                <div  
                    ref={this.handleRef}
                    className="handler"
                    onMouseDown={this.dragStart}
                />
                {React.cloneElement(this.props.children[1], { className: "scrollable-panel right-panel" })}
            </div>
        );

    }
}