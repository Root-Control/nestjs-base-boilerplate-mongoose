import { Connection, connections } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { Roles } from './interfaces/user.interface';
import { USER_MODEL_TOKEN, DB_CONNECTION_TOKEN, SERVER_CONFIG, DATABASES } from '../../server.constants';

export const userProviders = [{
    provide: USER_MODEL_TOKEN,
    useFactory: async () => {
    	for (var i = 0; i < DATABASES.length; i++) {
    		console.log('---------------------------------------------------------------------------------');
			const dbConnection: Connection = connections.find(connection => connection.name === DATABASES[i]);
    		await dbConnection.model(USER_MODEL_TOKEN, UserSchema);
    		await createDbAdmins(dbConnection, DATABASES[i]);
    		console.log(`Admin for Database ->${DATABASES[i]} has been created`);
    	}
    },
    inject: [DB_CONNECTION_TOKEN]
}];

async function createDbAdmins(connection, db) {
	return new Promise(async (resolve: Function, reject: Function) => {
		try {
			const User = connection.model(USER_MODEL_TOKEN);
			const admins = await User.countDocuments({ role: Roles.ADMIN });
			console.log(admins);
			if (!admins) {
				const user = new User({
					email: `admin@${db}.com`,
					firstName: 'Admin',
					lastName: db,
					password: 123456,
					provider: 'system',
					role: Roles.ADMIN,
				});
				await user.save();
		
			}
		} catch (ex) {
			console.log('-------------------------------');
			console.log(ex);
		}
		resolve();

	});
}