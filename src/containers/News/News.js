import React, {Component, Fragment} from 'react';

import {connect} from "react-redux";
import {fetchNews, deletePost} from "../../store/actions/actions-news";
import {Link} from "react-router-dom";
import Thumbnail from '../../components/Thumbnail/Thumbnail';


class News extends Component {
	componentDidMount() {
		this.props.onFetchNews();
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
				<div className="d-flex justify-content-between">
					<span className="h3">Posts</span>
					<Link to="/news/new">
						<button className="btn btn-dark">Add new post</button>
					</Link>
				</div>
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
					<p>no posts yet</p>

				}
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		posts: state.news.posts
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchNews: () => dispatch(fetchNews()),
		onDeletePost: id => dispatch(deletePost(id))
 	};
};

export default connect(mapStateToProps, mapDispatchToProps)(News);

