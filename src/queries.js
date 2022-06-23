const Pool = require('pg').Pool
const db = new Pool({
    host: 'localhost',
    database: 'todolist',
    user: 'postgres',
    password: 'senai',
    port: 5432
})

const getTasks = (request, response) => {
 db.query('SELECT * FROM tasks ORDER BY data_tarefa ASC',
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    
    })  
 
}

const getTaskById = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('SELECT * FROM tasks WHERE id = $1', [id],
       (error, results) => {
           if (error) {
               throw error
           }
           response.status(200).json(results.rows)
       
       })  
}


const createTask = (request, response) => {
    const {task, data_tarefa} = request.body

    db.query('INSERT INTO tasks (task, data_tarefa) VALUES($1, $2)', [task, data_tarefa],
       (error, results) => {
           if (error) {
               throw error
           }
           response.status(201).send('Tarefa adicionada')
       
       })  
}

const updateTask  = (request, response) => {
    const id = parseInt(request.params.id)
    const {task, data_tarefa} = request.body

    db.query('UPDATE tasks  SET task = $1, data_tarefa = $2 WHERE id = $3',
        [task, data_tarefa, id], 
       (error, results) => {
           if (error) {
               throw error
           }
           response.status(201).send('Tarefa atualizada')
       
       })  
}

const deleteTask  = (request, response) => {
    const id = parseInt(request.params.id)
    
    db.query('DELETE FROM tasks WHERE id = $1', [id],
        (error, results) => {
           if (error) {
               throw error
           }
           response.status(201).send('Tarefa deletada')
       
       })  
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}

