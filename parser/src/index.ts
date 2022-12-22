import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import fs from 'fs';
import Transition from '../../generated_data/transition';

async function getDataContribution() {
    const rawTransitionData =  await prisma.transition.findMany({
        where: {
            OR: [
                { Titre: 'Poster un nouveau message' },
                { Titre: 'Répondre à un message' }
            ]
        },
        select: {
            Titre: true,
            Attribut: true,
            Date: true
        }
    });

    let cleanTransitionData: Transition[] = [];

    rawTransitionData.forEach(object => {
        let tempObject: Transition = {};
        tempObject.titre = object.Titre;
        tempObject.attribut = object.Attribut;
        tempObject.date = object.Date;
        cleanTransitionData.push(tempObject);
    })

    return cleanTransitionData;

}

getDataContribution().then(data => {
    fs.writeFileSync('../generated_data/data_for_contribution_kpi.json', JSON.stringify(data, null, 4));
    console.log('Parsing successful ! You can find the JSON file in the generated data folder.');
});
