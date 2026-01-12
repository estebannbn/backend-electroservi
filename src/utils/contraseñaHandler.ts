import bcrypt from 'bcrypt';

// Número de rondas de sal (mayor = más seguro pero más lento)
const SALT_ROUNDS = 8;

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}

