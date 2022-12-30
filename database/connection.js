const mongoose=require('mongoose')
mongoose.set('strictQuery',false)
const dotenv=require('dotenv')

dotenv.config();
const uri=process.env.connectionString

async function connection(){
  try{
    await mongoose.connect(uri)
    console.log("connection successfully established");
  }
  catch(error){
    console.log(error);
  }
}

module.exports={connection:connection}









