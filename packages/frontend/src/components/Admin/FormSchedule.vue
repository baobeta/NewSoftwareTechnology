<!-- eslint-disable max-len -->
<template>
  <div
    class="mx-4 my-4 rounded px-2 py-2 bg-slate-500 w-fit text-white font-semibold cursor-pointer"
    @click="rollBack"
  >
    Quay về
  </div>
  <div class="p-4 w-full h-full md:h-auto mx-auto mt-[10px]">
    <!-- Modal content -->
    <div class="bg-white rounded-lg shadow">
      <!-- Modal header -->
      <div class="flex justify-between items-start p-4 rounded-t border-b">
        <h3 class="text-xl font-semibold text-gray-900">
          Thông tin lịch đăng ký
        </h3>
      </div>
      <div class="ml-5 grid grid-cols-2">
        <FormKit
          v-model="name"
          type="text"
          name="name"
          label="Tên đợt đăng ký"
          help="TLCN K19 HK1"
          validation="required"
          :disabled="isView"
        />
        <FormKit
          v-model="description"
          name="description"
          type="textarea"
          label="Mô tả"
          help="Ghi các thông tin chi tiết tại đây"
          validation="required"
          :disabled="isView"
        />
        <FormKit
          v-model="startDate"
          name="startDate"
          type="date"
          label="Thời gian bắt đầu"
          validation="required"
          :disabled="isView"
        />
        <FormKit
          v-model="endDate"
          name="endDate"
          type="date"
          label="Thời gian kết thúc"
          validation="required"
          :disabled="isView"
        />
        <div class="w-3/4">
          <span class="font-bold text-sm">
            Đề tài đăng ký
          </span>
          <div class="mt-1">
            <Multiselect
              v-model="topics"
              mode="tags"
              :close-on-select="false"
              :searchable="true"
              :create-option="true"
              :options="listTopics"
              :disabled="isView"
            />
          </div>
        </div>
        <div class="my-2-1 w-3/4">
          <span class="font-bold text-sm py-4 my-4">
            Sinh viên đăng kí
          </span>
          <div class="mt-1">
            <Multiselect
              v-model="students"
              mode="tags"
              :close-on-select="false"
              :searchable="true"
              :create-option="true"
              :options="listStudents"
              :disabled="isView"
            />
          </div>
        </div>
      </div>
      <!-- Modal footer -->
      <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
        <button
          v-if="!isView"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="handleAddScheduleAdmin"
        >
          {{ isSave ? 'Lưu' : 'Cập nhật' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import { getValidationMessages } from '@formkit/validation';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'FormSchedule',
  components: {
    Multiselect,
  },
  props: {
  },
  data () {
    return {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      students: [],
      topics: [],
      listStudents: [
        'student1',
        'student2',
        'student3',
        'student4',
      ],
      listTopics: [
        'topic1',
        'lecturer2',
        'lecturer3',
      ],
    };
  },
  computed: {
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
    ...mapGetters('auth', [
      'token',
    ]),
    isSave () {
      return this.section === 'schedule-import';
    },
    isUpdate () {
      return this.section === 'schedule-update';
    },
    isView () {
      return this.section === 'schedule-view';
    },
  },
  async mounted () {
    await this.$store.dispatch('student/fetchListStudent', this.token);
    await this.$store.dispatch('topic/fetchListTopics', this.token);
    const students = this.$store.state.student.listStudents;
    const topics = this.$store.state.topic.listTopics;
    this.listStudents = students.map((student) => {
      let st = {
        value: student.code,
        label: student.name,
      };
      if (this.isView) {
        st = { ...st, disabled: true };
      }
      return st;
    });
    this.listTopics = topics.map((topic) => {
      let st = {
        value: topic.code,
        label: topic.title,
      };
      if (this.isView) {
        st = { ...st, disabled: true };
      }
      return st;
    });
    if (this.isUpdate || this.isView) {
      const { id } = this.$store.state.url;
      const { listSchedules } = this.$store.state.schedule;
      const schedule = listSchedules.find((s) => s._id.toString() === id.toString());
      if (schedule) {
        this.name = schedule.name;
        this.description = schedule.description;
        this.startDate = this.formatDate(schedule.startDate);
        this.endDate = this.formatDate(schedule.endDate);
        this.students = schedule.students;
        this.topics = schedule.topics;
      }
    }
  },
  methods: {
    rollBack () {
      this.$store.dispatch('url/updateSection', `${this.module}-list`);
    },
    async handleAddScheduleAdmin () {
      const {
        students, topics, name, description, startDate, endDate,
      } = this;
      const value = {
        students, topics, name, description, startDate, endDate,
      };
      try {
        if (this.isSave) {
          await this.$store.dispatch('schedule/addSchedule', { token: this.token, value });
        } else if (this.isUpdate) {
          await this.$store.dispatch('schedule/updateSchedule', { token: this.token, value: { ...value, _id: this.id } });
        }
        this.$toast.success('Đã cập nhật một thành công!');
      } catch (e) {
        console.error(e.message);
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      } finally {
        this.rollBack();
      }
    },
    formatDate (rawDate) {
      try {
        if (!rawDate || rawDate === '') return '';
        const date = new Date(rawDate);
        const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
          .toISOString()
          .split('T')[0];
        return dateString;
      } catch (e) {
        return '';
      }
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>
