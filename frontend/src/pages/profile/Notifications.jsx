import { useEffect, useState } from "react";
import ProfilePage from "./ProfilePage";

function Notifications() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: true,
    driverMessages: true,
    restaurantOffers: false,
    systemNotifications: true,
    sound: true,
  });

  const notifications = [
    {
      id: 1,
      icon: "🍕",
      title: "Your order has been delivered",
      message: "Chicken Burger Combo was delivered successfully.",
      time: "Today • 10:25 AM",
    },
    {
      id: 2,
      icon: "🏍️",
      title: "Driver is on the way",
      message: "Your driver is 3 minutes away.",
      time: "Yesterday • 7:10 PM",
    },
    {
      id: 3,
      icon: "🎁",
      title: "Special Offer",
      message: "Get 20% OFF on your next order this weekend.",
      time: "2 days ago",
    },
  ];

  return (
    <ProfilePage
      title="Notifications"
      icon="🔔"
      description="Stay updated with your orders and promotions."
    >

      <div className="setting-section">

        <h2>Notification Preferences</h2>

        {Object.keys(settings).map((key) => (

          <div className="address-card" key={key}>

            <div>

              <h3>
                {key === "orderUpdates" && "📦 Order Updates"}
                {key === "promotions" && "🎁 Promotions"}
                {key === "driverMessages" && "🏍️ Driver Messages"}
                {key === "restaurantOffers" && "🍔 Restaurant Offers"}
                {key === "systemNotifications" && "⚙️ System Notifications"}
                {key === "sound" && "🔊 Notification Sound"}
              </h3>

              <p>
                Receive notifications for this category.
              </p>

            </div>

            <input
              type="checkbox"
              checked={settings[key]}
              onChange={() =>
                setSettings({
                  ...settings,
                  [key]: !settings[key],
                })
              }
            />

          </div>

        ))}

      </div>

      <div className="setting-section">

        <h2>Recent Notifications</h2>

        {notifications.map((item) => (

          <div className="address-card" key={item.id}>

            <div>

              <h3>
                {item.icon} {item.title}
              </h3>

              <p>{item.message}</p>

              <small style={{ color: "#777" }}>
                {item.time}
              </small>

            </div>

          </div>

        ))}

      </div>

      <div className="setting-section">

        <h2>Quick Actions</h2>

        <button className="add-address">
          Mark All as Read
        </button>

        <button
          className="locked-button"
          style={{ marginTop: "12px" }}
        >
          Clear Notification History
        </button>

      </div>

    </ProfilePage>
  );
}

export default Notifications;