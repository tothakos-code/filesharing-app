module.exports = (req, res, next) => {
    if (req.user == null || req.user.role === "user") {
        res.status(401).json({ error: 'Unauthorized.' });
    } else if (req.user.role === "admin" || req.user.role === "uploader") {
        next();
    }
};