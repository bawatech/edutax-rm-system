import { Layout, UserLayout } from '../layouts/Layout';
import './style.css';
import CarouselImg from '../../assets/images/mobilebg.png'
import { Button } from '../../components/Button';
import RefundImg from '../../assets/images/refund.png'
import TaxFillingImg from '../../assets/images/tax-filing.jpg'
import {Facebook, FcCheckmarkIcon, Insta, Twitter } from '../../components/Icon';
import { NavLink } from 'react-router-dom';

const Home = () =>{

    return<Layout width="100%">
        <Carousel2 />
        <Services 
            title="Unlock Your Maximum Tax Refund"
            desc="Guaranteed Satisfaction or Your Money Back!"
            point1="Thousands of Automatic Calculations, Ensuring Your Maximum Tax Refund Every Time!"
            point2="Maximize Your Savings: Explore Our Innovative Tax-Saving Tools Today!"
            img={RefundImg}
        />
        <ImgBgDivComponent />
        <Services 
            title="Experience the simplest tax filing process ever."
            point1="Cutting-edge AI technology drives our platform."
            point2="Import CRA slips or scan effortlessly."
            point3="Easy, step-by-step guidance."
            img={TaxFillingImg}
        />
        <Footer>
            <FooterColumn 
                title="Company"

                point1="About Us"
                point2="Service"
            />

            <FooterColumn 
                title="Support"

                point1="Help"
                point2="Tweet Us"
            />

            <FooterColumn 
                title="Links"

                point1="Services"
                point2="Login"
                point3="SignUp"
            />

            <FooterColumn 
                title="Contact Us"

                point1="Abcd,Hill Road, Ontario, Canada"
                point2="9876543210"
                point3="example@example.com"
            />
        </Footer>
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

const Carousel2 = () =>{

    return<div className="carousel2-section">
        <div className="carousel2-bg-div-abs"></div>
        <div className="carousel2-bg-neon-abs left"></div>
        <div className="carousel2-bg-neon-abs right"></div>

        <div className="carousel2-inner-section">
            <div className="carousel2-txt-content-div">
                <div className="">
                    <h1>Unlock Tax Efficiency</h1>

                    <h2>Explore Our Expert Document Checking Services!</h2>

                    <p>We leverage the latest technologies and innovations to deliver cutting-edge solutions that streamline document processes and improve efficiency.</p>

                    <div className="carousel2-txt-content-btn-div">
                        <Button varient="small" background="var(--color-a)" title="Login" maxWidth="100%"/>
                        {/* <Button varient="small light-outlined" title="Upload Document" maxWidth="100%"/> */}
                    </div>
                    
                </div>
            </div> 
            <div className="carousel2-img-div">
                <div className="carousel2-img-div-abs">
                    <img src={CarouselImg} />
                </div> 
            </div>
            
        </div>

       
    </div>
}

const Services = (props) =>{

    return<div className="services-section">
        <div className="services-inner-section">
            <div className="services-txt">
                <h1>{props?.title}</h1>

                {props?.desc && <h2>{props?.desc}</h2>}

                <ul>
                    <li><FcCheckmarkIcon/> <p>{props?.point1}</p></li>
                    <li><FcCheckmarkIcon/> <p>{props?.point2}</p></li>
                    {props?.point3 && <li><FcCheckmarkIcon/> <p>{props?.point3}</p></li>}
                </ul>
            </div>
            <div className="services-img">
                <div className="">
                    <img src={props?.img} />
                </div>
            </div>
        </div>
    </div>
}

const ImgBgDivComponent = () => {

    return<div className="imgBgDiv-section">
        <div className="imgBgDiv-inner-section">
            <div className="imgBgDiv-bg-abs"></div>
            <div className="imgBgDiv-bg-abs-img">
            </div>

            <div className="imgBgDiv-content-div">
                <div>
                    <h1>Effortless, Swift, and Precise: Your Tax Journey Made Simple!</h1>
                    <br/>
                    <p>Experience hassle-free tax filing with our intuitive application. Say goodbye to complexity and paperwork, and focus on what truly matters in your life.</p>
                </div>
                
                <div className="imgBgDiv-cards">
                    <ImgBgDivCard cardColor="red" count="1" desc="Answer a few basic questions"/>
                    <ImgBgDivCard cardColor="blue" count="2" desc="Import your tax slips & maximize your refund"/>
                    <ImgBgDivCard cardColor="green" count="3" desc="NETFILE your return directly to CRA"/>
                </div>
            </div>
        </div>
    </div>
}

const ImgBgDivCard = (props) => {
    
    return<div className={`imgBgDivCard-section ${props?.cardColor}`}>
        <span>{props?.count}</span>

        <h3>{props?.desc}</h3>
    </div>
}



const Footer = ({children}) => {

    return<div className="footer-section">
        <div className="footer-inner-section">
            <div className="footer-column logo-column">
                <h1>Edutax</h1>

                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                
                <ul>
                    <li><NavLink><Insta /></NavLink></li>
                    <li><NavLink><Facebook /></NavLink></li>
                    <li><NavLink><Twitter /></NavLink></li>
                </ul>
            </div>
            {children}
        </div>
    </div>
}

const FooterColumn = (props) => {

    return<div className="footer-column">
        <h3>{props?.title}</h3>
        
        <ul>
            <li><NavLink>{props?.point1}</NavLink></li>
            {props?.point2 && <li><NavLink>{props?.point2}</NavLink></li>}
            {props?.point3 && <li><NavLink>{props?.point3}</NavLink></li>}
            {props?.point4 && <li><NavLink>{props?.point4}</NavLink></li>}
        </ul>
    </div>
}