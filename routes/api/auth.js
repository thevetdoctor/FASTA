const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth= require('../../middleware/auth');

router.post('/', (req, res)=>{
    const { email, password} = req.body;

    //validation
    if(!email || !password){
        return res.status(400).json({msg: 'please enter all field'});       
    }

    //check for exixting user
    User.findOne({ email})
        .then(user => {
            if(!user) return res.status(400).json({msg: 'User Does not exists'});

           //validate password
           bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({msg:'Invalid Credentials'});

                jwt.sign(
                    {id: user.id},
                    config.get('jwtSecret'),
                    { expireIn: 3600},
                    (err, token) =>{
                        if(err) throw err;
                        res.json({
                            token,
                            user:{
                                id: user.id,
                                name: user.name,
                                email:user.email
                            }
                        });
                    }
                )
            });
        })
});
//@route Get api/auth/user
router.get('/user', auth, (req, res) =>{
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});
module.exports = router;
