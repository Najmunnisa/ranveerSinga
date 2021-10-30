class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;
    this.positionX=0;
    this.positionY=0;
    this.spike=185;
  }
getDistance(){
  var playerDistanceRef = database.ref('players/player'+this.index)
  playerDistanceRef.on("value",(data)=>{
    var data=data.val();
    this.positionX=data.positionX
    this.positionY=data.positionY
  })
}
  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }
 addPlayers(){
   var playerIndex="players/player"+this.index;
   if(this.index===1){
     this.positionX=width/2-100
   }else{
    this.positionX=width/2+100
   }
   database.ref(playerIndex).set({
     name:this.name,
     distance:this.distance,
     positionX:this.positionX,
     positionY:this.positionY,
   });
 }
  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX:this.positionX,
     positionY:this.positionY,
     rank:this.rank
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  getCarsAtEnd() {
    database.ref('CarsAtEnd').on("value",(data)=>{
      this.rank = data.val();
    })
  }

  static updateCarsAtEnd(rank) {
    database.ref('/').update({
      CarsAtEnd:rank
    })
  }
}
