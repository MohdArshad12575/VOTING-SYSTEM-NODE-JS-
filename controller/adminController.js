import { createCandidate , updateCandidate , deleteCandidate} from '../models/admin.js';

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

const upCandidate = async (req, res) => {
    const CandidateData = req.body;
    const id = req.params.id;

    const result = await updateCandidate(CandidateData,id)
    try {
        if (!result) {
            return res.status(404).json({ error: "Candidate not found or no fields to update" });
        }
        console.log(result)
        res.json({message: "successfully updated candidate record "});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const delCandidate = async (req, res) => {
    const id = req.params.id;
    const result = await deleteCandidate(id)
    try {
        if (!result) {
            return res.status(404).json({ error: "candidate does not deleted" });
        }
        console.log(result)
        res.json({message: "successfully deleted candidate record "});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export { addCandidate, upCandidate, delCandidate };