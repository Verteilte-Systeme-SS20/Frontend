import React from 'react';
import { render } from 'react-dom';

const { useState } = require("react");

function App() {
    // Get a stateful "test" object that is initialized with 0 and the methode "setTest" to change it
    const [ test, setTest ] = useState(0);
    // When "test" is changed using "setTest", the page is also updated to reflect the change
    return (
        <div>
            <h1>Hallöle! { test }</h1>
            <button onClick={() => setTest(test + 1)}>Test</button>
        </div>
    );
}

// Render app into HTML-Document and element-id "react"
render(<App/>, document.getElementById('react'));
