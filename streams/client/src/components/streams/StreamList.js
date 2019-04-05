import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    // method to get streams data and render it in a list
    renderList(){
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {stream.title}
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            )
        })
    }

    render() {
        console.log(this.props.streams)
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    // streams are stores in an object (can see from the dev tools) so we need the following syntax to access them (Object.values is a built in js func)
    return { streams: Object.values(state.streams) }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList); 