const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;
/*

const express = require('express');
const app = express();*/

// Body parser middleware to parse JSON data
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

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


//API Route to Add a New Subject
app.post("/subjects", (req, res) => {
    // সঠিকভাবে body থেকে ডাটা ডেসট্রাকচার করা
    const { subject_id, subject_name, subject_logo, subject_code, subject_rel_date } = req.body;

    if (!subject_id || !subject_name || !subject_code) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `INSERT INTO subject_list (subject_id, subject_name, subject_logo, subject_code, subject_rel_date)
                 VALUES (?, ?, ?, ?, ?)`;

    db.run(sql, [subject_id, subject_name, subject_logo, subject_code, subject_rel_date], function(err) {
        if (err) {
            return res.status(500).json({ error: "Failed to add subject", details: err.message });
        }
        res.status(201).json({ message: "Subject added successfully", id: this.lastID });
    });
});


// API Route to Add a New Chapter
app.post("/chapters", (req, res) => {
    const { chapter_title, subject_code, chapter_code } = req.body;
    const sql = `INSERT INTO chapter_list (chapter_title, subject_code, chapter_code)
                 VALUES (?, ?, ?)`;
    db.run(sql, [chapter_title, subject_code, chapter_code], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Chapter added successfully", id: this.lastID });
    });
});

// API Route to Add a New Question
app.post("/questions", (req, res) => {
    const { question, answer, chapter_id, create_at } = req.body;
    const sql = `INSERT INTO question_list (question, answer, chapter_id, create_at)
                 VALUES (?, ?, ?, ?)`;
    db.run(sql, [question, answer, chapter_id, create_at], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Question added successfully", id: this.lastID });
    });
});



// Start the Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
