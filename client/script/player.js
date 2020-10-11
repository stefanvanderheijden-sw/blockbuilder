var nrOfPlants = 3;
var plants = [];
var i = 0;

var branchAngleDNA = {name:"Angle variance",description:"The variance of the angle between branch segments:",valueOld:50,valueNew:0,delta:0}
var sunLoverDNA = {name:"Upwards tendency",description:"The drive this plant has to grow upwards",valueOld:50,valueNew:0,delta:0}
var branchLengthDNA = {name:"Branch length",description:"The length each branch is given",valueOld:50,valueNew:0,delta:0}
var branchOffDNA = {name:"Tendency to branch",description:"The likelyhood that a branch will be created",valueOld:50,valueNew:0,delta:0}
var branchOffAngleDNA = {name:"Branch angle",description:"The angle with which a branch angles off",valueOld:50,valueNew:0,delta:0}
var branchThicknessDNA = {name:"Branch thickness",description:"The thickness of the branch",valueOld:50,valueNew:0,delta:0}
var branchTaperDNA = {name:"Branch taper",description:"The amount of taper each branch will do",valueOld:80,valueNew:0,delta:0}
var branchOffThicknessDNA = {name:"Branch off thickness",description:"The relative thickness of a branch that branches off compared to its parent",valueOld:50,valueNew:0,delta:0}
var leafDNA = {name:"Change of leaf",description:"The chance a branch will have a leaf on it",valueOld:50,valueNew:0,delta:0}
var leafThicknessDNA = {name:"Leaf thickness",description:"The chance a branch will have a leaf on it",valueOld:50,valueNew:0,delta:0}
var leafLengthDNA = {name:"Leaf length",description:"The chance a branch will have a leaf on it",valueOld:50,valueNew:0,delta:0}
var leafCanopyDNA = {name:"Leaf canopy",description:"The tendency of leafes to be focussed near the end of branches",valueOld:50,valueNew:0,delta:0}

var DNA = [];

DNA.push(this.branchAngleDNA);
DNA.push(this.sunLoverDNA);
DNA.push(this.branchLengthDNA);
DNA.push(this.branchOffDNA);
DNA.push(this.branchOffAngleDNA);
DNA.push(this.branchThicknessDNA);
DNA.push(this.branchTaperDNA);
DNA.push(this.branchOffThicknessDNA);
DNA.push(this.leafDNA);
DNA.push(this.leafThicknessDNA);
DNA.push(this.leafLengthDNA);
DNA.push(this.leafCanopyDNA);


// Create the model
var modal = document.getElementById("myModal");
var modelContent = document.getElementById("modelContent")
// Enable the button to open the DNA window
var genMod = document.getElementById("setDNA");
genMod.onclick = function() {
  modal.style.display = "block";
}

// Enable the X to close the window
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it (same as x)
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var GeneticTable = document.createElement("TABLE");
GeneticTable.className = "geneticTable";
modelContent.appendChild(GeneticTable);

var sliders = []
var values = []

function updateGeneticValues() {
  sliders.forEach(function(slider,index) {
    slider.setAttribute('value',Math.round(DNA[index].valueOld,3));
  })
  values.forEach(function(value,index) {
    value.innerHTML = Math.round(DNA[index].valueOld,3);
  })

}

function createDNAModifier(DNA) {
  DNA.forEach(function(DNASample,index){
    var row = GeneticTable.insertRow();
    var DNAName = row.insertCell(0);
    var DNAText = document.createElement('div')
    DNAText.innerHTML = DNASample.name;
    DNAName.appendChild(DNAText);

    var sliderCell = row.insertCell(1);
    var slider = document.createElement("input");
    slider.setAttribute("type","range");
    slider.setAttribute("min","0");
    slider.setAttribute('max','100');
    slider.setAttribute('value','50');
    slider.setAttribute('id',index);
    slider.setAttribute('class','geneticSlider');
    sliderCell.appendChild(slider);

    var sliderValueCell = row.insertCell(2);
    var sliderValue = document.createElement('div');
    // sliderValueCell.appendChild(sliderValue);

    slider.oninput = function() {
      sliderValue.innerHTML = this.value;
    }

    sliders.push(slider);
    values.push(sliderValue);

  })

  updateGeneticValues();

  var setDNAButton = document.createElement("input");
  setDNAButton.setAttribute('type', 'button');
  setDNAButton.setAttribute('value', 'Use this new DNA');
  setDNAButton.setAttribute('class', 'myButton');
  setDNAButton.onclick = modifyDNA;
  modelContent.appendChild(setDNAButton);

}

createDNAModifier(DNA);

function modifyDNA() {
  DNA.forEach(function(DNA,index) {
    DNA.valueOld = parseInt(sliders[index].value);
  })

  var chosenDNAValues = [];
  DNA.forEach(function(DNA) {
    chosenDNAValues.push(DNA.valueOld);
  })



  plants.forEach(function(plant) {
    plant.setDNA(chosenDNAValues);
  })

  modal.style.display = "none";
}

// Create the plant windows
for (i = 0; i < nrOfPlants; i++) {
    plants.push(new plant(i,DNA));
  }