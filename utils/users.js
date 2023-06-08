const users = [];

const userJoin = (id,username,room)=>{
    const user = {id,username,room};
    users.push(user);
    return user;
}

const allusers =(room)=>{
    return users.filter(user => user.room == room);
}

const getcurrentUser = (id)=>{
    return users.find(user => user.id == id)
}

const userleave = (id)=>{
    let int = users.findIndex(user=> user.id==id);

    if(int !== -1){
        return users.splice(int,1)[0];
    }
}

module.exports = {userJoin,allusers,getcurrentUser,userleave};