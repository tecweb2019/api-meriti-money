const Extractjwt = require('passport-jwt').ExtractJwt;
module.exports = {
    secretOrKey: "%$¨%$¨%$¨¨hyynynynynyn234234*(&*",
    jwtFromRequest: Extractjwt.fromAuthHeaderWithScheme('JWT')
}