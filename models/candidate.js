import pool from '../db.js';

const createCandidate = async (candidateData) => {
    const { name, party, age } = candidateData;
    const [result] = await pool.query(
        `INSERT INTO candidates (name, party, age) VALUES (?, ?, ?)`,
        [name, party, age]
    );
    return result.insertId;
};

const getAllCandidates = async () => {
    const [rows] = await pool.query(`SELECT * FROM candidates`);
    return rows;
};

const findById = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM candidates WHERE id = ?`, [id]);
    return rows[0];
};

const castVote = async (candidateId, userId) => {
    await pool.query(
        `INSERT INTO votes (user_id, candidate_id) VALUES (?, ?)`,
        [userId, candidateId]
    );
    await pool.query(
        `UPDATE candidates SET vote_count = vote_count + 1 WHERE id = ?`,
        [candidateId]
    );
};

const getVoteCount = async () => {
    const [rows] = await pool.query(
        `SELECT name, party, vote_count FROM candidates ORDER BY vote_count DESC`
    );
    return rows;
};

export { createCandidate, getAllCandidates, findById, castVote, getVoteCount };