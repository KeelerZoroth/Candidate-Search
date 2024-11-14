import Candidate from "../interfaces/Candidate.interface"


const UserCard = ({candidate}: {candidate: Candidate}) => {

    // styles for react components
    const styles: {[key: string]: React.CSSProperties} = {
        mainDiv:{
            background: "linear-gradient(rgb(20, 20, 220) 25%, rgb(0, 0, 100))",
            borderRadius: "10px",
            overflow: "hidden",
            width: "100%",
            maxWidth: "350px",
            margin: "0px auto",
        },
        subDiv:{
            margin: "5px",
        },
        h2:{
            textAlign: "center",
        },
        img:{
            width: "100%",
        }
    }

    return(
        <div style={styles.mainDiv}>
            <img src={candidate.avatar_url} style={styles.img} alt="avatar of github user" />
            <h2 style={styles.h2}>{candidate.login}({candidate.name ? candidate.name : candidate.login})</h2>
            <div style={styles.subDiv}>
                <p><strong>Email:</strong> {candidate.email ? candidate.email : (<em>No Email</em>)}</p>
                <p><strong>Location:</strong> {candidate.location ? candidate.location : (<em>No Location</em>)}</p>
                <p><strong>Company:</strong> {candidate.company ? candidate.company : (<em>No Company</em>)}</p>
                <p><strong>Bio:</strong> {candidate.bio ? candidate.bio : (<em>No Bio</em>)}</p>
            </div>
        </div>
    )
}

export default UserCard