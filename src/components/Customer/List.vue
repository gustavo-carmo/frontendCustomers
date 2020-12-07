<script>
import api from '@/services/api';
import formatValue from '@/utils/formatValue';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Hello World',
      search: {
        name: '',
      },
      fullscreenLoading: false,
      customers: [],
    };
  },
  mounted() {
    this.searchCustomers();
  },
  methods: {
    searchCustomers() {
      this.customers = [];
      this.fullscreenLoading = true;

      api.get(`customers${this.search.name ? `?name=${this.search.name}` : ''}`).then((response) => {
        const dataNonThreated = response.data;

        dataNonThreated.forEach((customer) => {
          this.customers.push({
            ...customer,
            defaulting_value: formatValue(customer.defaulting_value),
            updated_at: new Date(customer.updated_at).toLocaleDateString('pt-BR'),
            defaulting_date_start: new Date(customer.defaulting_date_start).toLocaleDateString('pt-BR'),
          });
        });
      }).finally(() => {
        this.fullscreenLoading = false;
        this.search.name = '';
      });
    },
  },
};
</script>

<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="2" class="grid-content"></el-col>

      <el-col :span="20">
        <h3>Clientes Inadimplentes > Listar</h3>
      </el-col>

      <el-col :span="2" class="grid-content"></el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="2" class="grid-content"></el-col>
      <el-col :span="20">
        <el-card class="box-card">
          <el-row :gutter="20">

            <span :span="24">Nome: </span>
            <el-col :span="24">
              <el-input placeholder="Nome" v-model="search.name"></el-input>
            </el-col>
          </el-row>

          <el-row :gutter="20">

            <el-col :span="3">
              <el-button
                type="primary"
                @click="searchCustomers"
                icon="el-icon-search"
                v-loading.fullscreen.lock="fullscreenLoading"
              >Pesquisar</el-button>
            </el-col>

            <el-col :span="21" class="grid-content"></el-col>

          </el-row>
        </el-card>
      </el-col>
      <el-col :span="2" class="grid-content"></el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="2" class="grid-content"></el-col>
      <el-col :span="20">
        <el-card class="box-card">
          <el-table
            :data="customers"
            stripe
            style="width: 100%">
            <el-table-column
              sortable
              prop="name"
              label="Nome">
            </el-table-column>

            <el-table-column
              sortable
              prop="defaulting_value"
              label="Valor"
              width="200">
            </el-table-column>

            <el-table-column
              sortable
              prop="defaulting_date_start"
              label="Desde"
              width="200">
            </el-table-column>

            <el-table-column
              sortable
              prop="updated_at"
              label="Ultima Atualização"
              width="200">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="2" class="grid-content"></el-col>
    </el-row>
  </div>
</template>

<style>
 .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
