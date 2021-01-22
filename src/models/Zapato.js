class Zapato{
    id_zapato ;
    foto;
    mimetype;
    filename;
    path;
    size;
    precio ;
    color ;
    cantidad; 
    
    dboestilo_idestilo ; 
    dbotalla_idtalla  ;
    dbogenero_idgenero ;
    idUsuario;

    constructor(id_zapato,foto,mimetype,filename,path,size,precio,color,cantidad,dboestilo_idestilo,dbotalla_idtalla,dbogenero_idgenero,idUsuario){
      this.id_zapato = id_zapato;
      this.foto = foto;
      this.mimetype = mimetype;
      this.filename = filename;
      this.path = path;
      this.size = size;
      this.precio = precio;
      this.color = color;
      this.cantidad = cantidad;
      this.dboestilo_idestilo = dboestilo_idestilo;
      this.dbotalla_idtalla = dbotalla_idtalla;
      this.dbogenero_idgenero = dbogenero_idgenero;
      this.idUsuario = idUsuario;
    }

    set setMimetype(mimetype){this.mimetype=mimetype}
    set setFilename(filename){this.filename=filename}
    set setPath(path){this.path=path}
    set setSize(size){this.size=size}
    set setIdZapato(id_zapato){this.id_zapato=id_zapato}
    set setFoto(foto){this.foto=foto}
    set setPrecio(precio){this.precio=precio}
    set setColor(color){this.color=color}
    set setCantidad(cantidad){this.cantidad=cantidad}
    set setDBOEstilo(dboestilo_idestilo){this.dboestilo_idestilo=dboestilo_idestilo}
    set setDBOTalla(dbotalla_idtalla){this.dbotalla_idtalla=dbotalla_idtalla}
    set setDBOGenero(dbogenero_idgenero){this.dbogenero_idgenero=dbogenero_idgenero}
    set setIdUsuario(idUsuario){this.idUsuario=idUsuario}
    
    get getIdZapato(){return this.id_zapato}
    get getMimetype(){return this.mimetype}
    get getFilename(){return this.filename}
    get getPath(){return this.path}
    get getSize(){return this.size}
    get getFoto(){return this.foto}
    get getPrecio(){return this.precio}
    get getColor(){return this.color}
    get getCantidad(){return this.cantidad}
    get getDBOEstilo(){return this.dboestilo_idestilo}
    get getDBOTalla(){return this.dbotalla_idtalla}
    get getDBOGenero(){return this.dbogenero_idgenero}
    get getIdUsuario(){return this.idUsuario}
}

module.exports = Zapato;