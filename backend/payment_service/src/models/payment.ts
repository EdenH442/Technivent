import * as mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        eventID: { type: String, required: true, unique: false },
        username: { type: String, required: true, unique: false },
        date: { type: Date, required: true },
        ticketID: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: {type: Number, required: true}
    }
);


export default mongoose.model("Payment", paymentSchema);