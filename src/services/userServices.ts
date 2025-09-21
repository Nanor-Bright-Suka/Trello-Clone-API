const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { withAccelerate } = require("@prisma/extension-accelerate");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient().$extends(withAccelerate());

const registerUserService = async (username: string, password: string, email: string) => {
  // 1. Check if email exists
  const emailAlreadyExists = await prisma.user.findUnique({
    where: { email }
  });

  if (emailAlreadyExists) {
    return {
      success: false,
      status: 409,
      message: "Email already exists"
    };
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create user
  const newUser = await prisma.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword
    }
  });

  if (!newUser) {
    return {
      success: false,
      status: 500,
      message: "User creation failed"
    };
  }

  // 4. Return success
  return {
    success: true,
    status: 201,
    message: "User created successfully",
    data: {
      email: newUser.email,
      name: newUser.name
    }
  };
};




const loginUserService = async (email: string, password: string) => {
  // 1. Find user by email
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return {
      success: false,
      status: 401,
      message: "Invalid email"
    };
  }

  // 2. Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      success: false,
      status: 401,
      message: "Invalid password"
    };
  }

  // 3. Generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }  //bro, change this ):
  );

  // 4. Return success response
  return {
    success: true,
    status: 200,
    message: "Login successful",
    data: {
      email: user.email,
      name: user.name,
      token,
     
    }
  };
};
module.exports = {registerUserService, loginUserService}  