import _ from 'lodash'; 
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues); 
    }


    render() {
        if(!this.props.stream){
            return <div>Loading....</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                // initialValues is a redux-form built in function
                // using pick (lodash) to easily pick out title and description
                    initialValues={_.pick(this.props.stream, 'title', 'description') }
                    onSubmit={this.onSubmit} 
                />
            </div>
        );
    }
};

// the ownProps arg gives us access to the props inside of the component
// we need both to identify the stream we are trying to edit as well as the list of all streams
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit); 