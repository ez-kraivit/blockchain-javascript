const Blockchain = require('./lib/Blockchain')
const {Block} = require('./lib/Block')

const blockchain = new Blockchain();
console.log("Slow and Steady....")
blockchain.addBlock(new Block(1,{candidate:"นายก",resources:{amout:10}}));
console.log("Slow and Steady....")
blockchain.addBlock(new Block(2,{candidate:"นายข",resources:{amout:20}}));

