import { useState, useEffect} from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import UserCard from '../components/UserCard';
import localAPI from "../api/LocalAPI";

const CandidateSearch = () => {
  const [userLogins, setUserLogins] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<Candidate>();

 

  // this splices the first string in userLogins
  const showNextCandidate = () => {
    const newLoginArray = userLogins;
    newLoginArray.splice(0, 1);

    // // the commented code gets another 30 logins if there are none left
    // if(newLoginArray.length > 0){
      setUserLogins(newLoginArray);
    // }else{
    //   (async () => {
    //     setUserLogins((await searchGithub()).map((user: Candidate) => {return user.login}));
    //   })()
    // }
    
    // updates currentUser
    (async () => {
      setCurrentUser(await searchGithubUser(userLogins[0]));
    })()
    
  }

  // init userLogins with 30 github logins
  useEffect(() => {(async () => {
    setUserLogins((await searchGithub()).map((user: Candidate) => user.login));
  })()}, []);
  
  
  // updates currentUser
  useEffect(() => {
    (async () => {
      setCurrentUser(await searchGithubUser(userLogins[0]));
    })()
  }, [userLogins])


  // checks if current user has an avatar, and if not then go to the next login
  useEffect(() => {
    if(typeof currentUser?.avatar_url !== "string" && userLogins.length > 0){
      showNextCandidate()
      console.log("faulty login, looking for another user...");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])
  
  
  // styles for react components
  const styles: {[key: string]: React.CSSProperties} = {
    mainDiv:{
      width: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    btnDiv:{
      width: "100%",
      maxWidth: "350px",
      marginTop: "20px",
      display: "flex",
      justifyContent: "space-between",
    },
    button:{
      borderRadius: "50%",
      padding: "0px",
      width: "50px",
      height: "50px",
      fontSize: "25px",
    },
    minusBtn:{
      background: "rgb(255, 0, 0)",
    },
    plusBtn:{
      background: "rgb(0, 255, 0)",
    },
    loadingP:{
      fontSize: "25px",
    },
  }
  
  

  return (
    <>
      <h1>CandidateSearch</h1>
      {/* checks to see if there is any more logins */}
      {userLogins.length !== 0 ?
        /* shows "loading..." until currentUser has something, then loads a User Card */
        (<div style={styles.mainDiv}>{currentUser?.avatar_url
          ?
          <>
            <UserCard candidate={currentUser}/>
            <div style={styles.btnDiv}>
              <button 
                style={{...styles.button, ...styles.minusBtn}} 
                onClick={() => {
                  showNextCandidate()
                }}>
                  -
              </button>

              <button 
                style={{...styles.button, ...styles.plusBtn}} 
                onClick={() => {
                    // check to see if currentUser exists in candidateContext, and if so then don't add it to it
                    if(!localAPI.getLocal().some((item: Candidate) => {return currentUser.login === item.login})){
                      localAPI.addToLocal(currentUser);
                    }
                    showNextCandidate();
                  }}>
                  +
              </button>
            </div>
          </>
          : 
          (<p style={styles.loadingP}>loading...</p>)
        }</div>) 
        : 
        (<h2>No more users</h2>)
      }
    </>
  );
};

export default CandidateSearch;
