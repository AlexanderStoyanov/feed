import React from 'react';
import Forum from './Forum';
import { connect } from 'react-redux';
import { loadTopics } from '../../actions/topicAction';
import { renameForum, loadCurrentForumID, deleteForum, addForum, loadForums, restoreForum } from '../../actions/forumAction';


class ForumsPage extends React.Component {
    componentDidMount() {
        //If signed in, load forums
        if (this.props.userDetails.token) {
            this.props.loadForums();
        }
    }

    render() {
        let forumNames = ['Nothing there yet..'];
        if (this.props.forum.forumNames) {
            forumNames = this.props.forum.forumNames;
        }
        return (
            <div className="container">
                <Forum
                    loadForums={this.props.loadForums}
                    loadTopics={this.props.loadTopics}
                    forumNames={forumNames}
                    group={this.props.userDetails.group}
                    token={this.props.userDetails.token}
                    blocked={this.props.userDetails.permissions.blocked}
                    renameForum={this.props.renameForum}
                    deleteForum={this.props.deleteForum}
                    restoreForum={this.props.restoreForum}
                    addForum={this.props.addForum}
                    currentForumid={this.props.userDetails.currentForumID}
                    loadCurrentForumID={this.props.loadCurrentForumID}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        forum: state.forum,
        userDetails: state.userDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadForums: () => {
            dispatch(loadForums());
        },
        loadTopics: (directory) => {
            dispatch(loadTopics(directory));
        },
        renameForum: async (id, name) => {
            await dispatch(renameForum(id, name));
        },
        loadCurrentForumID: (currentForumID) => {
            dispatch(loadCurrentForumID(currentForumID));
        },
        deleteForum: async (currentForumID) => {
            await dispatch(deleteForum(currentForumID));
        },
        addForum: async (currentForumID) => {
            await dispatch(addForum(currentForumID));
        },
        restoreForum: async (currentForumID) => {
            await dispatch(restoreForum(currentForumID));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumsPage);