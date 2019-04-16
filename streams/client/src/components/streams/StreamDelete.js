import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount(){
        // this will show us the path to access that data
        // console.log(this.props)
        this.props.fetchStream(this.props.match.params.id);
    }

    // making buttons to pass down as props to the delete modal
    renderActions() {
        const { id } = this.props.match.params;
        return (
            // React.Fragment (<>) helps semantic ui style the buttons correctly - a div will throw this off
            <>
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to={"/"} className="ui button">Cancel</Link>
            </>
        );
    }

    // helper method to get modal to load up right away, even before the content is ready to render
    renderContent(){
        if(!this.props.stream){
            return 'Are you sure you want to delete this stream?'
        }

        return `Are you sure you want to delete this stream with title: ${ this.props.stream.title}?`
    }

    render() {
        return (
            <Modal
                    title="Delete Stream"
                    content={ this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
        )
    }
}

// ownProps is the same props object passed to component and need it to look at the match prop and get the id 
const mapStateToProps = (state, ownProps) => {
    // can see where to get state.streams from the redux dev tools
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete); 