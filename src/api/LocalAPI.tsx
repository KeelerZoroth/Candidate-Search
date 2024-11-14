import Candidate from "../interfaces/Candidate.interface";


const localKey: string = "SavedCandidates";


const getLocal = (): Candidate[] => {
    const localValue = localStorage.getItem(localKey);
    return localValue ? JSON.parse(localValue) : [];
}

const setLocal = (newLocalValue: string | Candidate[]) => {
    localStorage.setItem(localKey, typeof newLocalValue === "string" ? newLocalValue : JSON.stringify(newLocalValue));
}

const addToLocal = (newCandidate: Candidate) => {
    const localCandidates: Candidate[] = getLocal();
    localCandidates.push(newCandidate);
    setLocal(localCandidates)
}

const removeFromLocal = (candidateIndex: number) => {
    const localCandidates: Candidate[] = getLocal();
    localCandidates.splice(candidateIndex, 1);
    setLocal(localCandidates)
}

export default {getLocal, setLocal, addToLocal, removeFromLocal}