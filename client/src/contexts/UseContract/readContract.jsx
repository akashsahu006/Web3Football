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

  const getInterface = async (contract) => {
    if(!contract){
      return false;
    }
    const t = await contract.methods.interface_Selection().call();
    return t;
  }

  const getPlayerState = async (contract) => {
    if(!contract){
      return false;
    }
    const t = await contract.methods.playerState().call();
    return t;
  }

  const getPlayerScore = async (contract) => {
    if(!contract){
      return false;
    }
    const t = await contract.methods.team1Score().call();
    return t;
  }

  const getComputerScore = async (contract) => {
    if(!contract){
      return false;
    }
    const t = await contract.methods.team2Score().call();
    return t;
  }
  
  const checkResult = async (contract) => {
    if(!contract){
      return false;
    }
    const t = await contract.methods.round_result_check().call();
    return t;
  } 
  
  const getRoundNumber = async (contract) =>{
    if(!contract){
      return false;
    }
    const t = await contract.methods.roundNumber().call();
    return t;
  }

export {getLastId, getStatus,  getWinOrLose, getInterface, getPlayerState, getComputerScore, getPlayerScore, checkResult, getRoundNumber}