const getLastId = async (contract) =>{
    if(!contract){
      return false;
    }
    const t = await contract.methods.lastRequestId().call();
    return t;
  }

  const getStatus = async (contract,id) => {
    if(!contract){
      return false;
    }
    const t = await contract.methods.getRequestStatus(id).call();
    return t;
  }

  const  getWinOrLose = async (contract) => {
    if(!contract){
        return false;
      }
      const t = await contract.methods.winOrLoss().call();
      return t;
  }

export {getLastId, getStatus,  getWinOrLose}