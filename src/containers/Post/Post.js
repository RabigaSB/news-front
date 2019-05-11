import React, {Component, Fragment} from 'react';

import {connect} from "react-redux";
import {fetchPost, deleteComment, fetchComments, createComment} from "../../store/actions/actions-news";
import {Button, Col, Form, FormGroup, Input, Label} from 'reactstrap';


class Post extends Component {
	state = {
		title: "",
		article: "",
		date: "",
		id: "",
		author: "",
		comment: ""
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

	submitFormHandler = event => {
		event.preventDefault();

		const formData = new FormData();

		formData.append("author", this.state.author);
		formData.append("comment", this.state.comment);
		formData.append("news_id", this.props.match.params.id);

		this.props.onSubmit(formData)
			.then(() => {
				this.props.onFetchComments(this.props.match.params.id);
				this.setState({
					author: "",
					comment: ""
				});
			});
	};

	inputChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	deleteComment = id => {
		this.props.onDeleteComment(id)
			.then((res) => {
				this.props.onFetchComments(this.props.match.params.id);
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
										<button className="btn btn-light" onClick={() => this.deleteComment(comment.id)}>Delete</button>
									</div>
								</div>
							)
						)
						:
						<p className="h6 text-secondary mb-5">Be the first person to comment</p>

				}

				<h2 className="mt-5">Add Comment</h2>
				<Form onSubmit={this.submitFormHandler}>
					<FormGroup row>
						<Label sm={2} for="author">Name</Label>
						<Col sm={10}>
							<Input
								type="text"
								name="author" id="author"
								value={this.state.author}
								onChange={this.inputChangeHandler}
							/>
						</Col>
					</FormGroup>

					<FormGroup row>
						<Label sm={2} for="comment">Comment</Label>
						<Col sm={10}>
							<Input
								type="textarea" required
								name="comment" id="comment"
								placeholder="Type to post"
								value={this.state.comment}
								onChange={this.inputChangeHandler}
							/>
						</Col>
					</FormGroup>

					<FormGroup row>
						<Col sm={{offset:2, size: 10}}>
							<Button type="submit" color="dark">Save</Button>
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
		onDeleteComment: id => dispatch(deleteComment(id)),
		onSubmit: data => dispatch(createComment(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);

