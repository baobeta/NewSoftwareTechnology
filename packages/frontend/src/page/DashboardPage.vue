<!-- eslint-disable max-len -->
<!-- eslint-disable max-len -->
<!-- eslint-disable max-len -->
<template>
  <div
    v-if="isAuthenticated"
    class="flex bg-slate-300"
  >
    <SideBar
      :select="select"
      :role="userRole"
      @changeSection="handleChange"
    />
    <div class="flex flex-col w-full">
      <HeaderBar
        :show-search="(select ==='register')"
        @search-header="handleSearchTopic"
      />
      <div class=" h-full bg-white m-2 rounded-xl">
        <TableDKMH
          v-if="select === 'register'"
          :list-topic="listTopic"
          @register-topic="fetchData"
        />
        <SearchTopic
          v-if="select === 'search'"
          :list-topic-search="listTopicSearch"
          @search="handleSearchTopic"
        />
        <ProfileInfo v-if="select === 'info'" />
        <ResultRegisterStudent
          v-if="select === 'result'"
          :list-register-topic="listRegisterByUser"
          @cancel-register="fetchData"
        />
        <ManageUserAdmin
          v-if="select === 'manage_user_admin'"
          :list-user="listUser"
          @remove-user="fetchData"
          @add-user="fetchData"
          @update-user="fetchData"
        />
        <ManageTopicAdmin
          v-if="select === 'manage_topic_admin'"
          :list-topic="listTopic"
          @remove-topic="fetchData"
          @add-topic="fetchData"
          @update-topic="fetchData"
        />
        <ManageRegisterAdmin
          v-if="select === 'manage_register_admin'"
          @add-register="fetchData"
          @remove-register="fetchData"
        />
        <ManageRegisterTeacher
          v-if="select === 'manage_register_teacher'"
          @add-register="fetchData"
          @remove-register="fetchData"
        />
        <ManageTopicTeacher
          v-if="select === 'manage_topic_teacher'"
          :list-topic="listTopicByLecturer"
          @remove-topic="fetchData"
          @add-topic="fetchData"
          @update-topic="fetchData"
        />
      </div>
    </div>
  </div>
  <div
    v-else
    class="flex"
  >
    <h1 class="text-center h-[30%] font-sans font-bold text-2xl">
      Vui lòng đăng nhập
    </h1>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { ModalsContainer } from 'vue-final-modal';
import SideBar from '../components/Dashboard/SideBar.vue';
import HeaderBar from '../components/Dashboard/HeaderBar.vue';
import TableDKMH from '../components/Student/TableDKMH.vue';
import ProfileInfo from '../components/Dashboard/ProfileInfo.vue';
import SearchTopic from '../components/Student/SearchTopic.vue';
import ResultRegisterStudent from '../components/Student/ResultRegisterStudent.vue';
import ManageUserAdmin from '../components/Admin/ManageUserAdmin.vue';
import ManageTopicAdmin from '../components/Admin/ManageTopicAdmin.vue';
import ManageRegisterAdmin from '../components/Admin/ManageRegisterAdmin.vue';
import ManageTopicTeacher from '../components/Teacher/ManageTopicTeacher.vue';
import ManageRegisterTeacher from '../components/Teacher/ManageRegisterTeacher.vue';
import TopicApi from '../utils/api/topic';
import RegisterApi from '../utils/api/register';
import UserApi from '../utils/api/user';

export default {
  name: 'DashboardPage',
  components: {
    SideBar,
    HeaderBar,
    TableDKMH,
    ProfileInfo,
    SearchTopic,
    ManageUserAdmin,
    ManageTopicAdmin,
    ManageRegisterAdmin,
    ManageTopicTeacher,
    ManageRegisterTeacher,
    ResultRegisterStudent,
  },
  props: {
  },
  data () {
    return {
      select: null,
      listTopic: [],
      listTopicSearch: [],
      showConfirmRegister: false,
      listUser: [],
      listRegisterByUser: [],
      listTopicByLecturer: [],
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
    await this.fetchData();
  },
  methods: {
    handleChange (value) {
      this.select = value;
    },
    async handleSearchTopic (data) {
      // eslint-disable-next-line max-len
      this.listTopicSearch = await TopicApi.listTopicWithName(this.token, data.value, data.type) || [];
      this.select = 'search';
    },
    async fetchData () {
      try {
        this.listTopic = await TopicApi.listAllTopics(this.token) || [];
        this.listTopicByLecturer = this.listTopic.filter((t) => t.lecturerId._id === this.userId.toString());
        this.listRegisterByUser = await RegisterApi.studentViewRegister(this.token);
        const userAll = await UserApi.getAllUser(this.token);
        this.listUser = userAll.filter((user) => user.roleId.name !== 'ADMIN');
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
