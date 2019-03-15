import React from 'react';
import './preview-panel.css';

export default class PreviewPanel extends React.Component {
    render() {
        return (
            <div 
                className={this.props.className + " panel preview"}
                onMouseEnter={this.props.setActive} 
                onFocus={this.props.setActive}
                onScroll={this.props.onPanelScroll} 
                dangerouslySetInnerHTML={{ __html: this.props.html }}>
            </div>
        );
    }
}