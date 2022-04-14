// Global variables
var ps4data 
var myChart;
var backgroundColor =[
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)'
]

// 1st function to load the page and build the bar graph
function loadPage(sample){
  d3.json("/api/v1.0/all").then((importedData) => {
    ps4data = importedData.data
  var samples = importedData.data;
  var resultArray = samples.filter(sampleObj => sampleObj.Game == sample)[0]
  // getting x and y values ready
  var xaxis = []
  var yaxis = []
  Object.entries(resultArray).forEach(([key, value]) =>{
    if (key == "Europe"){
      xaxis.push(key)
      yaxis.push(value)
    }
    if (key == "Japan"){
      xaxis.push(key)
      yaxis.push(value)
    }
    if (key == "NorthAmerica"){
      xaxis.push(key)
      yaxis.push(value)
    }
    if (key == "RestofWorld"){
      xaxis.push(key)
      yaxis.push(value)
    }
  }) 
// using chart.js to plot the data
  var ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: xaxis,
          datasets: [{
              label: 'PS4 Game sales in different regions of the world',
              data: yaxis,
              backgroundColor: backgroundColor,
              borderWidth: 0
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  })
};

// initialising the page
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/api/v1.0/names").then((gamename) => {
    var names = gamename.data

    names.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  });
}

// Linking the selected game name and give the general infomation about this game
function demoinfo (game){
  document.getElementById("game-info").innerHTML = "";
  var infotable = d3.select("#game-info")
  var tableinfo = ps4data.filter(sample => sample.Game == game)[0]
  console.log(tableinfo)
  Object.entries(tableinfo).forEach(([key, value]) => {
    if(key === "Game"|| key === "Year"|| key === "Genre"|| key === "Publisher") {
      infotable.append("p").text(`${key}: ${value}`)
    }
})
}


// option changed and what will happen next
function optionChanged(id){
  // loadPage(id)
  demoinfo(id)
  //updating the chart.js
  var resultArray = ps4data.filter(sampleObj => sampleObj.Game == id)[0]
  var yaxis = []
  Object.entries(resultArray).forEach(([key, value]) =>{
    if (key == "Europe"){
      yaxis.push(value)
    }
    if (key == "Japan"){
      yaxis.push(value)
    }
    if (key == "NorthAmerica"){
      yaxis.push(value)
    }
    if (key == "RestofWorld"){
      yaxis.push(value)
    }
  }) 
  myChart.data.datasets= [{
  label: "PS4 Game sales in different regions of the world",
  backgroundColor: backgroundColor,
  borderWidth: 0,
  data: yaxis
}]
myChart.update()

};
init();
loadPage("FIFA 18");

//START LOGIC PIE

d3.select("#selDataset").on("change",pie);

function pie() {

d3.json("/api/v1.0/all").then((importedData) => {
    ps4data = importedData.data
  var samples = importedData.data;
  //var resultArray = samples.filter(sampleObj => sampleObj.Game == sample)[0]
  
 Object.entries(importedData).forEach(([key, value]) =>{
    console.log("data values: "+samples)
  
  var option = d3.select("select#selDataset").property("value");
  console.log(`option found value ${option}`);
  option = option.toString()

 // option = "Grand Theft Auto V";
 // option = "Red Dead Redemption 2";

  var Action = 0
  var ActionAdventure = 0
  var Adventure = 0
  var Fighting = 0
  var Misc = 0
  var MMO = 0
  var Music = 0
  var Party = 0
  var Platform = 0
  var Puzzel = 0
  var Racing = 0
  var Roleplaying = 0
  var Shooter = 0
  var Simulation = 0
  var Sports = 0
  var Strategy = 0
  var VisualNovel = 0


  for (let i = 0; i < csvdata.length; i++) {
    let row = csvdata[i];

    // ###PIE
    if (row.Game == option) {
      var globalSales = row.Global;
      var optiongenre = row.Genre;
      var age = 2022 - parseInt(row.Year)
     // console.log(age)
    }

        var genre = row.Genre;
      
        if (genre === "Action") {
          Action = Action + parseFloat(row.Global);
       
         } else if (genre === "Action-Adventure") {
           ActionAdventure = ActionAdventure + parseFloat(row.Global);

        } else if (genre === "Adventure") {
          Adventure += parseFloat(row.Global);
    
        } else if (genre === "Fighting") {
          Fighting += parseFloat(row.Global);
         
        } else if (genre === "Misc") {
          Misc += parseFloat(row.Global);
        
        } else if (genre === "MMO") {
          MMO += parseFloat(row.Global);
         
        } else if (genre === "Music") {
          Music += parseFloat(row.Global);
         
        } else if (genre === "Party") {
          Party += parseFloat(row.Global);
         
        } else if (genre === "Platform") {
          Platform += parseFloat(row.Global);
         
        } else if (genre === "Puzzel") {
          Puzzel += parseFloat(row.Global);
          
        } else if (genre === "Racing") {
          Racing += parseFloat(row.Global);
         
        } else if (genre === "Role-playing") {
          Roleplaying += parseFloat(row.Global);

        } else if (genre === "Shooter") {
          Shooter += parseFloat(row.Global);
         
        } else if (genre === "Simulation") {
          Simulation += parseFloat(row.Global);
        
        } else if (genre === "Sports") {
          Sports += parseFloat(row.Global);
        } else if (genre === "Strategy") {
          Strategy += parseFloat(row.Global);
        } else if (genre === "Visual-Novel") {
          VisualNovel += parseFloat(row.Global);
        }

  // GAUGE START
  
  var datagauge = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: age,
      title: { text: "Age of this game in years"},
      type: "indicator",
      mode: "gauge+number",
      gauge: { axis: {'range': [1, 9]}}
    }
  ];
  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', datagauge, layout);
  // GAUGE END
  
        //close csv for and if function line 25/27:
}

var total = (Action+ActionAdventure+Adventure+Fighting+Misc+MMO+Music+Party+Platform+Puzzel+Racing+Roleplaying+Shooter+Simulation+Sports+Strategy+VisualNovel);
var percent = parseInt(globalSales/total*100).toFixed(2);
//console.log(`${option} has genre ${genre} with Global sales of ${globalSales}m or ${percent}%`);

var data = [{
  values: [Action, ActionAdventure, Adventure, Fighting, Misc, MMO, Music, Party, Platform,Puzzel,Racing,Roleplaying,Shooter,Simulation,Sports,Strategy,VisualNovel],
  labels: ['Action', 'Action Adventure', 'Adventure','Fighting', 'Misc', 'MMO', 'Music', 'Party', 'Platform','Puzzel','Racing','Role playing','Shooter','Simulation','Sports','Strategy','Visual Novel'],
  type: 'pie'
}];


var layout = {
  title: `GENRES: ${option} (${optiongenre}) $${globalSales}m or ${percent}% of Global Market`,
  height: 600,
  width: 800
};

Plotly.newPlot('pie', data, layout);

pie.update()

});// close forEach line 134

}); //Close Then 134

}; //Close function pie(option) line 132

pie()



//END PIE

