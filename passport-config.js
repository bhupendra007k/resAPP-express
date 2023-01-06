const LocalStrategy=require('passport-local').Strategy
const bcrypt=require('bcryptjs')
const Teachers = require('./models/Teachers')

function initialize(passport){
    const authenticateUser=async(name,password,done)=>{
        const user= await Teachers.findOne({name:name})
        if(user==null){
            return done(null,false,{message:"No user Found"})
        }

        try{
            if(bcrypt.compare(password,user.passwordHash)){
                return done(null,user)

            }
            else{
                return done(null,false,{message:"password did not match"})
            }

        }
        catch(err){
            return done(err)

        }

    }
passport.use(new LocalStrategy({usernameField:'name'},authenticateUser)) 
passport.serializeUser((user,done)=>done(null,user._id))
passport.deserializeUser(async(_id,done)=>{
    return done(null,await Teachers.findOne({_id}))
})
     

}

module.exports=initialize