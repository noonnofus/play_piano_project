const express = require('express');
const router = express.Router();
const {formidable} = require("formidable");
const path = require("path");
const fs = require("fs");


router.get('/', (req, res) => {
    res.render('index');
})

router.post('/detune', (req, res) => {
    try {
        const { value } = req.body;
        res.status(200).json({
            success: true,
            data: { value },
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})

router.post('/sampler', async (req, res) => {
    try {
        const form = formidable({keepExtensions: true});
        form.uploadDir = path.join(__dirname, "..", "public");
        let fields;
        let files;
        [fields, files] = await form.parse(req);
        
        const newFileName = files.file[0].newFilename;
        
        res.status(200).json({
            sucess: true,
            data: { newFileName },
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})

router.post('/deleteJunkFiles', (req, res) => {
    try {
        const dir = path.join(__dirname, '../public');
        const files = fs.readdirSync(dir);
    
        files.forEach(file => {
            if (file.endsWith(".mp3") || file.endsWith(".wav") || file.endsWith(".ogg")) {
                fs.unlinkSync(path.join(dir, `/${file}`));
            }
        });

        res.status(200).json({
            success: true,
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})

module.exports = router;