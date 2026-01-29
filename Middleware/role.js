function RoleBase(...role) {
    return (req, res, next) => {
        // 1. Check if req.user exists (prevents crashing if 'authen' middleware failed)
        // 2. Check if the user's role is in the allowed list
        if (!req.user || !role.includes(req.user.role)) {
            return res.status(403).json({ 
                message: "Failed", 
                data: "You are not authorized for this page" 
            }); // Added 'return' here!
        }
        next(); // Only calls next() if they ARE authorized
    };
}

module.exports = RoleBase;