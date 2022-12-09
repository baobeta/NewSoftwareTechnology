<!-- eslint-disable vue/require-prop-types -->
<!-- eslint-disable vue/require-valid-default-prop -->
<!-- eslint-disable max-len -->
<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-[10px]">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow ">
        <!-- Modal header -->
        <div class="flex justify-between items-start p-4 rounded-t border-b ">
          <h3 class="text-xl font-semibold text-gray-900 ">
            Thêm đăng ký đề tài cho sinh viên
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
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
        <div class="p-6 space-y-6">
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Tên đề tài
            </label>
            <select
              v-model="topicId"
              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option
                v-for="option in listTopic"
                :key="`key-${option.name}`"
                :value="option._id"
              >
                {{ option.title }}
              </option>
            </select>
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Sinh viên đăng kí
            </label>
            <select
              v-model="studentId"
              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option
                v-for="option in listStudent"
                :key="`key-${option.name}`"
                :value="option._id"
              >
                {{ option.value }}
              </option>
            </select>
          </div>
          <!-- Modal footer -->
          <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
            <button
              v-if="isValid"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              @click="handleSave(close)"
            >
              Save
            </button>
            <button
              v-else
              type="button"
              class="text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              disabled
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import UserApi from '../../utils/api/user';
import TopicApi from '../../utils/api/topic';

export default {
  name: 'AddRegisterAdmin',
  inheritAttrs: false,
  props: {
    // eslint-disable-next-line vue/require-prop-types
  },
  data () {
    return {
      listStudent: [],
      listTopic: [],
      studentId: '',
      topicId: '',
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: ({ auth: { isAuthenticated } }) => isAuthenticated,
    }),
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
    isValid () {
      return (this.studentId !== '') && (this.topicId !== '');
    },
  },

  async mounted () {
    const user = await UserApi.getAllUser(this.token);
    const listStudent = user.filter((u) => u.roleId.name === 'STUDENT');
    this.listStudent = listStudent.map((u) => {
      const object = { ...u, value: `${u.name} - ${u.code}` };
      return object;
    });
    const listTopic = await TopicApi.listAllTopics(this.token);
    this.listTopic = listTopic;
  },
  methods: {
    handleSave (close) {
      this.$emit('saveRegister', close, {
        studentId: this.studentId, topicId: this.topicId,
      });
      this.studentId = '';
      this.topicId = '';
    },
  },
};
</script>
