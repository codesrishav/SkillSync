const AnalysisHistory = require('../models/AnalysisHistory');

exports.getHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    // Ensure the requested user ID matches the logged-in user
    if (req.user !== userId) {
      return res.status(403).json({ message: 'Unauthorized access to history' });
    }

    const history = await AnalysisHistory.find({ user: userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching history', error: error.message });
  }
};
