import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { NoteDto } from '../dto/note.dto';
import { Note } from '../entities/note.entity';
import { INoteQueryParams } from 'src/interfaces/note.interfaces';

@Injectable()
export class NoteRepository {
  constructor(@InjectModel(Note.name) private readonly noteModel: Model<Note>) {}

  async findAll(id: string): Promise<Note[]> {
    return await this.noteModel.find({isActive: true, author: id}).sort({ createdAt: -1 }).exec();
  }
  async findAllWithFilters(filters: INoteQueryParams, id: string): Promise<Note[]> {
    let query = this.noteModel.find({author: id});

    if (filters.search) {
      query = query.find({ title: { $regex: new RegExp(filters.search, 'i') } });
    }

    if (filters.filterBy) {
      const tags = filters.filterBy.split(',');
      query = query.find({ tags: { $all: tags } });
    }

    if (filters.archived === 'ARCHIVED') {
      query = query.find({ isActive: false });
    } else {
      query = query.find({ isActive: true });

    }

    if (filters.sortBy) {
      const [field, order] = filters.sortBy.split('-');
      const sortOrder = order === 'asc' ? 1 : -1;
      query = query.sort({ [field]: sortOrder });
    } else {
      query.sort({ createdAt: -1 })
    }

    const result = await query.exec();

    return result;
  }

  async findById(id: string): Promise<Note> {
    return this.noteModel.findById(id).exec();
  }

  async create(noteDto: NoteDto, id: string): Promise<Note> {
    const createdNote = new this.noteModel({...noteDto, author: id});
    return await createdNote.save();
  }

  async update(id: string, noteDto: Partial<NoteDto>): Promise<Note> {
    return this.noteModel.findByIdAndUpdate(id, noteDto, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.noteModel.findByIdAndDelete(id).exec();
  }

  async findTags(id: string): Promise<Array<string>> {
    return await this.noteModel.find({author: id}).distinct('tags').exec()
  }
}