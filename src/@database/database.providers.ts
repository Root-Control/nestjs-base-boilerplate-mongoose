import { createConnection, set, Connection, connections, ConnectionOptions  } from 'mongoose';
import { SERVER_CONFIG, DB_CONNECTION_TOKEN, DATABASES } from '../server.constants';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

const opts: ConnectionOptions = {
    dbName: null,
    useNewUrlParser: true,
    keepAlive: true,
    socketTimeoutMS: 30000,
    poolSize: 100,
    useUnifiedTopology: true
};


export const databaseProviders = [{
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => {
        try {
            set('useCreateIndex', true);
            set('useFindAndModify', true);
            for (var i = 0; i < DATABASES.length; i++) {
                console.log('-------------- CREATE CONNECTION BEGIN-----------------');
                const connection = await createConnection(`mongodb+srv://hiropalacios:tBKQOguHhYUkGxhY@hirotesting-6ribk.mongodb.net/${DATABASES[i]}?retryWrites=true&w=majority`, opts);
                console.log('CONNECTED');
            }
        } catch (ex) {
            console.log(ex);
        }
    }
}];