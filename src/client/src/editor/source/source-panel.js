import React from 'react';

export default class SourcePanel extends React.Component {
    
    onInput = (e) => {
        this.props.onSourceChange(e.target.innerText);
    }

    render() {
        return (
            <pre 
                className={this.props.className + " panel source"}
                ref="source"
                onMouseEnter={this.props.setActive}
                onFocus={this.props.setActive}
                onScroll={this.props.onPanelScroll}
                onInput={this.onInput}
                contentEditable="true">
            </pre>
        ); 
    }
}