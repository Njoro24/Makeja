import { useState } from 'react';
import { ChevronUp, ChevronDown, MessageCircle } from 'lucide-react';
import PropTypes from 'prop-types';

const FAQ = ({
  faqData = [],
  title = "Student Hostels FAQ",
  subtitle = "Everything you need to know about booking and living in our hostels",
  onContactSupport,
  className = ''
}) => {
  const [openItems, setOpenItems] = useState(new Set());

  const defaultFaqData = [
    {
      id: 1,
      question: "How do I book a room in a hostel?",
      answer: "To book a room, sign up and complete your profile. Browse available hostels and click 'Book Now' to reserve your spot. You'll receive a confirmation via email."
    },
    {
      id: 2,
      question: "What documents do I need for booking?",
      answer: "You typically need a student ID or admission letter and a valid national ID. Each hostel might have specific requirements listed on their page."
    },
    {
      id: 3,
      question: "Can I cancel or change my booking?",
      answer: "Yes. You can cancel or modify your booking from your dashboard. Refunds depend on the hostel’s cancellation policy, so please check before booking."
    },
    {
      id: 4,
      question: "Are utilities and Wi-Fi included in the rent?",
      answer: "Most hostels include water, electricity, and Wi-Fi in the rent. Details can be found on each hostel’s listing page."
    },
    {
      id: 5,
      question: "Is there a curfew in hostels?",
      answer: "Some hostels have curfews for security reasons, while others offer 24/7 access. Check the 'House Rules' section of the hostel listing for details."
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
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="space-y-4">
        {questions.map(({ id, question, answer }) => (
          <div
            key={id}
            className="bg-[#1f1f1f] rounded-xl shadow-md border border-gray-700 overflow-hidden"
          >
            <button
              onClick={() => toggleItem(id)}
              onKeyDown={(e) => handleKeyDown(e, id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={openItems.has(id)}
              aria-controls={`faq-answer-${id}`}
            >
              <h3 className="font-semibold text-white pr-4 flex-1">
                {question}
              </h3>
              <div className="flex-shrink-0 text-gray-400">
                {openItems.has(id) ? <ChevronUp /> : <ChevronDown />}
              </div>
            </button>

            {openItems.has(id) && (
              <div
                id={`faq-answer-${id}`}
                className="px-6 pb-4 border-t border-gray-700 bg-[#252525]"
              >
                <p className="text-gray-300 pt-4 leading-relaxed">
                  {answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center bg-[#111111] rounded-lg p-8 border border-gray-800">
        <MessageCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">
          Still have questions?
        </h3>
        <p className="text-gray-400 mb-6">
          Can’t find what you’re looking for? Our support team is here to help.
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
