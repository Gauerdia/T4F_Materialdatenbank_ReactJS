import React, {useRef} from 'react';
import emailjs from "@emailjs/browser";
import emailkey from "../emailkey";

import '../styles/DetailsPage.css';

function ContactCreatorPage(){


    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(emailkey.SERVICE_ID, emailkey.TEMPLATE_ID, form.current, emailkey.USER_ID)
            .then((result) => {
                alert("E-Mail wurde erfolgreich versendet!")
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    return(
        <div>
            {/*KONTAKTFORMULAR AT THE BOTTOM*/}

            <div>
                <p className="publicDetailsHeadline">
                    Verfassen Sie eine E-Mail an den Ersteller
                </p>
            </div>

            <div className="DetailsDiv">
                <div>
                    <form ref={form} onSubmit={sendEmail}>
                        <label className="publicDetailContactText">Ihr Name</label>
                        <input type="text" name="from_name" />
                        <label className="publicDetailContactText">Ihre E-Mail-Adresse</label>
                        <input type="email" name="from_email" />
                        <label className="publicDetailContactText">Ihre Nachricht</label>
                        <textarea name="message" />
                        <input type="submit" value="Abschicken" className="publicDetailContactButton" />
                    </form>
                </div>
            </div>

        </div>
    );
}
export default ContactCreatorPage;