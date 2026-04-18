import React, { useState } from 'react';
import '../Css/FAQ.css';

const faqData = [
  {
    question: "How do I order food in Bahir Dar?",
    answer:
      "Simply browse restaurants, choose your favorite meals, add them to your cart, and proceed to checkout. Your food will be delivered to your location in Bahir Dar."
  },
  {
    question: "Which areas do you deliver to in Bahir Dar?",
    answer:
      "We deliver across most areas in Bahir Dar including city center, universities, hotels, and nearby neighborhoods depending on restaurant coverage."
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes between 20–40 minutes depending on the restaurant, distance, and traffic conditions."
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept cash on delivery, Telebirr payments, and card payments for a smooth ordering experience."
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes! After placing an order, you can track its status in real time from preparation to delivery."
  },
  {
    question: "What if my food arrives late or incorrect?",
    answer:
      "If there is any issue with your order, you can contact our support team immediately for assistance, refund, or replacement."
  },
  {
    question: "Do restaurants have minimum order amounts?",
    answer:
      "Some restaurants may have a minimum order value depending on their policy, but many offer flexible ordering options."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">

      <div className="faq-header">
        <button id="faqq" className="got-questions-btn">
          GOT QUESTIONS?
        </button>

        <h1>
          Bahir Dar Food Delivery <span className="highlight">FAQ</span>
        </h1>

        <p className="subtitle">
          Everything you need to know about ordering food in Bahir Dar 🍽️
        </p>
      </div>

      <div className="faq-list">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <div className="faq-question-row">
              <div className="question-icon">?</div>
              <span className="question-text">{item.question}</span>

              <span className={`arrow ${activeIndex === index ? 'up' : 'down'}`}>
                {activeIndex === index ? '▲' : '▼'}
              </span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default FAQ;