# Práctica de programación | Gestión de usuarios | Front-end

    Autora: Miryam Subiza Erro
    Proyecto: Desarrollo de una aplicación Web para gestionar el registro de usuarios

## Descripción
Esta práctica consiste en realizar una aplicación Web compuesta por tres pantallas:

**1.- Registro de usuarios**

  Creación de nuevos usuarios de la aplicación a través de un formulario que incluye los campos Nombre, Edad, Correo electrónico y Contraseña.
  
  La aplicación tiene dos opciones para el almacenamiento de usuarios:
  
  - Persistente: Los usuarios se almacenarán en base de datos.
    
  - Volátil: Los usuarios se almacenarán en el navegador web.
    
  
  Para poder seleccionar el modo de almacenamiento, se dispone de una variable de configuración que se puede modificar en el fichero `src/environments/environment.ts`.
  
  En caso de seleccionar el modo de almacenamiento persistente, indicar en este mismo fichero la URL de acceso a la API ().

**2.- Ventana de autenticación**

  Esta pantalla consiste en un formulario desde el cual el usuario se puede autenticar. 
  
  Se validarán las credenciales introducidas por el usuario, mostrando los mensajes oportunos de error (las credenciales no son correctas, no se ha indicado el campo de correo electrónico o es incorrecto su formato y no se ha indicado el campo de contraseña).
  
  Si la validación de las credenciales es correcta, se mostrará la pantalla de Listado de usuarios registrados.

**3.- Listado de usuarios registrados**

  El listado de usuarios es una pantalla en la que se listan los usuarios dados de alta para comprobar que todo funciona correctamente. 
  
  Se mostrará un mensaje de error en caso de no haber podido cargar dicho listado.
  
## Lenguaje de programación
- Angular 11

