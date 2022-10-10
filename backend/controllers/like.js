const db = require('../config/database');



exports.createAndUpdateLikes = (req, res) => {
    
    const { like, dislike, post_id, user_id } = req.body;

    if (like === 1) {
       
        db.query('SELECT likes FROM post_likes WHERE post_id = ? AND users_liked = ?',
        [post_id, user_id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
               
                db.query('UPDATE post_likes SET likes = ? WHERE post_id = ? AND users_liked = ?',
                    [like, post_id, user_id], (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.status(200).json({ message: "Added a like!" });
                    });
        
            } else {
              
                db.query('INSERT INTO post_likes ( likes, post_id, users_liked ) VALUES (?, ?, ?)',
                [like, post_id, user_id], (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(201).json({ message: "Added a like!" });
                });
            }
        })        
    } else if (like === 0) {
       
        db.query('UPDATE post_likes SET likes = ? WHERE post_id = ? AND users_liked = ?',
        [like, post_id, user_id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ message: "Like removed!" });
        });
    }
    
    if (dislike === 1) {
        
        db.query('SELECT dislikes FROM post_likes WHERE post_id = ? AND users_disliked = ?',
        [post_id, user_id], (err, result) => {
            if (err) { 
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                
                db.query('UPDATE post_likes SET dislikes = ? WHERE post_id = ? AND users_disliked = ?',
                    [dislike, post_id, user_id], (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.status(200).json({ message: "Added a dislike!" });
                });
            } else {
                
                db.query('INSERT INTO post_likes (dislikes, post_id, users_disliked ) VALUES (?, ?, ?)',
                [dislike, post_id, user_id], (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(201).json({ message: "Added a dislike!" });
                });
            }
        });
        
    } else if (dislike === 0) {
        
        db.query('UPDATE post_likes SET dislikes = ? WHERE post_id = ? AND users_disliked = ?',
        [dislike, post_id, user_id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ message: "Dislike removed!" });
        });
    }
};



exports.getLikesAndDislikes = (req, res) => {

    db.query(`SELECT post_id, likes, dislikes, users_liked, users_disliked FROM post_likes`,
        (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send(result);
        });
};