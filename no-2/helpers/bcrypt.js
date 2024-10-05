const bcrypt = require("bcryptjs")
const salt = bcrypt.genSaltSync(8);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt)
} 

const comparePassword = async (password, dbPassword) => {
    return await bcrypt.compare(password, dbPassword)
}

module.exports ={ hashPassword, comparePassword }