import { storage, Context, u128, context, PersistentVector, RNG, PersistentMap, ContractPromiseBatch } from "near-sdk-as"


enum GameState{
  Created,
  Joined,
  Ended
}
@nearBindgen
export class Rollete {
  gameId :u32;
  player: string;
  guess: bool;
  initialAmmount :u128;
  betAmmount:u128;
  gameState : GameState;
  winner: string;
  // construct the game 
  constructor(){
    const rng = new RNG<u32>(1, u32.MAX_VALUE);
    const roll = rng.next();
    this.gameId= roll;
    this.guess = false;
    this.betAmmount = u128.Zero ;
    this.player = "None";
    this.initialAmmount = context.attachedDeposit;
    this.gameState = GameState.Created;
    this.winner = context.sender;

  }

}
const gamesMap = new PersistentMap<u32,Rollete>('r')
export function createGame(): u32{
  // initialize the game 
  const rollete = new Rollete();
  // add game to game list 
  gamesMap.set(rollete.gameId,rollete);
  // return the game id 
  return rollete.gameId

}

export function joinGame (_gameId:u32 , _guess:boolean): boolean{
  if(context.attachedDeposit == u128.Zero){
    return false;
  }
  // get the game id 
  const game = gamesMap.getSome(_gameId);
  // update game info 
  game.player = context.sender;
  game.guess = _guess;
  game.betAmmount = context.attachedDeposit;
  game.gameState = GameState.Joined; 
  // update game on the games 
  gamesMap.set(_gameId,game);
  return true 
}

export function endGame(_gameId:u32):string{
  const game = gamesMap.getSome(_gameId);
  // rollete 36 number so generate num from 1 - 36 
  const rng = new RNG<u32>(1, 36);
    const winning_number = rng.next();
    if(winning_number%2 ==1 ){
      if(game.guess == false){
        game.winner = game.player;
      }

    }else {
      if(game.guess == true){
        game.winner = game.player
      }
    }

    game.gameState = GameState.Ended;
    gamesMap.set(_gameId,game);

    // send money to winner 
    const to_beneficiary = ContractPromiseBatch.create(game.winner);
    const amount_to_receive = u128.add(game.betAmmount,game.initialAmmount);

    to_beneficiary.transfer(amount_to_receive);
    return game.winner
 

}
