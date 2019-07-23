import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PwaPageAction from './PwaAction'
import APIConfig from '../../src/urls.json'
import { Offline, Online } from "react-detect-offline";
import GetMyLabel from './getMyLabel.jsx';
import './Pwa.css';

class Pwa extends Component {
    constructor() {
        super();
        this.state = {
            readyToAdd: false,
            successfullyInstalled: false,
            acceptedInstall: false,
            declinedInstall: false,

        };
        this.addToHome = this.addToHome.bind(this);
        this.shouldShowAddButton = this.shouldShowAddButton.bind(this);
        this.openWindowOrTab = this.openWindowOrTab.bind(this);
       
        this.getMyData = this.getMyData.bind(this);
        

    }
    componentDidMount = () => {
        this.getMyData()


        // check if user is already running app from home screen
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('App is already installed and running in standalone');
            this.setState({
                successfullyInstalled: true,
            });
        } else {
            window.addEventListener('beforeinstallprompt', e => {
                console.log('beforeinstallprompt has fired', e);
                // Prevent Chrome 67 and earlier from automatically showing the prompt
                e.preventDefault();
                // Stash the event so it can be triggered later.
                window.deferredPrompt = e;
                this.setState({
                    readyToAdd: true,
                });
            });
            // this event fires only when app is installed
            window.addEventListener('appinstalled', evt => {
                console.log('App was successfully installed');
                this.setState({
                    successfullyInstalled: true,
                });
            });
        }
    }
    getMyData() {

        fetch(APIConfig.configUrl.PWAData)
            .then(data1 => {
                return data1.json();
            })
            .then(data2 => {
                this.props.PwaPageDataInReduxStore(data2);
                // console.log(">>>CheckPoint>>>Json Stringify",JSON.stringify(data2));
            })
            .catch(error => console.log(error))
    }

    addToHome() {
        // Show the prompt
        let { deferredPrompt } = window;
        if (deferredPrompt) {
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                    this.setState({
                        acceptedInstall: true,
                    });
                } else {
                    console.log('User dismissed the A2HS prompt');
                    this.setState({
                        declinedInstall: true,
                    });
                }
                deferredPrompt = null;
            });
        }
    }
    shouldShowAddButton() {
        let shouldShow =
            this.state.readyToAdd &&
            !this.state.successfullyInstalled &&
            !this.state.acceptedInstall &&
            !this.state.declinedInstall;
        console.log('Should show add button', shouldShow);
        return shouldShow;
    }
    openWindowOrTab(url = window.location.href) {
        window.open(url, '_blank');
    }
  

    render() {
        const { Domain, Channel } = this.props.PwaPageData;
        return (
            <body>
                 
                <div className="container">
                        {this.shouldShowAddButton() ? (
                            <button onClick={this.addToHome}>
                                <h3 className="text-right text-success bg-dark">Install App</h3>
                            </button>
                        ) : null}
                         

                <div className="row"> 
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12  text-center text-white "><h1 className="display-5 font-weight-bold">TITLE GOES HERE</h1></div>
                </div><br></br>
                <div className="row"> 
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12  bg-white text-center text-body"><h1 className="display-5 font-weight-bold">ANNOUNCEMENTS GO HERE</h1></div>
                </div><br></br>
                <div className="row"> 
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12  bg-white text-center text-body"><h1 className="display-4 font-weight-bold">AVEDA TOTAL GLOBAL SALES <span className="text-success">+15%</span> </h1></div>
                </div><br></br>
                 
                <div className="row"> 
                        <div className="col-xl-5 col-lg-5 col-md-5 bg-white model-box1 text-center">
                            <h3 className="text-dark ">BY DOMAIN (-/+)</h3>
                            <hr></hr>
                            <div>
                                {
                                    (Domain && (Domain.length > 0)) ?

                                        <div className="col-lg-12">
                                            {
                                                Domain.map((item) => {
                                                return (
                                                        <GetMyLabel Domain={item} />
                                                )
                                            })
                                            }
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                        
                        <div className="col-xl-2 col-lg-2 col-md-2"></div>
                        
                        <div className="col-xl-5 col-lg-5 col-md-5  bg-white model-box2 text-center ">
                            <h3 className="text-dark ">BY CHANNEL (-/+)</h3>
                            <hr></hr>
                            <div>
                                {
                                    (Channel && (Channel.length > 0)) ?

                                    <div className="col-lg-12">
                                        {Channel.map((item) => {
                                            return (
                                                <span>
                                                    <GetMyLabel Channel={item} />
                                                </span>
                                            )
                                        })
                                        }
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>   
            </body>
        );
    }
}
function mapStateToProps(state) {
    return {
        PwaPageData: state.InsertReducer.data
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        PwaPageDataInReduxStore: PwaPageAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pwa);

