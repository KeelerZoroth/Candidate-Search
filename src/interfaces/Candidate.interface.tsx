// TODO: Create an interface for the Candidate objects returned by the API
export default interface Candidate {
    login: string;
    name: string;
    avatar_url: string;
    email: string;
    location: string;
    company: string;
    bio: string;
}
