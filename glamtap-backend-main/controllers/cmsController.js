const Cms = require("../models/Cms");

// ================= CREATE CMS PAGE =================
exports.createCms = async (req, res) => {
  try {
    const cms = await Cms.create(req.body);
    res.status(201).json({ success: true, cms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================= GET ALL CMS PAGES =================
exports.getCms = async (req, res) => {
  try {
    const cmsPages = await Cms.find().sort({ createdAt: -1 });
    res.json({ success: true, cmsPages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================= GET SINGLE CMS PAGE =================
exports.getCmsById = async (req, res) => {
  try {
    const cms = await Cms.findById(req.params.id);
    if (!cms) {
      return res.status(404).json({ success: false, message: "CMS page not found" });
    }
    res.json({ success: true, cms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================= UPDATE CMS PAGE =================
exports.updateCms = async (req, res) => {
  try {
    const cms = await Cms.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cms) {
      return res.status(404).json({ success: false, message: "CMS page not found" });
    }
    res.json({ success: true, cms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================= DELETE CMS PAGE =================
exports.deleteCms = async (req, res) => {
  try {
    const cms = await Cms.findByIdAndDelete(req.params.id);
    if (!cms) {
      return res.status(404).json({ success: false, message: "CMS page not found" });
    }
    res.json({ success: true, message: "CMS page deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const logActivity = require("../utils/logActivity");


// ... existing app.use lines ke saath