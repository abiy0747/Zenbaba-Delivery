import React, { useEffect, useRef, useState } from "react";
import "../Css/AboutUs.css";

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);

          const update = () => {
            start += increment;
            if (start < target) {
              setCount(Math.ceil(start));
              requestAnimationFrame(update);
            } else {
              setCount(target);
            }
          };

          update();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <h3 ref={ref}>{count}+</h3>;
};

const AboutUs = () => {
  return (
    <div className="about">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay" />

        <div className="hero-content">
          <span id="aboutus" className="badge">About Us</span>

          {/* ✅ CHANGED */}
          <h1>Fast & Reliable Food Delivery in Bahir Dar</h1>

          {/* ✅ CHANGED */}
          <p>
            Enjoy your favorite meals from top restaurants in Bahir Dar,
            delivered fresh and fast straight to your doorstep.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="about-container">
        <div className="about-card">

          {/* ✅ CHANGED */}
          <h2>Delicious Food. Delivered Fast.</h2>

          <p>
            Our food delivery platform in Bahir Dar connects you with the best
            local restaurants, cafes, and traditional food spots in one place.
          </p>

          <p>
            Whether you're craving Ethiopian dishes like Doro Wat, Kitfo,
            or fast food like burgers and pizza, we bring it all to you
            with just a few clicks.
          </p>

          <p>
            We focus on speed, freshness, and reliability — ensuring your food
            arrives hot, fresh, and exactly how you expect it.
          </p>

          <p>
            From breakfast to dinner, snacks to drinks, we make ordering food
            simple, fast, and enjoyable across Bahir Dar.
          </p>

        </div>
      </section>

      {/* STATS (UNCHANGED LOGIC, ONLY LABELS UPDATED) */}
      <section className="stats">
        <div className="stat">
          <Counter target={50} />
          <p>Partner Restaurants</p>
        </div>

        <div className="stat">
          <Counter target={5000} />
          <p>Orders Delivered</p>
        </div>

        <div className="stat">
          <Counter target={120} />
          <p>Delivery Riders</p>
        </div>

        <div className="stat">
          <Counter target={4.9} />
          <p>User Rating</p>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;