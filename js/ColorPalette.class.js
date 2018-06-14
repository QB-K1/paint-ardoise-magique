'use strict';

// fonction constructeur de base pour donner attributs à l'objet ColorPalette (le nuancier). Lui passe un paramètre pen qui correspondra au pen qu'on lui envoie
var ColorPalette  = function(pen)
{
    // this car on ne sait pas encore sur quoi va s'appliquer au sein de cette fonction (fonction générique pour instancier un objet) - ne sait pas encore sur quelle variable va s'appliquer ces constructeurs

    // //Aura une propriété canvas qui correspond à son canvas (pris par l'id color-palette) et non au canvas du dessin
    this.canvas = document.getElementById('color-palette');// récupère élément HTML avec id passé en paramètre, ici "color-palette" qui correspond à son canvas et non au canvas du dessin
    this.context = this.canvas.getContext("2d"); // stocke préférence de visualisation (2D)
    this.pen = pen; // créé attribut pen qui va inclure le pen dans l'ardoise (et toutes les fonctions qui lui sont associées)

    // stocke dans variable gradient le dégradé (formule prédéfinie auquelle on passe les paramètres correspondant au canvas (dimensions horizontales))
    var gradient = this.context.createLinearGradient(0,0, this.canvas.width,0);
    
    // formule type pour dégradé rouge -> vert -> bleu horizontal
    gradient.addColorStop(0,    'rgb(255,   0,   0)');
    gradient.addColorStop(0.15, 'rgb(255,   0, 255)');
    gradient.addColorStop(0.32, 'rgb(0,     0, 255)');
    gradient.addColorStop(0.49, 'rgb(0,   255, 255)');
    gradient.addColorStop(0.66, 'rgb(0,   255,   0)');
    gradient.addColorStop(0.83, 'rgb(255, 255,   0)');
    gradient.addColorStop(1,    'rgb(255,   0,   0)');

    // "fillStyle" est fonction précodée canvas qui remplit le container sur lequel s'applique, ici remplis avec contenu de gradient, donc le dégradé
    this.context.fillStyle = gradient;
    // remplis le container avec ce qu'on a défini en fillStyle, en passant les dimensions du canvas
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    				// ??? this.context.fill();

    // stocke dans variable gradient le dégradé (formule prédéfinie auquelle on passe les paramètres correspondant au canvas (dimensions verticales))
    gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);

    // formule type pour dégradé blanc opaque -> transparent -> noir opaque vertical
    gradient.addColorStop(0,   'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.5, 'rgba(0,     0,   0, 0)');
    gradient.addColorStop(1,   'rgba(0,     0,   0, 1)');

    // "fillStyle" est fonction précodée canvas qui remplit le container sur lequel s'applique, ici remplis avec contenu de gradient, donc le dégradé
    this.context.fillStyle = gradient;
    // remplis le container avec ce qu'on a défini en fillStyle, en passant les dimensions du canvas
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    //eventListener de type click qui lance fonction pickColor quand clicke sur le canvas visé (le nuancier)
    	// .bind(this) : à toujours mettre quand event dans un objet
			// sert à préciser à fonction que le this sur lequel on la lance est le this contenu dans l'objet et non le this du QuerySelector (car chaque event listener a un this natif relié à un QuerySelector)
    this.canvas.addEventListener('click',this.pickColor.bind(this));
};


// fonction qui donne position sur axes X et Y du nuancier
	// méthode type prototype (en-dehors de l'objet)
ColorPalette.prototype.mouseLocation = function(event)
{
	// Variable dans laquelle récupère les coordonnées du canvas
		// getBoundingClientRect donne x et y de l'origine de l'élément, ainsi que sa hauteur et largeur, stocké dans un objet
	var canvasLoc = this.canvas.getBoundingClientRect();
	// variable qui récupère position de la souris (pour que event débute sur le canvas et pas sur la page en général)
		// // stocke positions X et Y du canvas dans un objet contenant x et y avec leurs valeurs
		// soustrait coordonnées du canvas à celles de la page car canvas pas collé aux bords de la page : va renvoyer position sur le canvas, pas sur la page en général 
	var mouseLoc = 
	{
		x: event.clientX - canvasLoc.x,
		y: event.clientY - canvasLoc.y
	}

	// renvoie position de la souris
	return mouseLoc;
}


// fonction qui récupère les détails de la couleur sur laquelle on a cliqué (en RGB car le nuancier est en RGB)
	// méthode type prototype (en-dehors de l'objet)
ColorPalette.prototype.pickColor = function(event)
{
	// stocke dans variable pixel la position de la souris
    var pixelMouse=  this.mouseLocation(event);
    // stocke dans variable colorPalette un objet créé automatiquement par fonction précodée "getImageData" représentant les données de pixels sous-jacentes pour la zone du canevas désigné. Renvoie RGB dans les trois premiers index de l'objet
    	// on lui passe en premier la position x de la souris puis la position y puis la largeur et hauteur du rectangle à partir duquel ImageData sera extrait, ici un carré d'1px pour être le plus précis possible
    var colorPalette = this.context.getImageData(pixelMouse.x, pixelMouse.y, 1, 1);
    // stocke dans variable color un tableau associatif contenant les valeurs des trois premiers index de l'objet colorPalette qui contiennent les infos RGB du pixel sélectionné et on leur assigne une key explicite
    var color = {
        red: colorPalette.data[0],
        green: colorPalette.data[1],
        blue: colorPalette.data[2]
    };
    // créé/modifie attribut pen.color en lui passant les infos RGB récupérées que l'on passe dans une string sous le format 'rgb('R,G,B')' qui est celui dont on a besoin pour rentrer dans l'attribut pen.color de l'objet pen (constructeur Pen) pour en changer la couleur
    this.pen.color = 'rgb(' + color.red + ',' + color.green + ',' + color.blue + ')';

    // Test pour renvoyer code RGB sélectionné
	console.log('pen.color : ' + this.pen.color);
};


