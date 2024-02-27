import { Button } from '../../components/Button';
import { Input, Textarea } from '../../components/Form';
import { Email, Location, Phone } from '../../components/Icon';
import ContactImg from '../../assets/images/contact.png'
import './style.css';
import { Layout } from '../layouts/Layout';
import { useState } from 'react';

const ContactUs = () => {
    const [payload, setPayload] = useState({})

    const handleChange = (name, value) => {
        setPayload({
            ...payload,
            [name]: value
        })
    }

    return<Layout>
        <div className="contact-section">
        <div className="contact-inner-section">
            <div className="contact-img-div">
                <img src={ContactImg}/>
                
                <ul>
                    <li><Location /> <p>Unit 206- 9886 Torbram Rd <br/>
                                        Bramtpon - ON <br/>
                                        L6S 3 L9 </p></li>
                    <li><Phone /> <p>905-790-6200</p></li>
                    <li><Email /> <p>contact@edutax.ca</p></li>
                </ul>
            </div>
            <div className="contact-form-div">
                <h1>Get In Touch</h1>
                <br/>
                <Input
                    label="Email"
                    name="email"
                    value={payload.email}
                    handleChange={handleChange}
                />
                <Input 
                    label="Subject"
                    name="subject"
                    value={payload?.subject}
                    handleChange={handleChange}
                />
                <Textarea 
                    label="Message"
                    name="message"
                    value={payload?.message}
                    handleChange={handleChange}
                />
                <Button title="Submit" varient="small" background="var(--sec-color)"/>
            </div>
        </div>
    </div>
    </Layout>
}

export default ContactUs;