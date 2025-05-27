var celulares=[];//Array();

llamarDatos();

function llamarDatos(){
     fetch('https://db-awosxdx-default-rtdb.firebaseio.com/celular.json')
     .then(x=>x.json())
     .then(resp=>{
          ids=Object.keys(resp);
          celulares=Object.values(resp);
          celulares.forEach((celular,i)=>{
               celular.id=ids[i];
          });
          console.log(celulares);
          mostrar(); //llamada a metodo que muestre la información en pantalla
     }).catch(error=>{
          console.log(error);
     }); //x=>{console.log(x)}
}

     function mostrar(){
          var tabla=document.querySelector('#tabla');
          tabla.innerHTML="";
          celulares.forEach((celular,i)=>{
               var fila=document.createElement('tr');
               fila.innerHTML=`
                    <th scope="row">${i+1}</th>
                    <td>${celular.color}</td>
                    <td><img src="${celular.foto}" width="50px" height="50px"></td>
                    <td>${celular.marca}</td>
                    <td>${celular.modelo}</td>
                    <td>${celular.v_android}</td>
                         <a data-id="${celular.id}" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#editar_${celular.id}">
                              <i class="fa fa-pen"></i>
                         </a>
                         <a data-id="${celular.id}" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#eliminar_${celular.id}">
                              <i class="fa fa-trash"></i>
                         </a>
                    </td>

               <!-- Modal -->
                    <div class="modal" id="editar_${celular.id}" tabindex="-1">
                         <div class="modal-dialog">
                              <div class="modal-content">
                                   <div class="modal-header">
                                        <h5 class="modal-title">Modal title</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                   </div>
                                   <div class="modal-body">
                                        <form  method="post" name="formEditar">
                                             <div class="mb-3">
                                                  <label class="form-label">ID</label>
                                                  <input type="text" class="form-control" id="id_e_${celular.id}" value="${celular.id}" name="id" disabled >
                                             </div>
                                             <div class="mb-3">
                                                  <label class="form-label">Color</label>
                                                  <input type="text" class="form-control" id="color_e_${celular.id}" value="${celular.color}" name="marca" >
                                             </div>
                                        <img src="${celular.foto}" width="50px" height="50px"  id="imagen_${celular.id}" data-foto="${celular.foto}">
                                        <div class="mb-3">
                                             <label class="form-label">Foto</label>
                                             <input type="text" class="form-control" id="photo_${celular.id}" placeholder="foto" name="foto" >
                                        </div>
                                        <div class="mb-3">
                                                  <label class="form-label">Marca</label>
                                                  <input type="text" class="form-control" id="marca_e_${celular.id}"  value="${celular.marca}" name="marca"  >
                                             </div>
                                             <div class="mb-3">
                                                  <label class="form-label">Modelo</label>
                                                  <input type="text" class="form-control" id="modelo_e_${celular.id}"  value="${celular.modelo}" name="modelo" >
                                             </div>
                                             
                                             <div class="mb-3">
                                                  <label class="form-label">Version de Android</label>
                                                  <input type="text" class="form-control" id="android_e_${celular.id}"  value="${celular.v_android}" name="android" >
                                             </div>
                                            
                                        </form>
                                   </div>
                                   <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" id="actualizar_${celular.id}" data-bs-dismiss="modal">Modificar</button>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <!--Modal -->
                    <div class="modal" id="eliminar_${celular.id}" tabindex="-1">
                         <div class="modal-dialog">
                         <div class="modal-content">
                              <div class="modal-header">
                              <h5 class="modal-title">Eliminar celular del inventario</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                              <p>¿Estas seguro que deseas eliminar?</p>
                              </div>
                              <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" id="delete_${celular.id}" data-bs-dismiss="modal" class="btn btn-danger">Eliminar</button>
                              </div>
                         </div>
                         </div>
                         </div>
                    `;
                tabla.appendChild(fila);    
          });

          celulares.forEach(celular=>{
               document.querySelector('#actualizar_'+celular.id).addEventListener('click',(evento)=>{
                    evento.preventDefault();
                    actualizar(celular);
               });
               document.querySelector('#eliminar_'+celular.id).addEventListener('click',(evento)=>{
                    evento.preventDefault();
                    eliminar(celular);
               });
          });
     }

     function actualizar(celular){
          console.log('aquí');
          var id=celular.id;
          var mod=document.querySelector('#modelo_e_'+celular.id).value;
          var mar=document.querySelector('#marca_e_'+celular.id).value;
          var android=document.querySelector('#android_e_'+celular.id).value;
          var col=document.querySelector('#color_e_'+celular.id).value;
          var photo=document.querySelector('#photo_'+celular.id).value;
          var imagen=document.querySelector('#imagen_'+celular.id).getAttribute('data-foto');

          if(photo==null || photo===""){
               photo=imagen;
          }

          var datos={
               modelo:mod,
               marca:mar,
              v_android:android,
              color:col,
              foto:photo
           
          };

          //console.log(datos, id);

          fetch(`https://db-awosxdx-default-rtdb.firebaseio.com/celular/${id}.json`,{
               method:'PUT',
               mode:'cors',
               headers:{
                    'Content-Type':'application/json'
               },
               body:JSON.stringify(datos)
          }).then(resp=>resp.json())
             .then(res=>{
               console.log(res);
             llamarDatos();
             }).catch(error=>{
               console.log(error);
             });

            
     }

     function eliminar(celular){
          var id=celular.id;
          fetch(`https://db-awosxdx-default-rtdb.firebaseio.com/celular/${id}.json`,{
               method:'DELETE',
               headers:{
                    'Content-Type': 'application/json'
               },
               body:{}
          }).then(resp=>resp.json())
          .then(res=>{
               console.log(res);
               llamarDatos();
          }).catch(error=>console.error(error));
     }