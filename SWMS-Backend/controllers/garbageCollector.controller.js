const GarbageCollector = require("../models/garbageCollector.model");

// Create a new garbage collector
exports.createCollector = async (req, res) => {
  try {
    const data = await GarbageCollector.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all collectors (with optional filters)
exports.getCollectors = async (req, res) => {
  try {
    const { serviceType, verified } = req.query;
    const filter = {};
    if (serviceType) filter.serviceType = serviceType;
    if (verified !== undefined) filter.verified = verified === "true";

    const data = await GarbageCollector.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single collector
exports.getCollectorById = async (req, res) => {
  try {
    const data = await GarbageCollector.findById(req.params.id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "Collector not found" });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update collector
exports.updateCollector = async (req, res) => {
  try {
    const data = await GarbageCollector.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "Collector not found" });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete collector
exports.deleteCollector = async (req, res) => {
  try {
    const result = await GarbageCollector.findByIdAndDelete(req.params.id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Collector not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
