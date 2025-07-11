import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
 

import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Cabecera } from './components/cabecera/cabecera';
import { ListarCategoria } from './components/categoria/listar-categoria/listar-categoria';
import { EditarCategoria } from './components/categoria/editar-categoria/editar-categoria';
import { ListarCliente } from './components/cliente/listar-cliente/listar-cliente';
import { EditarCliente } from './components/cliente/editar-cliente/editar-cliente';
import { ListarDetallepedido } from './components/detallepedido/listar-detallepedido/listar-detallepedido';
import { EditarDetallepedido } from './components/detallepedido/editar-detallepedido/editar-detallepedido';
import { ListarMetodopago } from './components/metodopago/listar-metodopago/listar-metodopago';
import { EditarMetodopago } from './components/metodopago/editar-metodopago/editar-metodopago';
import { ListarOfertatipoproducto } from './components/ofertatipoproducto/listar-ofertatipoproducto/listar-ofertatipoproducto';
import { EditarOfertatipoproducto } from './components/ofertatipoproducto/editar-ofertatipoproducto/editar-ofertatipoproducto';
import { ListarPedido } from './components/pedido/listar-pedido/listar-pedido';
import { EditarPedido } from './components/pedido/editar-pedido/editar-pedido';
import { ListarProducto } from './components/producto/listar-producto/listar-producto';
import { EditarProducto } from './components/producto/editar-producto/editar-producto';
import { ListarTipooferta } from './components/tipooferta/listar-tipooferta/listar-tipooferta';
import { ListarTipopago } from './components/tipopago/listar-tipopago/listar-tipopago';
import { EditarTipopago } from './components/tipopago/editar-tipopago/editar-tipopago';

import { ConfirmacionEliminar } from './components/confirmaciones/confirmacion-eliminar/confirmacion-eliminar';
import { MaterialModule } from './modules/material/material-module';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { EditarTipooferta } from './components/tipooferta/editar-tipooferta/editar-tipooferta';
import { ListarImagenclientes } from './components/imagencliente/listar-imagenclientes/listar-imagenclientes';
import { EditarImagenCliente } from './components/imagencliente/editar-imagenclientes/editar-imagenclientes';
import { ListarImagenProductoComponent } from './components/imagenproducto/listar-imagenproducto/listar-imagenproducto';
import { EditarImagenProductoComponent } from './components/imagenproducto/editar-imagenproducto/editar-imagenproducto';
import { LoginComponent } from './components/login-component/login-component';
 
import { Home } from './components/home/home';
import { AccessDenied } from './components/access-denied/access-denied';
import { UserService } from './services/user-service';
import { UserHome } from './components/user-home/user-home';
import { ProductoUsuario } from './components/producto-usuario/producto-usuario';
import { OrderForm } from './components/order-form/order-form';
 
import { Review } from './components/review/review';
import { ThankYouComponent  } from './components/thank-you/thank-you';
import { ProductoService } from './services/producto-service';
import { MetodopagoService } from './services/metodopago-service';
import { PedidoService } from './services/pedido-service';
import { OrderDataService } from './services/OrderDataService ';
import { PaymentSelect } from './components/payment-select/payment-select';
 import { autorizacionInterceptor } from './interceptors/autorizacion-interceptor';

 


 

@NgModule({
  declarations: [

    AccessDenied,
    LoginComponent,
    EditarImagenProductoComponent,
    ListarImagenProductoComponent,
    EditarImagenCliente,
    EditarTipooferta,
    App,
    ConfirmacionEliminar,
    Cabecera,
    ListarCategoria,
    EditarCategoria,
    ListarCliente,
    EditarCliente,
    ListarDetallepedido,
    EditarDetallepedido,
    ListarMetodopago,
    EditarMetodopago,
    ListarOfertatipoproducto,
    EditarOfertatipoproducto,
    ListarPedido,
    EditarPedido,
    ListarProducto,
    EditarProducto,
    ListarTipooferta,
    ListarTipopago,
    EditarTipopago,

    ListarImagenclientes,
    LoginComponent,
    Home,
    AccessDenied,
    UserHome,
    ProductoUsuario,
    OrderForm,
    
    Review,




  ],
  imports: [
    ThankYouComponent,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,

    MatSnackBarModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,

    HttpClientModule,
  ],
  providers: [
    UserService,
     ProductoService,
    MetodopagoService,
    PedidoService,
    OrderDataService,
 provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideNativeDateAdapter(),
    provideHttpClient(
      withInterceptors([
        autorizacionInterceptor
      ])
    )   
  ],
  bootstrap: [App],
})
export class AppModule {}
