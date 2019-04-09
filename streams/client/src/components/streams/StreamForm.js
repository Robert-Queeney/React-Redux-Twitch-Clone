// ** created this component becasue the Create and Edit pages were very similar and we could reuse this code for both.  Will pass down inidividual actions specific to each as props

import React from 'react';
import { Field, reduxForm } from 'redux-form';


class StreamForm extends React.Component {

    renderError ({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        //this allows for dynamic styling in the return statement
        //"if error and touched are true, add 'error to the classname"
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        //  below is E6 destructuring for the formProps property
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            // this.props.handleSubmit is a CB func provided by redux form
            <form 
                onSubmit={this.props.handleSubmit(this.onSubmit)} 
                className="ui form error" // need to add error or semantic ui hides the errors
            >
                {/* name prop is required for all Field elements */}
                {/* component is how the Field knows what to do */}
                <Field name='title' component={this.renderInput} label="Enter Title" />
                <Field name='description' component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
};

//validation function
const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'You must enter in a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter in a description';
    }

    return errors
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm); 

