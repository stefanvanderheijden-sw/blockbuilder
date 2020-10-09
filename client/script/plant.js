class plant {
    constructor(number) {
        this.width = 400;
        this.height = 500;
        this.number = number;
        this.svgns = "http://www.w3.org/2000/svg"

        this.plantbox = document.createElement("div");
        this.plantbox.className = "plantbox";
        this.svg = document.createElementNS(this.svgns,"svg");
        this.svg.setAttribute("class", "svgPlant");
        this.svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        this.svg.setAttribute("width", this.width.toString());
        this.svg.setAttribute("height", this.height.toString());

        const wrapper = document.getElementById("wrapper")
        wrapper.appendChild(this.plantbox); 
        this.plantbox.appendChild(this.svg);

        // this.context = this.canvas.getContext('2d');

        this.grassColor = '#91c4b2';
        this.potColor = '#c2956c';
        this.branchColor = '#86592e'; 

        this.stamina = 600;
              
        this.branchAngleDNA = {name:"Angle variance",description:"The variance of the angle between branch segments:",valueOld:50,valueNew:0}
        this.sunLoverDNA = {name:"Upwards tendency",description:"The drive this plant has to grow upwards",valueOld:50,valueNew:0}
        this.branchLengthDNA = {name:"Branch length",description:"The length each branch is given",valueOld:50,valueNew:0}
        this.branchOffDNA = {name:"Tendency to branch",description:"The likelyhood that a branch will be created",valueOld:50,valueNew:0}
        this.branchOffAngleDNA = {name:"Branch angle",description:"The angle with which a branch angles off",valueOld:50,valueNew:0}
        this.branchThicknessDNA = {name:"Branch thickness",description:"The thickness of the branch",valueOld:50,valueNew:0}
        this.leafDNA = {name:"Change of leaf",description:"The chance a branch will have a leaf on it",valueOld:50,valueNew:0}
        this.leafThicknessDNA = {name:"Leaf thickness",description:"The chance a branch will have a leaf on it",valueOld:50,valueNew:0}
        this.leafLengthDNA = {name:"Leaf length",description:"The chance a branch will have a leaf on it",valueOld:50,valueNew:0}

        this.DNA = [];

        this.DNA.push(this.branchAngleDNA);
        this.DNA.push(this.sunLoverDNA);
        this.DNA.push(this.branchLengthDNA);
        this.DNA.push(this.branchOffDNA);
        this.DNA.push(this.branchOffAngleDNA);
        this.DNA.push(this.branchThicknessDNA);
        this.DNA.push(this.leafDNA);
        this.DNA.push(this.leafThicknessDNA);
        this.DNA.push(this.leafLengthDNA);

        this.DNATable = document.createElement("TABLE");
        this.DNATable.className = "cinereousTable";
        var firstRow = this.DNATable.insertRow();
        var header = firstRow.insertCell(0);
        header.innerHTML = "<b>DNA</b>";

        var oldDNA = firstRow.insertCell(1);
        oldDNA.innerHTML = "<b>OLD</b>";

        var newDNA = firstRow.insertCell(2);
        newDNA.innerHTML = "<b>NEW</b>";

        this.button = document.createElement('input');
        this.button.setAttribute('type','button');
        this.button.setAttribute('id',number);
        this.button.setAttribute('value', 'Share genes');
        this.button.className = "myButton";
        this.button.onclick = this.passGenes;
        this.plantbox.appendChild(this.button);
        this.plantbox.appendChild(this.DNATable);

        this.geneticErrors();
        this.displayDNA(this.plantbox);
        this.drawGround();
        this.drawPot();

        this.startTree();
    }

    geneticErrors() {
        this.DNA.forEach(function(DNASAMPLE) {
            var rand = (-0.5+Math.random())*4;
            DNASAMPLE.valueNew = DNASAMPLE.valueOld + rand;
        });
    }

    displayDNA() {
        var DNATable = this.DNATable;
        this.DNA.forEach(function(DNASample) {
            var row = DNATable.insertRow();
            
            var title = row.insertCell(0);
            title.innerHTML = DNASample.name;
    
            var oldDNA = row.insertCell(1);
            oldDNA.innerHTML = DNASample.valueOld.toFixed(2);
    
            var newDNA = row.insertCell(2);
            newDNA.innerHTML = DNASample.valueNew.toFixed(2);
        });
    }

    resetDisplayDNA() {

        for (i = 0; i < this.DNA.length; i++) {
            this.DNATable.deleteRow(1);
        }
    
    }

    drawGround() {
        var ground = document.createElementNS(this.svgns, 'circle');
        ground.setAttributeNS(null, 'cx', this.width/2);
        ground.setAttributeNS(null, 'cy', this.height*2.1);
        ground.setAttributeNS(null, 'r', this.height*1.2);
        ground.setAttributeNS(null, 'fill', this.grassColor);
        this.svg.appendChild(ground);
    }

    translate(x,y) {
        var str = "translate("+x+","+y+")"
        return str;
    }

    rotate(angle) {
        var str = "rotate("+angle+")"
        return str;
    }

    branch(x,y,length,angle,thickness) {
        var branch = document.createElementNS(this.svgns, 'line');
        branch.setAttributeNS(null, 'class', "GrowPlant"+this.number);
        branch.setAttributeNS(null, 'x1' , 0);
        branch.setAttributeNS(null, 'y1' , 0);
        branch.setAttributeNS(null, 'x2' , length);
        branch.setAttributeNS(null, 'y2' , 0);
        branch.setAttributeNS(null, 'stroke-width', thickness);
        branch.setAttributeNS(null, 'stroke', this.branchColor);
        branch.setAttributeNS(null, 'stroke-linecap', "round");
        branch.setAttributeNS(null, 'transform', this.translate(x,y) + this.rotate(angle));
        this.svg.appendChild(branch);
    } 

    leaf(x,y,length,angle,thickness) {
        if (this.stamina > 0 ) {
            var leafWidth = (0.75 + (Math.random()/2)) * (this.leafThicknessDNA.valueNew)/5
            var leafLength = (0.75 + (Math.random()/2)) * this.leafLengthDNA.valueNew/3

            var leafLeft = document.createElementNS(this.svgns, 'path');
            leafLeft.setAttributeNS(null, 'd', "M 0 0 Q "+leafLength/2+" "+leafWidth+" "+leafLength+" 0" )
            leafLeft.setAttributeNS(null, 'class', "GrowPlant"+this.number);
            leafLeft.setAttributeNS(null, 'fill','green');
            leafLeft.setAttributeNS(null, 'transform', this.translate(x,y) + this.rotate(angle));
            leafLeft.setAttributeNS(null,'fill-opacity' , 0.5);
            var leafRight = document.createElementNS(this.svgns, 'path');
            leafRight.setAttributeNS(null, 'd', "M 0 0 Q "+leafLength/2+" "+-leafWidth+" "+leafLength+" 0" )
            leafRight.setAttributeNS(null, 'class', "GrowPlant"+this.number);
            leafRight.setAttributeNS(null, 'fill','green');
            leafRight.setAttributeNS(null, 'transform', this.translate(x,y) + this.rotate(angle));
            leafRight.setAttributeNS(null,'fill-opacity' , 0.5);
            this.svg.appendChild(leafLeft);
            this.svg.appendChild(leafRight);
            this.stamina -= 1;
        }
    }

    drawPot() {
        var pot = document.createElementNS(this.svgns, 'polygon');
        pot.setAttributeNS(null, 'points', "-30,-30 30,-30 20,20 -20,20");
        pot.setAttributeNS(null, 'class', "GrowPlant"+this.number);
        pot.setAttributeNS(null, 'fill', this.potColor);
        pot.setAttributeNS(null, 'transform', this.translate((this.width/2),this.height*0.9));
        this.svg.appendChild(pot);
        
    }

    toRadians (angle) {
        return angle * (Math.PI / 180);
      }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    startTree() {
        this.growBranch((this.width/2),(this.height*0.84),7,270,(this.branchThicknessDNA.valueNew/5),this.branchLengthDNA.valueNew/2);
        this.drawPot();
    }

    takeChance(fraction) {
        var sides = (Math.pow(fraction, -1))
        var randomNumber = Math.random() * sides;
        if (randomNumber > sides -1) {
            return true;
        } else {
            return false;
        }
    }

    async growBranch(intx,inty,length,intangle,thickness,qty) {
        var x = intx;
        var y = inty;
        var angle = intangle;
        var q = 0;
        var deltaA = 0;
        var correction = 0;
        var tempQty = qty;
        //Before the branch starts growing, we should calculate how much branches it will probably have

        //The qty of branch parts should be taken into account (the length)

        //The basic DNA value is 50. This should lead to average one branch.
        var numberOfBranches = (this.branchOffDNA.valueNew / 50)

        //Every segment has a fraction of a chance of a branch, depending on the length of the branch and the branches per branch
        var branchChancePerSegment = (numberOfBranches / tempQty)




        for (q = 0; q < qty; q++) {
            if (this.stamina > 0) {

                numberOfBranches = (this.branchOffDNA.valueNew / 50)
                branchChancePerSegment = (numberOfBranches / tempQty)
                tempQty --;

                this.branch(x,y,length,angle,thickness);
                thickness -= 2*(thickness/qty);
                // if (thickness < 2) {
                //     this.stamina += 2;
                //     this.leaf(x,y,10,angle,thickness);
                //     return;
                // }
                x += Math.cos(this.toRadians(angle))*length;
                y += Math.sin(this.toRadians(angle))*length;
                
                // Adjust the angle randomly using its angle DNA
                angle += (-0.5+Math.random())*this.branchAngleDNA.valueNew;

                // Adjust the angle randomly towards the sun using its sun lover DNA
                deltaA = 270 - angle;
                correction = ((deltaA/700) * (this.sunLoverDNA.valueNew));
                angle += correction;

                // Roll the dice to see if this branch will branch off
                // The branch should be created inside a branch


                if (this.takeChance(branchChancePerSegment)) {
                    // numberOfBranches --;
                    var branchOffAngle = Math.random() * (this.branchOffAngleDNA.valueNew*1.2);
                    if (Math.random() > 0.5) {
                        branchOffAngle = -branchOffAngle;
                    }

                    branchOffAngle += angle;

                    this.growBranch(x,y,7,branchOffAngle,thickness,parseInt((thickness*this.branchLengthDNA.valueNew)/10));
                }

                // Roll the dice to see if this branch will have a leaf
                var randomLeaf = Math.random();
                randomLeaf *= (this.leafDNA.valueNew);
                if (randomLeaf > 45) {
                    if (Math.random() > 0.5) {
                        this.leaf(x,y,10,angle+90,thickness);
                    } else {
                        this.leaf(x,y,10,angle-90,thickness);
                    }

                }

                await this.sleep(10);
                this.stamina --;

                if (qty < 2) {
                    this.stamina += 2;
                    this.leaf(x,y,10,angle,thickness);
                }
            }
            else {
                // x += Math.cos(this.toRadians(angle))*length;
                // y += Math.sin(this.toRadians(angle))*length;
                this.stamina += 2;
                this.leaf(x,y,10,angle,thickness);
                return;
            }
          }
        return;
    }

    resetPlant(){
        var elements = document.getElementsByClassName("GrowPlant"+this.number);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    setDNA(newDNA){
        this.DNA.forEach(function(DNA,index) {
            DNA.valueOld = newDNA[index];
        })
        this.geneticErrors();
        this.resetDisplayDNA();
        this.displayDNA();
        this.resetPlant();
        this.stamina = 600;
        this.startTree();

    }

    getDNA(){
        var winningDNAValues = [];
        this.DNA.forEach(function(DNA) {
            console.log("Adding a DNA to the set")
            winningDNAValues.push(DNA.valueNew);
        })
        return winningDNAValues;
    }

    passGenes(){
        var button = this.id;
        console.log(button);
        var chosenPlantDNA = window.plants[button].getDNA();

        window.plants.forEach(function(plant) {
            plant.setDNA(chosenPlantDNA);
        });
    }
}