const db = require('../config/database');



exports.createAndUpdateSubscribers = (req, res) => {
    
    const { subscriber_status, profile_owner, subscribed_user } = req.body;
    if (subscriber_status === 'true') {
    
        db.query('SELECT subscriber_status FROM subscribers WHERE profile_owner = ? AND subscribed_user = ?',
        [profile_owner, subscribed_user], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                
                db.query('UPDATE subscribers SET subscriber_status = ? WHERE profile_owner = ? AND subscribed_user = ?',
                    [subscriber_status, profile_owner, subscribed_user], (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.status(200).json({ message: "Your are subscribed again!" });
                    });
        
            } else {
                
                db.query('INSERT INTO subscribers ( subscriber_status, profile_owner, subscribed_user ) VALUES (?, ?, ?)',
                [subscriber_status, profile_owner, subscribed_user], (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(201).json({ message: "You are now subscribed !" });
                });
            }
        })        
    } else if (subscriber_status === 'false') {
        
        db.query('UPDATE subscribers SET subscriber_status = ? WHERE profile_owner = ? AND subscribed_user = ?',
        [subscriber_status, profile_owner, subscribed_user], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ message: "Your are no longer subscribed!" });
        });
    }
    
};



exports.getAllSubscribers = (req, res) => {

    db.query(`SELECT * FROM subscribers`,
        (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send(result);
        });
};