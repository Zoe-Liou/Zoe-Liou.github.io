// https://observablehq.com/@f16ea6bbcc9f4cf7/scatterplot-including-hover-effect-from-the-d3-js-graph-gal/2@229
function _1(md){return(
md`# People Fully Vaccinated per Hundred Versus GDP per Capita Grouped by Population Size`
)}

function* _2(html,drawBubbles)
{
  yield html`
    <div id="chart">
      <div id="tooltip"
      </div>
    </div>`;
  drawBubbles();
}


function _3(md){return(
md`## Visualisation Description
## _Question 2: Is the vaccination rate correlated with the wealth of a country?_
### Key Takeaways
- Overall, the rate of vaccination is positive correlated to the GDP per capita, especially for the countries with GDP per Capita between 500 to 45000 dollars.
- For those highly developed countries (GDP per Capita > 50000 dollars), there is no strong relationship between wealth and vaccination. 
- Hovering on the continent selector, it is noticeable that the percentage of people fully vaccinated is higher in Asia specifically if the countries are wealthier.
- For wealtier countries in both America and Europe, around 50% people are fully vaccinated.


### Data Description
- Datasets is downloaded from [__COVID-19 dataset__](https://github.com/owid/covid-19-data/tree/master/public/data) maintained by [__Our World in Data__](https://ourworldindata.org/coronavirus).
- Attributes used here: _People Fully Vaccinated Per Hundred_, _GDP Per Capita_, _Population_, _Date_, _Country_ and _Continent_.
- Description of _People Fully Vaccinated Per Hundred_: Total number of people who received all doses prescribed by the initial vaccination protocol per 100 people in the total population.
- Description of _GDP Per Capita_: Gross domestic product at purchasing power parity (constant 2011 international dollars), most recent year available.
- Only the countries with all attributes available are taken into consideration.
- Data is updated throughout the duration of the COVID-19 pandemic. For calculate the number of People Vaccinated, dates from 14/12/2020 to 01/05/2022 are used here.
- For each numerical variable, we sum up and calculate its average value.
- For _Continent_, categorical variable, America is seperated into _North America_ and _South America_. Here we transform it as _America_.

### Visual Encoding and Design Features
- People Fully Vaccinated per Hundred: X-Axis & Hovering Tooltip
- GDP per Capita: Y-Axis & Hovering Tooltip
- Country: Hovering Tooltip
- Continent: Mark Colour & Hovering Effect
- Population: Mark Size & Hovering Tooltip
`
)}

function _4(md){return(
md`## Helper Functions and References`
)}

function _drawBubbles(d3,width){return(
async function drawBubbles() {
  
  const dimensions = ({  
  height:500,
  width:700,  
  margin: {
      top: 40,
      right: 150,
      bottom: 60,
      left: 30,
    } 
  })
  
  const data = await d3.csv("https://raw.githubusercontent.com/Zoe-Liou/d3Viz/main/d3.data9.csv") 
  console.log(data)
  
  const svg = d3.select("#chart")
  .append("svg")
    .attr("width", width - 100)
    .attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");  
  
  const x = d3.scaleLinear()
    .domain([0, 100000])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + dimensions.height + ")")
    .call(d3.axisBottom(x));   
  
  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2)
      .attr("y", dimensions.height + 50 )
      .text("GDP per Capita ($)");

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([ dimensions.height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));
  
  // Add Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", 10)
      .attr("y", 5)
      .text("People Fully Vaccinated Per Hundred (Count)")
      .attr("text-anchor", "start")
  
  // Add a scale for bubble size
  const z = d3.scaleSqrt()
    .domain([200000, 1410000000])
    .range([ 4, 40]);

  // Add a scale for bubble color
  const myColor = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "America", "Africa", "Oceania"])
    .range(d3.schemeTableau10);
  
  const tooltip = d3.select("#tooltip")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")  
  
  const showTooltip = function(d) {
    tooltip
      .transition()
      .duration(100)
    tooltip
      .style("opacity", 1)
      .html("Country: " + d.country+"<br/>"+"GDP per Capita: "+ d.gdpPercap+"<br/>"+"People Vaccinatied per 100: "+ d.lifeExp+"<br/>"+"Population: "+ d.pop)
      .style("left", (d3.mouse(this)[0]+40) + "px")
      .style("top", (d3.mouse(this)[1]+40) + "px")
  }
  const moveTooltip = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+40) + "px")
      .style("top", (d3.mouse(this)[1]+40) + "px")
  }
  const hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }  
  
  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", function(d) { return "bubbles " + d.continent })
      .attr("cx", function (d) { return x(d.gdpPercap); } )
      .attr("cy", function (d) { return y(d.lifeExp); } )
      .attr("r", function (d) { return z(d.pop); } )
      .style("fill", function (d) { return myColor(d.continent); } )    
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )

  // What to do when one group is hovered
  const highlight = function(d){
    // reduce opacity of all groups
    d3.selectAll(".bubbles").style("opacity", .05)
    // expect the one that is hovered
    d3.selectAll("."+d).style("opacity", 1)
  }

  // And when it is not hovered anymore
  const noHighlight = function(d){
    d3.selectAll(".bubbles").style("opacity", .6)
  }  
    
  // Add one dot in the legend for each name.
    const size = 20
    const allgroups = ["Asia", "Europe", "America", "Africa", "Oceania"]
    svg.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("circle")
        .attr("cx", 20)
        .attr("cy", function(d,i){ return 35 + i*(size+5)}) 
        .attr("r", 7)
        .style("fill", function(d){ return myColor(d)})
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)
  
  // Add labels beside legend dots
    svg.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 20 + size*.8)
        .attr("y", function(d,i){ return 25 + i * (size + 5) + (size/2)}) 
        .style("fill", function(d){ return myColor(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)
  
}
)}

function _6(html){return(
html`<style>
.bubbles {
  stroke-width: 1px;
  stroke: white;
}
.bubbles:hover {
  stroke: black;
}

.tooltip {
    opacity: 0;
    position: absolute;
    top: -4px;
    left: 0;
    padding: 0.6em 1em;
    background: #fff;
    text-align: center;
    border: 1px solid #ddd;
    z-index: 10;
    transition: all 0.2s ease-out;
    pointer-events: none;
}
</style>`
)}

function _7(md){return(
md`Reference: https://www.d3-graph-gallery.com/graph/bubble_template.html`
)}

function _d3(require){return(
require("d3@5")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["html","drawBubbles"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("drawBubbles")).define("drawBubbles", ["d3","width"], _drawBubbles);
  main.variable(observer()).define(["html"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
