import React from 'react';
import Reply from './Reply';

import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Editor.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validateReply from '../../../server/shared/validations/reply';
import { postReply, deleteReply } from '../../actions/replyAction';
import { addFlashMessage } from '../../actions/flashMessages';

const content = {
    "entityMap": {},
    "blocks": [{ "key": "637gr", "text": "Initialized from content state.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }]
};



class RepliesPage extends React.Component {
    constructor(props) {
        super(props);

        const contentState = convertFromRaw(content);
        this.state = {
            contentState,
            isValid: false,
            errors: {},
        }

        this.onContentStateChange = this.onContentStateChange.bind(this);
        this.isValid = this.isValid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onContentStateChange(contentState) {
        this.setState({
            contentState,
        });
    };

    isValid() {
        const { errors, isValid } = validateReply(this.state.contentState.blocks[0]);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(event) {
        event.preventDefault();

        if (this.isValid()) {
            this.setState({ errors: {}, invalid: true });
            this.props.postReply({ token: this.props.userDetails.token, topicid: this.props.reply.currentDirectory, reply: JSON.stringify(this.state.contentState), userid: null }).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Reply has been posted!'
                    });
                    this.setState({ invalid: false });
                },
                (err) => {
                    this.setState({ errors: err.response.data, invalid: false });

                }
            );
        }
    }

    render() {
        let replies = [];
        let names = [];
        let dates = [];
        let ids = [];
        if (this.props.reply.replies) {
            for (let i = 0; i < this.props.reply.replies.length; i++) {
                replies.push(draftToHtml(JSON.parse(this.props.reply.replies[i].text)));
                names.push(this.props.reply.replies[i].firstname);
                dates.push(this.props.reply.replies[i].date);
                ids.push(this.props.reply.replies[i].replyid);
            }
        }

        return (
            <div className="container pt-1" style={{ background: '#e4e4e4' }}>
                <Reply
                    replies={replies}
                    names={names}
                    dates={dates}
                    ids={ids}
                    deleteReply={this.props.deleteReply}
                />
                <div className="row mt-3">
                    <div className="col-md">
                        <form onSubmit={this.onSubmit}>
                            <Editor
                                toolbarClassName="toolbarClass"
                                editorClassName="editorClass"
                                onContentStateChange={this.onContentStateChange}
                                toolbar={{
                                    inline: {
                                        inDropdown: false,
                                        className: 'red',
                                    }
                                }}
                            />
                            <button disabled={this.state.invalid} type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        reply: state.reply,
        userDetails: state.userDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteReply: (id) => {
            dispatch(deleteReply(id));
        },
        postReply: () => {
            dispatch(postReply());
        },
        addFlashMessage: () => {
            dispatch(addFlashMessage());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepliesPage);
