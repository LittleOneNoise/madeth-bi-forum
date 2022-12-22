# BI Forum FLU avec Parser et Moteur

## Présentation
Ce projet a pour but d'extraire des données provenant d'un forum (FLU) afin de les manipuler pour créer des indicateurs qui aiguilleront de futures décisions.<br/>
Le projet se compose en 3 modules: parser, moteur et front. Le parser est à exécuter à part tandis que le moteur est directement intégré avec le front.<br/>

## Exécuter le parser

Attention, le parser est configuré pour traiter des données présentent dans une bdd MySQL.<br/>
Veuillez également à vérifier la configuration de votre serveur MySQL, vous pouvez modifier le contenu du fichier .env dans parser/.env pour que les variables soient en cohérence avec la configuration sur votre machine.<br/><br/>
Une fois la configuration faite, suivez les instructions suivantes :

1. Configurez votre terminal pour exécuter vos commandes dans le répertoire ```parser```.

2. Entrez la commande suivante :
```cmd
npm install
```

3. Entrez la commande suivante :
```cmd
npm run dev
```

4. Le programme se lance et la console vous affiche un message de confirmation si tout s'est bien déroulé.
 
## Exécuter le front + moteur

1. Configurez votre terminal pour exécuter vos commandes dans le répertoire ```client/forum-bi```.

2. Entrez la commande suivante :
```cmd
npm install
```

3. Entrez la commande suivante :
```cmd
npm run start
```

4. Une fois l'exécution terminée, vous pouvez aller à l'adresse ```http://localhost:4200/```
