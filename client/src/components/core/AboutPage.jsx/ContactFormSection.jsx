import ContactForm from "../../common/ContactForm"

const ContactFormSection = () => {
    return (
        <div className="mx-auto text-center">
            <h1 className="text-4xl font-bold">Get in Touch</h1>
            <p className="text-richblack-300 text-base">We'd love to here for you, Please fill out this form.</p>
            <div className="mt-16">
                <div className="w-[550px] mx-auto">

                    <ContactForm />
                </div>
            </div>
        </div>
    )
}

export default ContactFormSection