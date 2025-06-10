<template>
  <div class="app-table-container">
    <table class="app-table">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.name"
            :class="[
              'app-table__header', { 'app-table__header--right': col.type === 'icon' }
            ]"
          >
            <p class="text-m">
              {{ col.label_nl }}
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex" class="app-table__row">
          <td v-for="col in columns" :key="getFieldKey(col.name)" class="app-table__cell">
            <div v-if="col.type === 'icon'" class="app-table__button-row">
              <button v-for="action in col.actions" :key="action" @click="handleIconClick(row, action)">
                <icon :class="'app-table__cell--' + action" :name="action" />
              </button>
            </div>

            <template v-else-if="col.type === 'text-picture'">
              <div class="app-table__multi-field">
                <img :src="row.image_path" alt="" class="app-table__image">
                <p>{{ getFieldValue(row, col.name) }}</p>
              </div>
            </template>

            <template v-if="col.type === 'label'">
              <app-label :text="getFieldValue(row, col.name)" :type="row.status" />
            </template>

            <template v-if="col.type === 'text'">
              <p>{{ getFieldValue(row, col.name) }}</p>
            </template>

            <template v-if="col.type === 'date_time'">
              <p class="app-table__cell--date">
                {{ getFieldValue(row, col.name) }}
              </p>
            </template>

            <template v-if="col.type === 'key'">
              <p class="app-table__cell--key">
                {{ getFieldValue(row, col.name) }}
              </p>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue'
  import Icon from '@/js/ui/icon/Icon.vue'
  import AppLabel from '../label/AppLabel.vue'
  import { ModalController } from '@/js/core/ModalController.js'
  import { appRouter } from '@/js/core/AppRouter.js'

  const props = defineProps({
    data: { type: Array, required: true },
    columns: { type: Array, required: true },
    settings: { type: Object, required: true },
  })

  defineEmits(['rowAction'])

  function getFieldKey(field) {
    if (Array.isArray(field)) {
      return field.join('|')
    }
    return field
  }

  function getFieldValue(row, field) {
    if (Array.isArray(field)) {
      return row[field[0]] ?? ''
    }
    return row[field]
  }

  function showEdit(row) {
    ModalController.openModal(props.settings.cms_route, {
      rowData: row
    })
  }

  function handleIconClick(row, action) {
    const view = props.settings?.overview_settings.settings.detail_view;
    const module = props.settings?.cms_route
    if (view === "modal" && action === "edit") {
      showEdit(row)
    } else if (view === "page" && action === "edit") {
      if (module === "blogs") {
        appRouter.visit("blog.update", { id: row.id })
        return
      }
      appRouter.visit("module.update", { module: module, id: row.id })
    } else if (action === "delete") {
      console.log("delete");
    }
  }
</script>

<style scoped lang="scss">
.app-table-container {
    overflow-x: auto;
}

.app-table {
    width: 100%;
    border: 1px solid var(--app-border);
    border-bottom: none;
    background-color: var(--app-white);
    min-width: 120rem;

    &__header {
        height: 4.2rem;
        color: var(--color-gray-500);
        border-bottom: 1px solid var(--app-border);
        text-align: left;
        padding-right: 1.6rem;

        &--right {
            text-align: right;
        }

        p {
            font-weight: 500;
            color: var(--app-gray-500);
            padding-left: 1.6rem;
        }
    }

    &__row {
        color: var(--color-gray-500);
        text-align: left;

    }

    &__cell {
        height: 4.8rem;
        padding-left: 1.6rem;
        border-bottom: 1px solid var(--app-border);
        position: relative;

        &--key {
            color: var(--app-primary);
            font-family: "Roboto Mono", monospace;
        }

        &--date {
            color: var(--app-gray-500);
        }


    }

    &__button-row {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        padding-right: 1.6rem;
        justify-content: flex-end;

        button {
            border: none;
        }
    }

    &__cell--edit {
        background: none;
        border: none;
        cursor: pointer;
        fill: var(--app-primary);
        padding: 0;
        margin: 0;
        width: 1.4rem;
        height: 1.4rem;
    }

    &__cell--delete {
        background: none;
        border: none;
        cursor: pointer;
        fill: var(--app-red);
        padding: 0;
        margin: 0;
        height: 1.4rem;
        width: 1.2rem;
    }

    &__multi-field {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    &__image {
        width: 3rem;
    }
}
</style>