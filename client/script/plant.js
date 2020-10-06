class plant {
    constructor(number) {
        this.width = 400;
        this.height = 500;
        
        this.svgns = "http://www.w3.org/2000/svg"

        this.plantbox = document.createElement("div");
        this.plantbox.className = "plantbox";
        this.svg = document.createElementNS(this.svgns,"svg");
        this.svg.setAttribute("class", "svgPlant");
        this.svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        this.svg.setAttribute("width", this.width.toString());
        this.svg.setAttribute("height", this.height.toString());

        this.button = document.createElement('input');
        this.button.setAttribute('type','button');
        this.button.setAttribute('id',number);
        this.button.setAttribute('value', 'Share genes');
        this.button.className = "myButton";
        this.button.onclick = window.passGenes;

        const wrapper = document.getElementById("wrapper")
        wrapper.appendChild(this.plantbox); 
        this.plantbox.appendChild(this.svg);
        this.plantbox.appendChild(this.button);

        // this.context = this.canvas.getContext('2d');

        this.grassColor = '#49b949';
        this.grassStroke = '#6ec040';
        this.potColor = '#c2956c';
        this.potStroke = '#8f6831';
        this.branchColor = '#86592e'; 
              
        this.branchAngleDNA = {name:"Angle variance",description:"The variance of the angle between branch segments:",value:50}
        this.sunLoverDNA = {name:"Upwards tendency",description:"The drive this plant has to grow upwards",value:30}

        this.DNA = new Array;

        this.DNA.push(this.branchAngleDNA);
        this.DNA.push(this.sunLoverDNA);
        
        this.geneticErrors();

        this.displayDNA(this.plantbox);
        
        this.drawGround();
        this.drawPot();
    }

    geneticErrors() {
        this.DNA.forEach(function(DNASAMPLE) {
            var rand = (-0.5+Math.random())*1;
            DNASAMPLE.value += rand;
        })
    }

    displayDNA(parent) {
        this.DNA.forEach(function(DNASAMPLE) {
            var DNALabel = document.createElement("div");
            DNALabel.className = "DNALabel";
            DNALabel.innerHTML = DNASAMPLE.name +": "+ DNASAMPLE.value.toFixed(1);
            parent.appendChild(DNALabel);
        })
    }

    drawGround() {
        var ground = document.createElementNS(this.svgns, 'circle');
        ground.setAttributeNS(null, 'cx', this.width/2);
        ground.setAttributeNS(null, 'cy', this.height*2.1);
        ground.setAttributeNS(null, 'r', this.height*1.2);
        ground.setAttributeNS(null, 'fill', this.grassColor);
        ground.setAttributeNS(null, 'stroke-width', "4");
        ground.setAttributeNS(null, 'stroke', this.grassStroke);
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
        branch.setAttributeNS(null, 'class', "GrowPlant");
        branch.setAttributeNS(null, 'x1' , 0);
        branch.setAttributeNS(null, 'y1' , 0);
        branch.setAttributeNS(null, 'x2' , length);
        branch.setAttributeNS(null, 'y2' , 0);
        branch.setAttributeNS(null, 'stroke-width', thickness);
        branch.setAttributeNS(null, 'stroke', this.branchColor);
        branch.setAttributeNS(null, 'transform', this.translate(x,y) + this.rotate(angle));
        this.svg.appendChild(branch);
    } 

    drawPot() {
        var pot = document.createElementNS(this.svgns, 'polygon');
        pot.setAttributeNS(null, 'points', "-30,-30 30,-30 20,20 -20,20");
        pot.setAttributeNS(null, 'fill', this.potColor);
        pot.setAttributeNS(null, 'stroke-width', 4);
        pot.setAttributeNS(null, 'stroke', this.potStroke);
        pot.setAttributeNS(null, 'transform', this.translate((this.width/2),this.height*0.9));
        this.svg.appendChild(pot);
        this.growBranch((this.width/2),(this.height*0.9),10,270,2,40);
    }

    toRadians (angle) {
        return angle * (Math.PI / 180);
      }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    async growBranch(intx,inty,length,intangle,thickness,qty) {
        var x = intx;
        var y = inty;
        var angle = intangle;
        var q = 0;
        var deltaA = 0;
        var correction = 0;
        for (q = 0; q < qty; q++) {
            this.branch(x,y,length,angle,thickness);
            x += Math.cos(this.toRadians(angle))*length;
            y += Math.sin(this.toRadians(angle))*length;
            
            // Adjust the angle randomly using its angle DNA
            angle += (-0.5+Math.random())*this.branchAngleDNA.value;

            // Adjust the angle randomly towards the sun using its sun lover DNA
            deltaA = 270 - angle;
            correction = (deltaA * (this.sunLoverDNA.value/200));
            angle += correction;
            await this.sleep(10);
          }
        return;
    }

    getDNA() { 
        return this.DNA;
    }

    passGenes() {

    };

    resetPlant(){
        var elements = document.getElementsByClassName("GrowPlant");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    resetLabels(){

    }

    setGenes(DNA) {
        this.resetPlant();
        this.DNA = DNA;
        // this.geneticErrors();
        this.displayDNA(this.plantbox);
        this.growBranch((this.width/2),(this.height*0.9),10,270,2,40);
    }
}


