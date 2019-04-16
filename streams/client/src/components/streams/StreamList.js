import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    // helper method to determine if we should show delete / edit buttons
    // current user id needs to equal user id that created the stream
    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary" >Edit</Link>
                    <Link 
                        to={`/streams/delete/${stream.id}`}
                        className="ui button negative">Delete</Link>
                </div>
            )
        }
    }

    // method to get streams data and render it in a list
    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>

                </div>
            )
        })
    }

    // helper method to show a "create stream button" if user is logged in
    renderCreate(){
        if(this.props.isSignedIn){
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            )
        }
    }

    render() {
        console.log(this.props.streams)
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    // streams are stores in an object (can see from the dev tools) so we need the following syntax to access them (Object.values is a built in js func)
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId, 
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList); 