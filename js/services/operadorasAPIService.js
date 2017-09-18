angular.module("agenda").service("operadorasAPI", function ($http, config) {
    this.getOperadoras = function () {
        return $http.get(config.baseUrl + "/operadoras");
    };
});