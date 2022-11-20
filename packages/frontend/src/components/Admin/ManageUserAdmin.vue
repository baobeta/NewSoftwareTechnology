<!-- eslint-disable max-len -->
<!-- eslint-disable max-len -->
<template>
  <div class="flex">
    <div
      class=" rounded ml-auto mr-4 my-2 bg-blue-800 text-white font-sans font-semibold py-2 px-4"
      @click="modalAddUserAdmin = true"
    >
      Thêm người dùng
    </div>
  </div>
  <div class="shadow-md sm:rounded-lg m-4">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-300">
        <tr>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Tên người dùng
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Quyền hạn
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
          v-for="user in listUser"
          :key="`user-${user._id}`"
          class="bg-slate-300 hover:bg-gray-50 "
        >
          <th
            :key="`user-${user._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ user.name }}
          </th>
          <td class="py-4 px-6">
            <div
              class="font-bold cursor-pointer"
            >
              {{ displayNameRole(user.roleId) }}
            </div>
          </td>
          <td class="py-4 px-6 text-right">
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleRemoveUser(user._id)"
            >Xóa</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleUpdateUser(user._id)"
            >Sửa</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleShowUser(user.name, user.email, user.sex)"
            >Xem chi tiết</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <InfoUserModal
    v-model="showInfoModal"
    :name="currentUser.name"
    :email="currentUser.email"
    :sex="currentUser.sex"
    @close-info-user-modal="closeInfoUserModal"
  />
  <AddUserAdmin
    v-model="modalAddUserAdmin"
    @add-user="handleAddUserAdmin"
  />
  <UpdateUserAdmin
    v-if="modalUpdateUserAdmin"
    v-model="modalUpdateUserAdmin"
    @update-user="handleUpdate"
  />
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import UserApi from '../../utils/api/user';
import InfoUserModal from '../Modal/InfoUserModal.vue';
import AddUserAdmin from '../Modal/AddUserAdmin.vue';
import UpdateUserAdmin from '../Modal/UpdateUserAdmin.vue';

export default {
  name: 'ManageUserAdmin',
  components: {
    InfoUserModal,
    AddUserAdmin,
    UpdateUserAdmin,
  },
  props: {
    listUser: Array,
  },
  data () {
    return {
      modalAddUserAdmin: false,
      modalUpdateUserAdmin: false,
      show: false,
      showInfoModal: false,
      showErrorModal: false,
      currentUser: { name: '', sex: '', email: '' },
      currentDescriptionTopic: '',
      messageError: '',
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
  emits: ['remove-user', 'add-user', 'update-user'],
  methods: {
    async handleUpdate (value) {
      try {
        // eslint-disable-next-line max-len
        const a = await UserApi.updateUserById(this.token, value.id, value.sex, value.name, value.email, value.code, value.role);
        this.$emit('update-user');
      } catch (error) {
        console.error(error);
      }
    },
    async handleUpdateUser (userId) {
      try {
        // eslint-disable-next-line max-len
        const user = await UserApi.getUserById(this.token, userId);
        this.$store.dispatch('user/updateUser', user);
        this.modalUpdateUserAdmin = true;
      } catch (error) {
        console.error(error);
      }
    },
    async handleAddUserAdmin (value) {
      try {
        // eslint-disable-next-line max-len
        const a = await UserApi.addUser(this.token, value.name, value.code, value.sex, value.email, value.role);
        this.$emit('add-user');
        console.log(a);
      } catch (error) {
        console.error(error);
      }
    },
    handleShowUser (name, email, sex) {
      this.currentUser = { name, email, sex };
      this.showInfoModal = true;
    },
    closeErrorModal (close) {
      this.currentTopicId = '';
      this.currentTopicName = '';
      this.currentTeacher = '';
      this.currentContentTopic = '';
      this.currentDescriptionTopic = '';
      close();
      this.showErrorModal = false;
    },
    closeInfoUserModal (close) {
      this.currentUser = { name: '', email: '', sex: '' };
      close();
      this.showInfoModal = false;
    },
    displayNameRole (teacher) {
      if (teacher && teacher.name) return teacher.name;
      return '';
    },
    async handleRemoveUser (id) {
      try {
        await UserApi.deleteUserById(this.token, id);
        this.$emit('remove-user');
      } catch (e) {
        this.messageError = 'Đã có lỗi xảy ra vui lòng xử lý lại';
        this.showErrorModal = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
