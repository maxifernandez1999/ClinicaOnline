# Clinica Online
###### Esta aplicacion se encarga de gestionar los perfiles de pacientes, especialistas y administradores de una clinica. Tambien permite administratar los turnos que se manejan dentro

## Funcionalidades
### Welcome

Esta es la seccion de bienvenida de la pagina donde podremos acceder con el boton "Get Started" a el login y el registro a nuestra app.

![alt text](https://github.com/maxifernandez1999/ClinicaOnline/blob/main/src/assets/Screenshot%20(362).png)

### Register

En esta seccion vamos a poder registrar en la aplicacion tanto pacientes como especialistas. Hay que completar todos los campos y luego presionar el boton "Register"

![alt text](https://github.com/maxifernandez1999/ClinicaOnline/blob/main/src/assets/Screenshot%20(368).png)

### Login

En esta seccion podemos ingresar el email y la contraseña de nuestro usuario antes registrado, para poder acceder al sistema. Oprima el boton "SignIn" para ingresar o el buton "Rapid Access" para acceder rapidamente con un perfil de usuario administrador (esto ultimo es unicamente de prueba)

![alt text](https://github.com/maxifernandez1999/ClinicaOnline/blob/main/src/assets/Screenshot%20(363).png)

### Admin

En esta seccion unicamente podra ingresar el perfil administrador y podra ver todos los perfiles de los usuarios. EL mismo podra permitir a denegar el acceso al sistema de administracion a los perfiles especialistas (tildando la opcion "Permit Access")

Dentro tambien podemos encontrar tres botones: 
- "Load Shift" : Es un boton que redirecciona a la seccion para cargar turnos.
- "Shifts" : Desde este buton se podra acceder a todos los turnos cargados en la clinica.
- "Profile" : Se podra acceder a la seccion donde estan los datos del perfil logueado.

![alt text](https://github.com/maxifernandez1999/ClinicaOnline/blob/main/src/assets/Screenshot%20(364).png)

### Shifts

En esta seccion se podra cargar los turnos de la clinica. Si el perfil logueado es administrador o especialista tendra una opcion se seleccionar el nombre del paciente que desea sacar un turno (entre los pacientes registrados). Si el perfil es paciente, esta opcion se desabilita ya que no es necesario (se utiliza los datos del paciente registrado para la carga). En las siguientes dos casillas se podra seleccionar especialidad y especialista respectivamente. 
En las casillas day, month y hour de seleccionara el dia, mes y hora que se debe sacar el turno. Luego se debe presionar el boton "Submit" para cargar el turno.

![alt text](https://github.com/maxifernandez1999/ClinicaOnline/blob/main/src/assets/Screenshot%20(365).png)

### Load Shifts

En esta seccion podemos ver los turnos asignados al usuario logueado. A su vez tenemos un boton "Cancel" para cancelar el turno, y botones para filtrar los turnos por especialidad y especialista

![alt text](https://github.com/maxifernandez1999/ClinicaOnline/blob/main/src/assets/Screenshot%20(366).png)

### Profile 

En esta seccion se encuentra los datos del perfil logueado.

![alt text](https://github.com/maxifernandez1999/ClinicaOnline/blob/main/src/assets/Screenshot%20(367).png)

Si el usuario logueado es especialista, podremos ingresar su disponibilidad horaria. Complete los campos y luego presione "Change" para cambiar su disponibilidad horaria.

![alt text](https://github.com/maxifernandez1999/ClinicaOnline/blob/main/src/assets/Screenshot%20(369).png)