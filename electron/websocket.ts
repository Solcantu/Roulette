import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import path from 'path';

import { app } from 'electron';
import { ISavedData, ICurrentData, IRandomNumbers } from './inderfaces';

const port = process.env.PORT || 8001;

const expressApp = express();

expressApp.use(express.static(path.join(app.getAppPath(), './build/')));

expressApp.get('*', (req, res) => {

    res.sendFile('index.html', {
        root: path.join(app.getAppPath(), './build/')
    }, (err) => {
        if (err) {
            console.log('error' + err);
        }
    });
});


const server = http.createServer(expressApp);
const io = socketIo(server, { serveClient: false });


let tempRandomNumbers: IRandomNumbers = {
    randomCharacter: null,
    randomPerks: null
}

let tempSavedData: ISavedData = {
    Character: {
        killer: null,
        survivor: null
    },
    SelectedCharacter: {
        killer: null,
        survivor: null
    },
    Perks: {
        killer: null,
        survivor: null
    },
    SelectedPerks: {
        killer: null,
        survivor: null
    }
};

let tempCurrentData: ICurrentData = {
    CurrentCharacter: 'killer',
    SelectedCharacter: null,
    SelectedPerks: null
}

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.emit('syncData', tempRandomNumbers, tempSavedData, tempCurrentData);

    socket.on('setSavedData', (savedData: ISavedData) => {

        tempSavedData = savedData;

        console.log('Saved Data setted!', savedData);
        socket.broadcast.emit('getSavedData', savedData);

    });

    socket.on('setCurrentData', (currentData: ICurrentData) => {

        tempCurrentData = currentData;

        console.log('Current Data setted!', currentData);
        socket.broadcast.emit('getCurrentData', currentData);

    });

    socket.on('setRandomNumbers', (randomNumbers: IRandomNumbers) => {

        tempRandomNumbers = randomNumbers;

        console.log('Randomnumbers setted!', randomNumbers);
        socket.broadcast.emit('getRandomNumbers', randomNumbers);

    });

    

    /*
    socket.emit('syncData', tempData);

    socket.on('raffleClick', (arr, isKillerSelected) => {

        tempData.perkArray = arr;
        tempData.isKillerSelected = isKillerSelected;

        console.log('raffle Clicked!', { arr, isKillerSelected });
        socket.broadcast.emit('raffleData', arr, isKillerSelected);

    });

    socket.on('characterRaffleClick', (chracterNumber) => {

        tempData.characterNumber = chracterNumber;

        console.log('Character Clicked!', { chracterNumber });
        socket.broadcast.emit('characterRaffleData', chracterNumber);

    });

    socket.on('perkTableChange', (perkData, isKillerSelected) => {

        tempData.isKillerSelected = isKillerSelected;
        if (isKillerSelected) {tempData.selectedPerkData.killer = perkData;} else {tempData.selectedPerkData.survivor = perkData;}

        console.log('Perk Table Changed!', { perkData, isKillerSelected });
        socket.emit('perkTableData', perkData, isKillerSelected);
        socket.broadcast.emit('perkTableData', perkData, isKillerSelected);

    });

    socket.on('characterTableChange', (characterData, isKillerSelected) => {

        tempData.isKillerSelected = isKillerSelected;
        if (isKillerSelected) {tempData.selectedCharacterData.killer = characterData;} else {tempData.selectedCharacterData.survivor = characterData;}

        console.log('Character Table Changed!', { perkData: characterData, isKillerSelected });
        socket.emit('characterTableData', characterData, isKillerSelected);
        socket.broadcast.emit('characterTableData', characterData, isKillerSelected);

    });

    socket.on('changeLanguage', (language: 'english' | 'german') => {

        tempData.language = language;

        console.log('Language Changed!', { language });
        socket.broadcast.emit('languageUpdate', language);
    });
    */

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

});

server.listen(port, () => console.log(`Listening on port ${port}`));