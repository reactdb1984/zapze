export const objectToArray = (object) => {
    if (object) {
        return Object.entries(object).map(e => Object.assign({}, e[1], {id: e[0]}))
    }
}
export const createNewProject = (user, photoURL, project, firestore)=>{
    return{
        ...project,
        projectLead: user.uid,
        createdBy: user.displayName,
        projectLeadPhotoURL: photoURL || '/assets/user.png',
       
        contributors: {
            [user.uid]: {
                contributing: true,
                joinDate: firestore.FieldValue.serverTimestamp(),
                photoURL: photoURL || '/assets/user.png',
                displayName: user.displayName,
                creator: true
            }
        }
    }
}

export const createDataTree = dataset => {
    let hashTable = Object.create(null);
    dataset.forEach(a => hashTable[a.id] = {...a, childNodes: []});
    let dataTree = [];
    dataset.forEach(a => {
        if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
        else dataTree.push(hashTable[a.id])
    });
    return dataTree
};