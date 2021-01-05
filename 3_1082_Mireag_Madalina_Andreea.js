// ~~~~~~~~~ PRELUARE DATE ~~~~~~~~~~~~~~
async function getDate() {
   let response = await fetch('./media/eurostat.json');
   let data = await response.json();
   return data;
}
// ~~~~~~~~~ DESENARE TABEL ~~~~~~~~~~~~~~
function creareTabel(dateTabel) {
   //daca tabelul exista deja il sterg si creez altul
   let existentTable = document.getElementById("dataTable");
   if (existentTable)
      document.body.removeChild(existentTable);
   let canvas = document.getElementById("canvas_chart");

   let table = document.createElement("table");
   //pozitionez tabelul in pagina in functie de existenta canvasului
   if (canvas.style.display === "inline-block") {
      table.style.width = "90%";
      table.style.float = 'none';
   }
   else {
      table.style.width = "30%";
      table.style.float = 'left';
   }

   table.setAttribute("id", "dataTable"); //ii dau id ca sa-l pot referi mai departe
   table.classList.add("table");
   //creare header tabel
   let tHead = document.createElement("thead");
   //adaugare clasa de bootstrap
   tHead.classList.add("thead-dark");
   tHead.setAttribute("id", "tableHead");
   //creez randul aferent headerului
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
   let tdTara;
   let tdSV;
   let tdPIB;
   let tdPop;
   let maxValue;
   let minValue;

   //iau toate tarile intr-un vector(sunt 27 de tari in UE)
   let tari = dateTabel.map(elem => elem.tara).slice(0, 27);
   //pentru fiecare tara creez randul corespunzator din tabel
   tari.forEach(element => {
      const tr = document.createElement("tr");
      tdTara = document.createElement("td");
      tdTara.innerHTML = element;
      tdSV = document.createElement("td");
      tdPIB = document.createElement("td");
      tdPop = document.createElement("td");
      for (let index = 0; index < dateTabel.length; index++) {
         if (dateTabel[index].tara === element) {
            switch (dateTabel[index].indicator) {
               case "SV":
                  tdSV.innerHTML = (dateTabel[index].valoare !== null ? dateTabel[index].valoare : "-");
                  let maximSV = Math.max(...dateTabel.filter(e => e.indicator === "SV").map(x => x.valoare));
                  //colorare celule in functie de anumite intervale stabilite
                  let minimSV = Math.min(...dateTabel.filter(e => e.indicator === "SV" && e.valoare !== null).map(x => x.valoare));
                  if (dateTabel[index].valoare === maximSV) {
                     tdSV.style.backgroundColor = "green";
                  }
                  if (dateTabel[index].valoare === minimSV) {
                     tdSV.style.backgroundColor = "red";
                  }
                  if (dateTabel[index].valoare > minimSV && dateTabel[index].valoare <= (minimSV + maximSV) / 2) {
                     tdSV.style.backgroundColor = "#FC3";
                  }
                  if (dateTabel[index].valoare > (minimSV + maximSV) / 4 && dateTabel[index].valoare <= (minimSV + maximSV) / 2 && dateTabel[index].valoare !== minimSV) {
                     tdSV.style.backgroundColor = "#FFA500";
                  }
                  if (dateTabel[index].valoare > (minimSV + maximSV) / 2 && dateTabel[index].valoare < maximSV) {
                     tdSV.style.backgroundColor = "#9C3";
                  }
                  break;
               case "PIB":
                  tdPIB.innerHTML = (dateTabel[index].valoare !== null ? dateTabel[index].valoare : " - ");
                  maxValue = Math.max(...dateTabel.filter(e => e.indicator === "PIB").map(x => x.valoare));
                  minValue = Math.min(...dateTabel.filter(e => e.indicator === "PIB" && e.valoare !== null).map(x => x.valoare));
                  //colorare celule in functie de anumite intervale stabilite
                  if (dateTabel[index].valoare === maxValue) {
                     tdPIB.style.backgroundColor = "green";
                  }
                  if (dateTabel[index].valoare === minValue) {
                     tdPIB.style.backgroundColor = "red";
                  }
                  if (dateTabel[index].valoare > minValue && dateTabel[index].valoare <= (minValue + maxValue) / 4) {
                     tdPIB.style.backgroundColor = "#FFA500";
                  }
                  if (dateTabel[index].valoare > (minValue + maxValue) / 4 && dateTabel[index].valoare <= (minValue + maxValue) / 2) {
                     tdPIB.style.backgroundColor = "#FC3";
                  }
                  if (dateTabel[index].valoare > (minValue + maxValue) / 2 && dateTabel[index].valoare < maxValue) {
                     tdPIB.style.backgroundColor = "#9C3";
                  }
                  break;
               case "POP":
                  tdPop.innerHTML = (dateTabel[index].valoare !== null ? dateTabel[index].valoare : " - ");
                  maxValue = Math.max(...dateTabel.filter(e => e.indicator === "POP").map(x => x.valoare));
                  minValue = Math.min(...dateTabel.filter(e => e.indicator === "POP" && e.valoare !== null).map(x => x.valoare));
                  //colorare celule in functie de anumite intervale stabilite
                  if (dateTabel[index].valoare === maxValue) {
                     tdPop.style.backgroundColor = "green";
                  }
                  if (dateTabel[index].valoare === minValue) {
                     tdPop.style.backgroundColor = "red";
                  }
                  if (dateTabel[index].valoare > minValue && dateTabel[index].valoare <= (minValue + maxValue) / 4) {
                     tdPop.style.backgroundColor = "#FFA500"; //some kind of orange
                  }
                  if (dateTabel[index].valoare > (minValue + maxValue) / 4 && dateTabel[index].valoare <= (minValue + maxValue) / 2) {
                     tdPop.style.backgroundColor = "#FC3"; //galben-ish
                  }
                  if (dateTabel[index].valoare > (minValue + maxValue) / 2 && dateTabel[index].valoare < maxValue) {
                     tdPop.style.backgroundColor = "#9C3"; //verde mai putin intens
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
// ~~~~~~~~ BARCHART ~~~~~~~~~~
function drawChart(dateTaraSelectata) {
   let chartDiv = document.getElementById("chart_div");
   //daca exista deja svg inseamna ca am un grafic creat deja, il fac sa dispara
   let svg = document.getElementById("svgChart");
   if (svg) {
      chartDiv.removeChild(svg);
   }
   //creez o noua instanta de Barchart
   let barChart = new BarChart(chartDiv);
   //filtrez datele pentru PIB -> nu iau in considerare valorile de null
   let date = dateTaraSelectata.filter(el => el.indicator === "PIB");
   //apelez functia draw pentru a desena graficul
   barChart.draw(date);
}

function scalareValori(date) {
   date = date.map(item => {
      const valori = date.filter(x => x.indicator === item.indicator).map(x => x.valoare);
      const minim = Math.min(...valori);
      const maxim = Math.max(...valori);
      //folosesc metoda MinMax Scalling pentru a normaliza datele
      item.valoareScalata = (item.valoare - minim) / (maxim - minim);
      console.log(item);
      return item;
   });
   return date;
}
// ~~~~~~~~~~~BUBBLE CHART ~~~~~~~~~~~~~
function drawBubbleChart(dateAnSelectat) {
   let canvas = document.getElementById("canvas_chart");
   canvas.style.display = "inline-block";
   let context = canvas.getContext("2d");
   //desenare contur si umplere fundal
   context.fillStyle = "whitesmoke";
   context.fillRect(0, 0, canvas.width, canvas.height);
   canvas.style.border = "1px solid black";
   context.fillStyle = "#696969";
   //las 10 pixeli sa nu iasa din canvas
   let canvasWidth = canvas.width - 10
   let canvasHeight = canvas.height - 10

   //iau toate tarile intr-un vector(sunt 27 de tari in UE)
   let tari = dateAnSelectat.map(elem => elem.tara).slice(0, 27);
   //apelez functia care scaleaza valorile si le transforma in intervalul [0,1] 
   dateAnSelectat = scalareValori(dateAnSelectat);
   //pentru fiecare tara calculez coordonatele pentru axa x, y si pentru raza in functie de valorile scalate
   tari.forEach((element, index) => {
      let x, y, r;



      //calcul coordonate pt raza in functie de valorile scalate ale sperantei de viata
      dateAnSelectat.map(el => {
         if (el.tara === element && el.indicator === 'SV') {
            r = el.valoareScalata * 27 + 10;
            console.log("r: " + r);
         }
      })
      //calcul coordonate pt x in functie de valorile scalate ale PIB
      dateAnSelectat.map(el => {
         if (el.tara == element && el.indicator == 'PIB') {
            x = (el.valoareScalata * canvasWidth);

            console.log("x: " + x);
         }
      })
      //calcul coordonate pt y in functie de valorile scalate ale populatiei
      dateAnSelectat.map(el => {
         if (el.tara === element && el.indicator === 'POP') {
            y = canvasHeight - (canvasHeight * el.valoareScalata) - r;
            console.log("y: " + y);
         }
      })

      context.beginPath();
      //ma pozitionez la marginea cercului
      context.moveTo(x + r, y);
      //desenez un cerc cu centrul in coordonatele calculate si raza r
      context.arc(x, y, r, 0, 2 * Math.PI);
      //pentru fiecare tara o nuanta diferita
      context.fillStyle = `rgb(${index * 7},${index},0,0.1)`;
      context.strokeStyle = 'black';
      context.fill();
      context.stroke();
      //afisez tara pe fiecare bubble
      context.fillStyle = "black";
      context.font = "10px sans serif";
      context.fillText(element, x, y);
      context.closePath();

   })
}



//   ~~~~~~~~~~~~~ Functia principala ~~~~~~~~~~~~~~~
async function main() {
   //preluare date din fisierul json prin apelarea functiei de mai sus
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
   //adaugare optiuni care ii spun utilizatorului ce sa selecteze
   select.add(new Option("Selecteaza an"));
   selectTara.add(new Option("Selecteaza tara"));
   //populare select corespunzator cu anii/tarile din array-uri
   for (let a in ani) {
      select.add(new Option(ani[a]));
   }
   for (let t in tari) {
      selectTara.add(new Option(tari[t]));
   }
   //preluare butoane
   let btnDrawTable = document.getElementById("btnDeseneazaTabel");
   let btnDrawBublechart = document.getElementById("btnBubbleChart");
   let btnBarchart = document.getElementById("btnChart");

   let anSelectat = undefined;
   let taraSelectata = undefined;
   let dateAnSelectat = [];
   let dateTaraSelectata = [];

   //abonare la evenimentul de change => cand utilizatorul alege un an apar butoanele cu optiunile corespunzatoare si se salveaza anul 
   select.addEventListener("change", function () {
      anSelectat = this.value;
      btnDrawTable.style.display = "inline-block";
      btnDrawBublechart.style.display = "inline-block";
      //filtrez datele si le iau doar pe cele care corespund anului selectat
      dateAnSelectat = dataset.filter(e => e.an === anSelectat);

   });
   //abonare la evenimentul de change => cand utilizatorul alege o tara apare butonul cu optiunea corespunzatoare si se salveaza tara 
   selectTara.addEventListener("change", function () {
      taraSelectata = this.value;
      btnBarchart.style.display = "inline-block";
      //filtrez datele si le iau doar pe cele care corespund tarii selectate
      dateTaraSelectata = dataset.filter(el => el.tara === taraSelectata && el.valoare != null);

   })
   //tratare eveniment de click pe buton si situatie in care user-ul apasa pe un buton fara un an selectat
   btnDrawTable.addEventListener('click', function () {
      if (anSelectat !== "Selecteaza an") {
         creareTabel(dateAnSelectat); //apelez functia pentru a crea tabelul
      }
      else {
         alert("Selectati un an!");
      }

   })
   //tratare eveniment de click pe buton si situatie in care user-ul apasa pe buton fara o tara selectata
   btnBarchart.addEventListener("click", function () {
      if (taraSelectata !== "Selecteaza tara") {
         drawChart(dateTaraSelectata, taraSelectata); //apelez functia care deseneaza graficul
      }
      else alert("Selectati o tara!");
   });
   btnDrawBublechart.addEventListener("click", function () {
      if (taraSelectata !== "Selecteaza tara") {
         drawBubbleChart(dateAnSelectat);
      } else alert("Selectati o tara!");
   });


}

//clasa preluata de la seminar si ajustata conform cerintelor
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
      //creare element svg pe baza namespace-ului
      this.svg = document.createElementNS(this.svgns, "svg");
      //adaugare border pentru element
      this.svg.style.borderColor = "black";
      this.svg.style.borderWidth = "1px";
      this.svg.style.borderStyle = "solid";
      this.svg.setAttribute("width", this.width);
      this.svg.setAttribute("height", this.height);
      //setare id pentru svg pentru a fi referit ulterior
      this.svg.setAttribute("id", "svgChart");
      //adaugare svg la elementul pe care se va afisa graficul
      this.element.appendChild(this.svg);
   }
   drawBackground() {
      //desenare dreptunghi pe toata suprafata elementului
      const rect = document.createElementNS(this.svgns, "rect");
      rect.setAttribute("x", 0);
      rect.setAttribute("y", 0);
      rect.setAttribute("width", this.width);
      rect.setAttribute("height", this.height);
      rect.style.fill = "WhiteSmoke";
      //adaugare dreptunghi la elementul svg
      this.svg.appendChild(rect);

   }
   drawTitle(tara, maxBarHeight) {
      const titlu = document.createElementNS(this.svgns, "text");
      //setare continut pentru titlu (text)
      titlu.appendChild(document.createTextNode("Evolutie PIB in " + tara));
      //stilizare font si culoare pentru titlu
      titlu.setAttribute("font-style", "italic");
      titlu.style.fill = "#696969";
      titlu.setAttribute("font-family", "sans-serif");
      //setare coordonate pentru titlu (in centru pe orizontala si pe verticala calculat in functie de inaltimea maxima a barelor)
      titlu.setAttribute("x", this.element.clientWidth / 2);
      titlu.setAttribute("y", this.element.clientHeight - maxBarHeight - 30);
      //adaugare titlu la elementul svg
      this.svg.appendChild(titlu);
   }
   drawBars() {
      //latimea unei bare
      const barWidth = this.width / this.data.length;
      //valoarea maxima a datelor reprezentate
      const maxValue = Math.max(...this.data.map(x => x.valoare));
      //factor de scalare
      const f = this.height / maxValue;

      for (let i = 0; i < this.data.length; i++) {
         const label = this.data[i].an;
         const value = this.data[i].valoare;
         var tara = this.data[i].tara;
         const barHeight = value * f * 0.9;
         //coordonatele x si y pentru bare
         const barX = i * barWidth; //ma deplasez pe orizontala
         const barY = this.height - barHeight;


         const bar = document.createElementNS(this.svgns, "rect");
         bar.setAttribute("x", barX + barWidth / 4);
         bar.setAttribute("y", barY - 20); //las putin spatiu in jos pentru a afisa anul(eticheta)
         bar.setAttribute("width", barWidth / 2);
         bar.setAttribute("height", barHeight);
         //colorez bara corespunzatoare valorii maxime diferit
         if (value === maxValue) {
            bar.style.fill = "#724166";
         } else {
            bar.style.fill = "#ff8000";
         }
         //salvez barHeight pentru elementul cu valoare maxima (var -> nu vreau block-scope in acest caz) deoarece o folosesc in functia ce deseneaza titlul
         var maxBarHeight;
         if (value == maxValue) {
            console.log("hello")
            maxBarHeight = barHeight;
         }

         bar.style.stroke = "black";
         bar.style["stroke-width"] = "1px";
         // ~~~~~~ CERINTA TOOLTIP PE GRAFIC ~~~~~~~ 
         //abonare la evenimentul de mouseover si afisare tooltip (conform MDN, browserele afiseaza elementul de tip title ca un tooltip)
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






