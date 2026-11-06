import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
	},
	{
		timestamps: false,
		versionKey: false,
	},
);

type UserDocument = InferSchemaType<typeof userSchema>;

const User: Model<UserDocument> =
	mongoose.models.User ?? mongoose.model<UserDocument>("User", userSchema);

export default User;
