/*
    MARK: EJERCICIOS CLASE 1

    *   Crear un formulario de datos personales
    *   Agregar CSS necesario para dar 2 estilos al formulario (normal y uno de "Alto Contraste")
    *   Agregar atributos a inputs del formulario para campos obligatorios
    *   Validar inputs del usuario en este formulario
*/

function validateEmail(email)
{
    /*
        Es importante tener en cuenta que no cubre todos los casos posibles y específicos definidos por los estándares de correos electrónicos (RFC 5322), pero es adecuado para la mayoría de los propósitos comunes.
    */

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    /* 
        Desglose de la Expresión Regular
            ^: Comienzo de la línea.
            [^\s@]+: Uno o más caracteres que no son espacios en blanco ni '@'.
            @: Exactamente un símbolo '@'.
            [^\s@]+: Uno o más caracteres que no son espacios en blanco ni '@'.
            \.: Exactamente un punto '.'.
            [^\s@]+: Uno o más caracteres que no son espacios en blanco ni '@'.
            $: Fin de la línea.
    */

    return regex.test(email)
}

function checkForm() {
    const NAME = document.getElementById("formName")
    const SURNAME = document.getElementById("formSurname")
    const EMAIL = document.getElementById("formEmail")
    const DATE_OF_BIRTH = document.getElementById("formDateOfBirth")
    const COUNTRY_OF_RESIDENCE = document.getElementById("formCountryOfResidence")

    //  Intencionalmente evito un early return para avisar al usuario de todos
    //  los errores al mismo tiempo en lugar del primero que se encuentre.

    //  Además, incluyo una condición extra para devolver error sii el campo
    //  en cuestión es obligatorio en el formulario (el atributo 'required')

    let ERROR = "¡UPS! Parece que los siguientes campos no tienen información válida:\n"

    if (NAME.value.trim() === "" && NAME.required)
        ERROR = ERROR.concat("\n* El campo 'Nombre' NO puede estar vacío.")
    
    if (SURNAME.value.trim() === "" && SURNAME.required)
        ERROR = ERROR.concat("\n* El campo 'Apellido' NO puede estar vacío.")
    
    if (!validateEmail(EMAIL.value.trim()) && EMAIL.required)
        ERROR = ERROR.concat("\n* El campo 'Correo electrónico' debe tener un email válido.")
    
    if (DATE_OF_BIRTH.value === "" && DATE_OF_BIRTH.required)
        ERROR = ERROR.concat("\n* El campo 'Fecha de nacimiento' NO puede estar incompleto.")
    
    if (COUNTRY_OF_RESIDENCE.value === "" && COUNTRY_OF_RESIDENCE.required)
        ERROR = ERROR.concat("\n* El campo 'País de residencia' necesita algún país indicado.")

    if (ERROR === "¡UPS! Parece que los siguientes campos no tienen información válida:\n")
    {
        alert("FORMULARIO ENVIADO CORRECTAMENTE!")
        location.reload()
        return
    }

    alert(ERROR)
}

document.addEventListener("DOMContentLoaded", () => {
    const DEFAULT_STYLE_BUTTON = document.getElementById("styleDefault");
    const HIGH_CONTRAST_STYLE_BUTTON = document.getElementById("styleHighContrast");
    const LABELS = document.querySelectorAll('label')
    const LEGEND = document.getElementById("formLegend")

    DEFAULT_STYLE_BUTTON.addEventListener("click", () => {
        DEFAULT_STYLE_BUTTON.classList.add("active")
        HIGH_CONTRAST_STYLE_BUTTON.classList.remove("active")
        document.documentElement.style.setProperty('--bs-warning-bg-subtle', '#fff3cd', 'important')
        LEGEND.style.setProperty('color', '#212529', 'important')
        
        LABELS.forEach((element) => {
            element.style.setProperty('color', '#212529', 'important')
        })
    })
    
    HIGH_CONTRAST_STYLE_BUTTON.addEventListener("click", () => {
        HIGH_CONTRAST_STYLE_BUTTON.classList.add("active")
        DEFAULT_STYLE_BUTTON.classList.remove("active")
        document.documentElement.style.setProperty('--bs-warning-bg-subtle', '#121212', 'important')
        LEGEND.style.setProperty('color', '#f2f2f2', 'important')
        
        LABELS.forEach((element) => {
            element.style.setProperty('color', '#f2f2f2', 'important')
        })
    })

    const SUBMIT_BUTTON = document.getElementById("formSubmit")

    SUBMIT_BUTTON.addEventListener("click", (event) => {
        event.preventDefault()
        checkForm()
    })
})