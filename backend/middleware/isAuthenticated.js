import jwt from "jsonwebtoken"

// middleware to verify JWT and attach user info to the request
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({
                message: "user not authenticated",
                success: false
            })
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return res.status(401).json({
                message: "invalid token",
                success: false
            })
        }
        // attach a user object with id so controllers using req.user.id work
        req.user = { id: decode.userId };
        next();
    } catch (error) {
        console.log(error);
        if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired, please login again",
        success: false,
      });
    }

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

export default isAuthenticated;
