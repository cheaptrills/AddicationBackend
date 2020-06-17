const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const signup = async({username, password}) => {

    let hash = bcrypt.genSaltSync(10);

    let user = new User({
        username: username,
        password: bcrypt.hashSync(password, hash),
    }); 
    let result = await user.save();

    const token = jwt.sign({userId: result._id},"secret");
    return {
        token,user:result
    }
}

const login = async({username, password}) => {

    let user = await User.findOne({
        username
    });

    const match =  await bcrypt.compare(password, user.password);

    if(match){
        let token = jwt.sign({userId: user._id},"secret");
        return {
            token,user
        }
    }

    throw "wrong userinfo";

}

module.exports = {signup,login};