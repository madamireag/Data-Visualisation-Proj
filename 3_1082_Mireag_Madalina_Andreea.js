async function getDate() {
   let response = await fetch('./media/eurostat.json');
   let data = await response.json();
   return data;
}

function drawTable(dataset, anSelectat) {
   let existentTable = document.getElementById("dataTable");
   if (existentTable)
      document.body.removeChild(existentTable);

   let table = document.createElement("table");
   table.setAttribute("id", "dataTable"); //ii dau id ca sa-l pot stiliza in css
   table.classList.add("table");
   //creare header tabel
   let tHead = document.createElement("thead");
   tHead.classList.add("thead-dark");
   tHead.setAttribute("id", "tableHead");
   let rowHead = document.createElement("tr");
   let thTara = document.createElement("th");
   thTara.innerHTML = "Tara";
   let thPIB = document.createElement("th");
   thPIB.innerHTML = "PIB";
   let thSV = document.createElement("th");
   thSV.innerHTML = "Speranta de viata";
   let thPop = document.createElement("th");
   thPop.innerHTML = "Populatie";
   rowHead.appendChild(thTara);
   rowHead.appendChild(thSV);
   rowHead.appendChild(thPIB);
   rowHead.appendChild(thPop);
   tHead.appendChild(rowHead);
   table.appendChild(tHead);
   //creare table body cu date
   let tBody = document.createElement("tbody");
   let tr;
   let tdTara;
   let tdSV;
   let tdPIB;
   let tdPop;
   let tableData = [];
   let SVvalues;
   let maxValue;
   let minValue;
   //filtrez datele si le iau doar pe cele care corespund anului selectat
   tableData = dataset.filter(e => e.an === anSelectat);
   //iau toate tarile intr-un vector(sunt 27 de tari in UE)
   let tari = tableData.map(elem => elem.tara).slice(0, 27);
   //pentru fiecare tara creez randul din tabel
   tari.forEach(element => {
      tr = document.createElement("tr");
      tdTara = document.createElement("td");
      tdTara.innerHTML = element;
      tdSV = document.createElement("td");
      tdPIB = document.createElement("td");
      tdPop = document.createElement("td");
      for (let index = 0; index < tableData.length; index++) {
         if (tableData[index].tara === element) {
            switch (tableData[index].indicator) {
               case "SV":
                  tdSV.innerHTML = (tableData[index].valoare !== null ? tableData[index].valoare : "-");
                  maxValue = Math.max(...tableData.filter(e => e.indicator === "SV").map(x => x.valoare));
                  minValue = Math.min(...tableData.filter(e => e.indicator === "SV" && e.valoare !== null).map(x => x.valoare));
                  if (tableData[index].valoare === maxValue) {
                     tdSV.style.backgroundColor = "green";
                  }
                  if (tableData[index].valoare === minValue) {
                     tdSV.style.backgroundColor = "red";
                  }
                  if (tableData[index].valoare > minValue && tableData[index].valoare <= (minValue + maxValue) / 4) {
                     tdSV.style.backgroundColor = "#FC3";
                  }
                  if (tableData[index].valoare > (minValue + maxValue) / 4 && tableData[index].valoare <= (minValue + maxValue) / 2) {
                     tdSV.style.backgroundColor = "#FFA500";
                  }
                  if (tableData[index].valoare > (minValue + maxValue) / 2 && tableData[index].valoare < maxValue) {
                     tdSV.style.backgroundColor = "#9C3";
                  }
                  break;
               case "PIB":
                  tdPIB.innerHTML = (tableData[index].valoare !== null ? tableData[index].valoare : " - ");
                  maxValue = Math.max(...tableData.filter(e => e.indicator === "PIB").map(x => x.valoare));
                  minValue = Math.min(...tableData.filter(e => e.indicator === "PIB" && e.valoare !== null).map(x => x.valoare));
                  if (tableData[index].valoare === maxValue) {
                     tdPIB.style.backgroundColor = "green";
                  }
                  if (tableData[index].valoare === minValue) {
                     tdPIB.style.backgroundColor = "red";
                  }
                  if (tableData[index].valoare > minValue && tableData[index].valoare <= (minValue + maxValue) / 4) {
                     tdPIB.style.backgroundColor = "#FFA500";
                  }
                  if (tableData[index].valoare > (minValue + maxValue) / 4 && tableData[index].valoare <= (minValue + maxValue) / 2) {
                     tdPIB.style.backgroundColor = "#FC3";
                  }
                  if (tableData[index].valoare > (minValue + maxValue) / 2 && tableData[index].valoare < maxValue) {
                     tdPIB.style.backgroundColor = "#9C3";
                  }
                  break;
               case "POP":
                  tdPop.innerHTML = (tableData[index].valoare !== null ? tableData[index].valoare : " - ");
                  maxValue = Math.max(...tableData.filter(e => e.indicator === "POP").map(x => x.valoare));
                  minValue = Math.min(...tableData.filter(e => e.indicator === "POP" && e.valoare !== null).map(x => x.valoare));
                  if (tableData[index].valoare === maxValue) {
                     tdPop.style.backgroundColor = "green";
                  }
                  if (tableData[index].valoare === minValue) {
                     tdPop.style.backgroundColor = "red";
                  }
                  if (tableData[index].valoare > minValue && tableData[index].valoare <= (minValue + maxValue) / 4) {
                     tdPop.style.backgroundColor = "#FC3";
                  }
                  if (tableData[index].valoare > (minValue + maxValue) / 4 && tableData[index].valoare <= (minValue + maxValue) / 2) {
                     tdPop.style.backgroundColor = "#FFA500";
                  }
                  if (tableData[index].valoare > (minValue + maxValue) / 2 && tableData[index].valoare < maxValue) {
                     tdPop.style.backgroundColor = "#9C3";
                  }

            }

         }
      }
      tr.appendChild(tdTara);
      tr.appendChild(tdSV);
      tr.appendChild(tdPIB);
      tr.appendChild(tdPop);

      tBody.appendChild(tr);
      table.appendChild(tBody);

   });
   //adaugare tabel in pagina
   document.body.appendChild(table);
}

function drawChart(dataset, taraSelectata) {
   let chartDiv = document.getElementById("chart_div");
   //daca exista deja svg inseamna ca am un grafic creat deja, il fac sa dispara
   let svg = document.getElementById("svgChart");
   if (svg) {
      chartDiv.removeChild(svg);
   }
   //desenez un nou grafic 
   let barChart = new BarChart(chartDiv);
   let date = dataset.filter(el => el.tara === taraSelectata && el.valoare != null).filter(el => el.indicator === "PIB");
   barChart.draw(date);
}
//TO DO
function drawBubbleChart(dataset, anSelectat) {
   let canvas = document.getElementById("canvas_chart");
   let context = canvas.getContext("2d");
   context.fillRect(0, 0, canvas.width, canvas.height);
}


async function main() {
   //preluare date din fisierul json
   const dataset = await getDate();

   let ani = [];
   let tari = [];
   //parcurgere vector de date si extragere ani si tari(fara duplicate)
   for (i = 0; i < dataset.length; i++) {
      if (!ani.includes(dataset[i].an)) {
         ani.push(dataset[i].an);
      }
   }
   for (i = 0; i < dataset.length; i++) {
      if (!tari.includes(dataset[i].tara)) {
         tari.push(dataset[i].tara);
      }
   }
   let select = document.getElementById("ani");
   let selectTara = document.getElementById("selectTara");
   select.add(new Option("Selecteaza an"));
   selectTara.add(new Option("Selecteaza tara"));
   //populare cu anii/tarile din array
   for (let a in ani) {
      select.add(new Option(ani[a]));
   }
   for (let t in tari) {
      selectTara.add(new Option(tari[t]));
   }

   let btnDrawTable = document.getElementById("btnDeseneazaTabel");
   let btnDrawBublechart = document.getElementById("btnBubbleChart");
   let btnBarchart = document.getElementById("btnChart");
   let anSelectat = undefined;
   let taraSelectata = undefined;

   //abonare la evenimentul de change=>cand user-ul alege un an apar butoanele cu optiunile corespunzatoare si se salveaza anul 
   select.addEventListener("change", function () {
      anSelectat = this.value;
      btnDrawTable.style.display = "inline-block";
      btnDrawBublechart.style.display = "inline-block";

   });
   //abonare la evenimentul de change=>cand user-ul alege o tara apare butonul cu optiunea corespunzatoare si se salveaza tara 
   selectTara.addEventListener("change", function () {
      taraSelectata = this.value;
      btnBarchart.style.display = "inline-block";

   })
   //tratare situatie in care user-ul apasa pe un buton fara un an selectat
   btnDrawTable.addEventListener('click', function () {
      if (anSelectat !== "Selecteaza an") {
         drawTable(dataset, anSelectat);
      }
      else {
         alert("Selectati un an!");
      }

   })
   //tratare situatie in care user-ul apasa pe buton fara o tara selectata
   btnBarchart.addEventListener("click", function () {
      if (taraSelectata !== "Selecteaza tara") {
         drawChart(dataset, taraSelectata);
      }
      else alert("Selectati o tara!");
   });
   btnDrawBublechart.addEventListener("click", function () {
      if (taraSelectata !== "Selecteaza tara") {
         drawBubbleChart(dataset, anSelectat);
      } else alert("Selectati o tara!");
   });


}

class BarChart {
   constructor(element) {
      this.element = element;
      this.svgns = "http://www.w3.org/2000/svg"
      this.width = element.clientWidth;
      this.height = element.clientHeight;

   }
   draw(data) {
      this.data = data;
      this.createSVG();
      this.drawBackground();
      this.drawBars(data);
   }
   createSVG() {
      this.svg = document.createElementNS(this.svgns, "svg");
      this.svg.style.borderColor = "black";
      this.svg.style.borderWidth = "1px";
      this.svg.style.borderStyle = "solid";
      this.svg.setAttribute("width", this.width);
      this.svg.setAttribute("height", this.height);
      this.svg.setAttribute("id", "svgChart");
      this.element.appendChild(this.svg);
   }
   drawBackground() {
      const rect = document.createElementNS(this.svgns, "rect");
      rect.setAttribute("x", 0);
      rect.setAttribute("y", 0);
      rect.setAttribute("width", this.width);
      rect.setAttribute("height", this.height);
      rect.style.fill = "WhiteSmoke";
      this.svg.appendChild(rect);

   }
   drawTitle(tara, maxBarHeight) {
      const titlu = document.createElementNS(this.svgns, "text");
      titlu.appendChild(document.createTextNode("Evolutie PIB in " + tara));
      titlu.setAttribute("font-style", "italic");
      titlu.style.fill = "#696969";
      titlu.setAttribute("font-family", "sans-serif");
      titlu.setAttribute("x", this.element.clientWidth / 2);
      titlu.setAttribute("y", this.element.clientHeight - maxBarHeight - 30);

      this.svg.appendChild(titlu);
   }
   drawBars() {
      const barWidth = this.width / this.data.length;

      const maxValue = Math.max(...this.data.map(x => x.valoare));
      const f = this.height / maxValue;

      for (let i = 0; i < this.data.length; i++) {
         const label = this.data[i].an;
         const value = this.data[i].valoare;
         var tara = this.data[i].tara;
         const barHeight = value * f * 0.9;
         console.log(barHeight);
         const barX = i * barWidth;
         const barY = this.height - barHeight;


         const bar = document.createElementNS(this.svgns, "rect");
         bar.setAttribute("x", barX + barWidth / 4);
         bar.setAttribute("y", barY - 20);
         bar.setAttribute("width", barWidth / 2);
         bar.setAttribute("height", barHeight);
         if (value === maxValue) {
            bar.style.fill = "#724166";
         } else {
            bar.style.fill = "tomato";
         }
         //salvez barHeight pentru elementul maxim (var -> nu vreau block-scope in acest caz)
         var maxBarHeight;
         if (value == maxValue) {
            console.log("hello")
            maxBarHeight = barHeight;
         }

         bar.style.stroke = "black";
         let strWidth = "stroke-width";
         bar.style["stroke-width"] = "1px";
         //abonare la evenimentul de mouseover si afisare tooltip
         bar.addEventListener('mouseover', (ev) => {
            let title = document.createElementNS(this.svgns, "title");
            title.textContent = `PIB: ${value} Anul:${label}`;
            title.setAttribute("x", ev.clientX);
            title.setAttribute("y", ev.clientY);
            bar.appendChild(title);
         });

         this.svg.appendChild(bar);
         //afisare an sub fiecare bara
         const text = document.createElementNS(this.svgns, "text");
         //setare continut pentru text
         text.appendChild(document.createTextNode(label));
         //setare coordonate text (sub fiecare bara)
         text.style.fill = "#696969";
         text.setAttribute("x", barX);
         text.setAttribute("y", barY + barHeight - 5);
         this.svg.appendChild(text);

      }
      //apelez functia care deseneaza titlul chart-ului
      this.drawTitle(tara, maxBarHeight);
   }
}






