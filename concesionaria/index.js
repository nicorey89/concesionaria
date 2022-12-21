let fs = require ('fs');
const escribirJSON = function (data) {
    fs.writeFileSync("./data/cars.json", JSON.stringify(data), "utf-8")
}


const concecionaria = {
    autos: JSON.parse(fs.readFileSync('./data/cars.json', 'utf-8')),
    buscarAutos: function (patente){
        let autoEncontrado = this.autos.find(function (auto){
            return auto.patente === patente
        });
        if(autoEncontrado === undefined){
            return null;
        }
        return autoEncontrado
    },
    venderAuto: function (patente){
        let auto = this.buscarAutos(patente);
        if(auto !== null){
            auto.vendido = true;
            escribirJSON(this.autos)
        }
        return this.autos
    },
    autosParaLaVenta: function (){
        let autosfiltrados = this.autos.filter(function (auto) {
            return auto.vendido === false
        });
        return autosfiltrados
    },
    autosNuevos: function (){
        return this.autosParaLaVenta().filter(function(auto){
            return auto.km <= 100;
        });
    },
    listaDeVentas: function(){
        let autosVendidos = this.autos.filter(function (auto){
            return auto.vendido === true;
        });
        let listaDeVentas = autosVendidos.map(function (auto){
            return auto.precio 
        });
        return listaDeVentas    
    },
    totalDeVentas: function () {
        let listaDeVentas = this.listaDeVentas();
        if(listaDeVentas.length > 0){
        let totalDeVentas = listaDeVentas.reduce(function(prev, curr){
            return prev + curr
        })
        return totalDeVentas
        }else{
            return 0
        }
    },
    puedeComprar: function(auto, comprador){
        let valorCuota = auto.precio / auto.cuotas;
        return auto.precio <= comprador.capacidadDePagoTotal && comprador.capacidadDePagoEnCuotas >= valorCuota;

    },
    autosQuePuedeComprar: function (comprador){
        
        let autosDisponibles = this.autosParaLaVenta();
        let autosQuePuedeComprar = autosDisponibles.filter((auto) => {
            return this.puedeComprar(auto, comprador)
        })
        return autosQuePuedeComprar
        
    }

};
module.exports = concecionaria;


        
