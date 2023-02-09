import {test} from './foo';

interface IUser {
    name: string;
}

class User implements IUser {
    name: string;
    constructor(name?: string) {
        this.name = name ?? 'mock';
    }
}

const user1: User = new User('TOM');
test(user1.name);
const user2: User = new User();
test(user2.name);