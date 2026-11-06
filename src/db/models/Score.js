import mongoose from "mongoose";

const { Schema } = mongoose;

const scoreSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    isHighscore: {
      type: Boolean,
      required: true,
    },
    mode: {
      type: String,
      required: true,
      default: "30s",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

scoreSchema.index({ userId: 1 });
scoreSchema.index({ mode: 1 });
scoreSchema.index({ score: -1 });

const Score = mongoose.models.Score || mongoose.model("Score", scoreSchema);

export default Score;
