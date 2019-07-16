const mongoose = require('mongoose');

const planModel = mongoose.Schema({
    name: {
        type: String,
        min: 2,
        max: 25,
        required: true,
        unique: true
    },
    internetGg: {
        type: Number,
        required: true
    },
    minInCountry: {
        type: Number,
        required: true
    },
    minOutCountry: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
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

const plan = mongoose.model('plan', planModel);

getAllPlans = () => {
    var p = new Promise((resolve, reject) => {
        plan.find()
            .then((plans) => {
                return resolve(plans)
            })
            .catch((err) => {
                return reject(false)
            })
    })
    return p;
}

AddPlan = (data) => {

    var p = new Promise((resolve, reject) => {
        plan.findOne({ name: data.planName })
            .then((planResult) => {
                if (planResult) {
                    return resolve(false);
                }
                else {
                    let tempPlan = plan({
                        name: data.planName,
                        internetGg: parseInt(data.internetGg),
                        minInCountry: parseInt(data.minInCountry),
                        minOutCountry: parseInt(data.minOutCountry),
                        price: parseInt(data.price)
                    })
                    tempPlan.save();
                    return resolve(true)
                }
            })
            .catch((err) => {
                return reject(false)
            })
    })
    return p;
}

module.exports = {
    getAllPlans: getAllPlans,
    AddPlan: AddPlan,
    plan: plan
}