'use strict';

// instanciation : utilise le modèle/fonction "Program" pour construire un objet contenu au sein de la variable "monCanvas" - donne les valeurs aux propriétés en les passant en paramètres à la fonction Program
    // le this de fonction Program est remplacé par nom de variable et créé objet à la volée
    // passe à constructeur l'id qu'il prends en paramètres, pour savoir sur quel élément du dom intéragir
var monCanvas = new Program();


// lance fonction start contenue dans l'objet monCanvas, qui met tout en mouvement
monCanvas.start();

