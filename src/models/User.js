class User{
    
   id;
   nombre;
   email;
   pass;

   constructor(id,nombre ,email, pass){
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.pass = pass;
   }

   set setIdUser(id){this.id=id}
   set setNombre(nombre){this.nombre=nombre}
   set setEmail(email){this.email=email}
   set setPass (pass){this.pass=pass}

   get getIdUser(){return this.id}
   get getNombre(){return this.nombre}
   get getEmail(){return this.email}
   get getPass(){return this.pass}
}

module.exports = User;