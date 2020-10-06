var nrOfPlants = 3;
var plants = [];
var selectedGenes = [];
var i = 0;
for (i = 0; i < nrOfPlants; i++) {
    console.log("drawing a plant stage")
    plants.push(new plant(i));
  }

function passGenes() {
  var elements = document.getElementsByClassName("DNALabel");
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
  
  var tempCounter = this.id;
  var DNATemp = plants[tempCounter].getDNA();
  window.selectedGenes = DNATemp;
  console.log("-----------------")
  console.log(window.selectedGenes[0].value);
  console.log(window.selectedGenes[1].value);
  console.log(this.id);

  window.plants.forEach(function(tempplant) {
      tempplant.setGenes(window.selectedGenes);
      console.log(window.selectedGenes[0].value);
      console.log(window.selectedGenes[1].value);
      // tempplant.geneticErrors();
  }); 
}