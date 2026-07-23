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
         <h1>
  About <span className="highlight">Zenbaba Delivery</span>
</h1>

          {/* ✅ CHANGED */}
          <p>
            Enjoy your favorite meals from top restaurants in Bahir Dar,
            delivered fresh and fast straight to your doorstep.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      

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