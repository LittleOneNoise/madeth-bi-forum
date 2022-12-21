import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import fs from 'fs';

async function getDataContribution() {
    return await prisma.transition.findMany({
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
}

getDataContribution().then(data => {
    fs.writeFileSync('../generated_data/data_for_contribution_kpi.json', JSON.stringify(data, null, 4));
});
