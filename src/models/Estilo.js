class Estilo{
    idestilo;
    estilo;

    constructor(idestilo,estilo){
        this.estilo = estilo;
        this.idestilo = idestilo;
    }

    set setIdEstilo(idestilo){this.idestilo=idestilo}
    set setEstilo(estilo){this.estilo=estilo}
    
    get getEstilo(){return this.estilo}
    get getIdEstilo(){return this.idestilo}
}

module.exports = Estilo;