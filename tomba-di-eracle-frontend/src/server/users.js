const personaggi = [];

const addUser = ({ id, personaggio, location }) => {

    personaggio = personaggio.nominativo.trim().toLowerCase();
    location = location.nome.trim().toLowerCase();

    // const existingUser = users.find((user) => user.location === location && user.personaggio === personaggio);
    // if(existingUser) {
    //     return {error: 'Userpersonaggio is taken'};
    // }

    const user = { id, personaggio, location};
    
    personaggi.push(user);

    return {user};
}

const removeUser = (id) => {
    const index = personaggi.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }


}

const getUser = (id) => personaggi.find((user) => user.id === id)


const getUsersInlocation = (location) => personaggi.filter((user) => user.location === location); 

module.exports = { addUser, removeUser, getUser, getUsersInlocation };