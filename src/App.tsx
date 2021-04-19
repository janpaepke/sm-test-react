import './App.css';

import React from 'react';
import { ScrollMagic } from 'scrollmagic';

import { ClassToggle } from './ClassToggle';
import ScrollMagicElement from './ScrollMagicElement';

ScrollMagic.addPlugin(ClassToggle);
function App() {
	return (
		<div className="App">
			<div style={{ height: '120vh' }}></div>
			<ScrollMagicElement offset={0} />
			<div style={{ height: '120vh' }}></div>
		</div>
	);
}

export default App;
