import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
    body('title')
        .not()
        .isEmpty()
        .withMessage('The task title is required')
        .trim()
        .isString()
        .withMessage('Title needs to be in text format'),
    body('date')
        .not()
        .isEmpty()
        .withMessage('The task date is required')
        .isString()
        .withMessage('The date needs to be in a valid format'),
    body('description').trim().isString().withMessage('Description needs to be in text format'),
    body('priority')
        .trim()
        .isIn([Priority.high, Priority.normal, Priority.low])
        .withMessage('Priority can only be normal, high or low'),
    body('status')
        .trim()
        .isIn([Status.todo, Status.inProgress, Status.completed])
        .withMessage('Status can only be todo, inProgress or completed'),
];

export const updateValidator = [
    body('id')
        .not()
        .isEmpty()
        .withMessage('The task id is required')
        .trim()
        .isString()
        .withMessage('ID needs to be a valid uuid format'),
    body('status')
        .trim()
        .isIn([Status.todo, Status.inProgress, Status.completed])
        .withMessage('Status can only be todo, inProgress or completed'),
];
