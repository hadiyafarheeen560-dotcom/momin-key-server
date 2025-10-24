const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ✅ Sirf ye keys valid hain
const VALID_KEYS = [
  "ETE","PA8","216","DHA","DIY","AFA","RHE","EEN","TAQ","UIT","UFA","ILM"
];

app.get("/validate-key", (req, res) => {
    const { key } = req.query;
    if (!key) return res.json({ valid: false });

    if (VALID_KEYS.includes(key)) {
        return res.json({ valid: true });
    } else {
        return res.json({ valid: false });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
