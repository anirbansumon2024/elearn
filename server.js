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


db.serialize(() => {
db.run(`CREATE TABLE subject_list (
    subject_id INTEGER PRIMARY KEY,
    subject_name TEXT,
    subject_logo TEXT,
    subject_code TEXT,
    subject_rel_date TEXT
);`);

    db.run(`CREATE TABLE chapter_list (
    chapter_id INTEGER PRIMARY KEY,
    chapter_title TEXT,
    subject_code TEXT,
    chapter_code TEXT
);`);
db.run(`CREATE TABLE question_list (
    id INTEGER PRIMARY KEY,
    question TEXT,
    answer TEXT,
    chapter_id INTEGER,
    create_at TEXT
);`);

    
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
