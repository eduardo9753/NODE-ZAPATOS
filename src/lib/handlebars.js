const hbshelpers = {};

//FIRT PAGE
hbshelpers.firtPagina = (current) => {
    if(current==1){
        let li = '<li class="page-item"><a class="page-link" href="#">Firt Page</a></li>';
        return li;
    } else {
        let li = '<li class="page-item"><a class="page-link" href="#">Firt Page</a></li>';
        return li;
    }
}

//PAGINACION CLIENTE
hbshelpers.paginationCliente = (current , paginas) => {
    let list = [];
    let i = (Number(current) > 5 ? Number(current) - 4 : 1);
    if(i !== 1){
        let li = '<li class="page-item"><a class="page-link" href="#">.......</a></li>'
        list.push(li);
    }
    for(; i <= (Number(current) + 4) && i <= paginas; i++){
        if(i == current) {
            let li = '<li class="page-item"><a class="page-link" href="'+i+'">'+i+'</a></li>';
            list.push(li);
        } else {
            let li = '<li class="page-item"><a class="page-link" href="/shoes/'+i+'">'+i+'</a></li>';
            list.push(li);
        } if(i == Number(current) + 4 && i < paginas){
            let li = '<li class="page-item"><a class="page-link" href="#">.......</a></li>';
            list.push(li);
        }
    } //CIERRE  FOR
    let lista = list.join("");
    return lista;
}

//PAGINACION USER
hbshelpers.paginationUser = (current , paginas) => {
    let list = [];
    let i = (Number(current) > 5 ? Number(current) - 4 : 1);
    if(i !== 1){
        let li = '<li class="page-item"><a class="page-link" href="#">.......</a></li>'
        list.push(li);
    }
    for(; i <= (Number(current) + 4) && i <= paginas; i++){
        if(i == current) {
            let li = '<li class="page-item"><a class="page-link" href="'+i+'">'+i+'</a></li>';
            list.push(li);
        } else {
            let li = '<li class="page-item"><a class="page-link" href="/shoe/list/'+i+'">'+i+'</a></li>';
            list.push(li);
        } if(i == Number(current) + 4 && i < paginas){
            let li = '<li class="page-item"><a class="page-link" href="#">.......</a></li>';
            list.push(li);
        }
    } //CIERRE  FOR
    let lista = list.join("");
    return lista;
}


hbshelpers.lastPagina = (current , paginas) => {
   if(current==paginas){
       let li = '<li clas="page-item"><a class="page-link" href="#">Last Page</a></li>';
       return li;
   } else {
       
   }
}


module.exports = hbshelpers;