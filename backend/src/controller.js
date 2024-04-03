// controller.js

const User = require("./module");

const createuser = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const newUser = new User({
      name,
      username,
      email,
      password,
      diary: [{ title: "Cover Page", description: "Cover page Description" }],
    });
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `User not created. Error: ${error.message}` });
  }
};

//for login user
const loginuser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    // console.log(user);

    // If user is not found, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided password matches the user's password
    let isPasswordMatch = false;
    if (password == user.password) {
      isPasswordMatch = true;
    }
    // const isPasswordMatch = await user.comparePassword(password);

    // If passwords don't match, return an error
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // If user is found and password matches, return the username
    res
      .status(200)
      .json({ name: user.name, username: user.username, email: user.email });
    isPasswordMatch = false;
  } catch (error) {
    console.log(error);
    // If an error occurs during the process, return a 500 status with an error message
    res.status(500).json({ message: `Login failed. Error: ${error.message}` });
  }
};

const addDiaryPage = async (req, res) => {
  const username = req.params.username;
  const { title, description } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentDate = new Date().toISOString().split("T")[0]; // Extract only the date part

    // Push the new diary entry to the user's diary array with the current date
    user.diary.push({ title, description, date: currentDate });

    user.save();
    res.status(200).json({ message: "Diary entry added successfully", user });
  } catch (error) {
    // If an error occurs during the process, return a 500 status with an error message
    res
      .status(500)
      .json({ message: `Error adding diary entry: ${error.message}` });
  }
};

// for geting user diary pages

const getPages = async (req, res) => {
  const username = req.params.username;
  // console.log(username);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json(user.diary);
    }
    //  console.log(user.diary);
  } catch (error) {
    res.status(500).json({ message: `error finding user: ${error.message}` });
  }
};

module.exports = {
  createuser,
  addDiaryPage,
  loginuser,
  getPages, // exporting the createuser function
};
