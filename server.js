const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// === Sample Keys Database ===
let keysDB = {
    "HadiyaFarheen": { device: null },
    "Naziya": { device: null },
    "Saima": { device: null }
};

// === Validate Key API ===
app.get('/validate-key', (req, res) => {
    const key = req.query.key;
    const deviceID = req.query.device; // frontend se deviceID bhejna

    if (!key) return res.json({ valid: false, message: "Key required" });

    if (!keysDB[key]) return res.json({ valid: false });

    // Agar key already assigned to kisi device
    if (keysDB[key].device && keysDB[key].device !== deviceID) {
        return res.json({ valid: true, device: keysDB[key].device });
    }

    // Assign device if not already assigned
    keysDB[key].device = deviceID;
    res.json({ valid: true, device: deviceID });
});

// === Start server ===
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
