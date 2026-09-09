import jwt from 'jsonwebtoken';

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const token = authorization.split(' ')[1] + "";
    try {
        const secret = process.env.JWT_SECRET || process.env.ACCESS_TOKEN_SECRET || "default_jwt_secret";
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        req.token = token;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message || 'Invalid or expired token' });
    }
};

export default requireAuth;
