'use strict';

//------------------ Version avec onlick pour event (test) ---------------
/*
// fonction constructeur de base pour donner attributs à l'objet
var Slate = function() {
    // this car on ne sait pas encore sur quoi va s'appliquer au sein de cette fonction (fonction générique pour instancier un objet) - ne sait pas encore sur quelle variable va s'appliquer ces constructeurs
        // tous les éléments ci-dessous sont appelés des "attributs"
	this.canvas 			= document.getElementById('slate'); // récupère élément HTML avec id "slate"
	this.context 			= this.canvas.getContext('2d'); // stocke préférence de visualisation (2D)
	this.contextLocation 	= null; // 
	this.isDrawing 			= false; // 

	// stocke EventListener : quand on clique va envoyer fonction onClickPosition sur élément this
		//.bind(this) : à toujours mettre quand event dans un objet
			// sert à préciser à fonction que le this sur lequel on la lance est le this contenu dans l'objet et non le this du QuerySelector (car chaque event listener a un this natif relié à un QuerySelector)
	this.canvas.addEventListener('click', this.mouseLocation.bind(this));
}
*/


//------------- Version avec mousemove pour event (tracker) --------------

// fonction constructeur de base pour donner attributs à l'objet Slate (l'ardoise). Lui passe l'id de l'ardoise pour savoir sur laquelle agir (s'il y en avait plusieurs et pour pouvoir réutiliser dans d'autres sites (récup comme élément ayant l'id slate ici) et lui passe un paramètre pen qui correspondra au pen qu'on lui envoie

var Slate = function(id, pen) {
    // this car on ne sait pas encore sur quoi va s'appliquer au sein de cette fonction (fonction générique pour instancier un objet) - ne sait pas encore sur quelle variable va s'appliquer ces constructeurs
        // tous les éléments ci-dessous sont appelés des "attributs"
	this.canvas 			= document.getElementById(id); // récupère élément HTML avec id passé en paramètre, ici "slate"
	this.context 			= this.canvas.getContext('2d'); // stocke préférence de visualisation (2D)
	this.currentLocation 	= null; // position actuelle de la souris, initialisée à rien du coup
	this.isDrawing 			= false; // va déterminer si on dessine ou pas : si true alors commence à enregistrer tracé, si false alors arrête. Ici initalisé à false pour pas dessiner dès qu'on hover sur le canvas
	this.isErasingLocal		= false; // va déterminer si on gomme au tracé ou pas. Ici initalisé à false pour pas gommer dès qu'on hover sur le canvas
	this.pen 				= pen; // créé attribut pen qui va inclure le pen dans l'ardoise (et toutes les fonctions qui lui sont associées)


	// stocke EventListener : quand on clique va envoyer fonction onXXX sur élément this
		//.bind(this) : à toujours mettre quand event dans un objet
			// sert à préciser à fonction que le this sur lequel on la lance est le this contenu dans l'objet et non le this du QuerySelector (car chaque event listener a un this natif relié à un QuerySelector)
    this.canvas.addEventListener('mousedown', this.mouseDown.bind(this));
    this.canvas.addEventListener('mouseleave', this.mouseLeave.bind(this));
    this.canvas.addEventListener('mousemove', this.mouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.mouseUp.bind(this));

	// stocke EventListener en JQuery : quand on clique va envoyer fonction onXXX sur élément this
		//.bind(this) : à toujours mettre quand event dans un objet
			// sert à préciser à fonction que le this sur lequel on la lance est le this contenu dans l'objet et non le this du QuerySelector (car chaque event listener a un this natif relié à un QuerySelector)
	$('.buttonEraser').on('click', this.onClickErase.bind(this));
	$('.buttonEraserLocal').on('click', this.onClickEraseLocal.bind(this));
	$('.buttonDraw').on('click', this.onClickDraw.bind(this));

	/* tests
	console.log('isDrawing : ' + this.isDrawing);
	console.log('isErasingLocal : ' + this.isErasingLocal);*/
}


// fonction qui donne position sur axes X et Y de la zone de dessin
	// méthode type prototype (en-dehors de l'objet)
Slate.prototype.mouseLocation = function(event)
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


// fonction qui commence à enregistrer tracé si appuie sur souris
	// méthode type prototype (en-dehors de l'objet)
Slate.prototype.mouseDown = function(event)
{
	// va commencer à enregistrer tracé pour dessiner
    this.isDrawing = true;

    // enregistre localisation de l'endroit où est la souris quand appuie dessus
    this.currentLocation = this.mouseLocation(event);
};


// fonction qui arrête d'enregistrer tracé si relâche clic de la souris
	// méthode type prototype (en-dehors de l'objet)
Slate.prototype.mouseUp = function(event)
{
	// va arrêter d'enregistrer tracé et donc de dessiner
    this.isDrawing = false;
};


// fonction qui arrête de dessiner quand quitte l'élement canvas et tous les éléments contenus dedans
	// méthode type prototype (en-dehors de l'objet)
Slate.prototype.mouseLeave = function(event)
{
	// va arrêter d'enregistrer tracé et donc de dessiner
    this.isDrawing = false;
};


// fonction qui tracke mouvements de la souris quand bouge
	// méthode type prototype (en-dehors de l'objet)
Slate.prototype.mouseMove = function(event)
{
	//déclare variable locale qui enregistre localisation de l'endroit où est la souris quand bouge
    var location = this.mouseLocation(event);

    // condition qui va tracer le dessin
    	// si enregistre le tracé pour dessiner
    if(this.isDrawing == true && this.isErasingLocal == false || this.is) {
    	//rajoute fonction précodée type pour dire que commence dessin. Influe sur context car c'est ce qui détermine le dessin apparemment
    	this.context.beginPath();
    	//rajoute fonction précodée type pour dire que le tracé part du point correspondant à localisation actuelle de la souris
    	this.context.moveTo(this.currentLocation.x, this.currentLocation.y);
    	//rajoute fonction précodée type pour dire que trace une ligne jusqu'au point correspondant à position actuelle de la souris
    	this.context.lineTo(location.x, location.y);
    	//rajoute fonction précodée type pour dire que arrête dessin
    	this.context.closePath();
    	// rajoute fonction qui programme les options du stylo (epaisseur, couleur...) prends le context de this comme paramètre car s'applique
    	this.pen.configure(this.context);
    	//rajoute fonction précodée type pour dire de tracer le dessin
    	this.context.stroke();
    	// remplace currentLocation par location à la volée
    		// déplace le point de départ du tracé sur la position de la souris en permanence
    	this.currentLocation = location;
    } else if (this.isDrawing == true && this.isErasingLocal == true) {
    	//rajoute fonction précodée type pour dire de gommer le dessin (coordonnées d'un rectangle : X de départ, Y de départ, largeur, hauteur). Influe sur context car c'est ce qui détermine le dessin apparemment
    		//le tracé part du point correspondant à localisation actuelle de la souris et prends un carré de 10px
    	this.context.clearRect(this.currentLocation.x, this.currentLocation.y, 10, 10);
    	// remplace currentLocation par location à la volée
    		// déplace le point de départ du tracé sur la position de la souris en permanence
    	this.currentLocation = location;
    }
};


// fonction qui va activer la gomme quand click sur bouton eraser
	// méthode type prototype (en-dehors de l'objet)
Slate.prototype.onClickErase = function(event)
{
	// efface tout (sur un rectangle) en partant de coordonnées 0 0 et sur toute la taille du canvas
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}


// fonction qui va commencer à enregistrer tracé pour gommer
	// méthode type prototype (en-dehors de l'objet)
Slate.prototype.onClickEraseLocal = function(event)
{
	// indique que user demande à effacer et non plus à dessiner
	this.isErasingLocal = true;
}


// fonction qui va annuler gommage et remettre possibilité de dessiner
	// méthode type prototype (en-dehors de l'objet)
Slate.prototype.onClickDraw = function(event)
{
	// indique que user demande à arrêter de gommer
	this.isErasingLocal = false;

	/* tests
	console.log('isDrawing : ' + this.isDrawing);
	console.log('isErasingLocal : ' + this.isErasingLocal);*/
}
