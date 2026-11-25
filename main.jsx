import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

// StrictMode is intentionally not used so the "Access Denied" alert on the
// Organizer page is shown once (same as the original site).
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
