import { Layout, UserLayout } from '../layouts/Layout';
import './style.css';
import CarouselImg from '../../assets/images/carousel3.jpg'
import { Button } from '../../components/Button';
import { Container } from '../../components/Form';

const Home = () =>{

    return<Layout width="100%">
        <Carousel />
    </Layout>
}

export default Home;

const Carousel = () =>{

    return<div className="carousel-section">
        <div className="carousel-inner-section-abs">
            <img src={CarouselImg} />
        </div> 
        <div className="carousel-bg-div-abs"></div>

        <div className="carousel-txt-content-div">
            <div className="">
                <h1>Unlock Tax Efficiency</h1>

                <h2>Explore Our Expert Document Checking Services!</h2>

                <p>We leverage the latest technologies and innovations to deliver cutting-edge solutions that streamline document processes and improve efficiency.</p>

                <div className="carousel-txt-content-btn-div">
                    <Button varient="small light" title="Login" maxWidth="100%"/>
                    <Button varient="small light-outlined" title="Upload Document" maxWidth="100%"/>
                </div>
                
            </div>
        </div> 
    </div>
}