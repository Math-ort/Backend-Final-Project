const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connected'); 
    } catch (error) {
        console.error(error);
        throw new Error('could not connect to DB')
    }
};

module.exports =  { dbConnection };

