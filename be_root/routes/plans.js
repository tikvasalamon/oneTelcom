const express = require('express');
const router = express.Router();
const planModel = require('../models/plan');
const planVal = require('../validator/PlanVal')
const clientModel = require('../models/client')

const CheckLogin = (req, res, next) => {
    if (clientModel.UserIsConnet()) {
        next();
    }
    else {
        res.status(404).json({ 'err': 'Page not found!' });
    }
}

router.post('/createPlan', (req, res) => {
    console.log(req.body)
    let { errors, isValid } = planVal.createPlanValidator(req.body);
    if (!isValid) return res.status(207).json({ valErrors: errors });


    planModel.AddPlan(req.body)
        .then((data) => {
            if (data === true) {
                res.status(201).json({ succeeded: 'The plan creating succeeded!' });
            }
            else {
                res.status(207).json({ creatPlanError: 'The plan exists!' });
            }
        })
        .catch((err) => { res.status(500).json({ error: err }); })

});

router.get('/allPlans',CheckLogin, (req, res) => {
    planModel.getAllPlans()
        .then((allPlans) => {
            res.status(200).json(allPlans);
        })
        .catch((err) => { res.status(500).json({ error: err }); })
})

module.exports = router;