

# physics network map/objects world
 To develop with gun to disable part of the graph or enable to setup phyiscs update nodes. To server or client to run stand alone or server network with other user to update. To deal with editing or game running test or world.

```javascript
 gun.get('world').get('mapid').get('x,y,z').get('objectid').put({
     id:'', //uuid
     type:'',
     gameobjectid:'',//has to be number format ???
     position:'',
     rotation:'',
     benable:false,
     bphysicsclient:false,
     bphysicsserver:false,
     bphysics:false,
     params:{}
 })
```
format for the .get('x,y,z') will filter out the position of the player but has to be fixed zero to run correct filter.

```javascript
//https://gun.eco/docs/RAD
//example: min and max player location will required refresh or load chucks in zone area.
 gun.get('world').get('mapid').get({'.':{'>':"000/000/000",'<':"100/100/100"}}).
```

Thinking of the gun will prevent read or write that depend on the server and client format. Basic auto load config if match graph format.


# sync

 * mapping and network sync
 * use gun to sync with object and load to update objects.
 * used predict direction on gun? ping lag...
 