const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  const token = signToken(newUser._id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });

  next(new AppError("Theres been an error", 401));
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1 - check if email and password is correct
  if (!email || !password) {
    return next(new AppError("Please provide Email and Password", 400));
  }
  //2 - check if user exists and password is correct
  const user = await User.findOne({ email }).select("password");
  const passwordMatch = await user.passwordMatch(password, user.password);

  if (!user || !passwordMatch) {
    return next(new AppError("Email or password incorrect", 401));
  }
  //3 - if everything is okay, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protectAccess = catchAsync(async (req, res, next) => {
  let token;
  //1 - Getting token and checking if it exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);

  if (!token) {
    return next(
      new AppError("You are not loged in. Please login to gain access ", 401)
    );
  }
  //2 - verification of token: check if the token we get from request is same as token assigned to the user in the database

  //promisify the jwt.verify function why??
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //3 - check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("Token does not belong to this user ", 401));
  }
  //4  check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  //Grant access to restricted route
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
