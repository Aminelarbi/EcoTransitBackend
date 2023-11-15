import mongoose from "mongoose";
const { Schema, model } = mongoose;

const billetSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    estimatedPrice: {
      type: Number,
      required: true,
    },
    estimatedTime: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      enum: ["taxi", "bus", "moto", "other"], 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Billet = mongoose.model("Billet", billetSchema);
export { Billet };
