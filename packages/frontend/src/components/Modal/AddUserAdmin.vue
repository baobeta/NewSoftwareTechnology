<!-- eslint-disable max-len -->
<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-[10px]">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex justify-between items-start p-4 rounded-t border-b">
          <h3 class="text-xl font-semibold text-gray-900">
            Thông tin cá nhân
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
            @click="close"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            /></svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="mt-5">
          <div>
            <div class="overflow-hidden shadow sm:rounded-md">
              <div class="bg-white px-4 py-5 sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-4">
                    <label
                      class="block text-sm font-medium text-gray-700"
                    >Họ và tên</label>
                    <input
                      v-model="name"
                      type="text"
                      class="mt-1 px-2 block w-full rounded-md py-2 bg-gray-400 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                  </div>
                  <div class="col-span-6 sm:col-span-4">
                    <label
                      class="block text-sm font-medium text-gray-700"
                    >Mã số</label>
                    <input
                      v-model="code"
                      type="text"
                      class="mt-1 px-2 block w-full rounded-md py-2 bg-gray-400 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                  </div>
                  <div class="col-span-6 sm:col-span-4">
                    <label
                      class="block text-sm font-medium text-gray-700"
                    >Email</label>
                    <input
                      v-model="email"
                      type="text"
                      class="mt-1 px-2 block w-full rounded-md bg-gray-400 py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      class="block text-sm font-medium text-gray-700"
                    >Giới tính</label>
                    <select
                      v-model="sex"
                      class="mt-1 block w-full rounded-md bg-gray-400 border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option
                        v-for="option in options"
                        :key="`key-${option.value}`"
                        :value="option.value"
                      >
                        {{ option.text }}
                      </option>
                    </select>
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      class="block text-sm font-medium text-gray-700"
                    >Vai trò</label>
                    <select
                      v-model="role"
                      class="mt-1 block w-full rounded-md bg-gray-400 border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option
                        v-for="role in roles"
                        :key="`key-${role._id}`"
                        :value="role._id.toString()"
                      >
                        {{ role.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
          <button
            data-modal-toggle="defaultModal"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 bg-gray-400 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="handleAddUserAdmin( close ,{code, name, sex, email, role})"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>
<script>
import RoleApi from '../../utils/api/role';

export default {
  name: 'AddUserAdmin',
  inheritAttrs: false,
  props: {
  },
  data () {
    return {
      code: '',
      name: '',
      sex: '',
      email: '',
      options: [
        { text: 'Nam', value: 'male' },
        { text: 'Nữ', value: 'female' },
      ],
      role: '',
      roles: {},
    };
  },
  async mounted () {
    try {
      const role = await RoleApi.getAllRoles(this.token);
      this.roles = role;
    } catch (e) {
      console.log(e.message);
    }
  },
  methods: {
    handleAddUserAdmin (close, value) {
      close();
      this.$emit('addUser', value);
      this.code = '';
      this.name = '';
      this.sex = '';
      this.email = '';
      this.role = '';
    },
  },
};
</script>
