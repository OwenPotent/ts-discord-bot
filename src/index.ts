// Getting and validating .env file
import EnvLoader from './classes/EnvLoader';
EnvLoader.load();

// Setting up moment-timezone
import moment from 'moment-timezone';
moment.locale('en');
moment.tz.setDefault('Asia/Kuala_Lumpur');

// Starting client
import client from './client';
client.login(client.config.token);
