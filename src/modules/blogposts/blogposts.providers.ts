import { Connection, connections } from 'mongoose';
import { BlogPostSchema } from './schemas/blogpost.schema';
import { ARTICLE_MODEL_TOKEN, DB_CONNECTION_TOKEN, SERVER_CONFIG, DATABASES } from '../../server.constants';

export const blogpostProviders = [{
    provide: 'BlogPost',
    useFactory: async () => {
    	for (var i = 0; i < DATABASES.length; i++) {
			const dbConnection: Connection = connections.find(connection => connection.name === DATABASES[i]);
    		await dbConnection.model('BlogPost', BlogPostSchema)
    	}
    },
    inject: [DB_CONNECTION_TOKEN]
}];