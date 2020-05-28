import { Connection, connections } from 'mongoose';
import { ArticleSchema } from './schemas/article.schema';
import { ARTICLE_MODEL_TOKEN, DB_CONNECTION_TOKEN, SERVER_CONFIG, DATABASES } from '../../server.constants';

export const articleProviders = [{
    provide: ARTICLE_MODEL_TOKEN,
    useFactory: async () => {
    	for (var i = 0; i < DATABASES.length; i++) {
			const dbConnection: Connection = connections.find(connection => connection.name === DATABASES[i]);
    		await dbConnection.model(ARTICLE_MODEL_TOKEN, ArticleSchema)
    	}
    },
    inject: [DB_CONNECTION_TOKEN]
}];