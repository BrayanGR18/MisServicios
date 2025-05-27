document.querySelector('#guardar').addEventListener('click',(evento)=>{
     evento.preventDefault();
     var modelo=document.querySelector('#modelo').value;
     var marca=document.querySelector('#marca').value;
     var v_android=document.querySelector('#v_android').value;
     var color=document.querySelector('#color').value;
     var foto=document.querySelector('#foto').value;

     var data={
          modelo:modelo,
          marca:marca,
          v_android:v_android,
          color:color,
          foto:foto
     };
     console.log(data);

     document.querySelector('#modelo').value="";
     document.querySelector('#marca').value="";
     document.querySelector('#v_android').value="";
     document.querySelector('#color').value="";
     document.querySelector('#foto').value="";

     fetch('https://db-awosxdx-default-rtdb.firebaseio.com/celular.json',{
          method:'POST',
          mode:'cors',
          headers:{
               'Content-Type':'application/json'
          },
          body:JSON.stringify(data)
     }).then(resp=>resp.json())
       .then(resp=>{
          console.log(resp);
          window.location.href='index.html';
          })
          .catch(resp=>{
               console.log(resp);
          });     
});