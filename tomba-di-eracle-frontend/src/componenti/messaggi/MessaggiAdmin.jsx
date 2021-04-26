import React, { Component } from 'react';
import Header from '../layout/Header';
import ChatAdmin from './ChatAdmin';
import "./MessaggiTraUtentiAdmin.css"


class MessaggiAdmin extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente centrato">
                    <div className="centrato messaggi-utente">
                        <ChatAdmin />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MessaggiAdmin;