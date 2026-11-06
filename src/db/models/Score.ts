import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

const scoreSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
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
	},
);

scoreSchema.index({ userId: 1 });
scoreSchema.index({ mode: 1 });
scoreSchema.index({ score: -1 });

type ScoreDocument = InferSchemaType<typeof scoreSchema>;

const Score: Model<ScoreDocument> =
	mongoose.models.Score ?? mongoose.model<ScoreDocument>("Score", scoreSchema);

export default Score;
