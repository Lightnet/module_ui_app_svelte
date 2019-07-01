// ==============================================
//
// Project Name:
//
// Created by: Lightnet
//
// ==============================================
//import { promiseTimeout } from './timeout-promise';
var promiseTimeout = require('./timeout-promise').promiseTimeout;

var express = require('express');
var router = express.Router();
const crypto = require('crypto');
//const util = require('util');

//https://ciphertrick.com/salt-hash-passwords-using-nodejs-crypto/

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
function genRandomString(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function sha512(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
}

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);
}
//saltHashPassword('MYPASSWORD');
//saltHashPassword('MYPASSWORD');

router.get('/',function(req,res){
    res.json({'message' : 'ue4 Successfull'});
});

async function restlogin(gun,username,password){
    return new Promise((resolve, reject) => {
        gun.get('user/'+username).once(function(data, key){
            if(data !=null){
                //console.log(data.salt);
                //console.log(data);
                let passwordData = sha512(password, data.salt);
                if(data.passwordhash == passwordData.passwordHash){
                    //console.log("match password");
                    let salt = genRandomString(16);
                    let saltdata = sha512(username, salt);
                    gun.get('user/'+username).put({sessionhash:saltdata.passwordHash});
                    resolve({message:"passwordpass",sessionhash:saltdata.passwordHash});
                }else{
                    console.log("fail password");
                    resolve({message: "passwordfail"});
                }
            }else{
                console.log("Data Fail!");
                resolve({message:"donotexist"});
            }
        });
    });
}


router.post('/login',async function(req,res){
    console.log("checking ue4 login...");
    let username = "";
    let password = "";

    let msgdata = {
        message : "error"
    }
    console.log(req.params) // unknown
    console.log(req.query) // ue4 varest
    console.log(req.body) // axios

    if(req.query.username != null){
        username = req.query.username;
        password = req.query.password;
    }

    if(req.body.username != null){
        username = req.body.username;
        password = req.body.password;
    }

    if(res.locals.gun != null){
        console.log("gun found!");
        console.log(username + ' : ' + password);
        //sha256('abc').then(hash => console.log(hash));
        let gun = res.locals.gun;

        let userdata = await restlogin(gun,username,password);
        console.log('userdata:');
        console.log(userdata);
        msgdata = userdata;
        //msgdata.sessionhash = userdata.sessionhash;
    }

    //console.log(res.locals.gun);
    //console.log("username:"+ username);
    //console.log(req.params)
    //console.log(req.query.username)
    res.json(msgdata);
});

async function checkuserexist(gun,userdata){
    let lusers = gun.get('users');
    //console.log(userdatas);
    //console.log(lusers.map().once())
    let p1 = new Promise((resolve, reject) => {
        //console.log('List: ')
        lusers.map().once(function(data, key){
            //console.log("Item:", data);
            //console.log("key:", key);
            //console.log('data.username: '+data.username)
            if(data.username == userdata.username){
                //console.log("found! user");
                resolve('true'); // fulfilled
                return;
            }
        });
    });
    //compare 2 result which is time done 
    let promiserace = promiseTimeout(2000,p1);
    return promiserace.then((res) => {
        //console.log("promise");
        //console.log(res);
        return true;
    }).catch(error => {
        // Deal with error
        //console.log("error");
        return false;
    });
}

async function findcheckuser(gun,userdata){
    //let lusers = gun.get('users');
    //console.log(userdatas);
    //console.log(lusers.map().once())
    let p1 = new Promise((resolve, reject) => {
        //gun.get('user/'+userdata.username).not(function(key){
            //console.log("KEY>>>>");
            //console.log('key:'+key)
        //});
        gun.get('user/'+userdata.username).once(function(data, key){
            //console.log("data...");
            //console.log(data);
            //console.log("key...");
            //console.log(key);
            if(data !=null){
                resolve('true');
            }else{
                reject('false');
            }

        });
    });
    //compare 2 result which is time done 
    let promiserace = promiseTimeout(200,p1);
    return promiserace.then((res) => {
        return true;
    }).catch(error => {
        return false;
    });
}

router.post('/register',async function(req,res){
    console.log("checking ue4 register...");
    let username = "";
    let password = "";
    //console.log(req.query) // ue4 varest
    //console.log(req.body) // axios

    if(req.query.username != null){
        username = req.query.username;
        password = req.query.password;
    }

    if(req.body.username != null){
        username = req.body.username;
        password = req.body.password;
    }

    let messagedata = {
        message : 'ue4 Successfull',
        //id:'',
        //session:'',
    }


    if(res.locals.gun != null){
        let gun = res.locals.gun;
        
        //let bfound = await checkuserexist(gun,{username:username,password:password});
        let buser = await findcheckuser(gun,{username:username,password:password});
        console.log('buser>>:'+buser);
        //console.log("bfound:"+bfound);
        if(buser == false){
            //if not found is add to database
            console.log("add users");
            
            let lusers = gun.get('users');

            var salt = genRandomString(16);
            var usersaltdata = sha512(username, salt);
            var idsalt = usersaltdata.passwordHash;
            var passwordData = sha512(password, salt);
            //console.log(passwordData);

            let userdata = {
                salt:salt,
                idsalt:idsalt,
                username:username,
                passwordhash:passwordData.passwordHash,
                session:'',
                sessionhash:'',
            }

            gun.get("user/"+username).put(userdata);
            lusers.set(gun.get("user/"+username));
            messagedata.message = "created";
        }else{
            messagedata.message = "exist";
        }

        //lusers.map().once(function(data, key){
            //console.log("Item:", data);
        //});
        //console.log("gun found!");
        //sha256('abc').then(hash => console.log(hash));
        //var salt = genRandomString(16); /** Gives us salt of length 16 */
        //var passwordData = sha512(password, salt);
        //console.log('UserPassword = '+password);
        //console.log('Passwordhash = '+passwordData.passwordHash);
        //console.log('nSalt = '+passwordData.salt);
        //messagedata.id = "0000";
    }

    //console.log("username:"+ username + " : "  + password);
    //console.log(req.params)
    //console.log(req.query.username)
    res.json(messagedata);
});

/*
router.post('/character',function(req,res){
    res.json({'message' : 'ue4 character'});
});

router.post('/inventory',function(req,res){
    res.json({'message' : 'ue4 inventory'});
});

router.post('/equips',function(req,res){
    res.json({'message' : 'ue4 equips'});
});

router.post('/shop',function(req,res){
    res.json({'message' : 'ue4 shop'});
});

router.post('/skills',function(req,res){
    res.json({'message' : 'ue4 spawn'});
});

router.post('/spawn',function(req,res){
    res.json({'message' : 'ue4 spawn'});
});
*/

module.exports = router;