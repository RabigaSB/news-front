import React, {Component, Fragment} from 'react';

import {connect} from "react-redux";
import {fetchPost, deletePost, fetchComments} from "../../store/actions/actions-news";
import {Link} from "react-router-dom";
import Thumbnail from '../../components/Thumbnail/Thumbnail';


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
					this.props.posts?
						this.props.posts.map(post => (
								<div key={post.id} className="d-flex border rounded justify-content-between mb-2 p-1">
									<div className="d-flex justify-content-between">
										<Thumbnail image = {post.image}/>
										<div className="ml-5">
											<p className="h6 text-secondary">{post.date}</p>
											<p className="h4 mt-4">{post.title}</p>
										</div>
									</div>

									<div className="text-right">
										<div className="mb-3">
											<button className="btn btn-light" onClick={() => this.deletePost(post.id)}>Delete</button>
										</div>
										<Link to={"/news/" + post.id}>Read Full Post >></Link>
									</div>
								</div>
							)
						)
						:
						<p className="h6 text-secondary mb-5">Be the first person to comment</p>

				}
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

