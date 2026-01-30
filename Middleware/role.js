function RoleBase(...role) {
    return (req, res, next) => {
        if (!req.user || !role.includes(req.user.role)) {
            return res.status(403).json({ 
                message: "Failed", 
                data: "You are not authorized for this page" 
            });
        }
        next(); 
    };
}

module.exports = RoleBase;