import Errand from "./Errand";

type User = {
    id?: string,
    name: string,
    email: string,
    password: string,
    errands: Errand []
}

export default User;