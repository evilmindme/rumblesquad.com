import FirebaseContext from './context';
import {firebase, database} from './firebase';

const dbGeoJson = database.ref('geojson/');
 
export default firebase;
 
export { FirebaseContext, database, dbGeoJson};