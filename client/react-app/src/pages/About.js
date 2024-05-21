import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';


const About = () => {
    const [markdown, setMarkdown] = useState('About project');

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/j-coop/Meeting-scheduler-OSLC/refactoring/README.md')
            .then(response => response.text())
            .then(text => setMarkdown(text));
    }, []);

    return (
        <div className="About" style={{paddingLeft:"15%", paddingRight:"15%"}}>
            <ReactMarkdown children={markdown} />
        </div>
    );
};

export default About;
