import { Injectable } from '@nestjs/common';
import { NoteDto } from './dto/note.dto';
import { Note } from './entities/note.entity';
import { NoteRepository } from './repositories/note.repository';
import { INoteQueryParams } from 'src/interfaces/note.interfaces';

@Injectable()
export class NotesService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async getAllNotesWithQuery(query: INoteQueryParams, id: string): Promise<Note[]> {
    return await this.noteRepository.findAllWithFilters(query, id)
  }

  async getAllNotes(id: string): Promise<Note[]> {
    return await this.noteRepository.findAll(id);
  }

  async getNoteById(id: string): Promise<Note> {
    return this.noteRepository.findById(id);
  }

  async createNote(noteDto: NoteDto, id: string): Promise<Note> {
    return await this.noteRepository.create(noteDto, id);
  }

  async updateNote(id: string, noteDto: Partial<NoteDto>): Promise<Note> {
    return this.noteRepository.update(id, noteDto);
  }

  async deleteNote(id: string): Promise<void> {
    return this.noteRepository.delete(id);
  }

  async getAllTags(id: string): Promise<Array<string>> {
    return await this.noteRepository.findTags(id)
  }
}
