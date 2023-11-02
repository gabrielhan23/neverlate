import mongoose, { Document, InferSchemaType, Schema } from 'mongoose'

const UserSchema = new Schema({
	google_id: {
		type: String,
		trim: true,
		required: true,
		immutable: true,
		select: false,
	  },
	  access_token: {
		type: String,
		trim: true,
		required: true,
		immutable: true,
	  },
	  email: {
		type: String,
		trim: true,
		required: true,
		immutable: true,
	  },
	  username: {
		type: String,
		trim: true,
		required: true,
	  },
	  streak: {
		type: Number,
		required: true,
		default: 0,
	  },
})

export default mongoose.model<Document>('User', UserSchema)
export type UserType = Document & InferSchemaType<typeof UserSchema>;
