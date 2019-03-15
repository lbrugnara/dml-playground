import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './editor/editor.js';
import dotenv from 'dotenv';

dotenv.config();

class App extends React.Component {
    render() {
        return <Editor />;
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
