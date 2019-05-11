import React, {Component} from 'react';
import {Col, Form, FormGroup, Input, Label, Button} from 'reactstrap';


class NewForm extends Component {
	state = {
		title: '',
		article: '',
	};

	formatDate = date => {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	};

	submitFormHandler = event => {
		event.preventDefault();

		const formData = new FormData();

		for (let key in this.state) {
			formData.append(key, this.state[key]);
		}
		formData.append("date", this.formatDate(new Date()));
		this.props.onSubmit(formData);
	};

	inputChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	fileChangeHandler = e => {
		// console.log(e.target);
		this.setState({image: e.target.files[0]})
	};

	render() {
		return (
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
					<Label sm={2} for="image">Photo</Label>
					<Col sm={10}>
						<Input
							type="file"
							name="image" id="image"
							onChange={this.fileChangeHandler}
						/>
					</Col>
					{/* multiple for multiple file choice*/}
				</FormGroup>
				<FormGroup row>
					<Col sm={{offset:2, size: 10}}>
						<Button type="submit" color="primary">Save</Button>
					</Col>
				</FormGroup>
			</Form>
		);
	}
}

export default NewForm;
