import jwt from "jsonwebtoken";

export async function useAuth(req, res, next) {
  // authorization = 'Bearer "TOKEN"'
  const bearer_token = req.header('Authorization');
  if (!bearer_token) {
    return res.status(401).json({error: "unauthorized"});
  }

  const token = bearer_token.split(' ')[1];
  try {
    // get _id from body of token after verifying with secret key
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY);
    req.user = {id: decoded.user_id};
    console.log("Auth successful");
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({error: "unauthorized"})
  }

}