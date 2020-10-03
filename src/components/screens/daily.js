import React from 'react';
import '../../css/epinasa.css'

import NasaLogo from '../../assets/nasa.png'
import { Dimmer, Loader } from 'semantic-ui-react'
import StarfieldAnimation from 'react-starfield-animation'

import Carousel from 'react-spring-3d-carousel';
import { config } from "react-spring";

import Axios from 'axios';

export default class Daily extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: 1,
            slides: [],
            goToSlide: 0,
            offsetRadius: 2,
            showNavigation: true,
            config: config.gentle,
        }
    }
    async componentDidMount() {
        await Axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=e6x0rCZziIrfZU7tG0fnnWwaeTyjS4sRCkzt46vz", {

        }).then((response) => {
            for (let i = 0; i < 11; i++) {
                var random = Math.floor(Math.random() * Math.floor(response.data.photos.length));
                this.state.slides.push({
                    key: i + 1,
                    content: <img src={response.data.photos[random].img_src} alt={random} />
                })
            }
        }).catch((error) => {
            console.log(error);
        })
        this.setState({loading: 0});
    }
    testFunc() {
        for (let i = 0; i < 11; i++) {
            // console.log(i, response.data.photos[i].img_src);
            // this.state.steak.push({
            //     key: i,
            //     content: response.data.photos[i].img_src
            // });
            // i++;
        }
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
                    <a href="/conte">
                        <img src={NasaLogo} className="imgGlobalLogo" style={{opacity: `${this.state.opacityLogo}%`}} alt="nasa"/>
                    </a>
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
                <div className="boxEmpty">
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
                <img src={NasaLogo} className="imgGlobalLogoLoading" style={{opacity: `${this.state.opacityLogo}%`}} alt="nasa"/>
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
