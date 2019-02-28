import React from 'react';
import './output.css';

export default class OutputPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel output" 
                onMouseEnter={this.props.setActive} 
                onFocus={this.props.setActive}
                onMouseLeave={this.props.setInactive}
                onBlur={this.props.setInactive}
                onScroll={this.props.onPanelScroll} 
                dangerouslySetInnerHTML={{ __html: this.props.html }}>
            </div>
        );
    }
}