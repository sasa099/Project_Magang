const { Schema } = require("mongoose");
module.exports = (mongoose) => {

    const UserSchema = mongoose.Schema({
        nama: String,
        username: String,
        email: String,
        password: String,
    }, {
        timestamps: true
    });
    const User = mongoose.model("user", UserSchema);
    return User;
}