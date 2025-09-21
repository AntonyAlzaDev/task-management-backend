import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(userId: string, taskData: Partial<Task>): Promise<Task> {
    const task = this.tasksRepository.create({
      ...taskData,
      userId,
    });
    return this.tasksRepository.save(task);
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  // Ejemplo de uso de función SQL
  async getTaskStatistics(userId: string) {
    return this.tasksRepository.query(
      'SELECT * FROM get_user_task_statistics($1)',
      [userId]
    );
  }

  // Ejemplo de uso de vista
  async getTasksWithDetails(userId: string) {
    return this.tasksRepository.query(
      'SELECT * FROM vw_tasks_with_user_details WHERE user_id = $1',
      [userId]
    );
  }

  // Ejemplo de procedimiento almacenado
  async completeTask(taskId: string) {
    await this.tasksRepository.query(
      'CALL sp_complete_task($1)',
      [taskId]
    );
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id, userId },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: string, userId: string, taskData: Partial<Task>): Promise<Task> {
    const task = await this.findOne(id, userId);
    Object.assign(task, taskData);
    return this.tasksRepository.save(task);
  }

  async remove(id: string, userId: string): Promise<void> {
    const task = await this.findOne(id, userId);
    await this.tasksRepository.remove(task);
  }


}
