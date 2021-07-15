const canvas = document.getElementById('canvas');
const svg = d3.select(canvas).append('svg');
const margin = { top: 50, left: 50, right: 50, bottom: 50 };

svg.attr('viewBox', [0, 0, 400, 300])
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 400)
    .attr('height', 300);
