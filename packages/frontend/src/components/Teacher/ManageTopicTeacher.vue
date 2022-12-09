<!-- eslint-disable max-len -->
<template>
  <div class="flex">
    <div
      class=" rounded ml-auto mr-4 my-2 bg-blue-800 text-white font-sans font-semibold py-2 px-4"
      @click="modalShowAddTopicAdmin = true"
    >
      Thêm đề tài
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
            Tên đề tài
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Giáo viên hướng dẫn
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Chuyên ngànhs
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Số lượng
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
          v-for="topic in listTopic"
          :key="`topic-${topic._id}`"
          class="bg-slate-300 hover:bg-gray-50 "
        >
          <th
            :key="`topic-${topic._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ topic.title }}
          </th>
          <td class="py-4 px-6">
            <div
              class="font-bold cursor-pointer"
              @click="handleShowInfoTeacher(topic.lecturerId._id)"
            >
              {{ displayNameTeacher(topic.lecturerId) }}
            </div>
          </td>
          <td class="py-4 px-6">
            <div
              class="font-bolds"
            >
              {{ displayNameTeacher(topic.majorId) }}
              <!-- {{ topic.majorId.name }} -->
            </div>
          </td>
          <td class="py-4 px-6">
            {{ `${topic.current} / ${topic.limit}` }}
          </td>
          <td class="py-4 px-6 text-right">
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleRemoveTopic(topic._id)"
            >Xóa</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleUpdateTopic(topic._id)"
            >Sửa</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleShowTopic(topic._id,topic.title,topic.lecturerId.name, topic.description)"
            >Xem chi tiết</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <AddTopicRegister
    v-model="modalShowAddTopicAdmin"
    @save-topic="handleAddTopicAdmin"
  />
  <UpdateTopicTeacher
    v-if="modalUpdateAddTopicAdmin"
    v-model="modalUpdateAddTopicAdmin"
    :topic-id="currentTopicId"
    @update-topic="handleUpdate"
  />
  <InfoModal
    v-model="showInfoModal"
    :title="currentTopicName"
    :teacher-name="currentTeacher"
    :description="currentDescriptionTopic"
    @close-info-modal="closeInfoModal"
  />
  <ErrorModal
    v-model="showErrorModal"
    :message="messageError"
    @close-error-modal="closeErrorModal"
  />
  <InfoUserModal
    v-model="showInfoTeacher"
    :name="currentTeacherInfo.name"
    :email="currentTeacherInfo.email"
    :sex="currentTeacherInfo.sex"
    @close-info-user-modal="closeInfoUserModal"
  />
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AddTopicRegister from '../Modal/AddTopicTeacher.vue';
import UpdateTopicTeacher from '../Modal/UpdateTopicTeacher.vue';
import InfoModal from '../Modal/InfoModal.vue';
import ErrorModal from '../Modal/ErrorModal.vue';
import InfoUserModal from '../Modal/InfoUserModal.vue';
import UserApi from '../../utils/api/user';
import TopicApi from '../../utils/api/topic';

export default {
  name: 'ManageTopicAdmin',
  components: {
    AddTopicRegister,
    InfoModal,
    ErrorModal,
    InfoUserModal,
    UpdateTopicTeacher,
  },
  props: {
    listTopic: Array,
  },
  data () {
    return {
      modalShowAddTopicAdmin: false,
      modalUpdateAddTopicAdmin: false,
      show: false,
      showInfoModal: false,
      showErrorModal: false,
      showInfoTeacher: false,
      currentTopicId: '',
      currentTopicName: '',
      currentTeacher: '',
      currentDescriptionTopic: '',
      messageError: '',
      currentTeacherInfo: {},
      currentTopic: {},
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
  emits: ['removeTopic', 'addTopic', 'updateTopic'],
  methods: {
    async handleUpdate (close, value) {
      try {
        // eslint-disable-next-line max-len
        await TopicApi.updateTopicById(this.token, value.id, value.nameTopic, value.description, value.limit, value.teacher, value.major);
        close();
        this.$emit('updateTopic');
      } catch (e) {
        close();
        this.messageError = 'Đã có lỗi xảy ra vui lòng xử lý lại';
        this.showErrorModal = true;
      }
    },
    async handleUpdateTopic (topicId) {
      const currentTopic = await TopicApi.listTopicById(this.token, topicId);
      this.$store.dispatch('topic/updateTopic', currentTopic);
      this.modalUpdateAddTopicAdmin = true;
    },
    async handleAddTopicAdmin (close, value) {
      try {
        // eslint-disable-next-line max-len
        if (value.limit < 0) {
          this.messageError = 'Vui lòng nhập số lượng hợp lệ';
          this.showErrorModal = true;
        } else {
          // eslint-disable-next-line max-len
          await TopicApi.createTopic(this.token, value.nameTopic, value.description, value.limit, value.teacher, value.major);
          close();
          this.$emit('addTopic');
        }
      } catch (e) {
        close();
        this.messageError = 'Đã có lỗi xảy ra vui lòng xử lý lại';
        this.showErrorModal = true;
      }
    },
    handleShowTopic (topicId, topicName, teacherName, description) {
      this.currentTopicId = topicId;
      this.currentTopicName = topicName;
      this.currentTeacher = teacherName;
      this.currentDescriptionTopic = description;
      this.showInfoModal = true;
    },
    async handleShowInfoTeacher (id) {
      try {
        this.currentTeacherInfo = await UserApi.getUserById(this.token, id);
        this.showInfoTeacher = true;
      } catch (e) {
        this.messageError = 'Đã có lỗi xảy ra vui lòng xử lý lại';
        this.showErrorModal = true;
      }
    },
    closeInfoModal (close) {
      this.currentTopicId = '';
      this.currentTopicName = '';
      this.currentTeacher = '';
      this.currentContentTopic = '';
      this.currentDescriptionTopic = '';
      close();
      this.showInfoModal = false;
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
      this.currentTeacherInfo = { name: '', email: '', sex: '' };
      close();
      this.showInfoTeacher = false;
    },
    displayNameTeacher (teacher) {
      if (teacher && teacher.name) return teacher.name;
      return '';
    },
    async handleRemoveTopic (id) {
      try {
        await TopicApi.deleteTopicById(this.token, id);
        this.$emit('removeTopic');
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
