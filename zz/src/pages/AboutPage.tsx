
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CheckListItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full text-white flex items-center justify-center mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
        </div>
        <div>
            <h4 className="font-bold text-gray-800">{title}</h4>
            <p className="text-gray-600">{children}</p>
        </div>
    </div>
);

const AboutPage: React.FC = () => {
    return (
        <div className="bg-white">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-primary to-secondary text-white text-center py-20 md:py-28">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold">Innovation & Uniqueness</h1>
                        <p className="text-lg mt-4 max-w-3xl mx-auto">GeneWell is AI-based platform that integrates genomic data, family history, and lifestyle factors.</p>
                    </div>
                </section>

                {/* What Makes Us Different Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Makes Us Different</h2>
                            <p className="text-gray-600 mb-8">We're pioneering a new approach to genetic counseling that puts patients first.</p>
                            <div className="space-y-6">
                                <CheckListItem title="Holistic">Combines DNA + lifestyle + family history (not just DNA).</CheckListItem>
                                <CheckListItem title="Explainable">Shows why someone is at risk, not just a % score.</CheckListItem>
                                <CheckListItem title="Accessible">Affordable, regional languages; works in low-bandwidth areas.</CheckListItem>
                                <CheckListItem title="Future-Ready">We will build our own models + dedicated app for better accuracy.</CheckListItem>
                                <CheckListItem title="Actionable">Gives preventive steps & telehealth support, not just reports.</CheckListItem>
                            </div>
                        </div>
                        <div>
                            <img src="https://medicalbuyer.co.in/wp-content/uploads/2022/05/UP-govt-set-to-transform-health-sector-in-2-years.jpg" alt="Abstract DNA visualization" className="rounded-3xl shadow-2xl" />
                        </div>
                    </div>
                </section>

                {/* Our Mission Section */}
                <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-20">
                    <div className="container mx-auto px-6 text-center">
                        <div className="inline-block p-4 border-2 border-primary rounded-full mb-4">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Mission</h2>
                        <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-lg">
                           AI to integrate complex genetic, lifestyle, and family data to provide personalized risk predictions and preventive recommendations, making genetic counseling accessible even in underserved areas
                        </p>
                    </div>
                </section>
                {/* Our Goal Section */}
                <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-20">
                    <div className="container mx-auto px-6 text-center">
                        <div className="inline-block p-4 border-2 border-primary rounded-full mb-4">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Goal</h2>
                        <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-lg">
                            The main goal is to solve the limited access to genetic counseling by using an AI-powered platform to integrate complex genetic, family history, and lifestyle data to provide personalized risk predictions and preventive steps , ultimately aiming to reduce mortality and healthcare costs from preventable hereditary diseases.
                        </p>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <p className="text-4xl md:text-5xl font-bold text-primary">99.9%</p>
                                <p className="text-gray-600 mt-2">Accuracy Rate</p>
                                <p className="text-sm text-gray-500">AI model precision</p>
                            </div>
                            <div>
                                <p className="text-4xl md:text-5xl font-bold text-primary">50K+</p>
                                <p className="text-gray-600 mt-2">Patients Helped</p>
                                <p className="text-sm text-gray-500">Across 20+ countries</p>
                            </div>
                            <div>
                                <p className="text-4xl md:text-5xl font-bold text-primary">15+</p>
                                <p className="text-gray-600 mt-2">Languages</p>
                                <p className="text-sm text-gray-500">Multilingual support</p>
                            </div>
                            <div>
                                <p className="text-4xl md:text-5xl font-bold text-primary">24/7</p>
                                <p className="text-gray-600 mt-2">Availability</p>
                                <p className="text-sm text-gray-500">AI counselor always ready</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;
