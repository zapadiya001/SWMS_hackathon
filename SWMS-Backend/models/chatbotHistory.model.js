const mongoose = require("mongoose");

const chatbotHistorySchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	message: {
		type: String,
		required: [true, "User message is required"],
		minlength: [1, "Message cannot be empty"]
	},
	response: {
		type: String,
		required: [true, "Bot response is required"],
		minlength: [1, "Response cannot be empty"]
	}
}, {
	timestamps: true
});

chatbotHistorySchema.index({ userId: 1 });
chatbotHistorySchema.index({ createdAt: -1 });

module.exports = mongoose.model("ChatbotHistory", chatbotHistorySchema);
