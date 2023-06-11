// SPDX-License-Identifier: MIT
// An example of a consumer contract that relies on a subscription for funding.
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

contract Web3Football is VRFConsumerBaseV2, ConfirmedOwner, ERC721URIStorage {
    uint8 public shoot_counter = 0;
    uint8 public round_counter;
    round_winner status = round_winner.MATCH_GOING_ON;
    uint256[] public randomNumbers;

    uint8 public team1Score = 0;
    uint8 public team2Score = 0;
    uint8 public roundNumber = 0;

    function initialize_array() public {
        randomNumbers[0] = 52592424;
        randomNumbers[1] = 896276886;
        randomNumbers[2] = 761876616;
        randomNumbers[3] = 664664064;
        randomNumbers[4] = 676866871;
        randomNumbers[5] = 52592424;
        randomNumbers[6] = 896276886;
        randomNumbers[7] = 761876616;
        randomNumbers[8] = 664664064;
        randomNumbers[9] = 676866871;
    }

    uint8 public playerState;

    function updatePlayerState(uint8 choice) public {
        playerState = choice;
    }

    function roundNumberIncrease() public {
        roundNumber = roundNumber + 1;
    }

    function setPlayerState(uint8 choice) public {
        playerState = choice;
    }

    //stores the random number in the array

    //toss

    uint8 public tossChoice;
    bool public winOrLoss;

    function toss(uint8 _tossChoice) public {
        tossChoice = _tossChoice;
        if (randomNumbers[0] % 2 == tossChoice) {
            winOrLoss = true;
        } else {
            winOrLoss = false;
        }
    }

    //structure that stores the details
    struct game_starting_details {
        uint8 player1_level;
        uint8 player2_level;
        string wonToss;
    }

    enum shoot_winner {
        GOALKEEPER,
        STRIKER
    }

    enum round_winner {
        TEAM1,
        TEAM2,
        MATCH_GOING_ON
    }

    enum team_shoot_winner {
        team1,
        team2
    }

    //For initiliazation
    uint8[6] public team1Ratings;

    function gameInitialization() public {
        team1Ratings[0] = playerActiveCards[msg.sender][0].level;
        team1Ratings[1] = playerActiveCards[msg.sender][1].level;
        team1Ratings[2] = playerActiveCards[msg.sender][2].level;
        team1Ratings[3] = playerActiveCards[msg.sender][3].level;
        team1Ratings[4] = playerActiveCards[msg.sender][4].level;

        team1Ratings[5] = playerActiveGKCard[msg.sender].level;
    }

    uint8[] team2Ratings = [2, 3, 2, 1, 1, 2];
    //structure that has shoot details
    struct shoot_detail {
        uint8 shoot_no;
        uint8 team1_lvl; //player is team 1
        uint8 team2_lvl; //computer is team 2
        bool select_interface; //checks if the interface has been selected or not
        uint8 selected_interface; // stores the interface a =1, b = 2, c =3
        bool shoot_completed; //checks if the shoot is completed or not
        shoot_winner Winner_playerType;
        team_shoot_winner ShootWinner_Team;
    }

    //structure that has round details
    struct round_detail {
        uint8 no_of_shoots;
        uint8 team1_score;
        uint8 team2_score;
        bool round_complete;
        round_winner Round_Winner;
    }

    shoot_detail[20] public Shoot_Detail;
    round_detail[20] Round_Detail;

    //function that selects which interface to play on
    //return?
    event testi(uint8 shoot_counter, uint8 Team1_Lvl, uint8 Team2_Lvl); //team 1 lvl is goalkeeper level and team 2 levelis striker level

    function interface_Selection(
        uint8 _shootNumber,
        uint8 _playerState,
        address _from
    ) external view returns (uint8) {
        uint8 goalkeeper;
        uint8 striker;
        uint8 index = (_shootNumber % 10) / 2;

        if (_playerState == 2) {
            striker = playerActiveCards[_from][index].level;
            goalkeeper = team2Ratings[5];
        } else {
            striker = team2Ratings[index];
            goalkeeper = playerActiveGKCard[_from].level;
        }

        if (striker > goalkeeper) {
            return 3;
        } else if (striker == goalkeeper) {
            return 2;
        } else {
            return 1;
        }
    }

    //this function will process the random number and check the result
    function penalty_shoot(
        uint8 penalty_interface,
        uint8 user_choice,
        uint8 _shootNumber
    ) public view returns (bool res) {
        //logic for interface 1
        if (penalty_interface == 1) {
            uint256 computer_choice = (randomNumbers[_shootNumber] % 2) + 1;

            if (user_choice == computer_choice) {
                return false;
            } else {
                return true;
            }
        }
        //logic for interface 2
        if (penalty_interface == 2) {
            uint256 computer_choice = (randomNumbers[_shootNumber] % 4) + 1;
            if (user_choice == computer_choice) {
                return false;
            } else {
                return true;
            }
        }

        //logic for interface 3
        if (penalty_interface == 3) {
            uint256 computer_choice = (randomNumbers[_shootNumber] % 8) + 1;
            if (user_choice == computer_choice) {
                return false;
            } else {
                return true;
            }
        }
    }

    //this function will check the round result by comparing score
    function round_result_check(
        uint8 _team1Score,
        uint8 _team2Score,
        uint8 shootNumber,
        uint8 _playerState
    ) external pure returns (uint8) {
        uint8 curr_team1 = _team1Score;
        uint8 curr_team2 = _team2Score;
        if (shootNumber <= 10) {
            uint8 potential_team1;
            uint8 potential_team2;

            if (shootNumber % 2 == 0) {
                potential_team1 = 5 - ((shootNumber) / 2) + curr_team1;
                potential_team2 = 5 - ((shootNumber) / 2) + curr_team2;
            } else {
                if (_playerState == 2) {
                    potential_team1 = 5 - ((shootNumber) / 2) + curr_team1;
                    potential_team2 = 5 - ((shootNumber) / 2) - 1 + curr_team2;
                } else {
                    potential_team1 = 5 - ((shootNumber) / 2) - 1 + curr_team1;
                    potential_team2 = 5 - ((shootNumber) / 2) + curr_team2;
                }
            }

            if (curr_team1 > potential_team2) {
                return 1; //returning 1 means that team 1 has won(player)
            } else if (curr_team2 > potential_team1) {
                return 2; //returning 2 means that team 2 has won(computer)
            } else {
                return 0; //match is still going on
            }
        } else {
            if (shootNumber % 2 == 0) {
                if (curr_team1 > curr_team2) {
                    return 1;
                } else if (curr_team1 < curr_team2) {
                    return 2;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        }
    }

    //this function updates the shoot_counter variable. It is done after every penaly shot taken.
    function update_shoot_counter() public {
        shoot_counter++;
    }

    //function that updates the round counter
    function update_round_counter() public {
        round_counter++;
    }

    function reset() public {
        shoot_counter = 0;
        roundNumber = 0;
        team1Score = 0;
        team2Score = 0;
        playerState = 0;
    }

    function score_team1() external view returns (uint8) {
        return Round_Detail[round_counter].team1_score;
    }

    function score_team2() external view returns (uint8) {
        return Round_Detail[round_counter].team2_score;
    }

    //////////////////////////////////////////////////////////

    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256[] randomWords;
        bool didWin;
    }
    mapping(uint256 => RequestStatus)
        public s_requests; /* requestId --> requestStatus */
    VRFCoordinatorV2Interface COORDINATOR;

    // Your subscription ID.
    uint64 s_subscriptionId;

    // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/docs/vrf/v2/subscription/supported-networks/#configurations
    bytes32 keyHash =
        0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;

    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
    // so 100,000 is a safe default for this example contract. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 callbackGasLimit = 1000000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 numWords = 20;

    /**
     * HARDCODED FOR SEPOLIA
     * COORDINATOR: 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625
     */
    constructor(
        uint64 subscriptionId
    )
        VRFConsumerBaseV2(0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625)
        ConfirmedOwner(msg.sender)
        ERC721("Web3Football", "FC")
    {
        COORDINATOR = VRFCoordinatorV2Interface(
            0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625
        );
        s_subscriptionId = subscriptionId;

        //nfts
        Card memory p0 = Card(0, 3);
        Card memory p1 = Card(1, 3);
        Card memory p2 = Card(2, 3);
        Card memory p3 = Card(3, 2);
        Card memory p4 = Card(4, 2);
        Card memory p5 = Card(5, 2);
        Card memory p6 = Card(6, 2);
        Card memory p7 = Card(7, 2);
        Card memory p8 = Card(8, 1);
        Card memory p9 = Card(9, 1);
        Card memory p10 = Card(10, 1);

        availableCards.push(p0);
        availableCards.push(p1);
        availableCards.push(p2);
        availableCards.push(p3);
        availableCards.push(p4);
        availableCards.push(p5);
        availableCards.push(p6);
        availableCards.push(p7);
        availableCards.push(p8);
        availableCards.push(p9);
        availableCards.push(p10);

        Card memory g0 = Card(0, 3);
        Card memory g1 = Card(1, 2);
        Card memory g2 = Card(2, 2);
        Card memory g3 = Card(3, 1);

        availableGKCards.push(g0);
        availableGKCards.push(g1);
        availableGKCards.push(g2);
        availableGKCards.push(g3);
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords() external returns (uint256 requestId) {
        // Will revert if subscription is not set and funded.
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        s_requests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false,
            didWin: true
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].exists, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        if (_randomWords[0] % 2 == 0) {
            s_requests[_requestId].didWin = true;
        }
        randomNumbers = _randomWords;
        emit RequestFulfilled(_requestId, _randomWords);
    }

    function getRequestStatus(
        uint256 _requestId
    )
        external
        view
        returns (bool fulfilled, uint256[] memory randomWords, bool didWin)
    {
        require(s_requests[_requestId].exists, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.fulfilled, request.randomWords, request.didWin);
    }

    //cards and points
    function getAvailableCards() public view returns (Card[] memory) {
        return availableCards;
    }

    function getAvailableGKCards() public view returns (Card[] memory) {
        return availableGKCards;
    }

    uint256 COUNTER;

    struct Card {
        uint256 id;
        uint8 level;
    }

    Card[] public cards;
    Card[] public availableCards;
    Card[] public availableGKCards;
    mapping(address => Card[]) public playerActiveCards;
    mapping(address => Card[]) public playerInactiveCards;
    mapping(address => Card) public playerActiveGKCard;

    //CreationOfNFT
    function _createNft(uint8 _id, uint8 option) internal {
        // _safeMint(_to,COUNTER);
        // COUNTER++;
        if (option == 1) {
            playerActiveGKCard[msg.sender] = availableGKCards[_id];
        } else if (option == 2) {
            playerActiveCards[msg.sender].push(availableCards[_id]);
        }
        _safeMint(msg.sender, COUNTER);
        COUNTER++;
    }

    function _buyNft(uint _id, uint option) internal {
        playerPoints[msg.sender] -= 200;
        if (option == 2) {
            playerInactiveCards[msg.sender].push(availableCards[_id]);
        }
        _safeMint(msg.sender, COUNTER);
        COUNTER++;
    }

    function buyNftCard(uint8 _id, uint8 option) public {
        _buyNft(_id, option);
    }

    function createActiveCard(uint8 _id, uint8 option) public {
        _createNft(_id, option);
    }

    //GettingNFT
    function getPlayingCards(
        address player
    ) public view returns (Card[] memory) {
        return playerActiveCards[player];
    }

    function getInactiveCards(
        address player
    ) public view returns (Card[] memory) {
        return playerInactiveCards[player];
    }

    //playerpoints
    mapping(address => bool) public joinStatus;

    function getJoinStatus() public view returns (bool) {
        return joinStatus[msg.sender];
    }

    mapping(address => uint256) public playerPoints;

    function join() public {
        joinStatus[msg.sender] = true;
        playerPoints[msg.sender] = 200;
        _createNft(0, 2);
        _createNft(8, 2);
        _createNft(10, 2);
        _createNft(4, 2);
        _createNft(6, 2);
        _createNft(1, 1);
    }

    function wonPoints(address winner) public {
        playerPoints[winner] += 20;
    }
}
