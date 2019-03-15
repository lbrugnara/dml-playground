import React from 'react';
import ReactDOM from 'react-dom';
import ScrollSync from './scroll-sync';
import SplitPanel from './split-panel';
import SourcePanel from './source/source-panel';
import PreviewPanel from './preview/preview-panel';
import './editor.css';

export default class Editor extends React.Component {
    constructor() {
        super();

        this.sourceRef = React.createRef();
        this.previewRef = React.createRef();
        
        this.scrollSync = new ScrollSync(this.sourceRef, this.previewRef);

        this.state = {
            preview: ''
        };
    }

    // The first time the editor shows up, we load the default dml file
    // and trigger a source change to parse it and show the result in the
    // preview panel
    componentDidMount = () => {
        var sp = ReactDOM.findDOMNode(this.sourceRef.current);

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
                this.onSourceChange(intro);
            })
    }

    // When the SourcePanel receives an input, we send a request to
    // parse it to the API. After that we change the state to set the
    // parsed document into the PreviewPanel
    onSourceChange = (source) => {
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
                preview: document.output
            });
        });
    }

    render() {
        return (
            <SplitPanel className="editor">
                <SourcePanel
                    ref={this.sourceRef}
                    setActive={() => this.scrollSync.setActive(this.sourceRef)}
                    onSourceChange={this.onSourceChange} 
                    onPanelScroll={this.scrollSync.onPanelScroll}
                />
                <PreviewPanel 
                    ref={this.previewRef}
                    setActive={() => this.scrollSync.setActive(this.previewRef)}
                    onPanelScroll={this.scrollSync.onPanelScroll}
                    html={this.state.preview} 
                />
            </SplitPanel>
        );
    }
}
