const mongoose = require('mongoose');

const dbconection = async()=>{
     
    try {

        await mongoose.connect( process.env.MONGODB_COMPASS,{
           
        });

        console.log('Db online');


    }catch(err){
        console.log(err);
        throw new Error('error al iniciar la DB');
    }

}



module.exports = {
    dbconection
}