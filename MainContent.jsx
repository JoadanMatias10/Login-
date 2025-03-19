import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/Nav';
import NavBarCliente from './components/NavBar/NavCliente';
import NavBarAdmin from './components/NavBar/NavAdmin';
import IoT from './screens/IoT/IoT';
import Nosotros from './screens/Nosotros/Nosotros';
import Login from './screens/Login/Login';
import Cloudi from './screens/Cloudinary/Cloudinary';
import AllProducts from './screens/Productos/All/AllProducts';
import Alimentos from './screens/Productos/Categorias/ProdcutosCate';
import TodosLosProductos from './screens/Productos/Todos/TodosLosProductos';
import PecesView from './screens/Peces/PecesView';
import DetalleProducto from './screens/Productos/Detalle/DetalleProducto';
import RegistroForm from './screens/Registro/Registro';
import Home from './screens/Home/home';
import SensorData from './screens/SensorData/SensorData';
import Soporte from './screens/Soporte/Soporte';
import Resultado from './screens/Resultado/Resultados';

import Dispositivos from './screens/Dispositivos/DispositivosScreen';
import Pecera from './screens/Esp32Dashboard/Esp32Dashboard';
import Led from './screens/Esp32Dashboard/ledcontrol';

import AdminP from './screens/Productos/AdminProduc/ProductoAdmin';
import AdminPEditar from './screens/Productos/AdminProduc/AdminEdicionP/EditProduct';
import AdminPElim from './screens/Productos/AdminProduc/ProductoEliminar';
import AdminPEditAll from './screens/Productos/AdminProduc/AdminProductosAll/ProductosEdit';
import AdminPElimAll from './screens/Productos/AdminProduc/AdminProductosAll/ProductosElim';
import AdminPAgg from './screens/Productos/AdminProduc/AdminEdicionP/AggProducto';
import AdminUsuarios from './screens/UsuariosAdmin/UsuariosAll';
import UsuariosR from './screens/UsuariosAdmin/VerUsuarios';
import ReasignarRol from './screens/UsuariosAdmin/ReasignarRol';

import { useAuth } from './components/contexts/AuthContext';

const MainContent = () => {
  const { role } = useAuth();  // Obtener el rol desde el contexto de autenticación

  return (
    <div className="App">
      {/* Renderizamos la barra de navegación según el rol del usuario */}
      {role === 'publico' && <NavBar />}
      {role === 'Cliente' && <NavBarCliente />}
      {role === 'Administrador' && <NavBarAdmin />}

      <div className="container mt-4">
        {/* Aquí se mostrarán las páginas según la ruta */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/iot" element={<IoT />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<RegistroForm />} />
          <Route path="/Subir" element={<Cloudi />} />
          <Route path="/Productos/All" element={<AllProducts />} />
          <Route path="/productos" element={<TodosLosProductos />} />
          <Route path="/peces" element={<PecesView />} />
          <Route path="/producto/:id" element={<DetalleProducto />} /> {/* Ruta dinámica */}
          <Route path="/productos/:categoria" element={<Alimentos />} />
          <Route path="/sensores" element={<SensorData />} />
          <Route path="/soporte" element={<Soporte />} />
          <Route path="/resultados" element={<Resultado />} />

          <Route path="/dispositivos" element={<Dispositivos />} />
          <Route path="/Administrar/pecera" element={<Pecera />} />
          <Route path="/Administrar/led" element={<Led />} />

          <Route path="/AdmProduct" element={<AdminP />} />
          <Route path="/AdmProductElim" element={<AdminPElim />} />
          <Route path="/productoAdmin/AdminEdit/:id" element={<AdminPEditar />} />
          <Route path="/productosAdm/:categoria" element={<AdminPEditAll />} />
          <Route path="/productosAdmElim/:categoria" element={<AdminPElimAll />} />
          <Route path="/productosAdmAgg" element={<AdminPAgg />} />
          <Route path="/useradm" element={<AdminUsuarios />} />
          <Route path="/userol" element={<UsuariosR />} />
          <Route path="/reasignar-rol/:id" element={<ReasignarRol />} />

        </Routes>
      </div>
    </div>
  );
};

export default MainContent;