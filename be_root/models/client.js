const mongoose = require('mongoose');

const planModel = require('../models/plan')

let currentUser;

var cookie;

const clientModel = mongoose.Schema({
    firstName: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    lastName: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    dateOfBirth: {
        type: String,
        min: 10,
        max: 10,
        required: true
    },
    address: {
        type: String,
        min: 9,
        max: 255,
        required: true
    },
    city: {
        type: String,
        min: 9,
        max: 255,
        required: true
    },
    id: {
        type: String,
        min: 9,
        max: 9,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 5,
        max: 8,
        required: true
    },
    isBusiness: {
        type: Boolean,
        default: false
    },
    plans: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'plans'
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    }
})

const client = mongoose.model('clients', clientModel);

setCookie = (data, req, res) => {
    if (!cookie) {
        cookie = req.session;
        cookie.user = {
            userId: data.userId,
            userName: data.userName
        };
    }
    else {
        cookie.user = data;
    }
}

getCookie = () => {
    return cookie;
}

getCurrentUser = () => {
    return currentUser;
}

AddClient = (data) => {
    var p = new Promise((resolve, reject) => {

        client.findOne({ id: data.id })
            .then((user) => {
                if (user) {
                    return resolve(false);
                }
                else {
                    let tempClient = client({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        dateOfBirth: data.dateOfBirth,
                        address: data.address,
                        city: data.city,
                        id: data.id,
                        password: data.password
                    })
                    //tempClient.save();
                    return resolve(true)
                }
            })
            .catch((err) => {
                return reject(false)
            })
    })
    return p;
}

LoginClient = (data) => {
    var p = new Promise((resolve, reject) => {
        let obj = {
            isSuccess: false,
            userId: '',
            userName: ''
        }
        client.findOne({ id: data.id, password: data.password })
            .then((user) => {
                if (!user) {
                    return resolve(obj);
                }
                else {
                    currentUser = user;
                    obj.isSuccess = true;
                    obj.userId = user._id;
                    obj.userName = user.firstName;
                    return resolve(obj);
                }
            })
            .catch((err) => {
                return reject(false);
            })
    })
    return p;
}

selectPlan = (data) => {
    var p = new Promise((resolve, reject) => {

        planModel.plan.findOne({ name: data.plName })
            .then((planRes) => {
                if (planRes) {
                    console.log(currentUser.plans.length);
                    if ((currentUser.isBusiness && currentUser.plans.length < 3) || (!currentUser.isBusiness && currentUser.plans.length === 0)) {
                        currentUser.plans.push(planRes._id)
                        //currentUser.save();
                        return resolve(true)
                    }
                    else {
                        return resolve(false);
                    }
                }
                else {
                    return resolve(false);
                }
            })
            .catch((err) => {
                return reject(false)
            })
    })
    return p;
}

UserIsConnet = () => {
    if (getCurrentUser()) {
        return true;
    }
    return false;
}

module.exports = {
    AddClient: AddClient,
    LoginClient: LoginClient,
    getCurrentUser: getCurrentUser,
    selectPlan: selectPlan,
    UserIsConnet: UserIsConnet,
    client: client,
    setCookie: setCookie,
    getCookie: getCookie
}