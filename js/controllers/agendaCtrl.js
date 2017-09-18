angular.module("agenda").controller("agendaCtrl", function ($scope, $http) {
    $scope.app = "Agenda";
    $scope.contatos = [];
    $scope.operadoras = [];
    var carregarContatos = function () {
        $http.get("http://localhost:3412/contatos").then(function (response) {
            $scope.contatos = response.data;
        }).catch(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };
    var carregarOperadoras = function () {
        $http.get("http://localhost:3412/operadoras").then(function (response) {
            $scope.operadoras = response.data;
        });
    };
    $scope.adicionarContato = function (contato) {
        contato.data = new Date();
        $http.post("http://localhost:3412/contatos", contato).then(function (data) {
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