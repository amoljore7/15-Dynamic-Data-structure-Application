import React, { Component } from 'react'
import './Pwa.css';

class GetMyBox extends Component {
    constructor(props) {
        super(props)
        this.empData = this.empData.bind(this);
    }

    empData(value) {
        var widthBoxA = 100;
        var inputValue = value;
        var total = 100;
        var widthDiv1 = widthBoxA;
        var midpoint = widthDiv1 / 2;
        var widthDiv2 = (inputValue * midpoint) / total;
        var left = midpoint;
        if (inputValue < 0) {
            widthDiv2 = widthDiv2 * (-1);
            left = midpoint - widthDiv2;
        }


        if(widthDiv2 == 50){
            widthDiv2 = 48;
        }

        return <div className="box-a" style={{ width: widthBoxA + 'px' }}>
            {
                (value > 0) ? <div className="box-b" style={{ width: widthDiv2 + 'px', marginLeft: left + 'px', backgroundColor: 'green' }}></div> : <div className="box-b" style={{ width: widthDiv2 + 'px', marginLeft: left + 'px', backgroundColor: 'red' }}></div>
            }
        </div>
    }
    render() {
        return (
            <div className="col-xl-4 col-md-5 col-lg-5">
                {
                    this.empData(this.props.value)
                }
            </div>
        )
    }
}

export default GetMyBox;