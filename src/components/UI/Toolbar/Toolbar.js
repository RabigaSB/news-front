import React from 'react';
import {NavLink} from 'react-router-dom';

const Toolbar = () => {
	return (
		<nav className="bg-dark p-4 mb-3">
			<NavLink className="text-light h2" to="/">News</NavLink>
		</nav>
	);
};

export default Toolbar;
