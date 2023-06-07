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

export {getRequestRandomWords,callToss}
