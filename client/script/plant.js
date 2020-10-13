class plant {
    constructor(number,DNA) {
        this.width = 450;
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

        this.grassColor = '#83c590';
        this.potColor = '#f9af71';
        this.branchColor = '#686154'; 
        this.leafColor = '#69a055';
        this.blossomcolor = '#f68fe0'

        this.stamina = 200;
        this.DNA = DNA;
        this.updateFullDNA(this.DNA);

        this.DNATable = document.createElement("TABLE");
        this.DNATable.className = "cinereousTable";
        var firstRow = this.DNATable.insertRow();
        var header = firstRow.insertCell(0);
        header.innerHTML = "<b>DNA Name</b>";

        var oldDNA = firstRow.insertCell(1);
        oldDNA.innerHTML = "<b>Old DNA</b>";

        var oldDNA = firstRow.insertCell(2);
        oldDNA.innerHTML = "<b>Change</b>";

        var newDNA = firstRow.insertCell(3);
        newDNA.innerHTML = "<b>New DNA</b>";

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
        // this.drawGround();
        this.drawPot();

        this.startTree();
    }

    updateFullDNA(fullDNA) {
        this.branchAngleDNA = fullDNA[0];
        this.sunLoverDNA = fullDNA[1];
        this.branchLengthDNA = fullDNA[2];
        this.branchOffDNA = fullDNA[3];
        this.branchOffAngleDNA = fullDNA[4];
        this.branchThicknessDNA = fullDNA[5];
        this.branchTaperDNA = fullDNA[6];
        this.branchOffThicknessDNA = fullDNA[7];
        this.leafDNA = fullDNA[8];
        this.leafThicknessDNA = fullDNA[9];
        this.leafLengthDNA = fullDNA[10];
        this.leafCanopyDNA = fullDNA[11];
        this.leafAngleDNA = fullDNA[12];

    }

    geneticErrors() {
        this.DNA.forEach(function(DNASAMPLE) {
            var rand = (-0.5+Math.random())*5;
            DNASAMPLE.valueNew = DNASAMPLE.valueOld + rand;
            if (DNASAMPLE.valueNew > 100) {
                DNASAMPLE.valueNew = 100;
            }
            if (DNASAMPLE.valueNew < 0) {
                DNASAMPLE.valueNew = 0;
            }

            DNASAMPLE.delta =  DNASAMPLE.valueNew - DNASAMPLE.valueOld 
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

            var deltaDNA = row.insertCell(2);

            if (DNASample.delta > 0) {
                deltaDNA.className = 'pos';
                deltaDNA.innerHTML = '+' + DNASample.delta.toFixed(2);
            } else {
                deltaDNA.className = 'neg'; 
                deltaDNA.innerHTML = DNASample.delta.toFixed(2);
            }

    
            var newDNA = row.insertCell(3);
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

    leaf(x,y,length,angle,thickness,color) {
        if (this.stamina > 0 ) {
            // var leafWidth = (0.75 + (Math.random()/2)) * (this.leafThicknessDNA.valueNew/2)
            // var leafLength = (0.75 + (Math.random()/2)) * (this.leafLengthDNA.valueNew/2)

            var leafWidth = thickness;
            var leafLength = length;

            var leafLeft = document.createElementNS(this.svgns, 'path');
            leafLeft.setAttributeNS(null, 'd', "M 0 0 Q "+leafLength/2+" "+leafWidth+" "+leafLength+" 0" )
            leafLeft.setAttributeNS(null, 'class', "GrowPlant"+this.number);
            leafLeft.setAttributeNS(null, 'fill',color);
            leafLeft.setAttributeNS(null, 'transform', this.translate(x,y) + this.rotate(angle));
            leafLeft.setAttributeNS(null,'fill-opacity' , 0.7);
            var leafRight = document.createElementNS(this.svgns, 'path');
            leafRight.setAttributeNS(null, 'd', "M 0 0 Q "+leafLength/2+" "+-leafWidth+" "+leafLength+" 0" )
            leafRight.setAttributeNS(null, 'class', "GrowPlant"+this.number);
            leafRight.setAttributeNS(null, 'fill',color);
            leafRight.setAttributeNS(null, 'transform', this.translate(x,y) + this.rotate(angle));
            leafRight.setAttributeNS(null,'fill-opacity' , 0.7);
            this.svg.appendChild(leafLeft);
            this.svg.appendChild(leafRight);
            this.stamina -= 1;
        }
    }

    blossom(x,y,angle,blossomQty) {
        var blossomQty = 5;
        var spread = 180;
        var length = 30;
        var thickness = 10;
        var t = 0;
        for (t = 0; t < blossomQty; t++) {
            // var leafAngle = ((spread/(blossomQty)*(t+1))-(spread/2));
            var leafAngle = spread * (blossomQty/2);
            this.leaf(x,y,length,angle+leafAngle,thickness,this.blossomcolor);
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
        var self = this;
        var x = intx;
        var y = inty;
        var angle = intangle;
        var q = 0;
        var deltaA = 0;
        var correction = 0;
        var tempQty = qty;
        var remainingLength = qty;
        var initialThickness = thickness;
        //Before the branch starts growing, we should calculate how much branches it will probably have

        //The qty of branch parts should be taken into account (the length)

        //The basic DNA value is 50. This should lead to average of two branches.
        var numberOfBranches = Math.round((this.branchOffDNA.valueNew / 25));

        var branchArray = [];
        var p = 0;
        for (p = 0; p < numberOfBranches; p++) {
            branchArray.push(Math.round((tempQty/numberOfBranches)*(1+p)));
          }

        // When the branch is created, calculate the number of leaves on the branch
        var numberOfLeaves = Math.round((this.leafDNA.valueNew/10));

        // Using the thickness of the initial branch and the canopy DNA, calculate the minimal thickness of a branch to start leaves
        var startThickness = ((100-this.leafCanopyDNA.valueNew)/100)*(this.branchThicknessDNA.valueNew/5);

        var q = 0;
        for (q = 0; q < qty; q++) {
            if (this.stamina > 0) {

                // Create a piece of branch
                this.branch(x,y,length,angle,thickness);
                remainingLength --;
                // Reduce the thickness of the branch so that it will be zero at the end of the branch
                thickness -= initialThickness/qty*(this.branchTaperDNA.valueNew/100);

                // Move to the location of the next branch
                x += Math.cos(this.toRadians(angle))*length;
                y += Math.sin(this.toRadians(angle))*length;
                
                // Adjust the angle randomly using its angle DNA
                angle += (-0.5+Math.random())*this.branchAngleDNA.valueNew;

                // Adjust the angle randomly towards the sun using its sun lover DNA
                deltaA = 270 - angle;
                correction = ((deltaA/200) * (this.sunLoverDNA.valueNew));
                angle += correction;

                // Check the branch array to see if we need to branch off at this point
                branchArray.forEach(function(number) {
                    if (q == number) {
                        var branchOffAngle = self.branchOffAngleDNA.valueNew*1.2;
                        if (Math.random() > 0.5) {
                            branchOffAngle = -branchOffAngle;
                        }

                        branchOffAngle += angle;
                        // self.growBranch(x,y,7,branchOffAngle,thickness,parseInt((thickness*self.branchLengthDNA.valueNew)/10));
                        self.growBranch(x,y,7,branchOffAngle,(((self.branchOffThicknessDNA.valueNew)/100)*thickness),((self.branchOffThicknessDNA.valueNew)/100)*remainingLength);
                        }
                    });

                // Check to see if the branch is thin enough to start leafing
                if (thickness < startThickness) {
                    // The chance of leafing depends on the remaining number of branch segments
                    if (this.takeChance((numberOfLeaves/(qty - q)))) {
                        var leafAngle = ((this.leafAngleDNA.valueNew/50)*45)+(-10+(Math.random()*20));

                        if (Math.random() > 0.5) {
                            this.leaf(x,y,this.leafLengthDNA.valueNew/2,angle+leafAngle,this.leafThicknessDNA.valueNew/3,this.leafColor);
                        } else {
                            this.leaf(x,y,this.leafLengthDNA.valueNew/2,angle-leafAngle,this.leafThicknessDNA.valueNew/3,this.leafColor);
                        }
                    }
                }

                this.stamina --;
                await this.sleep(1);

                // At the end of every branch, make a leaf
                if (q > qty-1) {
                    if (thickness < startThickness) {
                        console.log("End of branch!");
                        this.stamina += 2;
                        this.blossom(x,y,angle,2);
                        // this.leaf(x,y,this.leafLengthDNA.valueNew/2,angle,this.leafThicknessDNA.valueNew/3,this.leafColor);
                    }
                }
            }
            else {
                if (thickness < startThickness) {
                    console.log("End of branch!");
                    this.stamina += 2;
                    this.leaf(x,y,10,angle,thickness,this.leafColor);
                }
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
            winningDNAValues.push(DNA.valueNew);
        })
        return winningDNAValues;
    }

    passGenes(){
        var button = this.id;
        var chosenPlantDNA = window.plants[button].getDNA();

        window.plants.forEach(function(plant) {
            plant.setDNA(chosenPlantDNA);
        });

        window.DNA = window.plants[button].DNA;
        window.updateGeneticValues();
    }
}