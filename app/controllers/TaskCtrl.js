import Task from '../models/Task';

export default class TaskController {
  /**
   * Logic for creating a task
   */
  static create(req, res) {
    const body = req.body;

    console.log('Inside Create');

    Task.create({
      administrator: body.administrator,
      assignee: body.assignee,
      task: body.task,
      due: new Date(body.due),
      creator: req.user.id
    }, (err, task) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(201).send({ message: 'Task created successfully.' });
      }
    });
  }
}