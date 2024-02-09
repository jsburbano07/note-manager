import { Controller, Get, Post, Put, Delete, Body, ValidationPipe, Param, Query, Req } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteDto } from './dto/note.dto';
import { Note } from './entities/note.entity';
import { INoteQueryParams } from 'src/interfaces/note.interfaces';
import { CustomRequest } from 'src/interfaces/common.interface';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('')
  async getAllNotes(@Query() query: INoteQueryParams, @Req() request: CustomRequest): Promise<Note[]> {
      const id = request.userId
      if(Object.keys(query).length){
        return await this.notesService.getAllNotesWithQuery(query, id);
      }
      return await this.notesService.getAllNotes(id);
  }

  @Get('tags')
  async getAllTags( @Req() request: CustomRequest): Promise<Array<string>> {
    const id = request.userId
    return await this.notesService.getAllTags(id)
  }
  
  @Get(':id')
  getNoteById(@Param('id') id: string): Promise<Note> {
    return this.notesService.getNoteById(id);
  }
  
  @Post()
  async createNote(@Body(new ValidationPipe()) noteDto: NoteDto, @Req() request: CustomRequest): Promise<Note> {
    const id = request.userId
    return await this.notesService.createNote(noteDto, id);
  }
  
  @Put(':id')
  updateNote(@Param('id') id: string, @Body(new ValidationPipe()) noteDto: Partial<NoteDto>): Promise<Note> {
    return this.notesService.updateNote(id, noteDto);
  }
  
  @Delete(':id')
  deleteNote(@Param('id') id: string): Promise<void> {
    return this.notesService.deleteNote(id);
  }


}
