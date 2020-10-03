import React from 'react';
import '../../css/epinasa.css'

import NasaLogo from '../../assets/nasa.png'
import { Dimmer, Loader } from 'semantic-ui-react'
import StarfieldAnimation from 'react-starfield-animation'

import Carousel from 'react-spring-3d-carousel';
import { config } from "react-spring";

import Axios from 'axios';

export default class Earth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: 0,
            slides: [],
            goToSlide: 0,
            offsetRadius: 2,
            showNavigation: false,
            config: config.gentle,
            photos: [],
            error: 0,
            long: "",
            lat: ""
        }
    }
    // https://api.nasa.gov/planetary/earth/imagery?lon=48.858370&lat=2.294481&dim=0.15&api_key=e6x0rCZziIrfZU7tG0fnnWwaeTyjS4sRCkzt46vz
    // https://api.nasa.gov/planetary/earth/imagery?lon=2.001031&lat=48.933969&dim=0.15&api_key=DEMO_KEY

    componentDidMount() {

    }
    changeLong = (long) => this.setState({long: long});
    changeLat = (lat) => this.setState({lat: lat});
    async getMyHomeImg(lat, lon) {
        this.setState({loading: 1});
        console.log(`https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&dim=0.15&api_key=e6x0rCZziIrfZU7tG0fnnWwaeTyjS4sRCkzt46vz`)
        Axios.get(`https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&dim=0.15&api_key=e6x0rCZziIrfZU7tG0fnnWwaeTyjS4sRCkzt46vz`, {
        }).then((response) => {
            if (response.status === 200) {
                this.setState(
                    {
                        error: 0, 
                        slides: [
                            {
                                key: 1, 
                                content: <img src={`https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&dim=0.15&api_key=e6x0rCZziIrfZU7tG0fnnWwaeTyjS4sRCkzt46vz`} alt="your home"/>
                            }
                        ]
                    }
                );
            }
        }).catch((error) => {
            console.log(error);
        })
        this.setState({loading: 0});
    }
    renderLoaded() {
        return (
            <div className="globalContainer">
                <StarfieldAnimation
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%'
                    }}
                />
                <div className="headerBox">
                    <img src={NasaLogo} className="imgGlobalLogo" style={{opacity: `${this.state.opacityLogo}%`}} alt="nasa"/>
                </div>
                <div className="contentBox">
                    <Carousel
                        slides={this.state.slides}
                        goToSlide={this.state.goToSlide}
                        offsetRadius={this.state.offsetRadius}
                        showNavigation={this.state.showNavigation}
                        animationConfig={this.state.config}
                    />
                </div>
                <div className="boxLonLat">
                    <div className="boxLonLatDesign">
                        <div className="boxLonLatText">How do astronauts see us?</div>
                        <div className="boxLonLatInput">
                            <div class="ui mini input">
                                <input type="text" placeholder="Latitude" value={this.state.lat} onChange={(event) => this.changeLat(event.target.value)}/>
                            </div>
                            <div class="ui mini input">
                                <input type="text" placeholder="Longitude" value={this.state.long} onChange={(event) => this.changeLong(event.target.value)}/>
                            </div>
                        </div>
                        <div className="boxLonLatAccept">
                        <button class="ui right labeled icon button" onClick={() => this.getMyHomeImg(this.state.lat, this.state.long)}>
                            <i class="right arrow icon"></i>
                            Search
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    renderLoading() {
        return (
            <div className="globalContainer">
                <StarfieldAnimation
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%'
                    }}
                />
                <a href="/">
                    <img src={NasaLogo} className="imgGlobalLogoLoading" style={{opacity: `${this.state.opacityLogo}%`}} alt="nasa"/>
                </a>
                <Dimmer active inverted>
                    <Loader/>
                </Dimmer>
            </div>
        )
    }
    render() {
        if (this.state.loading === 1)
            return this.renderLoading();
        return this.renderLoaded();
    }
}
