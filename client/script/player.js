var nrOfPlants = 4;
var plants = [];
var i = 0;

for (i = 0; i < nrOfPlants; i++) {
    console.log("drawing a plant stage")
    console.log(i);
    plants.push(new plant(i));
  }