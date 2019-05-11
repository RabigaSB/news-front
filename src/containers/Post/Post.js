import React, {Component, Fragment} from 'react';

import {connect} from "react-redux";
import {fetchPost, deletePost, fetchComments} from "../../store/actions/actions-news";
import {Button, Col, Form, FormGroup, Input, Label} from 'reactstrap';


class Post extends Component {
	state = {
		title: "",
		article: "",
		date: "",
		id: ""
	};
	componentDidMount() {
		this.props.onFetchPost(this.props.match.params.id)
			.then(() => {
				this.setState({
					title: this.props.post.title,
					article: this.props.post.article,
					date: this.props.post.date,
					id: this.props.post.id
				});

			});
		this.props.onFetchComments(this.props.match.params.id);
	}

	deletePost = id => {
		this.props.onDeletePost(id)
			.then((res) => {
				this.props.onFetchNews();
			});
	};

	render() {
		return (
			<Fragment>
				<h2>{this.state.title}</h2>
				<p className='h6 text-secondary mb-5'>{this.state.date}</p>
				<p className="mb-5">{this.state.article}</p>
				<h2>Comments</h2>
				{
					this.props.comments?
						this.props.comments.map(comment => (
								<div key={comment.id} className="d-flex border rounded justify-content-between mb-2 p-1">
									<div className="h5">
										<p className="h6 text-secondary">{comment.author} says:</p>
										{comment.comment}
									</div>
									<div className="text-right">
										<button className="btn btn-light" onClick={() => this.deletePost(comment.id)}>Delete</button>
									</div>
								</div>
							)
						)
						:
						<p className="h6 text-secondary mb-5">Be the first person to comment</p>

				}

				<h2 className="mt-5">Add Comments</h2>
				<Form onSubmit={this.submitFormHandler}>
					<FormGroup row>
						<Label sm={2} for="title">Title</Label>
						<Col sm={10}>
							<Input
								type="text" required
								name="title" id="title"
								placeholder="Enter product title"
								value={this.state.title}
								onChange={this.inputChangeHandler}
							/>
						</Col>
					</FormGroup>

					<FormGroup row>
						<Label sm={2} for="article">Description</Label>
						<Col sm={10}>
							<Input
								type="textarea" required
								name="article" id="article"
								placeholder="Type to post"
								value={this.state.article}
								onChange={this.inputChangeHandler}
							/>
						</Col>
					</FormGroup>

					<FormGroup row>
						<Col sm={{offset:2, size: 10}}>
							<Button type="submit" color="primary">Save</Button>
						</Col>
					</FormGroup>
				</Form>
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		post: state.news.post,
		comments: state.news.comments
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchPost: id => dispatch(fetchPost(id)),
		onFetchComments: id => dispatch(fetchComments(id)),
		onDeletePost: id => dispatch(deletePost(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);

