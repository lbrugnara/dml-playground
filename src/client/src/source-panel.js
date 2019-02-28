import React from 'react';

export default class SourcePanel extends React.Component {
    constructor(props) {
        super(props);

        this.onInput = this.onInput.bind(this);
    }

    onInput(e) {
        //e.target.innerText = e.target.innerText;
        console.log(e.target);
        this.props.onSourceChange(e.target.innerText);
    }

    render() {
        return (
            <div className="panel source" 
                onMouseEnter={this.props.setActive}
                onFocus={this.props.setActive}
                onMouseLeave={this.props.setInactive}
                onBlur={this.props.setInactive}
                onScroll={this.props.onPanelScroll}
                onInput={this.onInput}
                contentEditable="true">
            </div>
        ); 
    }
}