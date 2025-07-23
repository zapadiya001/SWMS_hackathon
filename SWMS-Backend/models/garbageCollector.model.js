const mongoose = require("mongoose");

const garbageCollectorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
		minlength: [2, "Name must be at least 2 characters"],
		maxlength: [50, "Name must be under 50 characters"]
	},
	serviceType: [{
		type: String,
		enum: ['plastic', 'glass', 'organic', 'metal', 'paper', 'electronic'],
		required: true
	}],
	contact: {
		type: String,
		required: [true, "Contact is required"]
	},
	location: {
		latitude: {
			type: Number,
			required: true,
			min: -90,
			max: 90
		},
		longitude: {
			type: Number,
			required: true,
			min: -180,
			max: 180
		},
		address: {
			type: String,
			required: [true, "Address is required"],
			minlength: [10, "Address must be at least 10 characters"]
		}
	},
	verified: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
});

garbageCollectorSchema.index({ "location.latitude": 1, "location.longitude": 1 });
garbageCollectorSchema.index({ serviceType: 1 });
garbageCollectorSchema.index({ verified: 1 });
garbageCollectorSchema.index({ name: 'text' });

module.exports = mongoose.model("GarbageCollector", garbageCollectorSchema);
