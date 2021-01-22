module.exports = (io) =>{
   io.on('connection' , (socket) => {
      console.log('USER SOCKET COONECTED');
      socket.on('userCoordinates' , (coords) => {
         console.log(coords);
         socket.broadcast.emit('newUserCoordinates' , coords);
      });
   });
};