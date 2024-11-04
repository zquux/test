import Session from "../models/session.model.js";
import mongoose from "mongoose";

export const getSessions = async (req, res) => {
    try {
        const sessions = await Session.find({});
        res.status(200).json({ success: true, data: sessions });
    } catch (error) {
        console.error("Error in get sessions:", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }

};

export const createSession = async (req, res) => {
    const session = req.body;

    if(!session.name || !session.personId) {
        return res.status(400).json({ success: false, message: "Please provide all fields"});
    }

    const newSession = new Session(session);

    try{
        await newSession.save();
        res.status(201).json ({ success: true, data: newSession });
    } catch (error) {
        console.error("Error in create session:", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }
};

export const updateSession = async (req, res) => {
    const { id } = req.params;
    const session = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid session id" });
    }

    try {
        const updatedSession = await Session.findByIdAndUpdate(id, session, { new: true });
        res.status(200).json({ success: true, data: updatedSession });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error"});
    }
};

export const deleteSession = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid session id" });
    }

    try {
        await Session.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Session deleted"});
    } catch (error) {
        console.error("Error in delete session:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
        
    }
};

export const generateReport = async (req, res) => {
    try {
        const { personId, startDate, endDate } = req.query;
    
        if (!personId || !startDate || !endDate) {
          return res.status(400).json({ message: 'personId, startDate, and endDate are required.' });
        }
    
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Include the whole end date
    
        const sessions = await Session.find({
          personId: personId,
          sessionDate: {
            $gte: start,
            $lte: end,
          },
        });
    
        res.json({ count: sessions.length, sessions });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    };