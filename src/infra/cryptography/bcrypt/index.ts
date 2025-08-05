import bcrypt from 'bcrypt';

export default class BCrypt {
    static async generate(value: string): Promise<string> {
        return bcrypt.hash(value, 8);
    }

    static async compare(value: string, hash: string): Promise<boolean> {
        return bcrypt.compare(value, hash);
    }
}
