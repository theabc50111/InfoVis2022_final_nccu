function heatmap_return(datapath,station_name) {

        let margin = {top: 80, right: 50, bottom: 60, left: 40},
        width =600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3.select("#heatmap_return")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        //Read the data
        d3.csv(datapath).then(function(data) {
        // console.log(data)
        // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
        const myGroups = Array.from(new Set(data.map(d => d.date)))
        const myVars = Array.from(new Set(data.map(d => d.Val_cat)))
        console.log(myVars)
        // Build X scales and axis:
        const x = d3.scaleBand()
        .range([ 0, width ])
        .domain(myGroups)   
        .padding(0.05)   
        // .selectAll("text")  
        // .attr("transform", "rotate(-65)")
        
        svg.append("g")
        .style("font-size", 10)
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(0))
        .selectAll("text")  .attr("transform", "rotate(-65)")
        .attr('dy', '-0.2em')
        .attr('dx',"-3em")
        .select(".domain").remove()

        // Build Y scales and axis:
        const y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(myVars)
        .padding(0.05);
        svg.append("g")
        .style("font-size", 10)
        .call(d3.axisLeft(y).tickSize(0))
            .selectAll("text")  .attr("transform", "rotate(-40)")
        .attr('dy', '-0.5em')
        .attr('dx',"0em")
        .select(".domain").remove()


        // Build color scale
        //   const myColor = d3.scaleSequential()
        //     .interpolator(d3.interpolateWarm)
        //     .domain([1,100])
        let myColor = d3.scaleLinear()
        .range(["white", "#4A2163"])
        .domain([1,100])

        // create a tooltip
        let tooltip = d3.select("#heatmap_return")
        .append("div")
        .style("opacity", 0)
        // .style("position", "absolute")
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "3px")
        .style("padding", "3px")

        // Three function that change the tooltip when user hover / move / leave a cell
        let mouseover = function(event,d) {
        tooltip.style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 0.5)
        }
        const mousemove = function(event,d) {
        tooltip.html("The cell value is: " + d.value)
            .style("left", (event.x)/2 + "px")
            .style("top", (event.y)/2+ "px")
        //   .style("left", (event.x)/2 + "px")
        //   .style("top", (event.y)/2 + "px")
        }
        let mouseleave = function(event,d) {
        tooltip.style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
        }

        // add the squares
        svg.selectAll()
        .data(data, function(d) {return d.date+':'+d.Val_cat;})
        .join("rect")
            .attr("x", function(d) { return x(d.date) })
            .attr("y", function(d) { return y(d.Val_cat) })
        //   .attr("rx", 4)
        //   .attr("ry", 4)
            .attr("width", x.bandwidth() )
        //   .attr("padding",20)
            .attr("height", y.bandwidth() )
            .style("fill", function(d) { return myColor(d.value)} )
            .style("stroke-width",4)
            .style("stroke", "none")
            .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        svg.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .style("font-size", "15px")
        .text(`The trip infomation when ${station_name} is the destination. `);
        
        })    

        
      }


      function heatmap_return_click(e) {
          d3.select("svg").remove();
          station_name=e.target.options.sna.toString();
          chart = heatmap_return(`./dataset/trip_time/return_sno_${e.target.options.sno}.csv`,station_name);
          }   
 
        heatmap_return('./dataset/trip_time/return_sno_141.csv','文山行政中心')