<template>
  <div>
    <div class="relative">
      <input
        class="m0 no-outline"
        type="radio"
        :id="id"
        :checked="checked"
        @keyup.enter="$emit('click')"
        @click="$emit('click')"
        @blur="$emit('blur')"
        @change="$emit('change')"
        :disabled="disabled"
        :name="name"
        :value="value"
      >
      <label
        class="pl35 lh30 h4 pointer"
        :for="id"
      >
        <slot />
      </label>
    </div>
    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue'

export default {
  name: 'BaseRadiobutton',
  components: {
    ValidationMessages
  },
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true,
    },
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    validations: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/css/variables/_colors.scss';
  @import '@/css/helpers/functions/_color.scss';

  $color-silver: color(puerto-rico);
  $color-active: color(secondary);
  $color-white: color(white);

  label {
    &:before {
      content: '';
      position: absolute;
      top: 3px;
      left: 0;
      width: 22px;
      height: 22px;
      background-color: $color-white;
      border: 1px solid $color-silver;
      cursor: pointer;
    }
  }

  input {
    position: absolute;
    left: 0;
    width: 24px;
    top: -7px;

    &:checked + label {
      &:before {
        background-color: $color-silver;
        border-color: $color-silver;
        cursor: pointer;
      }

      &:after {
        content: '';
        position: absolute;
        top: 9px;
        left: 5px;
        width: 11px;
        height: 5px;
        border: 3px solid $color-white;
        border-top: none;
        border-right: none;
        background-color: $color-silver;
        transform: rotate(-45deg);
      }
    }

    &:hover,
    &:focus {
      + label {
        &:before {
          border-color: $color-active;
        }
      }
    }

    &:disabled + label {
      cursor: not-allowed;

      &:hover,
      &:focus {
        &:before {
          border-color: $color-silver;
          cursor: not-allowed;
        }
      }
    }
  }
</style>
