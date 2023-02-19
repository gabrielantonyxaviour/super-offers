// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import {ISuperfluid} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IPUSHCommInterface {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external;
}

contract SuperOffers is AutomationCompatibleInterface {
    // Library Import
    using SuperTokenV1Library for ISuperToken;

    // Structures
    struct SuperOffer {
        string name;
        address creator;
        address[] contracts;
        bytes4[] resolvers;
        bytes32[] expected;
        SuperFlow flow;
        uint256 startTime;
        uint256 endTime;
        string description;
    }

    struct SuperFlow {
        uint256 updatedAmount;
        int96 updatedFlowRate;
        uint256 UpdatedTimeStamp;
    }

    // Minimum threshold to create a super stream offer
    uint256 constant MINIMUM_OFFER_THRESHOLD = 1000000000000000000;
    // Zero address
    address constant ZERO_ADDRESS = 0x0000000000000000000000000000000000000000;

    address constant CHANNEL_ADDRESS = 0x0429A2Da7884CA14E53142988D5845952fE4DF6a;
    address constant EPNS_COMM_CONTRACT_ADDRESS = 0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa;
    // mappings
    mapping(uint256 => SuperOffer) private _superOffers;
    uint256 private _offersPointer;
    mapping(uint256 => address[]) private _offerToClaimers;
    mapping(uint256 => uint256) private _offerToClaimerPointer;
    mapping(address => mapping(uint256 => bool)) private _claimerToOffers;
    mapping(address => int96) private _claimerToFlows;
    mapping(uint256 => uint256) private _failedClaimsCount;
    // GOERLI TEST fDAIx Token
    ISuperToken public token;

    constructor(ISuperToken _token) {
        token = _token;
        _offersPointer = 0;
    }

    // events
    event SuperOfferCreated(
        uint256 indexed offerId,
        string _name,
        address creator,
        uint256 amount,
        address[] contracts,
        bytes4[] resolvers,
        bytes32[] expected,
        uint256 startTime,
        uint256 endTime,
        uint256 lastUpdated,
        string description
    );
    event SuperOfferUpdated(
        uint256 indexed offerId,
        string _name,
        address creator,
        uint256 amount,
        address[] contracts,
        bytes4[] resolvers,
        bytes32[] expected,
        uint256 startTime,
        uint256 endTime,
        uint256 lastUpdated,
        string description
    );
    event SuperOfferDeleted(uint256 indexed offerId);
    event SuperOfferClaimed(
        uint256 indexed offerId,
        uint256 updatedAmount,
        int96 updatedFlowRate,
        uint256 updatedTime,
        address claimer
    );
    event SuperClaimStopped(
        uint256 indexed offerId,
        address receiver,
        uint256 updatedAmount,
        int96 updatedFlowRate,
        uint256 updatedTime
    );
    event SuperOfferStopped(uint256 indexed offerId);

    // Creates a super offer
    function createOffer(
        string memory _name,
        address[] memory contracts,
        bytes4[] memory resolvers,
        bytes32[] memory expected,
        uint256 amount,
        uint256 startTime,
        uint256 endTime,
        string memory description
    ) public {
        require(token.allowance(msg.sender, address(this)) >= amount, "Daix unapproved");
        require(amount >= MINIMUM_OFFER_THRESHOLD, "Insufficent daix");
        require(startTime > block.timestamp, "Offer is in past");
        token.transferFrom(msg.sender, address(this), amount);
        _superOffers[_offersPointer] = SuperOffer(
            _name,
            msg.sender,
            contracts,
            resolvers,
            expected,
            SuperFlow(amount, 0, startTime),
            startTime,
            endTime,
            description
        );
        _offersPointer += 1;
        emit SuperOfferCreated(
            _offersPointer - 1,
            _name,
            msg.sender,
            amount,
            contracts,
            resolvers,
            expected,
            startTime,
            endTime,
            block.timestamp,
            description
        );
        string memory body = string(
            abi.encodePacked(
                _name,
                "\n",
                description,
                "\n",
                "Offer Id: ",
                Strings.toString(_offersPointer - 1)
            )
        );
        IPUSHCommInterface(EPNS_COMM_CONTRACT_ADDRESS).sendNotification(
            CHANNEL_ADDRESS,
            address(this),
            bytes(
                string(
                    abi.encodePacked(
                        "0",
                        "+", // segregator
                        "1",
                        "+", // segregator
                        "New Super Offer!",
                        "+", // segregator
                        body
                    )
                )
            )
        );
    }

    // Updates a super offer
    function updateOffer(
        uint256 _offerId,
        string memory _name,
        address[] memory contracts,
        bytes4[] memory resolvers,
        bytes32[] memory expected,
        uint256 amount,
        uint256 startTime,
        uint256 endTime,
        string memory description
    ) public {
        require(_superOffers[_offerId].creator == msg.sender, "Not creator");
        require(_superOffers[_offerId].startTime > block.timestamp, "Offer started");
        require(startTime > block.timestamp, "Offer is in past");
        require(token.allowance(msg.sender, address(this)) >= amount, "Daix unapproved");
        require(amount >= MINIMUM_OFFER_THRESHOLD, "Insufficent daix");
        uint256 _returnAmount = 0;
        if (amount < _superOffers[_offerId].flow.updatedAmount) {
            _returnAmount = _superOffers[_offerId].flow.updatedAmount - amount;
        }
        if (amount > _superOffers[_offerId].flow.updatedAmount) {
            token.transferFrom(
                msg.sender,
                address(this),
                amount - _superOffers[_offerId].flow.updatedAmount
            );
        }
        _superOffers[_offerId] = SuperOffer(
            _name,
            msg.sender,
            contracts,
            resolvers,
            expected,
            SuperFlow(amount, 0, startTime),
            startTime,
            endTime,
            description
        );
        if (_returnAmount > 0) {
            token.transfer(msg.sender, _returnAmount);
        }
        emit SuperOfferUpdated(
            _offerId,
            _name,
            msg.sender,
            amount,
            contracts,
            resolvers,
            expected,
            startTime,
            endTime,
            block.timestamp,
            description
        );
    }

    // Deletes a super offer
    function deleteOffer(uint256 _offerId) public {
        require(_superOffers[_offerId].creator == msg.sender, "Only creator can delete the offer");
        require(_superOffers[_offerId].startTime > block.timestamp, "Offer already started");
        uint256 _returnAmount = _superOffers[_offerId].flow.updatedAmount;
        delete _superOffers[_offerId];
        token.transfer(msg.sender, _returnAmount);

        emit SuperOfferDeleted(_offerId);
    }

    function claimOffer(uint256 _offerId) public {
        // require not already claimed
        require(_claimerToOffers[msg.sender][_offerId] == false, "Offer claimed");
        // require max amount of claimers not reached
        require(_offerToClaimerPointer[_offerId] != 5, "Maximum claimers");
        require(block.timestamp > _superOffers[_offerId].startTime, "Offer not started");
        SuperOffer memory _superOffer = _superOffers[_offerId];
        // validate claim
        for (uint256 i = 0; i < _superOffer.resolvers.length; i++) {
            (bool success, bytes memory resultData) = _superOffer.contracts[i].call(
                abi.encodeWithSelector(_superOffer.resolvers[i], msg.sender)
            );
            require(success, "Unsuccessful claim call");
            require(_superOffer.expected[i] == bytes32(resultData), "Claim Denied");
        }
        // Store in vars
        _offerToClaimers[_offerId].push(msg.sender);
        _offerToClaimerPointer[_offerId] += 1;
        _claimerToOffers[msg.sender][_offerId] = true;

        // reduce the amount and store a var for offerId => (flowRate,UpdatedTimeStamp,amount)
        uint256 _updatedAmount = _superOffer.flow.updatedAmount -
            uint256(int256(_superOffer.flow.updatedFlowRate)) *
            (block.timestamp - _superOffer.flow.UpdatedTimeStamp);

        // Update old flows
        int96 _updatedFlowRate = int96(
            int256(_updatedAmount / (_superOffer.endTime - block.timestamp))
        );
        int96 _updatedflowRatePerPerson = _updatedFlowRate /
            int96(int256(_offerToClaimerPointer[_offerId] - _failedClaimsCount[_offerId]));

        for (uint256 i = 0; i < _offerToClaimerPointer[_offerId] - 1; i++) {
            if (_claimerToOffers[msg.sender][_offerId] == true) {
                int96 _updatedFlowRateChangePerPerson = (_updatedFlowRate -
                    _superOffer.flow.updatedFlowRate) /
                    int96(int256(_offerToClaimerPointer[_offerId] - _failedClaimsCount[_offerId]));
                token.updateFlow(
                    _offerToClaimers[_offerId][i],
                    _claimerToFlows[msg.sender] + _updatedFlowRateChangePerPerson
                );
                _claimerToFlows[msg.sender] += _updatedFlowRateChangePerPerson;
            }
        }
        token.createFlow(msg.sender, _claimerToFlows[msg.sender] + _updatedflowRatePerPerson);
        _claimerToFlows[msg.sender] += _updatedflowRatePerPerson;

        // update new vars
        _superOffers[_offerId].flow = SuperFlow(_updatedAmount, _updatedFlowRate, block.timestamp);

        // emit event
        emit SuperOfferClaimed(
            _offerId,
            _updatedAmount,
            _updatedFlowRate,
            block.timestamp,
            msg.sender
        );
        string memory body = string(
            abi.encodePacked(
                "User ",
                msg.sender,
                "  has claimed your offer\nOffer Id: ",
                Strings.toString(_offersPointer - 1)
            )
        );
        IPUSHCommInterface(EPNS_COMM_CONTRACT_ADDRESS).sendNotification(
            CHANNEL_ADDRESS,
            _superOffer.creator,
            bytes(
                string(
                    abi.encodePacked(
                        "0",
                        "+", // segregator
                        "3",
                        "+", // segregator
                        "You Offer is claimed!",
                        "+", // segregator
                        body
                    )
                )
            )
        );
    }

    function deleteFlows(uint256 _offerId) internal {
        for (uint256 i = 0; i < _offerToClaimers[_offerId].length; i++) {
            address _receiver = _offerToClaimers[_offerId][i];
            token.updateFlow(
                _receiver,
                _claimerToFlows[_receiver] - _superOffers[_offerId].flow.updatedFlowRate
            );
            _claimerToFlows[_receiver] -= _superOffers[_offerId].flow.updatedFlowRate;
            _superOffers[_offerId].flow = SuperFlow(0, 0, 0);
            _claimerToOffers[_receiver][_offerId] = false;
        }
        string memory body;

        if (_offerToClaimers[_offerId].length == 0) {
            token.transfer(
                _superOffers[_offerId].creator,
                _superOffers[_offerId].flow.updatedAmount
            );
            body = string(
                abi.encodePacked(
                    "No one claimed your offer. Tokens are returned.\nOffer Id: ",
                    Strings.toString(_offersPointer - 1)
                )
            );
        } else {
            body = string(
                abi.encodePacked(
                    "All of your tokens are streamed to the claimers\nOffer Id: ",
                    Strings.toString(_offersPointer - 1)
                )
            );
        }
        emit SuperOfferStopped(_offerId);
        IPUSHCommInterface(EPNS_COMM_CONTRACT_ADDRESS).sendNotification(
            CHANNEL_ADDRESS,
            _superOffers[_offerId].creator,
            bytes(
                string(
                    abi.encodePacked(
                        "0",
                        "+", // segregator
                        "3",
                        "+", // segregator
                        "SuperOffer Ended!",
                        "+", // segregator
                        body
                    )
                )
            )
        );
    }

    function removeFlow(uint256 _offerId, address _receiver) internal {
        int96 _updatedflowRatePerPerson = (_superOffers[_offerId].flow.updatedFlowRate /
            int96(int256(_offerToClaimerPointer[_offerId])));
        token.updateFlow(_receiver, _claimerToFlows[_receiver] - _updatedflowRatePerPerson);
        // remove person from array
        _failedClaimsCount[_offerId] += 1;
        _claimerToOffers[_receiver][_offerId] = false;
        _claimerToFlows[_receiver] -= _updatedflowRatePerPerson;
        SuperOffer memory _superOffer = _superOffers[_offerId];

        uint256 _updatedAmount = _superOffer.flow.updatedAmount -
            uint256(int256(_superOffer.flow.updatedFlowRate)) *
            (block.timestamp - _superOffer.flow.UpdatedTimeStamp);

        int96 _updatedFlowRate = int96(
            int256(_updatedAmount / (_superOffer.endTime - block.timestamp))
        );

        for (uint256 i = 0; i < _offerToClaimerPointer[_offerId]; i++) {
            if (_claimerToOffers[msg.sender][_offerId] == true) {
                int96 _updatedFlowRateChangePerPerson = (_updatedFlowRate -
                    _superOffer.flow.updatedFlowRate) /
                    int96(int256(_offerToClaimerPointer[_offerId] - _failedClaimsCount[_offerId]));
                token.updateFlow(
                    _offerToClaimers[_offerId][i],
                    _claimerToFlows[msg.sender] + _updatedFlowRateChangePerPerson
                );
                _claimerToFlows[msg.sender] += _updatedFlowRateChangePerPerson;
            }
        }
        emit SuperClaimStopped(
            _offerId,
            _receiver,
            _updatedAmount,
            _updatedFlowRate,
            block.timestamp
        );
    }

    function checkUpkeep(
        bytes memory /* checkData */
    )
        public
        view
        override
        returns (
            bool,
            bytes memory /* performData */
        )
    {
        for (uint256 j = 0; j < _offersPointer; j++) {
            if (_superOffers[j].endTime < block.timestamp) {
                return (true, abi.encodeWithSignature("deleteFlows(uint)", j));
            }
            //    SuperOffer memory _superOffer=_superOffers[j];

            //         for(uint k=0;k<_offerToClaimers[j].length;k++)
            //         {
            //             if(!_claimerToOffers[_offerToClaimers[j][k]][j])
            //             {
            //                 continue;
            //             }
            //                 address _receiver=_offerToClaimers[j][k];

            //             for(uint i=0;i<_superOffer.resolvers.length;i++)
            //             {

            //                 (bool success,bytes memory resultData)=_superOffer.contracts[i].call(abi.encodeWithSelector(_superOffer.resolvers[i],_receiver));
            //                 if(!success||bytes32(_superOffer.expected[i])!=bytes32(resultData))
            //                 {
            //                     return(true,abi.encodeWithSignature("removeFlow(uint,address)",j,_receiver));
            //                 }
            //             }

            //         }
        }
    }

    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        (bool upkeepNeeded, bytes memory func) = checkUpkeep("");
        if (upkeepNeeded) {
            (bool success, ) = address(this).call(func);
            require(success, "Deleting Offers failed");
        }
    }

    // function getClaim(uint _claimId)

    function getSuperOffer(uint256 _offerId) public view returns (SuperOffer memory) {
        return _superOffers[_offerId];
    }

    function getFlow() public view returns (int96) {
        return _claimerToFlows[msg.sender];
    }
}
