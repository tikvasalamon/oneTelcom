const express = require('express');
const router = express.Router();
const clientModel = require('../models/client');
const clientVal = require('../validator/ClientVal')

const CheckLogin = (req, res, next) => {
    if (clientModel.UserIsConnet()) {
        next();
    }
    else {
        res.status(404).json({ 'err': 'Page not found!' });
    }
}

router.post('/register', (req, res) => {
 
    let { errors, isValid } = clientVal.registerValidator(req.body);
    if (!isValid) return res.status(207).json({valErrors: errors});

    clientModel.AddClient(req.body)
        .then((data) => {
            if (data) {
                res.status(201).json({ succeeded: 'The register succeeded!' });
            }
            else {
                res.status(207).json({ registerError: 'The client exists!' });
            }
        })
        .catch((err) => { res.status(500).json({ error: err }); })
});

router.post('/login', (req, res) => {
    clientModel.LoginClient(req.body)
        .then((data) => {
            if (data.isSuccess) {
                clientModel.setCookie(data, req, res)
                res.status(201).json({ succeeded: 'The login succeeded!' });
            }
            else {
                res.status(207).json({ loginError: 'One or more of the details are wrong!' });
            }
        })
        .catch((err) => { res.status(500).json({ error: err }); })
});

router.post('/selectPlan',CheckLogin, (req, res) => {
    clientModel.selectPlan(req.body)
        .then((data) => {
            if (data) {
                res.status(201).json({ succeeded: 'The plan selecting succeeded!' });
            }
            else {
                res.status(207).json({ planSelectError: 'You cant add more plans!' });
            }
        })
        .catch((err) => { res.status(500).json({ error: err }); })
})

router.get('/me', (req, res) => {
    res.status(200).json(clientModel.getCookie());
});

module.exports = router;