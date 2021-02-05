let {Block} = require('./Block')
module.exports =  class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 4
        this.pendingTransactions = []
    }
    createGenesisBlock(){
        return new Block(0,"First Port Blockchain","0")
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }
    /**
     * 
     * @param {*} dataBlock 
     */
    createBlock(dataBlock){
        dataBlock.previousHash = this.getLatestBlock().hash
        dataBlock.mineBlock(this.difficulty);
        dataBlock.hash = dataBlock.calculateHash()
        this.chain.push(dataBlock)
    }
    isChainValid(){
        for(let i=1;i<this.chain.length;i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i-1]
            if(currentBlock.hash !== currentBlock.calculateHash()||currentBlock.previousHash !== previousBlock.hash) {return false}
        }
        return true
    }
}

