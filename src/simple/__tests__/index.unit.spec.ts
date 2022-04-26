import {createGame,joinGame} from "../assembly";
import {PersistentMap , VMContext , u128,VM} from 'near-sdk-as'
 const contract = 'rashaabdulrazzak.testnet'
describe("Contract", () => {
  // VIEW method tests

  it("create a game", () => {
    VMContext.setAttached_deposit(u128.from('150000000000000000000000'));
    VMContext.setCurrent_account_id(contract);

    expect(createGame).toBeTruthy();
  })

  it("join a game", () => {
    VMContext.setAttached_deposit(u128.from('150000000000000000000000'));
    VMContext.setCurrent_account_id('buildhome.testnet');
    expect(joinGame).toBeTruthy();
  })


})
