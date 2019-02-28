import React from 'react';
import ReactDOM from 'react-dom';
import SourcePanel from './source-panel';
import OutputPanel from './output-panel';
import './index.css';
import dotenv from 'dotenv';

dotenv.config();

class App extends React.Component {
    constructor() {
        super();

        this.onSourceChange = this.onSourceChange.bind(this);
        this.onPanelScroll = this.onPanelScroll.bind(this);
        this.updateScroll = this.updateScroll.bind(this);

        this.setSourceActive = this.setSourceActive.bind(this);
        this.setSourceInactive = this.setSourceInactive.bind(this);
        this.setOutputActive = this.setOutputActive.bind(this);
        this.setOutputInactive = this.setOutputInactive.bind(this);

        this.sourceIsActive = false;
        this.outputIsActive = false;

        this.state = {
            input: '',
            output: ''
        };
    }

    onSourceChange(source) {
        console.log(process.env);
        fetch(process.env.REACT_APP_DML_PLAYGROUND_API, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            body: JSON.stringify({ source: source }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(document => {
            this.setState({
                input: source,
                output: document.output
            });
        });
    }

    onPanelScroll(event) {
        var sp = ReactDOM.findDOMNode(this.refs.source);
        var op = ReactDOM.findDOMNode(this.refs.output);        

        var scrollTarget = event.target;
        var updateTarget = scrollTarget === sp ? op : sp;

        var height = scrollTarget.scrollHeight;
        var pos = scrollTarget.scrollTop;
        var ratio = pos / height;

        if (scrollTarget === sp && this.sourceIsActive && !this.outputIsActive)
            this.updateScroll(updateTarget, ratio);
        else if (scrollTarget === op && this.outputIsActive && !this.sourceIsActive)
            this.updateScroll(updateTarget, ratio);
    }

    updateScroll(el, ratio) {
        setTimeout(() => {
            el.scrollTop = Math.round(el.scrollHeight * ratio);
        }, 100);
    }

    setSourceActive() {
        this.sourceIsActive = true;
        this.setOutputInactive();
    }

    setSourceInactive() {
        this.sourceIsActive = false;
    }
    
    setOutputActive() {
        this.outputIsActive = true;
        this.setSourceInactive();
    }

    setOutputInactive() {
        this.outputIsActive = false;
    }

    render() {
        return (
            <div className="app">
                <SourcePanel
                    ref="source"
                    setActive={this.setSourceActive}
                    setInactive={this.setSourceInactive}
                    onSourceChange={this.onSourceChange} 
                    onPanelScroll={this.onPanelScroll} 
                />
                <OutputPanel 
                    ref="output" 
                    setActive={this.setOutputActive}
                    setInactive={this.setOutputInactive}
                    html={this.state.output} 
                    onPanelScroll={this.onPanelScroll}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
