import jwt from "jsonwebtoken";

export function createToken(user_id) {
    return jwt.sign({user_id}, process.env.SECRET_KEY, {expiresIn: '2h'});
}
