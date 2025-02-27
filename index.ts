import { registerRootComponent } from 'expo';

import App from './App';
import registro from './Ventanas/registro';
import Login from './Ventanas/Login';
import Nosotros from './Ventanas/Nosotros';
import Catalogo from './Producto/Catalogo';
import Detalle from './Producto/Detalle';




// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Detalle);
