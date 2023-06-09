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

const penaltyShoot = async (contract,account,interFace, option) => {
    if(!contract){
        return false;
    }
    const t = await contract.methods.penalty_shoot(interFace,option).send({from:account.currentAccount})
    return t
}

const resetGame = async(contract,account) =>{
    if(!contract){
        return false;
    }
    await contract.methods.reset().send({from:account.currentAccount})
}

export {getRequestRandomWords,callToss,updatePlayerState, penaltyShoot, resetGame}
