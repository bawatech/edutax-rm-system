import { Layout, UserLayout } from '../layouts/Layout';
import './style.css';
import CarouselImg from '../../assets/images/mobilebg.png'
import { Button } from '../../components/Button';
import RefundImg from '../../assets/images/refund.png'
import WwoImg1 from '../../assets/images/wwo1.jpg'
import WwoImg2 from '../../assets/images/business.jpg'
import WwoImg3 from '../../assets/images/accounting.jpg'
import WwoImg4 from '../../assets/images/payroll.jpg'
import WwoImg5 from '../../assets/images/incorp.jpg'
import TaxFillingImg from '../../assets/images/tax-filing.jpg'
import { FcCheckmarkIcon} from '../../components/Icon';
import { useNavigate } from 'react-router-dom';

const Home = () =>{

    return<Layout width="100%">
        <Carousel2 />
        {/* <Services 
            title="Unlock Your Maximum Tax Refund"
            desc="Guaranteed Satisfaction or Your Money Back!"
            point1="Thousands of Automatic Calculations, Ensuring Your Maximum Tax Refund Every Time!"
            point2="Maximize Your Savings: Explore Our Innovative Tax-Saving Tools Today!"
            img={RefundImg}
        /> */}
        <WhatWeOffer />
        <ImgBgDivComponent />
        <Services 
            title="Experience the simplest tax filing process ever."
            point1="Cutting-edge AI technology drives our platform."
            point2="Import CRA slips or scan effortlessly."
            point3="Easy, step-by-step guidance."
            img={TaxFillingImg}
        />
    </Layout>
}

export default Home;

const Carousel2 = () =>{

    const navigate = useNavigate()

    return<div className="carousel2-section">
        <div className="carousel2-bg-div-abs"></div>
        <div className="carousel2-bg-neon-abs left"></div>
        <div className="carousel2-bg-neon-abs right"></div>

        <div className="carousel2-inner-section">
            <div className="carousel2-txt-content-div">
                <div className="">
                <h1>Unlock Secured & Easy Personal Tax Filing Process</h1>

                <h2>Now, file your personal income tax return from the comfort of your home, following the simple steps. Its Fast , Easy & Secured </h2>

                    {/* <p>We leverage the latest technologies and innovations to deliver cutting-edge solutions that streamline document processes and improve efficiency.</p> */}

                    <div className="carousel2-txt-content-btn-div">
                        <Button varient="small" background="var(--color-a)" title="Start Now" maxWidth="100%" onClick={()=>navigate('/login')} />
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
                    <ImgBgDivCard cardColor="red" count="1" desc="Get started by creating your account."/>
                    <ImgBgDivCard cardColor="blue" count="2" desc="Easily upload your tax documents for processing."/>
                    <ImgBgDivCard cardColor="green" count="3" desc="We will prepare your return and submit to CRA on your behalf"/>
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



const WhatWeOffer = (props) => {

    return<div className="whatWeOffer-section">
        <div className="whatWeOffer-inner-div">
            <h1>What We Offer</h1>

            <p>Whether you need help with personal tax preparation, corporate tax compliance, bookkeeping, or estate planning, Sukh Tax has the expertise and knowledge to meet your needs. We beleive in simplicity. Our services and our pricing are both transparent. We at Sukh Tax work to provide you with peace of mind, by providing you the services as per your needs.</p>
        
            <div className="whatWeOffer-cards">
                <WhatWeOfferCards 
                    img={WwoImg1}
                    title="Personal Income Tax"
                    desc=""
                    onClick={()=>alert("clicked")}
                />
                <WhatWeOfferCards 
                    img={WwoImg2}
                    title="Business & Corporate Tax"
                    desc="Starting at $499"
                    onClick={()=>alert("clicked")}
                />
                <WhatWeOfferCards 
                    img={WwoImg3}
                    title="Accounting and Bookkeeping"
                    desc="Starting at $250/month"
                    onClick={()=>alert("clicked")}
                />
                <WhatWeOfferCards 
                    img={WwoImg4}
                    title="Pay Roll"
                    desc=""
                    onClick={()=>alert("clicked")}
                />
                <WhatWeOfferCards 
                    img={WwoImg5}
                    title="Incorporation & Structuring"
                    desc="Starting at $320"
                    onClick={()=>alert("clicked")}
                />
            </div>
            
        </div>
    </div>
}

const WhatWeOfferCards = (props) =>{

    return<div className="whatWeOfferCards-section" onClick={props?.onClick}>
        <div className="whatWeOfferCards-img-div">
            <div className="whatWeOfferCard-img-abs-div">
                <img src={props?.img}/>
            </div>
        </div>
        <div className="whatWeOfferCard-txt-div">
            <h2>{props?.title}</h2>

            <p>{props?.desc}</p>

            <Button varient="small outlined" title="Call us to Learn more" onClick={props?.onClick}/>
        </div>
    </div>
}