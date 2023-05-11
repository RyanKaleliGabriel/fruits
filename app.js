const mongoose = require('mongoose');
mongoose.set("strictQuery", true)
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true});




//Create a new schema
const fruitSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true},
    rating:{
        type: Number,
        min: 1,
        max:10
    },
    review:  String
});
//Use the schema to create a new model
const Fruit = mongoose.model("Fruit", fruitSchema);

//People schema 
const personSchema = new mongoose.Schema({
    name: String,
    age: Number, 
    favouriteFruit: fruitSchema
});
//People model
const Person = new mongoose.model("Person", personSchema);



//create a new fruit document
const Apple = new Fruit({
    name:"Apple",
    rating:10,
    review: "Pretty solid as a fruit"
});
// Apple.save();

const kiwi = new Fruit({
    name:"Kiwi",
    rating: 10,
    review: "The best fruit"
})
const orange = new Fruit({
    name:"Orange", 
    rating:7,
    review: "Not bad at all"
})


const banana = new Fruit({
    name:"Banana",
    rating:8,
    review:"Sweet"
})
// banana.save()
// kiwi.save();
// orange.save();

Fruit.insertMany([kiwi, Apple, banana, orange], function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Succeccfully saved all the fruits to fruitsDB");
    }
});

const peach = new Fruit({
    name:"Peach",
    rating:6,
})
// peach.save();

//read data
Fruit.find(function(err, allFruits){
    if(err){
        console.log(err);
    }else{
        //closing database connection once you are done
        // mongoose.connection.close();
        console.log(allFruits);
        
        allFruits.forEach(function(fruit){
            console.log(fruit.name)
        })
    }
});


// to validate
const peaches = new Fruit({
    rating:9,
    review:"Peaches are so yummy"
});
// peaches.save()

//Update and delete data
// Fruit.updateOne({_id:"63fd010d09ad293ab0732d7f"}, {review: "Peaches are so yummy"}, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Data updated successfully");
//     }
// });

//Delete a record
// Fruit.deleteOne({name:"Peach"}, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Data deleted successfully");
//     }
// });

const John = new Person({
    name:"John",
    age:37
});
// John.save()

// Person.deleteMany({name:"John"}, function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Deleted successfully")
//     }
// });

//Establishing relationships
const pineapple = new Fruit({
    name: "Pineapple", 
    rating:9,
    review:"IFYKYK"
});
// pineapple.save()
const Amy = new Person({
    name:"Amy",
    age:40,
    favouriteFruit:pineapple
});
// Amy.save()

const mangoes = new Fruit({
    name:"Mangoes",
    rating:10,
    review:"Best in the world"
});
// mangoes.save()

// Person.updateOne({name:"John"}, {favouriteFruit:mangoes}, function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Updated successfully")
//     }
// });