import { create } from "zustand";

export const useSessionStore = create((set) => ({
    sessions: [],
    setSessions: (sessions) => set({sessions: sessions}),
    createSession: async (newSession) => {
        if (!newSession.name ||!newSession.personId) {
            return { success: false, message: "All fields are required" };
        }
    const res = await fetch("/api/sessions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(newSession),
    })
    const data = await res.json();
    set((state) => ({sessions:[...state.sessions, data.data]}));
    return { success: true, message: "Session created successfully" };  
    },
    fetchSessions: async () => {
        const res = await fetch("/api/sessions");
        const data = await res.json();
        set({sessions: data.data});
    },
    deleteSession: async (pid) => {
        const res = await fetch(`/api/sessions/${pid}`, { method: "DELETE" });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({ sessions: state.sessions.filter((session) => session._id !== pid) }));
        return { success: true, message: "Session deleted successfully" };
        
    },
    updateSession: async (pid, updatedSession) => {
        const res = await fetch(`/api/sessions/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedSession),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };
        set((state) => ({
            sessions: state.sessions.map((session) =>
                session._id === pid ? data.data : session)
        }));
        return { success: true, message: "Session updated successfully" };
    },
}));