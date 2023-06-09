const config = require('../config/index');
const expressJwt = require('express-jwt');
const adminService = require('../services/admin.service');
const userService = require('../services/user.service');
const sellerService = require('../services/seller.service');


module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked, algorithms: ['HS256'] }).unless({
        path: [

            //common
            /\/documentation*/,
            /\/uploads*/,
            /\/front*/,
            /\/community\/front*/,
            /\/twitter*/,

            //admin
            '/admin/login',
            '/admin/signup',
            '/admin/forgot-password',
            '/admin/reset-password',

            //user
            '/user/login',
            '/user/social-login',
            '/user/signup',
            '/user/forgot-password',
            '/user/reset-password',

            //seller
            '/seller/login',
            '/seller/signup',
            '/seller/countries',
            '/seller/states',
            '/seller/social-login',
            '/seller/forgot-password',
            '/seller/reset-password'

        ]
    });
}

async function isRevoked(req, payload, done) {

    const url = req.originalUrl;

    //check user is admin
    if (url.includes('admin/') == true) {
        const adminUser = await adminService.getById(payload.id);
        if (!adminUser) {
            return done(null, true);
        }
        done();
    }
    //check user is user(buyer)
    else if (url.includes('user/') == true) {
        let param = { id: payload.id, role: "user" };
        const user = await userService.getUserByRole(param);
        if (!user) {
            return done(null, true);
        }
        done();
    }
    //check user is seller
    else if (url.includes('seller/') == true) {
        let param = { id: payload.id, role: "seller" };
        const seller = await sellerService.getUserByRole(param);
        if (!seller) {
            return done(null, true);
        }
        done();
    }
    //check user is either user or seller for community module
    else if (url.includes('community/') == true) {
        //seller
        let param = { id: payload.id, role: "seller" };
        const seller = await sellerService.getUserByRole(param);

        if (seller) {
            done();
        } else {
            //user
            let param2 = { id: payload.id, role: "user" };
            const user = await userService.getUserByRole(param2);

            if (user) {
                done();
            } else {
                return done(null, true);
            }
        }

    } else {
        return done(null, true);
    }
};