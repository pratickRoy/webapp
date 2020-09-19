import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from "./App";
import ReactGA from 'react-ga';

// ========================================

ReactGA.initialize(
    'UA-178023708-1',
    {
        debug: false,
    }
);

export const GApageView = (page) => {
    ReactGA.pageview(page);
}
export const GAevent = (categoryName, eventName, labelName, value, nonInteraction) => {
    ReactGA.event({
        category: categoryName,  // Required
        action: eventName,       // Required
        label: labelName,
        value: value,
        nonInteraction: nonInteraction
    });
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);