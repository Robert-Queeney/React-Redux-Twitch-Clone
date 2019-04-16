import React from 'react'; 
import ReactDOM from 'react-dom';

const Modal = props => {
    return ReactDOM.createPortal(
        <div 
            onClick={props.onDismiss} 
            className="ui dimmer modals visible active"
        >
        {/* e.stopPropogation will stop the event from bubbling up - keeps a click from hitting the above onClick */}
            <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">{props.title}</div>
                <div className="content">{props.content}</div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
            {/* second arg required to place this right on the body and not nested like typical component */}
            {/* also create second div in index.html file will id of modal */}
        </div>,
        document.querySelector('#modal')
    )

}

export default Modal; 