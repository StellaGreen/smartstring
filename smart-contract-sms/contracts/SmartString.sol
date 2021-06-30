// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SmartString is ERC721Enumerable, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenId;

    struct UniqueSmartString {
        string sentence;
        string title;
        string editBy;
        string linkUrl;
        bytes32 sentenceHash;
        uint256 timeStamp;
    }
    mapping(uint256 => UniqueSmartString) private _sentences;
    mapping(bytes32 => uint256) private _sentenceId;

    event Created(uint256 IdNft, address indexed creator, uint256 timer);

    constructor () ERC721("SmartString","USS") {}

    function createNFT(UniqueSmartString memory uniqueSentence) public returns (uint256){
        address creatorAddress = msg.sender;
        _tokenId.increment();
        uint256 createId = _tokenId.current();
        _mint(creatorAddress, createId);
        uniqueSentence.timeStamp = block.timestamp;
        _sentences[createId] = uniqueSentence;
        _sentenceId[uniqueSentence.sentenceHash] = createId;
        emit Created(createId, creatorAddress, block.timestamp);
        return createId;
    }
    
    function getNFTId(uint256 id) public view returns (UniqueSmartString memory) {
        return _sentences[id];
    }

    function getNFTHash(bytes32 contentHashed) public view returns (uint256) {
        return _sentenceId[contentHashed];
    }
    

    function tokenURI(uint256 tokenId) public view virtual override(ERC721URIStorage, ERC721) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _baseURI() internal view virtual override(ERC721) returns (string memory) {
        return "https://www.magnetgame.com/uniqueSentence/";
    }


    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    )  internal virtual override(ERC721Enumerable, ERC721) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal virtual override(ERC721URIStorage, ERC721) {
        super._burn(tokenId);
    }


}
