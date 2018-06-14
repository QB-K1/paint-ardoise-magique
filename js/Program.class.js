'use strict';

// fonction constructeur de base pour donner attributs à l'objet Programme (qui va gérer les fonctionnalités)
var Program = function() 
{
	// pour instancier nouveau modèle en utlisant les créateurs que l'on a définis (!!! new ne veut pas dire que sont vides mais qu'on créé nouvel objet en utilisant le modèle défini dans les créateurs)
	this.pen = new Pen(); // créé nouveau pen en utilisant le constructeur Pen et le stocke dans attribut pen de l'objet qui a appelé la fonction

	this.canvas = new Slate('slate', this.pen); // créé nouveau canvas en utilisant le constructeur Slate et le stocke dans attribut canvas de l'objet qui a appelé la fonction, 
		// appel de fonction Slate passe 'slate' (id du canvas en HTML) car paramètre de fonction créateur est 'id', et passe this.pen car demande pen en paramètre et on lui passe le pen concerné et ses caractéristiques

	this.palette = new ColorPalette(this.pen); // créé nouvelle palette en utilisant le constructeur ColorPalette et le stocke dans attribut palette de l'objet qui a appelé la fonction
		// passe this.pen car demande pen en paramètre et on lui passe le pen concerné et ses caractéristiques
}


// fonction qui lance les modifications à effectuer quand clique sur boutons des couleurs ou de l'épaisseur
	// méthode type prototype (en-dehors de l'objet)
Program.prototype.start = function()
{
	// stocke EventListener en JQuery : quand on clique va envoyer fonction onXXX sur élément this
		//.bind(this) : à toujours mettre quand event dans un objet
			// sert à préciser à fonction que le this sur lequel on la lance est le this contenu dans l'objet et non le this du QuerySelector (car chaque event listener a un this natif relié à un QuerySelector)
	// quand clique sur élément ayant la classe "colorButton" va lancer fonction "onClickColor"
	$('.colorButton').on('click', this.onClickColor.bind(this));
	$('.pencilThickness').on('click', this.onClickThickness.bind(this));
	$('.buttonPipette').on('click', this.onClickColorPicker.bind(this));
}

 
// fonction qui définit les changements à effectuer quand clique sur boutons des couleurs
	// méthode type prototype (en-dehors de l'objet)
Program.prototype.onClickColor = function(event)
{
	//stocke dans variable div la cible actuelle de l'évènement (formule type event.currentTarget)
	var div = event.currentTarget;
	// stocke dans variable color la valeur de l'attribut HTML "data-color" (formule type dataset.color) de l'élément div (voir ligne précédente) 
	var color = div.dataset.color;

	//envoie fonction changeColor en lui passant en paramètre color qui va s'appliquer à l'élément pen de l'objet concerné (this)
	this.pen.changeColor(color);
}


// fonction qui définit les changements à effectuer quand clique sur boutons de l'épaisseur
	// méthode type prototype (en-dehors de l'objet)
Program.prototype.onClickThickness = function(event)
{
	//stocke dans variable button la cible actuelle de l'évènement (formule type event.currentTarget)
	var button = event.currentTarget;
	// stocke dans variable size la valeur de l'attribut HTML "data-size" (formule type dataset.size) de l'élément button (voir ligne précédente) 
	var size = button.dataset.size;

	//envoie fonction changeThickness en lui passant en paramètre size qui va s'appliquer à l'élément pen de l'objet concerné (this)
	this.pen.changeThickness(size);
}


// fonction lancée quand clique sur bouton pipette (voir event dans start plus haut)
	// méthode type prototype (en-dehors de l'objet)
Program.prototype.onClickColorPicker = function()
{
	// fait un fadeToggle (fonction précodée JQuery qui affiche ou cache un élément en jouant sur son opacité) sur l'élément qui a l'id "color-palette" (le nuancier)
    $('#color-palette').fadeToggle();
};
