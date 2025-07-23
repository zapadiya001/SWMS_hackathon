// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name must be at most 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    },
    location: {
        type: String,
        maxlength: [100, "Location can be at most 100 characters"]
    },
    phone: {
        type: String,
        match: [/^\d{10}$/, "Phone must be 10 digits"]
    },
    profileImage: {
        type: String
    },
    badges: {
        type: [String],
        default: []
    },
    videoProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EducationVideo'
    }],
    quizScore: {
        type: Number,
        default: 0,
        min: [0, "Quiz score cannot be negative"]
    },
    ecoPoints: {
        type: Number,
        default: 0,
        min: [0, "Eco points cannot be negative"]
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

userSchema.index({ role: 1 });
userSchema.index({ location: 1 });

userSchema.virtual('profile').get(function () {
    return {
        id: this._id,
        name: this.name,
        email: this.email,
        role: this.role,
        location: this.location,
        phone: this.phone,
        profileImage: this.profileImage,
        badges: this.badges,
        ecoPoints: this.ecoPoints,
        quizScore: this.quizScore,
        status: this.status,
        createdAt: this.createdAt,
    };
});

userSchema.statics.findByRole = function (role) {
    return this.find({ role });
};

userSchema.methods.addEcoPoints = function (points) {
    this.ecoPoints += points;
    return this.save();
};

userSchema.methods.addBadge = function (badge) {
    if (!this.badges.includes(badge)) {
        this.badges.push(badge);
        return this.save();
    }
    return Promise.resolve(this);
};

module.exports = mongoose.model("User", userSchema);

