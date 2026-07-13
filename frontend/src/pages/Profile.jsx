import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div
        style={{
          padding: "120px 20px",
          textAlign: "center",
        }}
      >
        <h2>Please login first.</h2>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            border: "none",
            borderRadius: "8px",
            background: "#0077ff",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Go Home
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "110px auto",
        padding: "20px",
      }}
    >
      {/* ================= PROFILE CARD ================= */}

      <div
        style={{
          background: "#0077ff",
          color: "white",
          borderRadius: "20px",
          padding: "35px",
          display: "flex",
          alignItems: "center",
          gap: "25px",
          boxShadow: "0 10px 30px rgba(0,0,0,.15)",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "white",
            color: "#0077ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "60px",
            fontWeight: "bold",
          }}
        >
          👤
        </div>

        <div>
          <h1 style={{ marginBottom: "10px" }}>
            {user.name}
          </h1>

          <p>{user.email}</p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>

          {user.phone && (
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
          )}
        </div>
      </div>

      {/* ================= ACCOUNT MENU ================= */}

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 5px 20px rgba(0,0,0,.15)",
        }}
      >
        <h2
          style={{
            margin: 0,
            padding: "20px",
            background: "#0077ff",
            color: "white",
          }}
        >
          My Account
        </h2>

        <ProfileItem
          icon="📦"
          title="My Orders"
          onClick={() => navigate("/orders")}
        />

        <ProfileItem
          icon="❤️"
          title="Favorite Restaurants"
          onClick={() => navigate("/favorites")}
        />

        <ProfileItem
          icon="📍"
          title="Saved Addresses"
          onClick={() => navigate("/addresses")}
        />

        <ProfileItem
          icon="💳"
          title="Payment Methods"
          onClick={() => navigate("/payments")}
        />

        <ProfileItem
          icon="🔔"
          title="Notifications"
          onClick={() => navigate("/notifications")}
        />

        <ProfileItem
          icon="⚙️"
          title="Account Settings"
          onClick={() => navigate("/settings")}
        />

        <ProfileItem
          icon="❓"
          title="Help Center"
          onClick={() => navigate("/help")}
        />

        <div style={{ padding: "20px" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#0077ff",
              color: "white",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= MENU ITEM ================= */

function ProfileItem({ icon, title, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 22px",
        borderBottom: "1px solid #eee",
        cursor: "pointer",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#eef6ff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#fff";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          fontSize: "17px",
        }}
      >
        <span style={{ fontSize: "24px" }}>{icon}</span>

        <span>{title}</span>
      </div>

      <span
        style={{
          color: "#0077ff",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        ❯
      </span>
    </div>
  );
}

export default Profile;