// SPDX-License-Identifier: MIT
// An example of a consumer contract that relies on a subscription for funding.
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

contract Web3Football is VRFConsumerBaseV2, ConfirmedOwner {
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

    //For trial purposes
    uint8[] team1Ratings = [3, 1, 1, 2, 2, 2];
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

    function interface_Selection() external view returns (uint8) {
        uint8 goalkeeper;
        uint8 striker;
        uint8 index = (roundNumber % 10) / 2;

        if (playerState == 2) {
            striker = team1Ratings[index];
            goalkeeper = team2Ratings[5];
        } else {
            striker = team2Ratings[index];
            goalkeeper = team1Ratings[5];
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
        uint8 user_choice
    ) external {
        //logic for interface 1
        if (penalty_interface == 1 && playerState == 1) {
            require(
                user_choice >= 1 && user_choice <= 2,
                "Invalid choice from player"
            );
            uint256 computer_choice = (randomNumbers[roundNumber] % 2) + 1;

            if (user_choice == computer_choice) {
                Shoot_Detail[roundNumber].shoot_completed = true;
                Shoot_Detail[roundNumber].Winner_playerType = shoot_winner
                    .GOALKEEPER;
                Shoot_Detail[roundNumber].ShootWinner_Team = team_shoot_winner
                    .team1;

                Round_Detail[round_counter].no_of_shoots = roundNumber;
                // Round_Detail[round_counter].team1_score += 1;
            } else {
                Shoot_Detail[roundNumber].shoot_completed = true;
                Shoot_Detail[roundNumber].Winner_playerType = shoot_winner
                    .STRIKER;
                Shoot_Detail[roundNumber].ShootWinner_Team = team_shoot_winner
                    .team2;

                Round_Detail[round_counter].no_of_shoots = roundNumber;
                team2Score += 1;
            }
        }

        if (penalty_interface == 1 && playerState == 2) {
            require(
                user_choice >= 1 && user_choice <= 2,
                "Invalid choice from player"
            );
            uint256 computer_choice = (randomNumbers[roundNumber] % 2) + 1;

            if (user_choice == computer_choice) {
                Shoot_Detail[roundNumber].shoot_completed = true;
                Shoot_Detail[roundNumber].Winner_playerType = shoot_winner
                    .GOALKEEPER;
                Shoot_Detail[roundNumber].ShootWinner_Team = team_shoot_winner
                    .team2;

                Round_Detail[round_counter].no_of_shoots = shoot_counter;
                // Round_Detail[round_counter].team2_score += 1;
            } else {
                Shoot_Detail[roundNumber].shoot_completed = true;
                Shoot_Detail[roundNumber].Winner_playerType = shoot_winner
                    .STRIKER;
                Shoot_Detail[roundNumber].ShootWinner_Team = team_shoot_winner
                    .team1;

                Round_Detail[round_counter].no_of_shoots = roundNumber;
                team1Score += 1;
            }
        }

        //logic for interface 2
        //add 1 to user choice as indexing starts from 0
        if (penalty_interface == 2 && playerState == 1) {
            require(
                user_choice >= 1 && user_choice <= 4,
                "Invalid choice from player"
            );
            uint256 computer_choice = (randomNumbers[roundNumber] % 4) + 1;
            if (user_choice == computer_choice) {
                Shoot_Detail[roundNumber].shoot_completed = true;
                Shoot_Detail[roundNumber].Winner_playerType = shoot_winner
                    .GOALKEEPER;
                Shoot_Detail[roundNumber].ShootWinner_Team = team_shoot_winner
                    .team1;

                Round_Detail[round_counter].no_of_shoots = roundNumber;
                // Round_Detail[round_counter].team1_score += 1;
            } else {
                Shoot_Detail[roundNumber].shoot_completed = true;
                Shoot_Detail[roundNumber].Winner_playerType = shoot_winner
                    .STRIKER;
                Shoot_Detail[roundNumber].ShootWinner_Team = team_shoot_winner
                    .team2;

                Round_Detail[round_counter].no_of_shoots = roundNumber;
                team2Score += 1;
            }
        }

        if (penalty_interface == 2 && playerState == 2) {
            require(
                user_choice >= 1 && user_choice <= 4,
                "Invalid choice from player"
            );
            uint256 computer_choice = (randomNumbers[roundNumber] % 4) + 1;
            if (user_choice == computer_choice) {
                Shoot_Detail[roundNumber].shoot_completed = true;
                Shoot_Detail[roundNumber].Winner_playerType = shoot_winner
                    .GOALKEEPER;
                Shoot_Detail[roundNumber].ShootWinner_Team = team_shoot_winner
                    .team2;

                Round_Detail[round_counter].no_of_shoots = roundNumber;
                // Round_Detail[round_counter].team2_score += 1;
            } else {
                Shoot_Detail[roundNumber].shoot_completed = true;
                Shoot_Detail[roundNumber].Winner_playerType = shoot_winner
                    .STRIKER;
                Shoot_Detail[roundNumber].ShootWinner_Team = team_shoot_winner
                    .team1;

                Round_Detail[round_counter].no_of_shoots = roundNumber;
                team1Score += 1;
            }
        }

        //logic for interface 3

        if (penalty_interface == 3 && playerState == 1) {
            require(
                user_choice >= 1 && user_choice <= 8,
                "Invalid choice from player"
            );
            uint256 computer_choice = (randomNumbers[roundNumber] % 8) + 1;
            if (user_choice == computer_choice) {
                Shoot_Detail[roundNumber].shoot_completed = true;
                Shoot_Detail[roundNumber].Winner_playerType = shoot_winner
                    .GOALKEEPER;
                Shoot_Detail[roundNumber].ShootWinner_Team = team_shoot_winner
                    .team1;

                Round_Detail[round_counter].no_of_shoots = roundNumber;
                // Round_Detail[round_counter].team1_score += 1;
            } else {
                Shoot_Detail[roundNumber].shoot_completed = true;
                Shoot_Detail[roundNumber].Winner_playerType = shoot_winner
                    .STRIKER;
                Shoot_Detail[roundNumber].ShootWinner_Team = team_shoot_winner
                    .team2;

                Round_Detail[round_counter].no_of_shoots = roundNumber;
                team2Score += 1;
            }
        }

        if (penalty_interface == 3 && playerState == 2) {
            require(
                user_choice >= 1 && user_choice <= 8,
                "Invalid choice from player"
            );
            uint256 computer_choice = (randomNumbers[roundNumber] % 8) + 1;
            if (user_choice == computer_choice) {
                Shoot_Detail[roundNumber].shoot_completed = true;
                Shoot_Detail[roundNumber].Winner_playerType = shoot_winner
                    .GOALKEEPER;
                Shoot_Detail[roundNumber].ShootWinner_Team = team_shoot_winner
                    .team2;

                Round_Detail[round_counter].no_of_shoots = roundNumber;
                // Round_Detail[round_counter].team2_score += 1;
            } else {
                Shoot_Detail[roundNumber].shoot_completed = true;
                Shoot_Detail[roundNumber].Winner_playerType = shoot_winner
                    .STRIKER;
                Shoot_Detail[roundNumber].ShootWinner_Team = team_shoot_winner
                    .team1;

                Round_Detail[round_counter].no_of_shoots = roundNumber;
                team1Score += 1;
            }
        }
        if (playerState == 1) {
            playerState = 2;
        } else {
            playerState = 1;
        }
        roundNumber = roundNumber + 1;
    }

    //this function will check the round result by comparing score
    function round_result_check() external view returns (uint8) {
        uint8 curr_team1 = team1Score;
        uint8 curr_team2 = team2Score;
        if (roundNumber <= 10) {
            uint8 potential_team1;
            uint8 potential_team2;

            if (roundNumber % 2 == 0) {
                potential_team1 = 5 - ((roundNumber) / 2) + curr_team1;
                potential_team2 = 5 - ((roundNumber) / 2) + curr_team2;
            } else {
                if (playerState == 2) {
                    potential_team1 = 5 - ((roundNumber) / 2) + curr_team1;
                    potential_team2 = 5 - ((roundNumber) / 2) - 1 + curr_team2;
                } else {
                    potential_team1 = 5 - ((roundNumber) / 2) - 1 + curr_team1;
                    potential_team2 = 5 - ((roundNumber) / 2) + curr_team2;
                }
            }

            if (curr_team1 > potential_team2) {
                // Round_Detail[round_counter].round_complete = true;
                // Round_Detail[round_counter].Round_Winner = round_winner.TEAM1;
                // status = round_winner.TEAM1;
                return 1; //returning 1 means that team 1 has won(player)
            } else if (curr_team2 > potential_team1) {
                // Round_Detail[round_counter].round_complete = true;
                // Round_Detail[round_counter].Round_Winner = round_winner.TEAM2;
                // status = round_winner.TEAM2;
                return 2; //returning 2 means that team 2 has won(computer)
            } else {
                return 0; //match is still going on
            }
        } else {
            if (roundNumber % 2 == 0) {
                if (curr_team1 > curr_team2) {
                    // Round_Detail[round_counter].round_complete = true;
                    // Round_Detail[round_counter].Round_Winner = round_winner
                    // .TEAM1;
                    // status = round_winner.TEAM1;
                    return 1;
                } else if (curr_team1 < curr_team2) {
                    // Round_Detail[round_counter].round_complete = true;
                    // Round_Detail[round_counter].Round_Winner = round_winner
                    // .TEAM2;
                    // status = round_winner.TEAM2;
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
    {
        COORDINATOR = VRFCoordinatorV2Interface(
            0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625
        );
        s_subscriptionId = subscriptionId;
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

    //mycode
}
