import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div style={{ position:"fixed", bottom:"0px", width:"100%", height:"5%", backgroundColor: "red", paddingTop:"0.5%" }}>
                <div className="row">
                    <div className="col-sm-4">
                        <b>SOCIAL</b>
                    </div>
                    <div className="col-sm-4">
                        <b>CREDITS</b>
                    </div>
                    <div className="col-sm-4">
                        <b>OROLOGIO</b>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;