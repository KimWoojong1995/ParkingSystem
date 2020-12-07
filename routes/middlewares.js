 exports.isLoggedIn = (req, res, next) => {
     if (req.isAuthenticated()) {
         next();
     } else {
         res.status(403).send('로그인이 필요한 페이지입니다.');
     }
 };

 exports.isNotLoggedIn = (req, res , next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인한 상태입니다.');
    }
 };