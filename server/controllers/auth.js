const SteamAuth = require("node-steam-openid");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const steam = new SteamAuth({
  realm: "http://localhost:5000",
  returnUrl: "http://localhost:5000/api/auth/steam/authenticate",
  apiKey: process.env.STEAM_KEY,
});

///// GET
// : /api/auth/steam
exports.steamLoginLink = async (req, res, next) => {
  const redirectUrl = await steam.getRedirectUrl();
  res.send({ redirectUrl });
};

///// GET
// : /api/auth/steam/authenticate
exports.steamAuth = async (req, res, next) => {
  try {
    const user = await steam.authenticate(req);
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    const options = {
      // 30 days
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.cookie("token", token, options);
    res.redirect(302, "http://localhost:5000/secure");
    //!!- glemt å gjøre noe her?
    //...do something with the data
  } catch (error) {
    console.error(error);
  }
};

///// POST
// : /api/auth/me
exports.authMe = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ message: decoded.user });
  } catch (error) {
    const redirectUrl = await steam.getRedirectUrl();
    return res
      .status(403)
      .json({ message: "God forsøk! men, nei...", redirectUrl });
  }
};
