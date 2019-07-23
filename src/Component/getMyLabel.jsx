import React, { Component } from 'react'
import GetMyBox from './GetMyBox';
import './Pwa.css';

class GetMyLabel extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <br></br>
                {
                    (this.props.Domain) ? 
                    <div className="row">
                            <div className="col-xl-4 col-md-5 col-lg-2 text-left"> {this.props.Domain.name} </div>
                            <GetMyBox value={this.props.Domain.inputValue} />
                            <div className="col-xl-2 col-md-2 col-lg-2 text-right"> {this.props.Domain.percent} </div>
                    </div>
                    : 
                    <div className="row">
                        <div className="col-xl-4 col-lg-5 col-md-2 text-left"> {this.props.Channel.name} </div>
                        <GetMyBox value={this.props.Channel.inputValue} />
                        <div className="col-xl-2 col-lg-2 col-md-2 text-right "> {this.props.Channel.percent} </div>
                    </div>
                }
                
            </div>
        )
    }
}

export default GetMyLabel;