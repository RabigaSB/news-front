import React from 'react';
import config from "../../config";

const Thumbnail = props => {
	let image = "";
	if (props.image) {
		 image = config.apiURL + '/uploads/' + props.image;
	}

	return <img width="100px" height="100px" src={image} className="d-block bg-secondary" alt="pic"/>
};

export default Thumbnail;
