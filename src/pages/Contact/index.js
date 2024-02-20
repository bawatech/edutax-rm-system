import { Button } from '../../components/Button';
import { Input, Textarea } from '../../components/Form';
import { Email, Location, Phone } from '../../components/Icon';
import './style.css';

const ContactUs = () => {

    return<div className="contact-section">
        <div className="contact-inner-section">
            <div className="contact-img-div">
                <img src={ContactImg}/>
                
                <ul>
                    <li><Location /> <p>Abcd Road, Ontario, Canada</p></li>
                    <li><Phone /> <p>9876543210</p></li>
                    <li><Email /> <p>example@gmail.com</p></li>
                </ul>
            </div>
            <div className="contact-form-div">
                <h1>Get In Touch</h1>
                <br/>
                <Input
                    label="Email"
                    name="email"
                    value=""
                    handleChange=""
                />
                <Input 
                    label="Subject"
                    name="subject"
                    value=""
                    handleChange=""
                />
                <Textarea 
                    label="Message"
                    name="message"
                    value=""
                    handleChange=""
                />
                <Button title="Submit" varient="small" background="var(--sec-color)"/>
            </div>
        </div>
    </div>
}

export default ContactUs;