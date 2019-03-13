import React from 'react';
import ReactDOM from 'react-dom';

export default class SourcePanel extends React.Component {
    constructor(props) {
        super(props);

        this.onInput = this.onInput.bind(this);
    }

    componentDidMount() {
        var sp = ReactDOM.findDOMNode(this.refs.source);

        fetch("/content/intro.dml", {
            method: "GET",
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'text/plain',
            }
        })
        .then(response => response.text())
        .then(intro => {
            sp.innerText = intro;
            this.props.onSourceChange(intro);
        })
    }

    onInput(e) {
        this.props.onSourceChange(e.target.innerText);
    }

    render() {
        return (
            <div className="panel source" 
                ref="source"
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