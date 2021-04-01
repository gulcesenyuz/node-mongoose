const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected correctly to server');

    var newDish = Dishes({
        name: 'NewPizza',
        description: ' new description',
    });
    newDish.save().then((dish) => {
        console.log(dish);
        // The exec will ensure that this is executed and that 
        //it will return a promise and so that promise will be returned 
        //so that it can then chain the method to the remaining ones.
        return Dishes.find({}).exec();
    })
        .then((dishes) => {
            console.log(dishes);

            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        })


});