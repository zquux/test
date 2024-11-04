import mongoose from "mongoose";

const trainingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    personId: {
        type: Number,
        required: true 
    },
    sessionDate: {
        type: Date,
        required: true
    },
    cardNumber: {
        type: String,
        required: true,
    },  
    expiryDate: {
        type: String,
        required: false, 
    },
    securityCode: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
}});

const Session = mongoose.model('Session', trainingSchema);

export default Session;