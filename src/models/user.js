const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function todaysDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        // minlength: 3,
    },
    lname: {
        type: String,
        required: true,
        // minlength: 3,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        // validator: {
        //     validate: (value) => {
        //         if (!validator.isEmail(value)) {
        //             return false;
        //         }
        //         return true;
        //     }
        // }
    },
    mobile: {
        type: Number,
        required: true,
        // validator: {
        //     validator: (value) => {
        //         if (isMobilePhone(value, ['en-IN']) == false) {
        //             return false;
        //         }
        //         return true;
        //     }
        // }
    },
    dob: {
        type: Date,
        // min: '2000-01-01',
        // max: todaysDate()
    },
    password: {
        type: String,
        // validator: {
        //     validate: (value)=>{
        //         return isStrongPassword(value);
        //     }
        // },
        required: true
    },
    // confPassword: {
    //     type: String,
    //     required: true
    // },
    tokens: [{
        token: {
            type: String,
            // required: true
        }
    }]
});

userSchema.methods.generateToken= async function (){
    try {
        const token=await jwt.sign({_id: this.id.toString()},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token: token});
        return token;
    } catch (error) {
        console.log('token not generated');
        return error;
    }
}

userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            console.log(`password is ${this.password}`);
            this.password = await bcrypt.hash(this.password, 10);
            console.log(`now password is ${this.password}`);
        }
    } catch (e) {
        console.log(e);
    }
    this.confPassword = undefined;
    next();
});

const User = new mongoose.model('User', userSchema);

module.exports = User;