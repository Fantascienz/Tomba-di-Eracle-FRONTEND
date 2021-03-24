import React, { Component } from 'react';
import Orologio from '../utils/Orologio';


class Footer extends Component {

    render() {
        return (
            <div className="bg-dark" style={{ position:"fixed", bottom:"0px", width:"100%", height:"5%", color: "#b30000", paddingTop:"0.5%" }}>
                <div className="row">
                    <div className="col-sm-4">
                        <b>SOCIAL</b>
                    </div>
                    <div className="col-sm-4">
                        <b>CREDITS</b>
                    </div>
                    <div className="col-sm-4" align="right">
                        <Orologio/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;