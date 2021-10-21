pragma solidity ^0.5.16;


contract Crud {
    struct Document {
        string id;
        string docsname;
        string docscreator;
        string creatorunit;
        string creatorid;
        string docssignname;
        string docssigndate;
    }
    
    struct Verifikator {
        string id;
        string docsname;
        string verificatorname;
        string verificatorunit;
        string verificatorid;
        string verificationdate;
    }

    //Storing Data Struct ke Array
    Document[] public document;
    Verifikator[] public verifikator;
    uint256 nextId = 1;
    uint256 verifId = 1;

    event AddDocument(string id,
        string docsname,
        string docscreator,
        string creatorunit,
        string creatorid,
        string docssignname,
        string docssigndate);
        
    event AddVerificator(string id,
        string docsname,
        string verificatorname,
        string verificatorunit,
        string verificatorid,
        string verificationdate);
    
    event UpdateDocument(string id,
        string docsname,
        string docscreator,
        string creatorunit,
        string creatorid,
        string docssignname,
        string docssigndate);
        
    event UpdateVerificator(string id,
        string docsname,
        string verificatorname,
        string verificatorunit,
        string verificatorid,
        string verificationdate);

    event DeleteDocument(string id);
    
    event DeleteVerificator(string id);

    function insertDocument(string memory id,
        string memory docsname,
        string memory docscreator,
        string memory creatorunit,
        string memory creatorid,
        string memory docssignname,
        string memory docssigndate) public {
            document.push(Document(id, docsname, docscreator, creatorunit, creatorid, docssignname, docssigndate));
            nextId++;

            emit AddDocument(id, docsname, docscreator, creatorunit, creatorid, docssignname, docssigndate);
    }
    
    function insertVerificator(string memory id,
        string memory docsname,
        string memory verificatorname,
        string memory verificatorunit,
        string memory verificatorid,
        string memory verificationdate) public {
            verifikator.push(Verifikator(id, docsname, verificatorname, verificatorunit, verificatorid, verificationdate));
            verifId++;
            
            emit AddVerificator(id, docsname, verificatorname, verificatorunit, verificatorid, verificationdate);
        }

    function readDocumentById(string memory id) public view returns (string memory docid,
        string memory docsname,
        string memory docscreator,
        string memory creatorunit,
        string memory creatorid,
        string memory docssignname,
        string memory docssigndate){
            for(uint256 i = 0; i < nextId; i++){
            if(compareStrings(document[i].id, id)){
                return(document[i].id, document[i].docsname, document[i].docscreator, document[i].creatorunit, document[i].creatorid, document[i].docssignname, document[i].docssigndate);
            }
            }
        revert('Document not found');
    }
    
    function readVerificatorById(string memory id) public view returns (string memory docid,
        string memory docsname,
        string memory verificatorname,
        string memory verificatorunit,
        string memory verificatorid,
        string memory verificationdate){
            for(uint256 i = 0; i < verifId; i++){
            if(compareStrings(verifikator[i].id, id)){
                return(verifikator[i].id, verifikator[i].docsname, verifikator[i].verificatorname, verifikator[i].verificatorunit, verifikator[i].verificatorid, verifikator[i].verificationdate);
            }
        }
        revert('Document not found');
    }

    function updateDocumentById(string memory id,
        string memory docsname,
        string memory docscreator,
        string memory creatorunit,
        string memory creatorid,
        string memory docssignname,
        string memory docssigndate) public returns(bool success) {
        for(uint256 i = 0; i < nextId; i++){
            if(compareStrings(document[i].id, id)){
                document[i].id = id;
                document[i].docsname = docsname;
                document[i].docscreator = docscreator;
                document[i].creatorunit = creatorunit;
                document[i].creatorid = creatorid;
                document[i].docssignname = docssignname;
                document[i].docssigndate = docssigndate;

              emit UpdateDocument(id, docsname, docscreator, creatorunit, creatorid, docssignname, docssigndate);
              return true;
            }
        }
        return false;
    }
    
    function updateVerificatorById(string memory id,
        string memory docsname,
        string memory verificatorname,
        string memory verificatorunit,
        string memory verificatorid,
        string memory verificationdate) public returns (bool success) {
            for(uint256 i = 0; i < verifId; i++){
            if(compareStrings(verifikator[i].id, id)){
                verifikator[i].id = id;
                verifikator[i].docsname = docsname;
                verifikator[i].verificatorname = verificatorname;
                verifikator[i].verificatorunit = verificatorunit;
                verifikator[i].verificatorid = verificatorid;
                verifikator[i].verificationdate = verificationdate;

              emit UpdateVerificator(id, docsname, verificatorname, verificatorunit, verificatorid, verificationdate);
              return true;
            }
        }
        return false;
        }

    function DeleteDocumentById(string memory id) public returns(bool success){
        for(uint256 i = 0; i < nextId; i++){
            if(compareStrings(document[i].id, id)){
              delete document[i];
              emit DeleteDocument(id);
              return true;
           }
       }
       return false;
   }
   
   function DeleteVerificatorById(string memory id) public returns(bool success){
        for(uint256 i = 0; i < verifId; i++){
            if(compareStrings(verifikator[i].id, id)){
              delete verifikator[i];
              emit DeleteVerificator(id);
              return true;
           }
       }
       return false;
   }

    function compareStrings (string memory a, string memory b)  internal pure returns (bool){
       return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
   }
}