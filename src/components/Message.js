import React  from 'react';

const Message = props => (
    <div className="weatherform-feedback">
       <p>{props.content}</p>
    </div>
);

export default Message;