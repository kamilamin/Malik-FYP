pragma solidity ^0.4.25;

contract Automobile_Sale {
    // attributes of toyota japan
    string   mName;
    string   manufacturing_origin;
    address  mAddress;
    uint[]   assetOwnedByManufacture;
    
    // attributes of Car
    struct Cars {
        uint      lot_Number;
        string    color;
        string    EngineType;
        string    date_of_manufacturing;
        string    geolocation;
        string    currentOwner;
        bool      initialized;
    }
    // maps the values of Cars to reference it wiht Car
    // attributes of the distributor/owners that will buy of Toyota
    struct owners {
        string name;
        string geolocation;
        mapping(uint => Cars)Car;
    }
    
    // maps the values of Owners to reference it with Owner
    mapping (address => owners) private owner;

    struct AssetTransferDetails {
        address currentOwnerAddress;
        string  currentOwner;
        string currentLocation;
        address[] owners;
        string[] previousOwner;
        string[] previousOwnersLocation;
    }
    
    mapping (uint => AssetTransferDetails) public details;
    
    mapping (uint => string[]) public prevOwner;
    // mapping (uint => string[]) public prevOwnerLocation;
    // functions
    constructor (string memory _mName, string memory _origin)
    public {
        mName = _mName;
        manufacturing_origin = _origin;
        mAddress = msg.sender;
    }
    function getManufacturerName() public view returns(string memory, string memory) {
        return (mName, manufacturing_origin);
    }
    //--/////////////////////////////////////////////////////
    // events for asset creation or deletion
    event AssetCreate(address account, uint VIN, string message);
    event RejectCreate(address account, uint VIN, string message);    

    function createAsset
    (uint _VIN,
    string memory _color,
    string memory _EngineType,
    string memory _geolocation,
    string memory _date)
    public {
        // Here 10 cars will be created by
        // Toyota japan as an asset
        getSpecificCar(_VIN);
        if(!owner[mAddress].Car[_VIN].initialized) {
            
            owner[mAddress].Car[_VIN].initialized = true;               // initializes the existence of asset
            owner[mAddress].Car[_VIN].currentOwner = mName;             // initializes the name of the manufacturer
            owner[mAddress].Car[_VIN].lot_Number = 1;                   // initializes the lot number of car
            owner[mAddress].Car[_VIN].color = _color;                   // initializes the color of car
            owner[mAddress].Car[_VIN].EngineType = _EngineType;         // initializes the engine type to petrol or deisel
            owner[mAddress].Car[_VIN].date_of_manufacturing = _date;    // initializes the manufacturing date
            owner[mAddress].Car[_VIN].geolocation = _geolocation;       // initializes the geolocation of the car
    
            details[_VIN].currentOwnerAddress = mAddress;
            details[_VIN].currentOwner = mName;
            details[_VIN].currentLocation = manufacturing_origin;
    
            assetOwnedByManufacture.push(_VIN);     // pushes to the stack of ownership that manufacturer have
            emit AssetCreate(msg.sender, _VIN, "Asset created!");
        }
        else {
            emit RejectCreate(msg.sender, _VIN, "Asset Already exist!");
        }
    }
    
    // sets the event if asset being called does not exist
    event AssetDoesNotExist(string message);
    // gets specific VIN numbered car
    function getSpecificCar(uint _vinNumber) public view
    returns (uint, string memory, string memory, string memory, string memory) {
        if(owner[mAddress].Car[_vinNumber].initialized) {
            return  (
                owner[mAddress].Car[_vinNumber].lot_Number,
                owner[mAddress].Car[_vinNumber].color,
                owner[mAddress].Car[_vinNumber].EngineType,
                owner[mAddress].Car[_vinNumber].date_of_manufacturing,
                owner[mAddress].Car[_vinNumber].geolocation
              );
        } else {
            // emit AssetDoesNotExist("Asset deos not exist ");
        }
    }

    // // gets the list of #VIN of Cars owned by manufacturer
    function getListOfAssetsOwnedByManufacturer() public view returns (uint[] memory) {
        return assetOwnedByManufacture;
    }

    // // gets the current owner of the asset
    function getCurrentOwnerOfAsset(uint _VIN) public view
    returns (string memory, string memory) {
        return (details[_VIN].currentOwner, details[_VIN].currentLocation);
    }

    // event NoPreviousOwner(string msg);
    // gets the two previous owners and their location
    function getPreviousOwnerOfAsset(uint _VIN) public view
    returns (
    uint,
    string memory, string memory
    // string memory, string memory
    ) {
      AssetTransferDetails memory mD = details[_VIN];
      uint previousOwnerLength = mD.previousOwner.length;
      uint previousOwnersLocationLength = mD.previousOwnersLocation.length;
        return (
            mD.owners.length,
            mD.previousOwner[previousOwnerLength - 1],
            mD.previousOwnersLocation[previousOwnersLocationLength - 1]
            // details[_VIN].previousOwner[previousOwnerLength - 2],
            // details[_VIN].previousOwnersLocation[previousOwnersLocationLength - 2]
        );
    }
    
    // // events that triggers on successful transfer of onwnership
    event AcceptOwnership(address ownerAdd, string message);
    event RejectOwnership(address ownerAdd, string message);

    // // it transfers the ownership of the asset in exchange of money
    function transferToOwner(address _AssetSender,
    address _AssetReciever,
    string memory _NewOwnerName,
    uint _VIN,
    string memory _geolocation)
    public  {
        if(owner[_AssetSender].Car[_VIN].initialized) {
            owner[_AssetReciever].name           = _NewOwnerName;
            owner[_AssetReciever].geolocation    = _geolocation;

            AssetTransferDetails storage sD = details[_VIN];
            AssetTransferDetails memory mD = details[_VIN];

            
            sD.owners.push(_AssetReciever);
            
            sD.previousOwner.push(mD.currentOwner);
            sD.previousOwnersLocation.push(mD.currentLocation); 
            sD.currentOwner   = _NewOwnerName;
            sD.currentLocation    = _geolocation;
            //transfers ether for Asset Exchange
            transferEther(msg.sender, _AssetReciever);
            // Event is triggered in exchange of ownership
            emit AcceptOwnership(msg.sender, "Assset Transfered");
        } else {
            // ownership is rejected if asset does not exist
            emit RejectOwnership(msg.sender, "Asset does not exist");
        }
    }
    // Function for the transfer of ether in exchange of the Asset
    function transferEther(
        address _EtherReciever,
        address _EtherSender
    ) private {
    // can use msg.sender instead of sending as a parameter
        _EtherReciever.transfer(msg.value);
    }

    // modifier requiredAmount{
    //     require(msg.value == 1 ether);
    //     _;
    // }
    // modifier onlyCanBeCalledByManufacturer {
    //     require(msg.sender == mAddress);
    //     _;
    // }
}