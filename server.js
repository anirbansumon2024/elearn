const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

// Connect to SQLite Database
const db = new sqlite3.Database("database.db", (err) => {
    if (err) {
        console.error("Database connection failed: " + err.message);
        return;
    }
    console.log("Connected to SQLite database.");
});

// API Route to Get Subject List
app.get("/subjects", (req, res) => {
    const sql = "SELECT * FROM subject_list";
    
    db.all(sql, [], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// API Route to Get Chapter List
app.get("/chapters", (req, res) => {
    const sql = "SELECT * FROM chapter_list";
    
    db.all(sql, [], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// API Route to Get Question List
app.get("/questions", (req, res) => {
    const sql = "SELECT * FROM question_list";
    
    db.all(sql, [], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
