import React from 'react';
import '../../css/epinasa.css'

import NasaLogo from '../../assets/nasa.png'
import StarfieldAnimation from 'react-starfield-animation'

export default class Root extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: 0,
            opacityLogo: 100,
            links: [
                {
                    title: "MARS",
                    image: "https://media.lesechos.com/api/v1/images/view/5d37efb6d286c22f45325cf4/1280x720/0601622045503-web-tete.jpg",
                    redirect: "/mars"
                },
                {
                    title: "EARTH",
                    image: "https://www.gstatic.com/earth/social/00_generic_facebook-001.jpg",
                    redirect: "/earth"
                },
            ]
        }
    }
    componentDidMount() {

    }
    render() {
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
                    {this.state.links.map((element, index) =>
                    <div className="boxItemGlobal">
                        <a href={element.redirect} key={index}>
                            <div className="boxItemDesign">
                                <img src={element.image} style={{height: "216px", width: "435px", borderRadius: "20px"}} alt="Logo"/>
                                <div className="boxItemRectangle">
                                    {element.title}
                                </div>
                            </div>
                        </a>
                    </div>
                    )}
                    <div></div>
                </div>
                <div className="headerBox">
                    epitek X nasa
                </div>

            </div>
        );
    }
}
