// Commands Definition
export const HELLO = {
    name: "hello",
    description: "Returns a welcome message",
}

export const SIGNUP = {
    name: "signup",
    description: "Create an account to manage todos",
    options: [
        {   name: "user",
            type: 3,
            description: "Please enter your name",
            required: true
        }
    ]
}