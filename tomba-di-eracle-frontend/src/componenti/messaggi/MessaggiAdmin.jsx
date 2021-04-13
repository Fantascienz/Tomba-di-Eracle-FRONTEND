import React, { Component } from 'react';
import Header from '../layout/Header';
import ChatAdmin from './ChatAdmin';

class MessaggiAdmin extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente centrato">
                    <div className="centrato" style={{height:"100%", width:"50%"}}>
                        <ChatAdmin />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MessaggiAdmin;