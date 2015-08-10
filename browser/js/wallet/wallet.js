app.config(function ($stateProvider) {
    $stateProvider.state('wallet', {
        url: '/wallet',
        templateUrl: 'js/wallet/wallet.html',
        controller: 'WalletCtrl',
        resolve: {
        	user: function(AuthService) {
        		return AuthService.getLoggedInUser();
        	},
            recipients: function(WalletFactory) {
               return WalletFactory.getRecipients();
            },
            coins: function(WalletFactory, user) {
                return WalletFactory.getCoins(user.privateKey);
            }
        }
    });
});

app.controller('WalletCtrl', function($scope, user, recipients, coins, WalletFactory, TxFactory) {
	if (user) {
        user.publicAddress = genPublicAddress(user.privateKey);
        $scope.user = user;
    }
    if (recipients) $scope.recipients = recipients;
    if (coins) $scope.coins = coins;

    // initialize values
    $scope.showTransaction = false;
    $scope.selectedRecipient = '';
    $scope.selectedCoin = null;
    $scope.amount = 0;

    $scope.selectRecipient = function(recipient) {
        $scope.showTransaction = true;
        $scope.selectedRecipient = recipient;
    };

    $scope.selectCoin = function(coin) {
        $scope.showTransaction = true;
        $scope.selectedCoin = coin;
    };

    $scope.startTransaction = function(coin, recipient, amount) {
        console.log('transferring this much: ', amount);
        console.log('from this coin: ', coin);
        console.log('to this address: ', recipient);

        $scope.showTransaction = false;
        $scope.selectedRecipient = '';
        $scope.selectedCoin = null;
        $scope.amount = 0;


        TxFactory.transaction(coin.txHash, coin.index, amount, recipient);
        // put correct inof in the transaciton call
    };

    // creates public address from private key
    function genPublicAddress(priv) {
        return Bitcoin.ECKey.fromWIF(priv).pub.getAddress().toString();
    }

});


///// the wallet needs to have all of the outputs from tx that
/////  went to this user - that's how they spend money
/////  maybe then they can select which outputs (i.e. coins) to spend