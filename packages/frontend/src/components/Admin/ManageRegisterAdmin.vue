<!-- eslint-disable max-len -->
<template>
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
              @click="handleRemoveTopic(topic._id)"
            >Xóa</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleShowTopic(topic._id,topic.title,topic.lecturerId.name, topic.description)"
            >Xem chi tiết</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import RegisterApi from '../../utils/api/register';

export default {
  name: 'ManageRegisterAdmin',
  components: {
  },
  props: {
  },
  data () {
    return {
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
    const register = await RegisterApi.listAllRegistration(this.token);
    console.log('🚀 ~ file: ManageRegisterAdmin.vue ~ line 95 ~ mounted ~ register', register);
    this.listRegister = register;
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>

</style>
