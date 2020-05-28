import { Document } from 'mongoose';

/**
 *  Declaring the Interface Article
 */
/*export interface IArticle extends Document {
	_id: string;
    created: Date;
    title: string;
    content: string;
}
*/

import { ApiProperty } from '@nestjs/swagger';

export class IArticle extends Document {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  creator: string;
}