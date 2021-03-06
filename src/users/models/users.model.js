const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
});

const User = mongoose.model('Users', userSchema);

exports.createUser = async (userData) => {
    const user = new User(userData);

    try {
        let emailExists = await User.findOne({ email: userData.email });

        if (emailExists) {
            throw new Error();
        }

        return user.save();
    } catch (err) {
        return;
    }
};

exports.findById = (id) => {
    return User.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.password;
        delete result.__v;
        return result;
    });
};

exports.patchUser = (id, userData) => {
    return User.findOneAndUpdate({
        _id: id
    }, userData);
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            });
    })
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({ _id: userId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        })
    });
};

exports.findByEmail = (email) => {
    return User.find({ email });
};