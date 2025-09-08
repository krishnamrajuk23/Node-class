export const authorize = (req: any, res: any, next: any) => {
        const user = res.locals.user;
        const roles = "admin,seller";
        if (user && roles.split(',').includes(user.role)) {
            next();
        } else {
            res.status(403).json({ message: "Unauthorized" });
        }
    }
