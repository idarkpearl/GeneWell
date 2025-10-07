
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface ContactInfoCardProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    iconBgColor: string;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ icon, title, children, iconBgColor }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${iconBgColor}`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="text-gray-600 mt-2">{children}</div>
    </div>
);

interface FaqItemProps {
    question: string;
    children: React.ReactNode;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-xl">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800">
                <span>{question}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && <div className="px-5 pb-5 text-gray-600">{children}</div>}
        </div>
    );
};


const ContactPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic
        console.log("Form submitted");
    }

    return (
        <div className="bg-brand-gray">
            <Header />
            <main>
                <section className="bg-gradient-to-b from-blue-50 to-brand-gray py-20 text-center">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Get in Touch</h1>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Have questions about genetic counseling? Our team is here to help you on your health journey.</p>
                    </div>
                </section>

                <section className="py-20 -mt-16">
                    <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
                        <ContactInfoCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} title="Email Us" iconBgColor="bg-blue-500">
                            <a href="mailto:support@genewell.com" className="text-blue-600 hover:underline">yashsehgal251103@gmail.com</a>
                            <p className="text-sm">We reply within 24 hours</p>
                        </ContactInfoCard>
                        <ContactInfoCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>} title="Call Us" iconBgColor="bg-purple-500">
                            <p>+91 8750114909</p>
                            <p className="text-sm">Mon-Fri 9AM-5PM IST</p>
                        </ContactInfoCard>
                        <ContactInfoCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} title="Visit Us" iconBgColor="bg-green-500">
                            <p>Sharda University</p>
                            <p className="text-sm">Greater Noida, Uttar Pradesh</p>
                        </ContactInfoCard>
                    </div>
                </section>
                
                <section className="pb-20">
                    <div className="container mx-auto px-6">
                        <div className="bg-white p-8 rounded-2xl shadow-lg grid md:grid-cols-2 gap-12">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
                                    <p className="text-gray-600 mt-1">Fill out the form below and we'll get back to you as soon as possible.</p>
                                </div>
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" id="fullName" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                                    <input type="tel" id="phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="+1 (555) 123-4567" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <select id="subject" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white">
                                        <option>Select a subject</option>
                                        <option>General Inquiry</option>
                                        <option>Technical Support</option>
                                        <option>Partnership</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Tell us how we can help..."></textarea>
                                </div>
                                <button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                    Send Message
                                </button>
                            </form>
                            <div className="flex flex-col">
                                <img src="https://picsum.photos/seed/support/600/400" alt="Support agent" className="rounded-2xl object-cover h-64 w-full" />
                                <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-2xl -mt-10 z-10 shadow-lg">
                                    <h3 className="text-xl font-bold mb-4">Why Contact Us?</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Get personalized genetic counseling advice</span></li>
                                        <li className="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Learn about our AI-powered risk assessments</span></li>
                                        <li className="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Discuss privacy and data security</span></li>
                                        <li className="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Schedule a consultation with our team</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Frequently Asked Questions</h2>
                            <p className="text-gray-600 mt-2 max-w-xl mx-auto">Quick answers to common questions</p>
                        </div>
                        <div className="max-w-3xl mx-auto space-y-4">
                            <FaqItem question="How secure is my genetic data?">All genetic data is encrypted end-to-end and stored securely. We are HIPAA and GDPR compliant.</FaqItem>
                            <FaqItem question="Do you share data with insurance companies?">No. We never share your data with third parties without your explicit consent.</FaqItem>
                            <FaqItem question="How accurate are the AI risk assessments?">Our AI models have 99.9% accuracy, validated against clinical genetic counseling standards.</FaqItem>
                            <FaqItem question="Can I speak with a human genetic counselor?">Yes! We offer telehealth consultations with licensed genetic counselors.</FaqItem>
                        </div>
                    </div>
                </section>

                 <section className="py-20 bg-brand-gray">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Ready to Get Started?</h2>
                        <p className="text-gray-600 mt-2 mb-8">Begin your genetic health journey today with our AI-powered counseling platform</p>
                        <a href="#" className="bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:opacity-90 transition-opacity">
                            Start Free Consultation
                        </a>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;
