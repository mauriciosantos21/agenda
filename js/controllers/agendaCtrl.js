angular.module("agenda").controller("agendaCtrl", function ($scope, $http, contatosAPI, operadorasAPI, serialGenerator) {
    $scope.app = "Agenda";
    $scope.contatos = [];
    $scope.operadoras = [];
    var carregarContatos = function () {
        contatosAPI.getContatos().then(function (response) {
            $scope.contatos = response.data;
        }).catch(function (data, status) {
            $scope.error = "Não foi possível carregar os dados";
        });
    };
    var carregarOperadoras = function () {
        operadorasAPI.getOperadoras().then(function (response) {
            $scope.operadoras = response.data;
        });
    };
    $scope.adicionarContato = function (contato) {
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContato(contato).then(function (data) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
    };
    $scope.apagarContatos = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado) return contato;
        });
    };
    $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
            return contato.selecionado;
        });
    };
    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    carregarContatos();
    carregarOperadoras();
});