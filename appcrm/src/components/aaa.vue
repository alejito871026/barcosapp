<div class="containter p-4">
          <b-button pill variant="outline-secondary" @click="modal=true, nuevo = true"><b-icon-plus></b-icon-plus> Nuevo item</b-button>
      </div>
      <ul> {{item}}</ul>
      <b-table
        id="table-transition-example" 
        name="table-transition-example"
        :tbody-transition-props="transProps"
        :fields="fields" 
        :items="productos"
        hover
        small
        class="text-center"
        >
        <template v-slot:cell(opciones)="codigo">
            <!-- `data.value` is the value after formatted by the Formatter -->
            <b-button variant="danger"  @click="borrar(codigo.item.codigo)" v-if="productos[codigo.index].active">Borrar</b-button>&nbsp
            <b-button variant="success" @click="editar(codigo.item, codigo.index), nuevo = false" v-if="productos[codigo.index].active">Editar</b-button>
        </template>
    </b-table>
    <b-modal v-model="modal" 
        @hidden="resetModal"
        >
        <template v-slot:modal-footer>
        <div class="w-100">
        <b-button
            v-if="nuevo"
            variant="primary"
            size="sm"
            class="btn-block"
            @click="handleOk"
        >
            Guardar
        </b-button>
        <b-button
            v-if="!nuevo"
            variant="info"
            size="sm"
            class="btn-block"
            @click="reguardar"
        >
            Guardar edicion
        </b-button>
        <b-button
            variant="danger"
            size="sm"
            class="btn-block"
            @click="modal=false, resetModal"
        > 
            Cancelar
        </b-button>
        </div>
        </template>
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
            :state="codigoState"
            label="Codigo"
            label-for="codigo-input"
            invalid-feedback="Debes escribir un codigo"
            >
                <b-form-input
                    id="codigo-input"
                    v-model="codigo"
                    :state="codigoState"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group
            :state="enfoqueState"
            label="Enfoque"
            label-for="enfoque-input"
            invalid-feedback="Debes elegir alguno"
            >
                <b-form-input
                    id="enfoque-input"
                    v-model="enfoque"
                    :state="enfoqueState"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group
            :state="tallaState"
            label="Talla"
            label-for="talla-input"
            invalid-feedback="Debes Elegir alguna"
            >
                <b-form-input
                    id="talla-input"
                    v-model="talla"
                    :state="tallaState"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group
            :state="materialesState"
            label="Materiales"
            label-for="materiales-input"
            invalid-feedback="debes escribir los materiales"
            >
                <b-form-input
                    id="materiales-input"
                    v-model="materiales"
                    :state="materialesState"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group
            :state="descripcionState"
            label="Fabricado en"
            label-for="descripcion-input"
            invalid-feedback="debes escribir su lugar de fabrica"
            >
                <b-form-input
                    id="descripcion-input"
                    v-model="descripcion"
                    :state="descripcionState"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group
            :state="categoriaState"
            label="Categoria"
            label-for="categoria-input"
            invalid-feedback="Elige una categoria"
            >
                <b-form-input
                    id="categoria-input"
                    v-model="categoria"
                    :state="categoriaState"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group
            :state="marcaState"
            label="Marca"
            label-for="marca-input"
            invalid-feedback="Elige una marca"
            >
                <b-form-input
                    id="marca-input"
                    v-model="marca"
                    :state="marcaState"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group
            :state="precioState"
            label="Precio"
            label-for="precio-input"
            invalid-feedback="Escribe el valor"
            >
                <b-form-input
                    id="precio-input"
                    v-model="precio"
                    :state="precioState"
                    required
                ></b-form-input>
            </b-form-group>
        </form>
    </b-modal> 
    <div class="row">
                    <div class="col-md-6">
                         <div class="form-group text-center">
                            <label>Familia</label>
                            <input type="text" class="form-control" required v-model="nuevoP.nit_empresaP">
                        </div>
                        <div class="form-group text-center">
                            <label>Modelo</label>
                            <input type="text" class="form-control" required  v-model="nuevoP.nombre_empresaP">
                        </div>
                        <div class="form-group text-center">
                            <label>Telefono</label>
                            <input type="text" class="form-control" required v-model="nuevoP.telefono_empresaP">
                        </div>
                        <div class="form-group text-center">
                            <label>Colores</label>
                            <input type="text" class="form-control" required v-model="nuevoP.whatsapp_empresaP">
                        </div>
                        <div class="form-group text-center">
                            <label for="exampleInputEmail1">Texturas</label>
                            <input type="email" class="form-control" required v-model="nuevoP.email_empresaP">
                        </div>
                    </div>
                    <div class="col-md-6">
                        
                        <div class="form-group text-center">
                            <label>Alto</label>
                            <input type="text" class="form-control" required v-model="nuevoP.direccion_empresaP">
                        </div>
                        <div class="form-group text-center">
                            <label>Ancho</label>
                            <input type="text" class="form-control" required v-model="nuevoP.direccion_empresaP">
                        </div>
                        <div class="form-group text-center">
                            <label>Profundo</label>
                            <input type="text" class="form-control" required v-model="nuevoP.direccion_empresaP">
                        </div>
                        <div class="form-group text-center">
                            <label>Descripcion</label>
                            <input type="text" class="form-control" required v-model="nuevoP.direccion_empresaP">
                        </div>
                        <div class="form-group text-center">
                            <label>Porcentaje de venta</label>
                            <input type="text" class="form-control" required v-model="nuevoP.direccion_empresaP">
                        </div>
                    </div>
                </div> 

    val : '',
            nuevo: true,
            descripcion:'',
            descripcionState:null,
            precio:'',
            marca:'',
            categoria:'',
            materiales:'',
            enfoque:'',
            talla:'',
            codigo:'',
            name: '',
            codigoState: null,
            tallaState: null,
            enfoqueState: null,
            materialesState: null,
            categoriaState: null,
            marcaState: null,
            precioState: null,
            modal:false,
            sortBy: 'talla',
            sortDesc: false,
            transProps: {
                name: 'flip-list'
            },
            uri:'',
            productos:[],
            Producto:false,
            item:[],
            fields: [
                // A virtual column that doesn't exist in items
                //'index'
                // A virtual column made up from two fields
                { key: 'codigo', sortable: true, },
                { key: 'enfoque', sortable: true, },
                { key: 'descripcion', sortable: true, },
                { key: 'talla', sortable: true, variant:'info' },
                { key: 'materiales', sortable:false },
                { key: 'categoria', sortable: true, },
                { key: 'marca', sortable: true, },
                { key: 'precio', sortable: true, variant:'danger' },
                { key: 'opciones', variant:'info'},
            ],