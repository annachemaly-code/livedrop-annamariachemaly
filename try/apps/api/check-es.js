const { EventSource } = require('eventsource');

console.log('EventSource:', EventSource);

const es = new EventSource('http://localhost:5000'); 
console.log('Instance created:', es instanceof EventSource); 
