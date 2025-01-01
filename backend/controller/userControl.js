//model mongodb
const User = require("../models/user")
;
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/jwtToken");

//crear un nuevo usuario
const createUser = async (req, res) => {
  const { email, password, firstName, secondName } = req.body;
  try {
    const findUser = await User.findOne({ email: email });
    if (findUser) { 
      return res.status(400).json({ error: "El usuario ya existe" });
    } 
    if (!firstName || !secondName || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstName,
        secondName,
        email,
        password: hashedPassword,
      });
      const userSaved = await newUser.save();

      const token = generateToken(newUser._id);

        res.json({
          message: "Usuario creado correctamente",
          user: {
            id: userSaved._id,
            email: userSaved.email,
            firstName: userSaved.firstName,
            secondName: userSaved.secondName,
          },
          token,
        });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};

//login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const userLogin = await User.findOne({ email });

    if (!userLogin) {
      return res.status(400).json({
        message: "El usuario no se encontró",
      });
    }
    const isMatch = await bcrypt.compare(password, userLogin.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Contraseña incorrecta",
      });
    }

    const token = await generateToken({ id: userLogin._id });

    res.cookie("token", token);
    res.json({
      user: {
        id: userLogin._id,
        email: userLogin.email,
        firstName: userLogin.firstName,
        secondName: userLogin.secondName,
      },
      message: "Inicio de sesión exitoso",
    });
  } catch (error) {
    console.error("Error en login:", error);

    res.status(500).json({
      message: "Error en el inicio de sesión",
      error: error.message || error,
    });
  }
});

//logout
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.status(200);
});
//actualizar usuario
const updateaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        email: req.body.email,
        password: req.body.password,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

//obtener todo los usuarios
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});
// obtener un solo usuario
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
};
//borrar usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getAllUser,
  getUser,
  deleteUser,
  updateaUser,
};
