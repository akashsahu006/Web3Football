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

  const getInterface = async (contract, account, shootNumber,playerState) => {
    if(!contract){
      return false;
    }
    const t = await contract.methods.interface_Selection(shootNumber, playerState,account.currentAccount).call();
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
  
  const checkResult = async (contract,team1Score,team2Score,shootNumber,playerState) => {
    if(!contract){
      return false;
    }
    const t = await contract.methods.round_result_check(team1Score,team2Score,shootNumber,playerState).call();
    return t;
  } 
  
  const getRoundNumber = async (contract) =>{
    if(!contract){
      return false;
    }
    const t = await contract.methods.roundNumber().call();
    return t;
  }

  const penaltyShoot = async (contract,interFace, option, shootNumber) => {
    if(!contract){
        return false;
    }
    const t = await contract.methods.penalty_shoot(interFace,option,shootNumber).call()
    return t
}

const joinStatus = async (contract,account) => {
  if(!contract){
    return false;
  }
  const t = await contract.methods.joinStatus(account.currentAccount).call();
  return t;
}

const getPlayerActiveCards = async(contract,account) => {
  if(!contract){
    return false;
  }
  const t = await contract.methods.getPlayingCards(account.currentAccount).call();
  return t;
}


const getPlayerActiveGKCard= async(contract,account) => {
  if(!contract){
    return false;
  }
  const t = await contract.methods.playerActiveGKCard(account.currentAccount).call();
  return t;
}

const getInactiveCards = async(contract,account) => {
  if(!contract){
    return false;
  }
  const t = await contract.methods.getInactiveCards(account.currentAccount).call();
  return t;
}

const getAvailableCards = async(contract) => {
  if(!contract){
    return false;
  }
  const t = await contract.methods.getAvailableCards().call();
  return t;
}


const getPlayerPoints = async(contract, account) => {
  if(!contract){
    return false;
  }
  const t = await contract.methods.playerPoints(account.currentAccount).call();
  return t;
}

export {getInactiveCards, getPlayerPoints, getAvailableCards, getPlayerActiveGKCard, getPlayerActiveCards, joinStatus, penaltyShoot, getLastId, getStatus,  getWinOrLose, getInterface, getPlayerState, getComputerScore, getPlayerScore, checkResult, getRoundNumber}