const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../database/models/User");
const { comparePassword } = require("../utils/helpers");

passport.serializeUser((user, done) => {
  console.log("serializeUser | user: ", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserializeUser | id: ", id);

  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    console.log(user);
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});

passport.use(
  new Strategy({}, async (username, password, done) => {
    try {
      if (!username || !password) {
        throw new Error("Missing credentials.");
      }

      const userDB = await User.findOne({ username });
      if (!userDB) {
        throw new Error("User not found.");
      }
      const isValid = comparePassword(password, userDB.password);
      if (isValid) {
        console.log("Authenticated Successfully!");
        done(null, userDB);
      } else {
        done(null, null);
      }
    } catch (error) {
      console.log(error);
      done(error, null);
    }
  })
);
