const express = require('express');
const router = express.Router();
const { analyzeResume } = require('../controllers/analyzeController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');

// Configure multer for PDF uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/analyze', authMiddleware, upload.single('resume'), analyzeResume);

module.exports = router;
