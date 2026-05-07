import pool from '../db.js';

const createCandidate = async (candidateData) => {
    const { name, party, age } = candidateData;
    const [result] = await pool.query(
        `INSERT INTO candidates (name, party, age) VALUES (?, ?, ?)`,
        [name, party, age]
    );
    return result.insertId;
};

const updateCandidate = async (candidateData, id) => {
    const updates = [];
    const values = [];

    if (candidateData.name !== undefined) {
        updates.push("name = ?");
        values.push(candidateData.name);
    }
    if (candidateData.party !== undefined) {
        updates.push("party = ?");
        values.push(candidateData.party);
    }
    if (candidateData.age !== undefined) {
        updates.push("age = ?");
        values.push(candidateData.age);
    }

    if (updates.length === 0) {
        return null; 
    }

    values.push(id); 

    const query = `UPDATE candidates SET ${updates.join(", ")} WHERE id = ?`;
    const [result] = await pool.query(query, values);
    
    return result;
};

const deleteCandidate = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM candidates WHERE id = ?`,
        [id]
    );
    return result;
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

export { createCandidate, getAllCandidates, findById, castVote, getVoteCount, updateCandidate , deleteCandidate };