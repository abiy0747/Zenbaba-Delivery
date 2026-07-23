import React from "react";
import { Link } from "react-router-dom";
import {
  FaMotorcycle,
  FaStore,
  FaMoneyBillWave,
  FaMapMarkedAlt,
  FaClock,
  FaHeadset,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import "../Css/BecomePartner.css";

function BecomePartner() {
  return (
    <div className="partner-page">

      {/* ================= HERO ================= */}

      <section className="partner-hero">

        <div className="hero-content">

          <span className="hero-badge">
            ⭐ Join Ethiopia's Growing Delivery Platform
          </span>

          <h1>
            Become a
            <span> Zenbaba Partner</span>
          </h1>

          <p>
            Whether you're a restaurant owner looking for more customers
            or a driver ready to earn on your own schedule,
            Zenbaba helps you grow faster.
          </p>

          <div className="hero-buttons">

            <a href="#partner-options">
              <button className="gold-btn">
                Get Started
                <FaArrowRight />
              </button>
            </a>

            <button className="white-btn">
              Learn More
            </button>

          </div>

        </div>

        {/* <div className="hero-image">

          <div className="floating-card card-one">
            🏍️ Delivery
          </div>

          <div className="floating-card card-two">
            🍔 Restaurant
          </div>

          <div className="hero-circle"></div>

          <div className="hero-icon">
            🚀
          </div>

        </div> */}

      </section>

      {/* ================= PARTNER CARDS ================= */}

      <section
        className="partner-section"
        id="partner-options"
      >

        <h2>
          Choose Your Journey
        </h2>

        <p className="section-subtitle">
          Start earning or growing your business today.
        </p>

        <div className="partner-grid">

          {/* DRIVER */}

          <div className="partner-card">

            <div className="partner-icon">
              <FaMotorcycle />
            </div>

            <h3>Become a Driver</h3>

            <p>
              Deliver food, choose your own schedule,
              and earn money with every delivery.
            </p>

            <ul>

              <li>
                <FaCheckCircle />
                Flexible working hours
              </li>

              <li>
                <FaCheckCircle />
                Weekly earnings
              </li>

              <li>
                <FaCheckCircle />
                Live navigation
              </li>

              <li>
                <FaCheckCircle />
                Performance bonuses
              </li>

            </ul>

            <Link
              to="/driver-application"
              className="apply-btn"
            >
              Apply Now
              <FaArrowRight />
            </Link>

          </div>

          {/* RESTAURANT */}

          <div className="partner-card">

            <div className="partner-icon">
              <FaStore />
            </div>

            <h3>Register Restaurant</h3>

            <p>
              Expand your business by serving thousands
              of hungry customers through Zenbaba.
            </p>

            <ul>

              <li>
                <FaCheckCircle />
                Reach more customers
              </li>

              <li>
                <FaCheckCircle />
                Online ordering
              </li>

              <li>
                <FaCheckCircle />
                Delivery support
              </li>

              <li>
                <FaCheckCircle />
                Sales dashboard
              </li>

            </ul>

            <Link
              to="/restaurant-application"
              className="apply-btn"
            >
              Register Now
              <FaArrowRight />
            </Link>

          </div>

        </div>

      </section>

      {/* ================= WHY ================= */}

      <section className="why-partner">

        <h2>
          Why Partner With Zenbaba?
        </h2>

        <div className="why-grid">

          <div className="why-card">

            <FaMoneyBillWave />

            <h4>Earn More</h4>

            <p>
              Competitive earnings with transparent payouts.
            </p>

          </div>

          <div className="why-card">

            <FaClock />

            <h4>Flexible Time</h4>

            <p>
              Work whenever it fits your schedule.
            </p>

          </div>

          <div className="why-card">

            <FaMapMarkedAlt />

            <h4>Live Tracking</h4>

            <p>
              Smart GPS delivery technology for every order.
            </p>

          </div>

          <div className="why-card">

            <FaHeadset />

            <h4>24/7 Support</h4>

            <p>
              Our team is always ready to help.
            </p>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="partner-cta">

        <h2>
          Ready to Start Your Journey?
        </h2>

        <p>
          Join thousands of drivers and restaurants
          already growing with Zenbaba.
        </p>

        <div className="cta-buttons">

          <Link
            to="/driver-application"
            className="gold-btn"
          >
            Become Driver
          </Link>

          <Link
            to="/restaurant-application"
            className="white-btn"
          >
            Register Restaurant
          </Link>

        </div>

      </section>

    </div>
  );
}

export default BecomePartner;