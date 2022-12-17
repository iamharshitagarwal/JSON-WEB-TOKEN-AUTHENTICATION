const userModel = require("../modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;


//SIGNUP ----------------------------------------------------------------------------

const signup = async (req, res) => {

    //1. Existing User Check
    //2. Hashed Password
    //3. User Create
    //4. Token Generate

    const { username, password, email } = req.body;
    try {

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists." })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username

        });

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({ user: result, token: token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });

    }
}


//SIGNIN ----------------------------------------------------------------------------

const signin = async (req, res) => {


    //1. Existing User Check
    //2. Match & Compare Password
    //3. Token Generate

    const { email, password } = req.body;
        try {
            const existingUser = await userModel.findOne({ email: email });
            if (!existingUser) {
                return res.status(404).json({ message: "User not found!" });
            }

            const matchPassword = await bcrypt.compare(password, existingUser.password);

            if (!matchPassword) {
                return res.status(404).json({ message: "Invalid Credentials" });
            }

            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
            res.status(200).json({ user: existingUser, token: token })


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something Went Wrong!" })
    }

}


module.exports = { signin, signup };