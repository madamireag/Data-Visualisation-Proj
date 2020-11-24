let btnGetData = document.getElementById("btnGetData");
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
   table.setAttribute("id", "dataTable");
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
   tableData = dataset.filter(e => e.an === anSelectat);
   console.log(tableData)
   for (i = 0; i < tableData.length; i++) {

      tr = document.createElement("tr");
      tdTara = document.createElement("td");
      tdSV = document.createElement("td");
      tdPIB = document.createElement("td");
      tdPop = document.createElement("td");
      //cum verific daca exista deja tara?
      tdTara.innerHTML = tableData[i].tara;
      tr.appendChild(tdTara);
      //cum pun indicatorul corespunzator tarii?
      //ceva nu e bineeeeeee !!!! 
       console.log(tableData[i].indicator === "PIB");
      tdSV.innerHTML = tableData[i].indicator === "SV" ? tableData[i].valoare : "";
      tr.appendChild(tdSV);
      tdPIB.innerHTML = tableData[i].indicator  === "PIB" ? tableData[i].valoare : "nothin";
      tr.appendChild(tdPIB);
      tdPop.innerHTML = tableData[i].indicator === "POP" ? tableData[i].valoare : "";
      tr.appendChild(tdPop);
      tBody.appendChild(tr);



   }

   table.appendChild(tBody);
   //adaugare tabel in pagina
   document.body.appendChild(table);
}
function drawChart(dataset,indicatorSelectat,taraSelectata){

}
async function main() {
   const dataset = await getDate();
   console.log(dataset);
   let ani = [];
   let tari = [];
   //parcurgere vector de date si extragere ani(fara duplicate)
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
   console.log(ani);
   let select = document.getElementById("ani");
   let selectTara = document.getElementById("selectTara");
   select.add(new Option());
   selectTara.add(new Option());
   //populare cu anii selectati din array
   for (let a in ani) {
      select.add(new Option(ani[a]));
   }
   for (let t in tari) {
      selectTara.add(new Option(tari[t]));
   }
   let anSelectat;
   anSelectat = select.options[select.selectedIndex].value;
   select.addEventListener("change", function () {
      anSelectat = this.value;
      drawTable(dataset, anSelectat);
   })

   //drawTable(dataset, anSelectat);
    let taraSelectata=selectTara.options[selectTara.selectedIndex];
    let indicatorSelectat;
   // drawChart(dataset,indicatorSelectat,taraSelectata);

}




main();
//idee: spinner-kind-of-thing cu anii si cand alege userul se creeaza tabel 
//another idea: link si cand dau click pe el apar cele 2 select-uri sa-si aleaga user-ul tara si indicatorul pt chart
