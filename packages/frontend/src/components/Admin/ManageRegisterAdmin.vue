<!-- eslint-disable max-len -->
<template>
  <div class="flex">
    <div
      class=" rounded ml-auto mr-4 my-2 bg-blue-800 text-white font-sans font-semibold py-2 px-4"
      @click="modalShowAddRegisterAdmin = true"
    >
      Thêm đăng kí
    </div>
  </div>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg m-4">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-300">
        <tr>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Tên đề tài
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Sinh viên đăng ký
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="register in listRegister"
          :key="`topic-${register._id}`"
          class="bg-slate-300 hover:bg-gray-50 "
        >
          <th
            :key="`topic-${register._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ register.topicId ? register.topicId.title : '' }}
          </th>
          <td class="py-4 px-6">
            {{ register.studentId ? register.studentId.name : '' }}
          </td>
          <td class="py-4 px-6 text-right">
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleRemoveRegister(register._id)"
            >Xóa</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <AddRegisterAdmin
    v-model="modalShowAddRegisterAdmin"
    @save-register="handleAddRegisterAdmin"
  />
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import RegisterApi from '../../utils/api/register';
import AddRegisterAdmin from '../Modal/AddRegisterAdmin.vue';

export default {
  name: 'ManageRegisterAdmin',
  components: {
    AddRegisterAdmin,
  },
  props: {
  },
  emits: ['remove-register', 'add-register'],
  data () {
    return {
      modalShowAddRegisterAdmin: false,
      listRegister: [],
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: ({ auth: { isAuthenticated } }) => isAuthenticated,
    }),
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
  },
  async mounted () {
    this.fetchData();
  },
  methods: {
    async handleRemoveRegister (id) {
      await RegisterApi.deleteRegistration(this.token, id);
      await this.fetchData();
    },
    async handleAddRegisterAdmin (close, value) {
      close();
      const a = await RegisterApi.createRegistration(this.token, value.topicId, value.studentId, '');
      this.$emit('add-register');
      this.fetchData();
    },
    async fetchData () {
      const register = await RegisterApi.listAllRegistration(this.token);
      this.listRegister = register;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
