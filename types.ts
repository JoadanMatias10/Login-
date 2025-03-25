// types.ts
export type RootStackParamList = {
    ConfigurarGeneral: { dispositivoId: string; usuarioId: string };
    AdministrarPecera: { dispositivoId: string; usuarioId: string };
    AdministrarLed: { dispositivoId: string; usuarioId: string };
    Home: undefined;
    IoT: undefined;
    Nosotros: undefined;
    Login: undefined;
    Registro: undefined;
    Subir: undefined;
    ProductosAll: undefined;
    Productos: undefined;
    Peces: undefined;
    DetalleProducto: undefined;
    ProductosCategoria: { categoria: string };
    Soporte: undefined;
    Dispositivos: undefined;
    Pecera: undefined;
    // Agrega más rutas aquí según sea necesario
  };