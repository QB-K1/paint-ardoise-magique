'use strict';

// fonction constructeur de base pour donner attributs à l'objet Pen (le stylet)
var Pen = function()
{
	// this car on ne sait pas encore sur quoi va s'appliquer au sein de cette fonction (fonction générique pour instancier un objet) - ne sait pas encore sur quelle variable va s'appliquer ces constructeurs
        // tous les éléments ci-dessous sont appelés des "attributs"
    this.color = 'black'; // initialise la couleur sur noir
    this.size  = 1; // initialise la taille à 1
};


// fonction qui change couleur du stylo
	// méthode type prototype (en-dehors de l'objet)
Pen.prototype.changeColor = function(color) 
{
	// remplace la couleur du Pen par la valeur de color
	this.color = color;
}


// fonction qui change epaisseur
	// méthode type prototype (en-dehors de l'objet)
Pen.prototype.changeThickness = function(size) 
{
	// remplace la taille du Pen par la valeur de size
	this.size = size;
}


// fonction qui va configurer la couleur et la taille du Pen au sein du canvas
	// lui passe context en argument car influe sur context car c'est ce qui détermine le dessin apparemment
Pen.prototype.configure = function(context) 
{
	// créé attributs correspondant à couleur et épaisseur du Pen dans l'objet Pen
	context.strokeStyle = this.color; // strokeStyle est formule type en canvas qui va définir couleur
	context.lineWidth = this.size; // lineWidth est formule type en canvas qui va définir épaisseur du trait
}
