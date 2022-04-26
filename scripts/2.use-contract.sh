#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variable with contract name"
echo ---------------------------------------------------------
echo

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"
echo \$OWNER is $OWNER 
echo
echo
echo ---------------------------------------------------------
echo "Step 1: create the game "
echo
echo "(run this script again to see changes made by this file)"
echo ---------------------------------------------------------
echo

 #near call $CONTRACT createGame --accountId $OWNER --amount 10

echo ---------------------------------------------------------
echo "Step 2: Call  join the game "
echo ---------------------------------------------------------
echo


#near call $CONTRACT joinGame '{"_gameId": 1889869061, "_guess":false}' --accountId buildhome.testnet --amount 5

echo ---------------------------------------------------------
echo "Step 3: Call end game  "
echo ---------------------------------------------------------
echo

near call $CONTRACT endGame '{"_gameId": 1889869061}' --accountId $OWNER

echo
echo "now start another game"
exit 0
