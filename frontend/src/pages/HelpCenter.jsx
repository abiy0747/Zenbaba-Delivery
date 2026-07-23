import React, { useEffect, useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaTelegram,
  FaBoxOpen,
  FaMoneyBillWave,
  FaMotorcycle,
  FaUserCog,
  FaGift,
  FaExclamationTriangle,
  FaInfoCircle,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import "../Css/HelpCenter.css";

function HelpCenter() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "Orders & Delivery",
      icon: <FaBoxOpen />,
      items: [
        {
          question: "How do I place an order?",
          answer:
            "Browse restaurants, choose your favorite meals, add them to your cart, and proceed to checkout.",
        },
        {
          question: "How do I track my order?",
          answer:
            "Open My Orders and select your active order to see live delivery tracking.",
        },
        {
          question: "My order is delayed.",
          answer:
            "Delivery time depends on restaurant preparation, traffic, and weather conditions.",
        },
        {
          question: "I received the wrong order.",
          answer:
            "Open your order details and report the issue within 24 hours.",
        },
        {
          question: "Some items are missing.",
          answer:
            "Use the Report Problem option in your order details page.",
        },
      ],
    },

    {
      category: "Payments & Refunds",
      icon: <FaMoneyBillWave />,
      items: [
        {
          question: "Cash on Delivery",
          answer:
            "Pay the driver when your order arrives.",
        },
        {
          question: "Online payment",
          answer:
            "Online payment will be available in a future version.",
        },
        {
          question: "Refunds",
          answer:
            "Refunds are reviewed after cancellation or delivery issues.",
        },
        {
          question: "Promo Codes",
          answer:
            "Apply promo codes during checkout before placing your order.",
        },
      ],
    },

    {
      category: "Driver & Delivery",
      icon: <FaMotorcycle />,
      items: [
        {
          question: "Driver can't find my address.",
          answer:
            "Keep your phone available. Drivers may call before arriving.",
        },
        {
          question: "Estimated delivery time",
          answer:
            "Delivery time depends on restaurant preparation and road traffic.",
        },
        {
          question: "Contact my driver",
          answer:
            "You can communicate with your driver while the order is active.",
        },
      ],
    },

    {
      category: "Account",
      icon: <FaUserCog />,
      items: [
        {
          question: "Change password",
          answer:
            "Go to Profile → Security.",
        },
        {
          question: "Manage addresses",
          answer:
            "Go to Profile → Delivery Addresses.",
        },
        {
          question: "Edit profile",
          answer:
            "Go to Profile → Settings.",
        },
      ],
    },

    {
      category: "Rewards",
      icon: <FaGift />,
      items: [
        {
          question: "Reward points",
          answer:
            "Earn points for every completed delivery.",
        },
        {
          question: "Free delivery",
          answer:
            "Watch for promotional events and special offers.",
        },
      ],
    },
  ];

  return (
    <div className="help-page">

      <div className="help-header">

        <h1>Help Center</h1>

        <p>
          Find answers to your questions and get support for your Zenbaba Delivery account.
        </p>

        <div className="search-box">

          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search help topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {faqs.map((section) => (
        <div className="help-section" key={section.category}>

          <h2>
            {section.icon}
            {section.category}
          </h2>

          {section.items
            .filter((item) =>
              item.question.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, index) => {
              const id = section.category + index;

              return (
                <div
                  key={id}
                  className="faq-card"
                >
                  <div
                    className="faq-question"
                    onClick={() =>
                      setOpenIndex(openIndex === id ? null : id)
                    }
                  >
                    <span>{item.question}</span>

                    {openIndex === id ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </div>

                  {openIndex === id && (
                    <div className="faq-answer">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}

        </div>
      ))}

     

      <div className="support-section">

        <h2>

          <FaPhone />

          Contact Support

        </h2>

        <div className="support-card">

          <div>

            <FaPhone className="support-icon" />

            <span>+251 912 345 678</span>

          </div>

          <div>

            <FaEnvelope className="support-icon" />

            <span>support@zenbaba.com</span>

          </div>

          <div>

            <FaTelegram className="support-icon" />

            <span>@ZenbabaSupport</span>

          </div>

          <div>

            🕒 Monday - Sunday | 8:00 AM - 10:00 PM

          </div>

        </div>

      </div>

      <div className="about-section">

        <h2>

          <FaInfoCircle />

          About Zenbaba

        </h2>

        <div className="about-card">

          <p>
            <strong>Version:</strong> 1.0.0
          </p>

          <p>
            <strong>Privacy Policy:</strong> Your information is securely protected.
          </p>

          <p>
            <strong>Terms & Conditions:</strong> By using Zenbaba Delivery you agree to our service policies.
          </p>

        </div>

      </div>

    </div>
  );
}

export default HelpCenter;