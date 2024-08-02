exports.calculateShortestPath = (graph, startNode, endNode) => {
    const distances = {};
    const visited = {};
    const previous = {};
    const pq = new PriorityQueue();
  
    distances[startNode] = 0;
    pq.enqueue(startNode, 0);
  
    for (let node in graph) {
      if (node !== startNode) distances[node] = Infinity;
      previous[node] = null;
    }
  
    while (!pq.isEmpty()) {
      const minNode = pq.dequeue();
  
      if (minNode === endNode) {
        const path = [];
        let currentNode = endNode;
  
        while (currentNode) {
          path.unshift(currentNode);
          currentNode = previous[currentNode];
        }
  
        return { path, distance: distances[endNode] };
      }
  
      if (!minNode || distances[minNode] === Infinity) continue;
  
      visited[minNode] = true;
  
      for (let neighbor of graph[minNode]) {
        if (!visited[neighbor.node]) {
          const newDist = distances[minNode] + neighbor.weight;
  
          if (newDist < distances[neighbor.node]) {
            distances[neighbor.node] = newDist;
            previous[neighbor.node] = minNode;
            pq.enqueue(neighbor.node, newDist);
          }
        }
      }
    }
  
    return { path: [], distance: 0 };
  };
  
  class PriorityQueue {
    constructor() {
      this.collection = [];
    }
  
    enqueue(element, priority) {
      const newNode = new Node(element, priority);
      if (this.isEmpty()) {
        this.collection.push(newNode);
      } else {
        let added = false;
        for (let i = 1; i <= this.collection.length; i++) {
          if (priority < this.collection[i - 1].priority) {
            this.collection.splice(i - 1, 0, newNode);
            added = true;
            break;
          }
        }
        if (!added) {
          this.collection.push(newNode);
        }
      }
    }
  
    dequeue() {
      return this.collection.shift().element;
    }
  
    isEmpty() {
      return this.collection.length === 0;
    }
  }
  
  class Node {
    constructor(element, priority) {
      this.element = element;
      this.priority = priority;
    }
  }
  