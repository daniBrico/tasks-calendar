# Task Calendar

> [!WARNING]
> Este proyecto es una adaptación y reestructuración del código del siguiente [repositorio](https://github.com/702573N/Obsidian-Tasks-Calendar?tab=readme-ov-file), desarrollado por el usuario '702573N'.
> Aunque gran parte del mismo ha sido reescrito casi por completo, la interfaz y funcionalidades originales sirvieron de base para esta versión.
> El objetivo de esta reestructuración es lograr un código más modular, facilitando su mantenimiento, mejora y legibilidad.
## Introducción

**Tasks Calendar** es un calendario para obsidian que, en conjunto con los plugins *DataviewJS* y *Tasks*, permite recuperar las tareas definidas en tu baúl y mostrarlas en una vista de mes o semana.

## Aclaraciones

Es importante mencionar que este proyecto se encuentra en desarrollo, por lo que algunas funciones pueden no estar implementadas o incompletas. Sin embargo, es posible tener una vista previa de su estado actual.

## ¿Cómo probarlo?

Dado que el proyecto está en desarrollo, las instrucciones de uso pueden cambiar con el tiempo. En caso de que surjan inconvenientes, se recomienda revisar nuevamente la documentación.

Para probar **Tasks Calendar**, realizar los siguientes pasos:

1. Descargar o clonar el repositorio. 
2. Crear una carpeta en el directorio raíz de tu baúl de Obsidian llamada `Tasks Calendar`.
3. Mover la carpeta `src` y el archivo `Tasks Calendar.md` dentro de la carpeta creada en el paso anterior.

Dentro del bloque `dataviewjs` que se encuentra en el archivo `Tasks Calendar.md`, está la llamada a la aplicación para que esta comience a funcionar. En esta misma llamada, es posible enviar ciertos parámetros de inicio. Los parámetros se deben agregar dentro de los corchetes de la llamada (`{ tasks, view: "month" }`):

```javascript
// Comentario: Llamada a la aplicación
await dv.view("Tasks Calendar/src/index", { tasks, view: "month" })
```

Allí es necesario que especifiques las tareas con las cuales la aplicación debe trabajar.

Para ello hay dos opciones:

1. **Opción 1**: Que el usuario se encargue de buscar y enviar por parámetro las tareas.
2. **Opción 2**: Que el usuario envíe por parámetro un arreglo de tags para ubicar las notas que contienen las tareas.

### Opción 1: Consultas personalizadas

Esta opción ofrece mayor flexibilidad al usuario para buscar las notas y obtener las tareas, pero requiere ciertos conocimiento en JavaScript y la API de *DataviewJS*.

Las consultas para obtener las notas, y por lo tanto las tareas dentro de ellas, están explicadas en la [documentación](https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/#dvpagessource) del plugin.

Por ejemplo, una consulta podría ser la siguiente:

```javascript
const tasks = dv
		.pages()
		.file.where(
			(f) =>
			  f.frontmatter.estado === 'regular' ||
			  f.tags.includes('#tareas-generales') ||
			  f.frontmatter.estado === 'cursando'
		).tasks
```

Esta consulta obtiene las tareas de las notas que tienen el tag `#tareas-generales` o la propiedad `estado` con el valor `regular` o `cursando`.

Luego, esta variable se pasa en la llamada a la aplicación:

```javascript
const tasks = dv
		.pages()
		.file.where(
			(f) =>
			  f.frontmatter.estado === 'regular' ||
			  f.tags.includes('#tareas-generales') ||
			  f.frontmatter.estado === 'cursando'
		).tasks

await dv.view("Tasks Calendar/src/index", { tasks, view: "month" })
```

### Opción 2: Uso de tags

La segunda opción consiste en pasar como parámetro un arreglo que contenga uno o varios tags. Estos tags se utilizan para identificar las notas que contienen las tareas que se desean rastrear.

Esta opción es la más recomendada si el usuario no quiere lidiar con las consultas personalizadas de *DataviewJS*.

Para seguir esta opción, primero debe agregar un tag en las notas que contienen las tareas. Por ejemplo, en una nota llamada `tareas del hogar.md`, puedes agregar el tag `tareas-del-hogar` (el nombre del tag es arbitrario):

```
---
tags:
  - tareas-del-hogar
---

- [ ] Esto es una tarea 📅 2025-02-06
```

Luego, en la llamada a la aplicación, simplemente se pasa el arreglo de tags como parámetro:

```javascript
await dv.view("Tasks Calendar/src/index", { tags: [ 'tareas-del-hogar', 'otro-tag' ], view: "month" })
```

De esta forma la aplicación podrá rastrear las notas que contengan los tags especificados.

Para una mejor legibilidad, te recomiendo declarar el arreglo de tags por separado:

```javascript
const tags = [ 'tareas-del-hogar', 'otro-tag' ]

await dv.view("Tasks Calendar/src/index", { tags, view: "month" })
```

### Otros parámetros

Además de especificar las tareas o tags, se debe agregar el parámetro `view`, que puede tener el valor de `month` o `week`. Este establece la vista que tendrá por defecto cada vez que inicia la aplicación. De todas maneras la vista se puede cambiar una vez dentro de la interfaz.

Por el momento son los únicos parámetros requeridos.

### Importante

Es fundamental respetar el nombre de la carpeta principal (`Tasks Calendar`) y su ubicación en el directorio raíz de su baúl de Obsidian para el correcto funcionamiento de la aplicación.

Para garantizar que el código sea modular, es necesario importar los archivos `.js` de manera de dinámica, lo que implica conocer la ubicación exacta de las carpetas dentro del directorio del usuario. **Obsidian no permite** usar rutas absolutas para realizar estas operaciones, por lo que la estructura de carpetas debe permanecer constante. Si las carpetas cambian, se deberá ajustar gran parte del código.

En caso de encontrar una solución más flexible a este problema, se implementará de inmediato para que los usuarios puedan ubicar la carpeta que contiene la aplicación en cualquier parte de su baúl.