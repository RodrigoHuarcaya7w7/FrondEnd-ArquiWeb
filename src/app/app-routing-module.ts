import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProducto } from './components/producto/listar-producto/listar-producto';
import { ListarCategoria } from './components/categoria/listar-categoria/listar-categoria';
import { EditarCategoria } from './components/categoria/editar-categoria/editar-categoria';
import { EditarProducto } from './components/producto/editar-producto/editar-producto';
 

import { ListarPedido } from './components/pedido/listar-pedido/listar-pedido';
import { ListarTipopago } from './components/tipopago/listar-tipopago/listar-tipopago';
import { ListarMetodopago } from './components/metodopago/listar-metodopago/listar-metodopago';
import { ListarDetallepedido } from './components/detallepedido/listar-detallepedido/listar-detallepedido';
import { ListarTipooferta } from './components/tipooferta/listar-tipooferta/listar-tipooferta';
import { EditarTipooferta } from './components/tipooferta/editar-tipooferta/editar-tipooferta';

import { ListarOfertatipoproducto } from './components/ofertatipoproducto/listar-ofertatipoproducto/listar-ofertatipoproducto';
 
import { EditarMetodopago } from './components/metodopago/editar-metodopago/editar-metodopago';
import { EditarOfertatipoproducto } from './components/ofertatipoproducto/editar-ofertatipoproducto/editar-ofertatipoproducto';
import { ListarImagenclientes } from './components/imagencliente/listar-imagenclientes/listar-imagenclientes';
import { EditarImagenCliente } from './components/imagencliente/editar-imagenclientes/editar-imagenclientes';
import { EditarTipopago } from './components/tipopago/editar-tipopago/editar-tipopago';
import { EditarPedido } from './components/pedido/editar-pedido/editar-pedido';
import { EditarDetallepedido } from './components/detallepedido/editar-detallepedido/editar-detallepedido';
import { ListarImagenProductoComponent } from './components/imagenproducto/listar-imagenproducto/listar-imagenproducto';
import { EditarImagenProductoComponent } from './components/imagenproducto/editar-imagenproducto/editar-imagenproducto';
import { LoginComponent } from './components/login-component/login-component';
import { Home } from './components/home/home';

import { AccessDenied } from './components/access-denied/access-denied';
 
import { OrderForm } from './components/order-form/order-form';
import { PaymentSelect } from './components/payment-select/payment-select';
import { Review } from './components/review/review';
import { ThankYouComponent } from './components/thank-you/thank-you';
import { ProductoUsuario } from './components/producto-usuario/producto-usuario';

 

 

const routes: Routes = [

   
  // Página inicial → login
  { path: '',           redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',      component: LoginComponent },

  // Panel Admin (solo vista Home)
  { path: 'admin-home', component: Home },

  // Panel User → lista de productos
  { path: 'user-home',  component: ProductoUsuario },

  // Flujo de compra ultra-simple bajo /shop
  { path: 'shop/products',          component: ProductoUsuario },
  // 1) Primero la ruta estática “payment”
  { path: 'shop/order/payment', component: PaymentSelect },

  // 2) Después la ruta dinámica “:id”
  { path: 'shop/order/:id',   component: OrderForm },
  { path: 'shop/order/review',      component: Review },
  { path: 'shop/order/thanks',      component: ThankYouComponent },

  // Cualquier otra ruta → login
 // { path: '**',         redirectTo: 'login' }

{ path: 'imagenCliente/listar', component: ListarImagenclientes },
{ path: 'imagenCliente/edit', component: EditarImagenCliente },
  { path: 'imagenCliente/edit/:id', component: EditarProducto },


  { path: 'ImagenProducto/listar', component: ListarImagenProductoComponent },
{ path: 'ImagenProducto/edit', component: EditarImagenProductoComponent },
  { path: 'ImagenProducto/edit/:id', component: EditarImagenProductoComponent },


  

{ path: 'producto/listar', component: ListarProducto },
{ path: 'producto/edit', component: EditarProducto },
  { path: 'producto/edit/:id', component: EditarProducto },

{ path: 'categoria/listar', component: ListarCategoria },
{ path: 'categoria/edit', component: EditarCategoria },
  { path: 'categoria/edit/:id', component: EditarCategoria },

  //{ path: 'user/listar', component: ListarUsers },

  { path: 'pedido/listar', component: ListarPedido },
      { path: 'pedido/edit', component: EditarPedido },
      { path: 'pedido/edit/:id', component: EditarPedido },
/////
 { path: 'pedidos/listar', component: ListarPedido },
{ path: 'pedidos/nuevo', component: EditarPedido },
{ path: 'pedidos/editar/:id', component: EditarPedido },
///
  { path: 'MetodoPago/listar', component: ListarMetodopago },
    { path: 'MetodoPago/edit', component: EditarMetodopago },
      { path: 'MetodoPago/edit/:id', component: EditarMetodopago },
  
   { path: 'DetallePedido/listar', component: ListarDetallepedido },
   { path: 'DetallePedido/edit', component: EditarDetallepedido  },
  { path: 'DetallePedido/edit/:id', component: EditarDetallepedido  },

 { path: 'TipoOferta/listar', component: ListarTipooferta },
    { path: 'TipoOferta/edit', component: EditarTipooferta  },
  { path: 'TipoOferta/edit/:id', component: EditarTipooferta  },
 
  { path: 'OfertaTipoProducto/listar', component: ListarOfertatipoproducto },
  { path: 'OfertaTipoProducto/edit', component: EditarOfertatipoproducto },    // Agregar
  { path: 'OfertaTipoProducto/edit/:id', component: EditarOfertatipoproducto }, 



 { path: 'TipoPago/listar', component: ListarTipopago },
    { path: 'TipoPago/edit', component: EditarTipopago  },
  { path: 'TipoPago/edit/:id', component: EditarTipopago  },
 

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
