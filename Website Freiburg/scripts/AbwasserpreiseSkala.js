/**const width = 800;
const height = 400;
const margin = { top: 50, bottom: 50, left: 50, right: 50};

const svg = d3.select('#d3-container')
    .append('svg')
    .attr('height', height - margin.top - margin.bottom)
    .attr('width', width - margin.left - margin.right)
    .attr('viewbox', [0,0, width, height]);


const x = d3.scaleBand()
    .domain(d3.range(Abwasser.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, 2020])
    .range([height -margin.bottom, margin.top]);

svg
    .append('g')
    .attr('fill', 'blue')
    .selectAll('rect')
    .data(Abwasser.sort((a,b)=> d3.descending(a.Schmutzwasser, b.Schmutzwasser)))
    .join('rect')
        .attr('x', (d, i) => x(i))
        .attr('y', (d) => y(d.Schmutzwasser))
        .attr('height', d => y(0) - y(d.Schmutzwasser))
        .attr('width', x.bandwith())

svg.node();*/

const canvas = document.getElementById('canvas');
const svg = d3.select(canvas).append('svg');
// set the dimensions and margins of the graph
const margin = { top: 100, left: 100, right: 100, bottom: 100 };

const myData = Abwasser.filter(d => d.Jahr > 2017);

svg.attr('viewbox', [0,0, canvas.clientWidth, canvas.clientHeight])
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', canvas.clientWidth)
    .attr('height', canvas.clientHeight);

const xScale = d3.scaleTime()                                           
    .domain([d3.min(myData.map(d => new Date(d.Jahr))), d3.max(myData.map(d => new Date(d.Jahr)))])
    .range([margin.left, canvas.clientWidth - margin.right])
    .nice();

svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0,${canvas.clientHeight - margin.bottom})`)
    .call(d3.axisBottom(xScale))

const yScale = d3.scaleLinear()
    .domain([d3.min(myData.map(d => d.Schmutzwasser)), d3.max(myData.map(d => d.Schmutzwasser))])
    .range([margin.top, canvas.clientHeight - margin.bottom])
    .nice();

svg.append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale) 
        // .tickFormat((d) => d / 1000000 + 'M')
    )

const dataRegion = svg.append('g').attr('id', 'data');

dataRegion.selectAll('rect')
    .data(myData)
    .join('rect')
    .attr('x', d => xScale(new Date(d.Jahr)))
    .attr('y', d => yScale(d.Niederschlagswasser))
    .attr('width', 10)
    .attr('height', 10)
    .attr('fill', '#000000');

