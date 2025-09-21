import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Request() req, @Body() createTaskDto: any) {
    return this.tasksService.create(req.user.id, createTaskDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user.id);
  }

  @Get('statistics')
  getStatistics(@Request() req) {
    return this.tasksService.getTaskStatistics(req.user.id);
  }

  @Get('details')
  getTasksWithDetails(@Request() req) {
    return this.tasksService.getTasksWithDetails(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.tasksService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body() updateTaskDto: any) {
    return this.tasksService.update(id, req.user.id, updateTaskDto);
  }

  @Post(':id/complete')
  complete(@Param('id') id: string) {
    return this.tasksService.completeTask(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.tasksService.remove(id, req.user.id);
  }
}
