import React, { Component } from 'react';
import Header from '../layout/Header';

class ListaUtenti extends Component {
    render() {
        return (
           <React.Fragment>
               <div className="corpoComponente">
                   <h1>Utenti Registrati</h1>
                   <table className="table thead-dark">
                       <thead>
                           <tr>
                               <th>ID</th>
                               <th>Nominativo</th>
                               <th>Email</th>
                               <th>Tipo</th>
                               <th>Personaggi</th>
                               <th>Modifica Tipo</th>
                               <th>Ban</th>
                           </tr>
                       </thead>
                       <tbody>
                           {}
                       </tbody>
                   </table>
               </div>
           </React.Fragment>
        );
    }
}

export default ListaUtenti;