import React from 'react';
import ForumEntry from '../common/ForumEntry';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class Forum extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.loadTopics(e.target.name);
    }

    render() {
        var rows = [];
        for (var i = 0; i < this.props.forumNames.length; i++) {
            rows.push(<ForumEntry
                key={i}
                forumName={this.props.forumNames[i].forumname}
                forumURL={this.props.forumNames[i].forumname}
                forumID={this.props.forumNames[i].forumid}
                group={this.props.group}
                onClick={this.onClick}
            />);
        }

        return (
            <div className="forumEntries">
                {rows}
            </div>
        );
    }
}

Forum.propTypes = {
    forumNames: PropTypes.array,
    loadTopics: PropTypes.func.isRequired,
}

export default withRouter(Forum)