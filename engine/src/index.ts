import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import fs from 'fs';

async function getTransitions() {
    return await prisma.transition.findMany({
        select: {
            Titre: true,
            Date: true,
            Heure: true
        }
    });
}

// const getTransitions = async () => 
    


getTransitions().then(data => {
    fs.writeFileSync('./src/data/transitions.json', JSON.stringify(data, null, 4));

    // console.log(data);
});
