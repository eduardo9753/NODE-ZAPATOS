window.addEventListener('DOMContentLoaded' , () => {

  //VARIABLES
  const imagen_galery = document.querySelectorAll('.imagen-galery');
  const agregar_imagen = document.querySelector('.agregar-imagen');
  const content_zapato = document.querySelector('.content-zapato');
  const close = document.querySelector('.close');

  //FUNCIONES
  imagen_galery.forEach( (imagen) => {
      imagen.addEventListener('click' , () => {
        let myImg = imagen.getAttribute('src');
        console.log('Tu image: ' , myImg);
        pintarImagen(myImg);
      })
  });

  const pintarImagen = (myImg) => {  
    content_zapato.classList.toggle('show');
    agregar_imagen.src = myImg;
  } 

  const CloseImg = () => {
      content_zapato.classList.toggle('show');
  }

  //EVENTOS
  close.addEventListener('click', CloseImg);
});