const mongoose = require('mongoose');

main();
console.log("this happens before chickens happens");
async function main() {
    mongoose.connect('mongodb://localhost/newdb');

    const chickenSchema = new mongoose.Schema({
        name: {type: String, required: true},
        age: {type: Number, required: true},
        color: {type: String, required: true},
    })

    const Chicken = mongoose.model("Chicken", chickenSchema);

    const chickens = await Chicken.find();
    console.log(chickens);
}
