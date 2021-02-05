const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const ENCRYPTION_KEY = Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64');
const IV_LENGTH = 16;
/**
 * 
 * @param {*} text 
 * @returns
 */
const encrypt = (text)=>{
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}
exports.Block = class Block{
    /**
     * 
     * @param {Number} index 
     * @param {timestamp} timestamp 
     * @param {*} data 
     * @param {*} previousHash 
     */
    constructor(index,data,previousHash =''){
        this.index = index
        this.timestamp = Date.now()
        this.data = data
        this.previousHash = previousHash
        this.hash =this.calculateHash()
        this.nonce = 0
    }
    calculateHash(){
        return encrypt(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce)
    }
    /**
     * 
     * @param {Number} difficulty 
     */
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty)!= Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash()
        }
        console.log("Block mined: "+this.hash)
    }
}
