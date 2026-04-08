import { createCandidate } from '../models/candidate.js';

const addCandidate = async (req, res) => {
    const CandidateData = req.body;
    const result = await createCandidate(CandidateData)
    try {
        if (!result) {
            return res.status(404).json({ error: "candidate does not updated" });
        }
        res.json({message: "successfully updated candidate record "});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export { addCandidate };