import Errand from "./Errand";

type User = {
    name: string,
    email: string,
    password: string,
    errands: Errand []
}

export default User;