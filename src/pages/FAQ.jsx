import { useState } from 'react';
import { ChevronUp, ChevronDown, MessageCircle } from 'lucide-react';
import PropTypes from 'prop-types';

const FAQ = ({ 
  faqData = [],
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our platform",
  onContactSupport,
  className = ''
}) => {
  const [openItems, setOpenItems] = useState(new Set());

  const defaultFaqData = [
    {
      id: 1,
      question: "How do I get started with the platform?",
      answer: "Getting started is easy! Simply create an account, complete your profile, and you'll have access to all features. Our onboarding guide will walk you through the key features to help you get the most out of the platform."
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment system."
    },
    {
      id: 3,
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period, and you won't be charged for the following period."
    },
    {
      id: 4,
      question: "Do you offer customer support?",
      answer: "Absolutely! We provide 24/7 customer support through live chat, email, and phone. Our support team is always ready to help you with any questions or issues you might have."
    },
    {
      id: 5,
      question: "Is my data secure?",
      answer: "Data security is our top priority. We use enterprise-grade encryption, regular security audits, and comply with all major data protection regulations including GDPR and CCPA to ensure your information is safe."
    }
  ];

  const questions = faqData.length > 0 ? faqData : defaultFaqData;

  const toggleItem = (id) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(id);
    }
  };

  const handleContactSupport = () => {
    if (onContactSupport) {
      onContactSupport();
    } else {
     
      console.log('Contact support clicked');
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      </div>

    
      <div className="space-y-4">
        {questions.map(({ id, question, answer }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-shadow hover:shadow-md"
          >
            <button
              onClick={() => toggleItem(id)}
              onKeyDown={(e) => handleKeyDown(e, id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              aria-expanded={openItems.has(id)}
              aria-controls={`faq-answer-${id}`}
            >
              <h3 className="font-semibold text-gray-900 pr-4 flex-1">
                {question}
              </h3>
              <div className="flex-shrink-0">
                {openItems.has(id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 transition-transform" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 transition-transform" />
                )}
              </div>
            </button>
            
            {openItems.has(id) && (
              <div 
                id={`faq-answer-${id}`}
                className="px-6 pb-4 border-t border-gray-100 animate-fadeIn"
              >
                <p className="text-gray-700 pt-4 leading-relaxed">
                  {answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      
      <div className="mt-12 text-center bg-gray-50 rounded-lg p-8">
        <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Still have questions?
        </h3>
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <button 
          onClick={handleContactSupport}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <MessageCircle className="w-4 h-4" />
          Contact Support
        </button>
      </div>
    </div>
  );
};

FAQ.propTypes = {
  faqData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired
    })
  ),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onContactSupport: PropTypes.func,
  className: PropTypes.string
};

export default FAQ;