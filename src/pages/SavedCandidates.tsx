import { useState } from "react";
import LocalAPI from "../api/LocalAPI";
import Candidate from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [candidatesSavedToLocal, setCandidatesSavedToLocal] = useState<Candidate[]>(LocalAPI.getLocal());
  
  
  // remove selected candidate with given index
  const removeCandidate = (selectedIndex: number) => {
    LocalAPI.removeFromLocal(selectedIndex);
    // updates page
    setCandidatesSavedToLocal(LocalAPI.getLocal());
  };

  // styles for react components
  const styles: {[key: string]: React.CSSProperties} = {
    divImg:{
      maxWidth: "100px",
      margin: "0px auto",
    },
    thImg: {
      width: "100%",
    },
    rejectBtn:{
      background: "red",
      borderRadius: "100%",
      padding: "0",
      width: "45px",
      height: "45px",
      fontSize: "25px",
    }
  };
  
  

  return (
    <>
      <h1>Potential Candidates</h1>
      {candidatesSavedToLocal.length !== 0 ?(
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Avatar</th>
            <th scope="col">Login</th>
            <th scope="col">Email</th>
            <th scope="col">Location</th>
            <th scope="col">Company</th>
            <th scope="col">Bio</th>
            <th scope="col">Reject</th>
          </tr>
        </thead>
        <tbody>
          {/* display all candidates saved to local */}
          {candidatesSavedToLocal.map((nextCandidate, indexKey) => {
            return (
              <tr key={indexKey}>
                <th scope="row"><div style={styles.divImg}><img src={nextCandidate.avatar_url} style={styles.thImg} alt="user avatar" /></div></th>
                <th>
                  <p>{nextCandidate.login}</p>
                  <p>({nextCandidate.name ? nextCandidate.name : nextCandidate.login})</p>
                </th>
                <th>{nextCandidate.email ? nextCandidate.email : (<em>No Email</em>)}</th>
                <th>{nextCandidate.location ? nextCandidate.location : (<em>No Location</em>)}</th>
                <th>{nextCandidate.company ? nextCandidate.company : (<em>No Company</em>)}</th>
                <th>{nextCandidate.bio ? nextCandidate.bio : (<em>No Bio</em>)}</th>
                <th><button style={styles.rejectBtn} onClick={() => {removeCandidate(indexKey)}}>-</button></th>
              </tr>  
            )})}
        </tbody>
      </table>) : (<h2>No candidates have been accepted</h2>)}
    </>
  );
};

export default SavedCandidates;
