import React from 'react';

const ReplyEntry = ({ text, firstname, date, onClick, id, order, groupname }) => {
    function createMarkup() {
        return { __html: text };
    }

    function myComponent() {
        return <div dangerouslySetInnerHTML={createMarkup()} />;
    }

    return (
        <div className="row">
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-center">{firstname}</h5>
                        <h6 className="card-title text-center">Group: {groupname}</h6>
                        <p className="card-text"> </p>
                    </div>
                </div>
            </div>
            <div className="col-md-9">
                <div className="card p-3 mb-3 bg-white">
                    <div className="card-header">
                        {new Date(Number(date)).toLocaleString()}
                        <div className="float-right">
                            <button name={id} data-order={order} title="Edit" class="btn btn-secondary mx-1" onClick={onClick} >Edit</button>
                            <button name={id} title="Delete" class="btn btn-danger mx-1" onClick={onClick} >Delete</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                            {myComponent()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReplyEntry;