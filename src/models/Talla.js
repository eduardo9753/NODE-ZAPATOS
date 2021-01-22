class Talla{
    idtalla;
    talla;

    constructor(idtalla,talla){
        this.idtalla = idtalla;
        this.talla = talla;
    }

    set setIdTalla(idtalla){this.idtalla=idtalla}
    set setTalla(talla){this.talla=talla}
    
    get getTalla(){return this.talla}
    get getIdTalla(){return this.idtalla}
}

module.exports = Talla;