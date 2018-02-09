import React, { Component } from 'react';
// reduxForm is very similar to connect helper, that allows us to wire up to redux.
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';


class PostsNew extends Component {
    // field contains event handlers.
    // field.meta.touched is from the redux form, 
    // touched means the has focused this input and focused away from it. 
    renderField(field) {
        // So we can use {meta} for meta.touched instead of field.meta.touched
        // { touched : touched } = { touched } to destructure meta.touched.
        // Similar to error.
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error? 'has-danger' : ''}`;

        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    //onChange={field.input.onChange}
                    //onFocus={field.input.onFocus}
                    //onBlur={field.input.onBlur}
                    //... maps to all the event handers to the props.
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        // this === component
        //console.log(values);

        this.props.createPost(values, () => {
            // Go back to the root route, but we want to do it after creating the post.
            this.props.history.push('/');
        });
    }

    render () {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    // console.log(values) -> {title: 'asf', categories; 'erer', content: 'erwer'}
    const errors = {};

    // Validate the inputs from 'values'
    if (!values.title) {
        errors.title = "Enter a title";
    }
    if (!values.categories) {
        errors.categories = "Enter some categories";
    }
    if (!values.content) {
        errors.content = "Enter some content please";
    }

    // If errors is empty, the form is fine to submit.
    // If errors has *any* properties, redux form assumes form is invalid.
    return errors;
}

// Make sure the string assigned to form is unique.
export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null,{ createPost }) (PostsNew)
);


