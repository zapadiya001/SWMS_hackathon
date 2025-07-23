const User = require("../models/user.model");

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id); // ✅ correct field
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: err.message }); // ✅ fixed typo (.Message → .message)
    }
};
