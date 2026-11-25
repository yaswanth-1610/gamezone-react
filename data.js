// Data + helpers copied from the original script.js
export const G = ["Kabaddi", "Cricket", "Kho-Kho", "Volleyball", "Carrom", "Chess", "Badminton", "Table Tennis"];
export const I = { "Kabaddi": "🤼", "Cricket": "🏏", "Kho-Kho": "🏃", "Volleyball": "🏐", "Carrom": "🎯", "Chess": "♟️", "Badminton": "🏸", "Table Tennis": "🎾" };

export const seed = [
  { id: "t1", game: "Cricket", title: "City Cricket Championship", deadline: "2026-12-04", date: "2026-12-12", venue: "Vijayawada Sports Ground", teams: 16, prize: 25000, status: "Open" },
  { id: "t2", game: "Kabaddi", title: "Pro Kabaddi Showdown", deadline: "2026-12-08", date: "2026-12-18", venue: "University Indoor Court", teams: 12, prize: 30000, status: "Open" },
  { id: "t3", game: "Chess", title: "Mind Masters Open", deadline: "2026-12-14", date: "2026-12-20", venue: "KL Campus Hall", teams: 64, prize: 12000, status: "Coming Soon" },
  { id: "t4", game: "Badminton", title: "Smash Cup 2026", deadline: "2026-11-20", date: "2026-11-28", venue: "Indoor Stadium", teams: 32, prize: 15000, status: "Closed" },
];

export const sm = [
  { id: "m1", name: "Opening Match", game: "Cricket", date: "2026-12-12", time: "09:00", venue: "Vijayawada Sports Ground", teams: "Rising Stars vs Thunder XI", status: "Upcoming", result: "" },
  { id: "m2", name: "Semi Final 1", game: "Kabaddi", date: "2026-11-25", time: "15:30", venue: "University Indoor Court", teams: "Raid Kings vs Power Squad", status: "Live", result: "" },
  { id: "m3", name: "Final Match", game: "Chess", date: "2026-11-20", time: "11:00", venue: "KL Campus Hall", teams: "Knight Riders vs Checkmate", status: "Completed", result: "Knight Riders won" },
];

export const rb = [["Aarav Sharma", 18, 15, 480], ["Team Thunder", 16, 13, 440], ["Priya Reddy", 20, 13, 415], ["Raid Kings", 15, 11, 390], ["Neha Kumar", 17, 10, 365]];

// Only these three accounts have Organizer access.
export const ORGANIZER_ACCOUNTS = {
  "yaswanth": { password: "2500030925", fullName: "Yaswanth" },
  "radha krishna": { password: "2500031150", fullName: "Radha Krishna" },
  "rahul varma": { password: "2500030360", fullName: "Rahul Varma" },
};

export const R = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
export const W = (k, v) => localStorage.setItem(k, JSON.stringify(v));

export const dt = (s) =>
  s ? new Date(s + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "TBA";

export const organizerAccount = (identity) =>
  Object.prototype.hasOwnProperty.call(ORGANIZER_ACCOUNTS, identity) ? ORGANIZER_ACCOUNTS[identity] : null;
