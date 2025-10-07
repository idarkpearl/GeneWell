
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FamilyHistoryIcon, CounselingIcon, LongTermIcon, PrivacyIcon, RiskAnalysisIcon } from '../components/Icons';
import Carousel from '../components/Carousel';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    iconBgColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, iconBgColor }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-start">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${iconBgColor}`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
);

const HomePage: React.FC = () => {
    
    const features = [
        {
            icon: <FamilyHistoryIcon className="w-8 h-8 text-blue-600" />,
            title: "Family History & Risk Assessment",
            description: "Analyzes your family medical history to identify potential genetic conditions and calculate the probability of disease occurrence or recurrence.",
            color: "bg-blue-100",
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
            title: "Genetic Testing Interpretation",
            description: "Explains genetic test results in context of your personal and family history, detailing the reliability and limitations of the test.",
            color: "bg-purple-100",
        },
        {
            icon: <CounselingIcon className="w-8 h-8 text-green-600" />,
            title: "Counseling and Support",
            description: "Educates patients and families about medical facts, inheritance patterns, potential treatments, and preventive strategies.",
            color: "bg-green-100",
        },
        {
            icon: <LongTermIcon className="w-8 h-8 text-red-600" />,
            title: "Long-Term Contact & Follow-Up",
            description: "Provides ongoing support as individuals may need counseling and assistance at various points throughout their lives.",
            color: "bg-red-100",
        },
        {
            icon: <PrivacyIcon className="w-8 h-8 text-indigo-600" />,
            title: "Privacy and Confidentiality",
            description: "Ensures all genetic data is securely stored, encrypted, and only shared with the user. No third parties can access information without consent.",
            color: "bg-indigo-100",
        },
        {
            icon: <RiskAnalysisIcon className="w-8 h-8 text-teal-600" />,
            title: "AI-Powered Risk Analysis",
            description: "Leverages advanced AI models including DNABERT-2 and BioGPT to provide accurate, explainable genetic risk assessments.",
            color: "bg-teal-100",
        },
    ];

    const carouselItems=[{
        id:1,
        image:'/photos/sugar.jpg',
        title:'Type 2 Diabetes',
        description:'A condition where the body resists insulin or doesn’t make enough, causing high blood sugar. Genetics and lifestyle both contribute. High genetic risk increases chances 19x. Early testing and healthy habits can prevent or delay it.'
    },
    {
        id:2,
        image:'https://assets.telegraphindia.com/telegraph/72a6cb81-8e59-4d19-b8ef-79de56d4138c.jpg',
        title:'Hypertension (High Blood Pressure)',
        description:'Consistently high blood pressure increases risks of heart disease and stroke. Caused by genetics and lifestyle (salt, stress, obesity). Often no symptoms early on; regular checks and healthy lifestyle help control it.'
    },
    {
        id:3,
        image:'/pages/photos/cel.jpg',
        title:'Celiac Disease',
        description:'An autoimmune disorder triggered by gluten, damaging the small intestine. Strong genetic link (HLA genes). Causes digestive problems and fatigue. Gluten-free diet improves health.'  
    },
    {
        id:4,
        image:'/pages/photos/breast.jpg',
        title:'Breast Cancer',
        description:'Uncontrolled cell growth in breast tissue. Genetic mutations (BRCA1/2) greatly increase risk. Early testing enables monitoring and prevention options.'
    },
    {
        id:5,
        image:'/pages/photos/alz.jpg',
        title:'Alzheimer’s Disease',
        description:'Progressive brain disorder causing memory loss and decline. Genetics (APOE ε4) and lifestyle factors play roles. No cure, but early detection and healthy habits can delay it.'
    },
    {
        id:6,
        image:'/pages/photos/down.jpg',
        title:'Down Syndrome',
        description:'Genetic disorder from an extra chromosome 21, causing developmental delays and health issues. Usually not inherited. Early testing and support improve outcomes.'  
    },
    {
        id:7,
        image:'/pages/photos/asthma.jpg',
        title:'Asthma',
        description:'Chronic lung inflammation causing wheezing and breathlessness, triggered by allergens and irritants. Manageable with inhalers and avoiding triggers.'  
    }]

  return (
    <div className="bg-brand-gray">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-brand-gray py-20 md:py-28">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                    <span className="inline-block bg-blue-100 text-primary font-semibold px-4 py-1 rounded-full text-sm mb-4">
                        AI-Powered Genetic Counseling
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
                        Your Personalized Genetic Health Journey
                    </h1>
                    <p className="text-gray-600 text-lg mb-8">
                        Combining DNA analysis, lifestyle data, and family history into one comprehensive platform. Get explainable AI insights and personalized preventive care recommendations.
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                        <Link to="/genetic-counseling" className="bg-gradient-to-r from-primary to-secondary text-black font-bold px-8 py-3 rounded-lg shadow-lg hover:opacity-90 transition-opacity">
                            Start Genetic Counseling
                        </Link>
                        <Link to="/about" className="bg-white text-primary font-bold px-8 py-3 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors">
                            Learn More
                        </Link>
                    </div>
                    <div className="mt-12 flex justify-center md:justify-start gap-8 text-gray-700">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-primary">99.9%</p>
                            <p className="text-sm">Accuracy</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-primary">50K+</p>
                            <p className="text-sm">Patients</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-primary">24/7</p>
                            <p className="text-sm">Support</p>
                        </div>
                    </div>
                </div>
                <div>
                    <img src="https://www.pharmaceutical-technology.com/wp-content/uploads/sites/24/2021/06/shutterstock_1669326868.jpg" alt="DNA Strand" className="rounded-3xl shadow-2xl" />
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Features & Functionalities</h2>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Comprehensive genetic counseling services powered by cutting-edge AI technology</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard 
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            iconBgColor={feature.color}
                        />
                    ))}
                </div>
            </div>
        </section>
        <Carousel items={carouselItems}/> 

        {/* CTA Section */}
        <section className="py-20">
            <div className="container mx-auto px-6">
                <div className="bg-gradient-to-r from-primary to-secondary text-white p-12 rounded-3xl text-center shadow-xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Genetic Health Journey?</h2>
                    <p className="mb-8 max-w-xl mx-auto">Get personalized genetic counseling and risk assessments powered by AI</p>
                    <Link to="/genetic-counseling" className="bg-white text-primary font-bold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
                        Start Genetic Counseling Now
                    </Link>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
