const getRequestRandomWords = async (contract) => {
    if(!contract){
      return false;
    }
    const t = await contract.methods.requestRandomWords().send({from:"0x2a284200e305405B0A09Ac9366EfDE35B0397203"});
    return t;
}

const callToss = async (contract,account,choice) => {
    if(!contract){
        return false;
    }
    const t = await contract.methods.toss(choice).send({from:account.currentAccount})
    return t;
}

const updatePlayerState = async (contract,account,choice) =>{
    if(!contract){
        return false;
    }
    const t = await contract.methods.setPlayerState(choice).send({from:account.currentAccount})
    return t;
}



const resetGame = async(contract,account) =>{
    if(!contract){
        return false;
    }
    await contract.methods.reset().send({from:account.currentAccount})
}

const signup = async(contract,account) => {
    if(!contract){
        return false;
    }
    await contract.methods.join().send({from:account.currentAccount})
}

const buyPlayer = async(contract,account,id,option) => {
    if(!contract){
        return false;
    }
    const t = await contract.methods.buyNftCard(id,option).send({from:account.currentAccount});
    return t;
}

const wonPoints = async (contract, account) => {
    if(!contract){
        return false;
    }
    const t = await contract.methods.wonPoints(account.currentAccount).send({from:account.currentAccount});
    return t;
}

export {wonPoints, buyPlayer, signup, getRequestRandomWords,callToss,updatePlayerState,resetGame}
