import { Response, Request } from 'express';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AppDataSource } from '../..';
import { Task } from './tasks.entity';
import { UpdateResult } from 'typeorm';
import { validationResult } from 'express-validator';

class TasksController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        let allTasks: Task[];

        try {
            allTasks = await AppDataSource.getRepository(Task).find({ order: { date: 'ASC' } });
            allTasks = instanceToPlain(allTasks) as Task[];
            return res.json(allTasks).status(200);
        } catch (error) {
            console.log(error);
            return res.json({ error: 'Internal Server Error' }).status(500);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        // Checking if there is errors coming from the express-validator middleware
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Creating a new instance of Task to save in the DB
        const newTask = new Task();

        newTask.title = req.body.title;
        newTask.date = req.body.date;
        newTask.description = req.body.description;
        newTask.priority = req.body.priority;
        newTask.status = req.body.status;

        let createdTask: Task;

        try {
            // Saving the instance of Task in the DB
            createdTask = await AppDataSource.getRepository(Task).save(newTask);
            // Transforming the instance of Task into an object to be sent to the user
            createdTask = instanceToPlain(createdTask) as Task;
            return res.json(createdTask).status(201);
        } catch (error) {
            console.log(error);
            return res.json({ error: 'Internal Server Error' }).status(500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        // Checking if there is errors coming from the express-validator middleware
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Try to find if the tasks exists
        let task: Task | null;
        try {
            task = await AppDataSource.getRepository(Task).findOne({ where: { id: req.body.id } });
        } catch (error) {
            console.log(error);
            return res.json({ error: 'Internal Server Error' }).status(500);
        }

        // Return 400 if task is null
        if (!task) {
            return res.status(404).json({ error: 'The task with given ID does not exist' });
        }

        // Declare a variable for updatedTask
        let updatedTask: UpdateResult;

        // Update the task
        try {
            updatedTask = await AppDataSource.getRepository(Task).update(
                req.body.id,
                plainToInstance(Task, { status: req.body.status }),
            );

            // Convert the updatedTask instance to an object
            updatedTask = instanceToPlain(updatedTask) as UpdateResult;

            return res.json(updatedTask).status(200);
        } catch (error) {
            console.log(error);
            return res.json({ error: 'Internal Server Error' }).status(500);
        }
    }
}

export const tasksController = new TasksController();
