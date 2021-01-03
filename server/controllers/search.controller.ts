import { boundClass } from 'autobind-decorator';
import { UsersResponse } from '../../types/models';
import { User } from '../models';


@boundClass
export class SearchController {
  constructor(private user: typeof User) {}

  async searchUser({searchTerm}): Promise<UsersResponse> {
    const users = await this.user.find({
      name: {
        $regex: searchTerm, 
        $options: 'i'
      }
    });
    
    if(!users) {
      throw new Error('not found');
    }

    return {
      users,
      message: 'found in successfully',
      error: false,
      status: 200
    }
  } catch() {
    return {
      users: [],
      message: 'Not found',
      error: false,
      status: 404
    }
  }
}

export const searchController = new SearchController(User);
