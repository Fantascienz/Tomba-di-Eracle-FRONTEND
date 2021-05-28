const personaggi = [];

const addUser = ({ id, personaggio, location }) => {
    location = location.id
    const existingUser = personaggi.find((user) => user.personaggio.id === personaggio.id);
    if (existingUser) {
        return { error: 'errore' }
    }
    const user = { id, personaggio, location };
    personaggi.push(user);
    return { user }
}

const cambioLocation = ({ id, personaggio, location }) => {
    const personaggi = getPersonaggi();
    const pupazzo = { id, personaggio, location };
    const personaggioOnline = personaggi.find(element => element.personaggio.id == personaggio.id)
    if (personaggioOnline) {
        personaggioOnline.personaggio.ultimaLocation = pupazzo.location;
    }
    return { personaggioOnline };
}

const removeUser = (id) => {
    const personaggi = getPersonaggi();
    const index = personaggi.findIndex((element) => element.id === id);
    if (index !== -1) {
        return personaggi.splice(index, 1)[0];
    }
}


const getUser = (id) => personaggi.find((user) => user.id === id)

const getUsersInlocation = (location) => personaggi.filter((user) => user.location === location);

const getPersonaggi = () => {
    return personaggi
}

module.exports = { addUser, removeUser, getUser, getUsersInlocation, cambioLocation, getPersonaggi };