// Commands Definition
export const HELLO = {
    name: "hello",
    description: "Returns a welcome message",
}

export const SIGNUP = {
    name: "signup",
    description: "Create an account to manage todos",
}

export const ADD_TODO = {
    name: "add-todo",
    description: "Creates a todo",
    options: [
        {
            name: "title",
            description: "Title of todo",
            type: 3,
            required: true
        },
        {
            name: "priority",
            description: "Priority of todo",
            type: 3,
            required: true,
            choices: [
                { name: "Low", value: "LOW" },
                { name: "Medium", value: "MEDIUM" },
                { name: "High", value: "HIGH" }
            ]
        },
        {
            name: "description",
            description: "Details of todo",
            type: 3,
            required: false,
        }
    ]
}

export const EDIT_TODO = {
    name: "edit-todo",
    description: "Edits a todo",
    options: [
        {
            name: "id",
            description: "Id of todo",
            required: true,
            type: 4,
        },
        {
            name: "title",
            description: "Title of todo",
            type: 3,
            required: false,
        },
        {
            name: "description",
            description: "Details of todo",
            type: 3,
            required: false,
        },
        {
            name: "priority",
            description: "Priority of todo",
            type: 3,
            required: false,
            choices: [
                { name: "Low", value: "LOW" },
                { name: "Medium", value: "MEDIUM" },
                { name: "High", value: "HIGH" }
            ]
        },
        {
            name: "status",
            description: "Status of todo",
            type: 3,
            required: false,
            choices: [
                { name: "Done", value: "DONE" },
                { name: "In Progress", value: "IN_PROGRESS" },
                { name: "Not Started", value: "NOT_STARTED" }
            ]
        },
        {
            name: "progress",
            description: "Progress of todo",
            type: 4,
            required: false,
            max_value: 100,
            min_value: 0,
        },
    ]
}

export const DELETE_TODO = {
    name: "delete-todo",
    description: "Deletes a todo",
    options: [
        {
            name: "id",
            description: "Id of todo",
            required: true,
            type: 4,
        }
    ]
}

export const TODO = {
    name: "todos",
    description: "Returns a table of todos",
    options: [
        {
            name: "priority",
            description: "Priority of todo",
            type: 3,
            required: false,
            choices: [
                { name: "Low", value: "LOW" },
                { name: "Medium", value: "MEDIUM" },
                { name: "High", value: "HIGH" }
            ]
        },
        {
            name: "status",
            description: "Status of todo",
            type: 3,
            required: false,
            choices: [
                { name: "Done", value: "DONE" },
                { name: "In Progress", value: "IN_PROGRESS" },
                { name: "Not Started", value: "NOT_STARTED" }
            ]
        },
        {
            name: "progress",
            description: "Progress of todo",
            type: 4,
            required: false,
            max_value: 100,
            min_value: 0,
        },
        {
            name: "sort",
            description: "Sort todos in a particular order",
            type:3,
            required: false,
            choices: [
                { name: "Asc", value: "ASC" },
                { name: "Desc", value: "DESC" },
            ]
        },
    ]
}