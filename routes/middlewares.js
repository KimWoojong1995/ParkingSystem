 exports.isLoggedIn = (req, res, next) => {
     if (req.isAuthenticated()) {
         next();
     } else {
         res.render('error', { memberMessage: '로그인이 필요합니다.' });
     }
 };

 exports.isNotLoggedIn = (req, res , next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.render('error', { memberMessage: '이미 로그인한 상태입니다.' });
    }
 };

 exports.isNotAdmin = (req, res, next) => {
    if (!req.user.admin) {
        return res.render('error', { memberMessage: '관리자가 아닙니다.' })
    } else {
        next();
    }
 };