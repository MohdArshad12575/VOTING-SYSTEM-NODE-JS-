import pool from '../db.js';
import bcrypt from 'bcrypt';

const createUser = async (userData) => {
    const { name, age, email, mobile, address, aadharCardNumber, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password,10);
    const [result] = await pool.query(
        `INSERT INTO users (name, age, email, mobile, address, aadhar_card_number, password, role)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, age, email, mobile, address, aadharCardNumber, hashedPassword, role || 'voter']
    );
    return result.insertId;
};

const findByAadhar = async (aadharCardNumber) => {
    const [rows] = await pool.query(
        `SELECT * FROM users WHERE aadhar_card_number = ?`,
        [aadharCardNumber]
    );
    return rows[0];
};

const findById = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return rows[0];
};

const comparePassword = async (candidatePassword, hashedPassword) => {
    return await bcrypt.compare(candidatePassword, hashedPassword);
};

const markVoted = async (userId) => {
    await pool.query(`UPDATE users SET is_voted = true WHERE id = ?`, [userId]);
};

export { createUser, findByAadhar, findById, comparePassword, markVoted };