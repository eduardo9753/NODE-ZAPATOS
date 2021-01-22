class Genero{
    idgenero;
    genero;

    constructor(idgenero,genero){
        this.genero = genero;
        this.idgenero = idgenero;
    }

    set setIdGenero(idgenero){this.idgenero=idgenero}
    set setGenero(genero){this.genero=genero}
    
    get getGenero(){return this.genero}
    get getIdGenero(){return this.idgenero}
}

module.exports = Genero;