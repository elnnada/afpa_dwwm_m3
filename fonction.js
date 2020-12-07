// Code de l'objet ligne panier
function LignePanier (code, qte, prix)
{
    this.codeArticle = code;
    this.qteArticle = qte;
    this.prixArticle = prix;
    this.ajouterQte = function(qte)
    {
        this.qteArticle += qte;
    }
    this.getPrixLigne = function()
    {
        var resultat = this.prixArticle * this.qteArticle; 
        return resultat;
    }
    this.getCode = function() 
    {
        return this.codeArticle;
    }
}

// code de l'objet Panier
// méthode ajouterArticle() vérifie au préalable l'existence dans le panier de l'article passé en paramètre.
function Panier()
{
    this.liste = [];
    this.ajouterArticle = function(code, qte, prix)
    { 
        var index = this.getArticle(code);
        if (index == -1) this.liste.push(new LignePanier(code, qte, prix)); // ici mon local storage

        else this.liste[index].ajouterQte(qte);
    }
    this.getPrixPanier = function()
    {
        var total = 0;
        localStorage.setItem('totalPanier', JSON.stringify(total));
        for(var i = 0 ; i < this.liste.length ; i++)
            total += this.liste[i].getPrixLigne();
        return total + "€"; // ici euro
    }
    this.getArticle = function(code)
    {
        for(var i = 0 ; i <this.liste.length ; i++)
            if (code == this.liste[i].getCode()) return i;
        return -1 ;
    }
    this.supprimerArticle = function(code)
    {
        var index = this.getArticle(code);
        if (index > -1) this.liste.splice(index, 1);
    }
}
