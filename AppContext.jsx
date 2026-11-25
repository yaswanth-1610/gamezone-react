import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { R, W, seed, sm, rb, organizerAccount } from "./data";

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

// Re-check the role on load; only the listed usernames are organizers.
function initUser() {
  const u = R("gtp_user", null);
  if (!u) return null;
  const username = String(u.username || "").trim().toLowerCase();
  return { ...u, role: organizerAccount(username) ? "organizer" : "user" };
}

export function AppProvider({ children }) {
  const navigate = useNavigate();

  const [events, setEvents] = useState(() => R("gtp_events", seed));
  const [matches, setMatches] = useState(() => R("gtp_matches", sm));
  const [regs, setRegs] = useState(() => R("gtp_registrations", []));
  const [teams, setTeams] = useState(() => R("gtp_teams", []));
  const [updates, setUpdates] = useState(() => R("gtp_updates", []));
  const [board] = useState(() => R("gtp_board", rb));
  const [user, setUser] = useState(initUser);

  const [toastMsg, setToastMsg] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const timer = useRef(null);

  // Persist to localStorage (same keys as the original site)
  useEffect(() => { W("gtp_events", events); }, [events]);
  useEffect(() => { W("gtp_matches", matches); }, [matches]);
  useEffect(() => { W("gtp_registrations", regs); }, [regs]);
  useEffect(() => { W("gtp_teams", teams); }, [teams]);
  useEffect(() => { W("gtp_updates", updates); }, [updates]);
  useEffect(() => { W("gtp_board", board); }, [board]);
  useEffect(() => {
    if (user) W("gtp_user", user);
    else localStorage.removeItem("gtp_user");
  }, [user]);

  const toast = useCallback((s) => {
    setToastMsg(s);
    setToastShow(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastShow(false), 2500);
  }, []);

  function logout() {
    setUser(null);
    navigate("/");
  }

  function register(id) {
    if (!user) {
      toast("Please login first");
      setTimeout(() => navigate("/login"), 600);
      return;
    }
    if (regs.some((r) => r.eventId === id && r.username === user.username)) {
      toast("Already registered");
      return;
    }
    const e = events.find((x) => x.id === id);
    if (!e || e.status !== "Open") return;
    const n = regs.filter((r) => r.eventId === id).length;
    if (n >= +e.teams) {
      toast("Tournament full");
      return;
    }
    setRegs([...regs, { eventId: id, username: user.username, name: user.fullName }]);
    setEvents(events.map((x) => (x.id === id ? { ...x, registered: n + 1 } : x)));
    toast("Registration successful!");
  }

  const value = {
    events, setEvents, matches, setMatches, regs, teams, setTeams,
    updates, setUpdates, board, user, setUser, logout, register,
    toast, toastMsg, toastShow,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
