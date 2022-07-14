const colores = [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "whitesmoke",
  "yellow",
  "yellowgreen",
];
const animales = [
  "elefante",
  "gallina",
  "leon",
  "medusa",
  "mono",
  "morsa",
  "tortuga",
  "tucan",
  "vaca",
  "zorro",
  "anaconda",
  "raton",
  "cangrejo",
  "pulpo",
  "cerdo",
  "pez-payaso",
  "gato",
  "oveja",
  "abeja",
  "coala",
  "mariposa",
  "caballo",
  "hormiga",
  "colibri",
  "avestruz",
  "carpincho",
  "perro",
  "mantarraya",
  "erizo",
];
const domElem = (Element) => {
  return document.querySelector(Element);
};
const domId = (Element) => {
  return document.getElementById(Element);
};
const domAll = (Element) => {
  return document.querySelectorAll(Element);
};

let card = 3;
let punto = JSON.parse(localStorage.getItem("puntos"));
if (!punto) {
  localStorage.setItem("puntos", 0);
}
let nivel = JSON.parse(localStorage.getItem("puntos"));
const agregar = () => {
  localStorage.setItem("puntos", nivel);
};

let nombre1 = true;

const data = () => {
  let cartas = null;
  if (nivel < 2 || nivel > 4) {
    cartas = _.shuffle(animales);
  } else {
    cartas = _.shuffle(colores);
  }
  return cartas;
};
const listar = () => {
  let contador = Number(card) + Number(nivel);
  const lista = data();
  const filtro = lista.filter((res, index) => index <= contador - 1);
  const array = filtro.concat(filtro);
  createCard(_.shuffle(array));
};

const createCard = (data) => {
  if (nivel < 2 || nivel > 4) {
    domElem(".title > h2").innerHTML = "ANIMALES";
  } else {
    domElem(".title > h2").innerHTML = "COLORES";
  }
  domElem(".title > p").innerHTML = `NIVEL ${nivel + 1}`;
  domElem(".content").innerHTML = "";

  data.forEach((element) => {
    const useTemplate = domId("template").content.cloneNode(true);
    const carta = useTemplate.querySelector(".front");
    if (nivel < 2 || nivel > 4) {
      useTemplate.querySelector(".back > img").src = `img/${element}.png`;
    } else {
      useTemplate.querySelector(".back").style.background = element;
    }
    domElem(".content").appendChild(useTemplate);

    carta.addEventListener("click", () => {
      carta.classList.add("active");
      nombre1 == true ? (nombre1 = element) : validar(element);
    });
  });
};
listar();

let validador = 0;
let detener = false;

const validar = (dato) => {
  nombre1 == dato ? (validador++, contarPuntos(), darPremio()) : removerClase();
  limpiar();
};

const contarPuntos = () => {
  setTimeout(() => {
    validador == Number(card) + Number(nivel)
      ? (nivel++,agregar(), listar(), (validador = 0), limpiar())
      : null;
  }, 1000);
};

const darPremio = () => {
  domAll(".active").forEach((element) => {
    element.id = "premio";
  });
};

const limpiar = () => {
  nombre1 = true;
};

const removerClase = () => {
  detener = true;
  setTimeout(() => {
    domAll(".front").forEach((element) => {
      if (element.id !== "premio") {
        element.classList.remove("active");
      }
    });
  }, 1000);
};

// const deshabilitar = () => {
//   domAll(".card").forEach((element) => {
//     element.disabled = true;
//   });
// };
