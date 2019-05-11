import React, {Component, Fragment} from 'react';
import NewForm from "../../components/NewForm/NewForm";
import {connect} from 'react-redux';
import {createPost} from "../../store/actions/actions-news";


class New extends Component {
	createPost = data => {
		this.props.onPostCreated(data).then(() => {
			this.props.history.push('/')
		});
	};

	render() {
		return (
			<Fragment>
				<h2>New Post</h2>
				<NewForm onSubmit={this.createPost}/>
			</Fragment>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onPostCreated: data => dispatch(createPost(data))
	}
};

export default connect(null, mapDispatchToProps)(New);

