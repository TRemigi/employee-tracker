const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;
    const params = [];

    db.execute(
        'sql', params,
        function (err, results) {
            if (err) {
                res.status(400).json({
                    error: err.message
                });
                return;
            }

            console.table(results);
        }
    );
});

module.exports = router;