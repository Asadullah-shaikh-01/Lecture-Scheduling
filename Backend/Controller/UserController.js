import UserModels from '../Models/UserModels.js';
import JWT from 'jsonwebtoken'
import { comparePassword, hashPassword } from '../Util/helpser.js';

export const registerController = async (req, res) => {
  try {
    const { UserName, Email, Password } = req.body;
    //validations
    if (!UserName) {
      return res.status(400).send({ message: "Name is Required" });
    }
    if (!Email) {
      return res.status(400).send({ message: "Email is Required" });
    }
    if (!Password) {
      return res.status(400).send({ message: "Password is Required" });
    }

    // Checking User
    const exisitingUser = await UserModels.findOne({ Email })
    // existing User
    if (exisitingUser) {
      return res.status(409).send({
        success: true,
        message: "User already Register please Login",
      });
    }

    // Register
    const hashedPassword = await hashPassword(Password);
    //save
    const User = await new UserModels({
      UserName,
      Email,
      Password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Succesfully",
      User,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registions",
      error,
    });
  }
};

// login controller
export const loginController = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).send({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await UserModels.findOne({ Email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not founded"
      })
    }

    const match = comparePassword(Password, user.Password)
    if (!match) {
      return res.status(401).send({
        success: true,
        message: "Password not valid"
      })
    }

    // token base Authenticaions

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "User Login Sucessfully",
      user: {
        UserName: user.UserName,
        Email: user.Email,
        Role: user.Role,
      },
      token,
    })

  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "internal server Error"
    })

  }
}

export const testController = async (req, res) => {
  return res.status(200).send({
    success: true,
    message: "Test Link"
  })
}



















