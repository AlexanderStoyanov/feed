import React from 'react';
import PropTypes from 'prop-types';
import TopicEntry from '../common/TopicEntry';
import TextFieldGroup from '../common/TextFieldGroup';

class Topic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            edit: false,
            add: false,
            newName: '',
            renameText: '',
            currentTopicid: -1,
        }

        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.back = this.back.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    add() {
        this.setState({ add: true });
    }

    delete() {
        this.props.deleteTopic(this.props.currentTopicid);
    }

    back() {
        this.setState({ edit: false, add: false });
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.edit) {
            this.props.renameTopic(this.props.currentTopicid, this.state.renameText);
        }
        else if (this.state.add) {
            this.props.addTopic(this.state.newName);
        }
        this.setState({ edit: false, add: false });
    }

    onClick(event) {
        if (event.target.className === 'nav-link') {
            this.props.loadReplies(event.target.name);
        }
        else if (event.target.title === 'edit') {
            this.props.loadCurrentTopicID(event.target.name);
            this.setState({ edit: true });
        } 
    }

    render() {
        var rows = [];

        if (this.state.edit) {
            const { errors } = this.state;
            return (
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="editBlock mt-5">
                            <form onSubmit={this.onSubmit} >
                                <TextFieldGroup
                                    error={errors.rename}
                                    label="Rename"
                                    onChange={this.onChange}
                                    value={this.state.renameText}
                                    field="renameText"
                                    type="text"
                                />
                                <button type="submit" className="btn btn-primary m-1">Rename</button>
                                <button onClick={this.back} className="btn btn-dark m-1">Back</button>
                                <button onClick={this.delete} className="btn btn-danger float-right m-1">Delete Topic</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        
        if (this.props.topicNames) {
            for (var i = 0; i < this.props.topicNames.length; i++) {
                rows.push(<TopicEntry
                    key={i}
                    topicName={this.props.topicNames[i].topicname}
                    forumURL={this.props.forumURL}
                    topicURL={this.props.topicNames[i].topicname}
                    onClick={this.onClick}
                    topicID={this.props.topicNames[i].topicid}
                    match={this.props.match}
                />);
            }
        }


        return (
            <div className="topicEntries">
                {rows}
            </div>
        );
    }
}

Topic.propTypes = {
    topicNames: PropTypes.array,
}

export default Topic