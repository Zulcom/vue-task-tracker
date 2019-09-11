<template>
  <main class="brdr-1 brdr-five">
    <ul class="task-list">
      <li class="px10  py5 brdr-bottom-1 w-100 task-list__item" v-for="task in tasks" :key="task.id">
        <div class="flex middle-xs">
          <task-status :value="task.status" class="mr5" />
          <div class="flex middle-xs">
            <h3 class="m0 sans-serif weight-400">
              <a class="no-underline task-list__title" :href="`/task/${task.id}`">{{ task.name }}</a>
            </h3>
            <button
              type="button" class="brdr-none  bg-cl-transparent p0 mx10"
              @click="filterPriority(task.priority)"
            >
              <task-priority :value="task.priority" class="px10" />
            </button>
          </div>
        </div>
        <span>#{{ task.id }} открыт </span>
        <time>{{ task.date | timestamp }}</time>
        <p v-if="task.description.length">
          {{ task.description }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
import TaskStatus from '@/modules/tasks/components/TaskStatus.vue'
import TaskPriority from '@/modules/tasks/components/TaskPriority.vue'
import Configurable from '@/mixins/Configurable'

export default {
  name: 'TasksTable',
  mixins: [Configurable],
  props: {
    tasks: {
      type: Array,
      required: true,
    }
  },
  components: { TaskStatus, TaskPriority },
}
</script>

<style scoped lang="scss">
  @import '@/css/variables/_colors.scss';
  @import '@/css/helpers/functions/_color.scss';

  .task-list {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    &__item {
      list-style: none;
      border-color: map-get($colors, grayy);

      &:focus, &:hover {
        background-color: map-get($colors, grayy);
      }
    }

    &__title {
      &:focus, &:hover {
        color: map-get($colors, link);
      }
    }
  }
</style>
